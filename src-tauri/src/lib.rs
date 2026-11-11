mod gemini;
use std::collections::HashMap;
use std::fs;
use std::path::{Component, Path, PathBuf};

use keyring::Entry;
use serde_json::Value;

fn expand_home_prefix(trimmed: &str, home_dir: Option<&Path>) -> Result<PathBuf, String> {
    if trimmed == "~" {
        return home_dir
            .map(Path::to_path_buf)
            .ok_or_else(|| "Unable to determine user home directory for '~'.".to_string());
    }
    if let Some(rest) = trimmed.strip_prefix("~/") {
        let base = home_dir
            .ok_or_else(|| "Unable to determine user home directory for '~/'.".to_string())?;
        return Ok(base.join(rest));
    }
    Ok(PathBuf::from(trimmed))
}

/// Validates and canonicalizes a target directory path, rejecting empty inputs, relative paths, and '..' traversal segments.
fn validate_and_resolve_dir(target_dir: &str) -> Result<PathBuf, String> {
    let trimmed = target_dir.trim();
    if trimmed.is_empty() {
        return Err("Target directory path cannot be empty.".to_string());
    }
    if trimmed.replace('\\', "/").split('/').any(|seg| seg == "..") {
        return Err("Security Error: Directory traversal ('..') is prohibited.".to_string());
    }

    let home = std::env::var_os("HOME").map(PathBuf::from);
    let expanded = expand_home_prefix(trimmed, home.as_deref())?;
    if !expanded.is_absolute() {
        return Err("Target directory path must be an absolute path or start with '~/'.".to_string());
    }
    for component in expanded.components() {
        if matches!(component, Component::ParentDir) {
            return Err("Security Error: Directory traversal ('..') is prohibited.".to_string());
        }
    }
    if !expanded.exists() {
        fs::create_dir_all(&expanded)
            .map_err(|e| format!("Failed to create target directory: {}", e))?;
    }
    fs::canonicalize(&expanded)
        .map_err(|e| format!("Failed to canonicalize path '{}': {}", target_dir, e))
}

fn validate_service_name(service: &str) -> Result<&str, String> {
    let trimmed = service.trim();
    if trimmed.is_empty() || trimmed.contains('/') || trimmed.contains('\\') {
        return Err("Invalid keyring service name.".to_string());
    }
    Ok(trimmed)
}

fn is_valid_api_key(key: &str) -> bool {
    let trimmed = key.trim();
    !trimmed.is_empty() && trimmed != "MY_GEMINI_API_KEY" && trimmed.len() > 5
}

fn resolve_gemini_api_key() -> Result<String, String> {
    if let Ok(entry) = Entry::new("promptforge", "gemini")
        && let Ok(key) = entry.get_password()
        && is_valid_api_key(&key)
    {
        return Ok(key.trim().to_string());
    }

    if let Ok(env_key) = std::env::var("GEMINI_API_KEY")
        && is_valid_api_key(&env_key)
    {
        return Ok(env_key.trim().to_string());
    }

    Err(
        "No Gemini API key configured in your desktop keyring. Click \"Gemini Key\" in the toolbar to add your key."
            .to_string(),
    )
}

#[tauri::command]
fn save_spec_bundle(
    target_dir: String,
    files: HashMap<String, String>,
) -> Result<bool, String> {
    let resolved_dir = validate_and_resolve_dir(&target_dir)?;
    let allowed_files = ["AGENTS.md", "spec.md", "plan.md", "tasks.md"];

    for (filename, content) in files {
        if !allowed_files.contains(&filename.as_str()) {
            return Err(format!("Disallowed specification filename: {}", filename));
        }
        let dest = resolved_dir.join(&filename);
        fs::write(&dest, content.as_bytes())
            .map_err(|e| format!("Failed to write {}: {}", filename, e))?;
    }

    Ok(true)
}

#[tauri::command]
fn get_secure_key(service: String) -> Result<String, String> {
    let service = validate_service_name(&service)?;
    let entry = Entry::new("promptforge", service)
        .map_err(|e| format!("Failed to access keyring: {}", e))?;

    entry
        .get_password()
        .map_err(|_| format!("No key configured in keyring for service: {}", service))
}

#[tauri::command]
fn set_secure_key(service: String, key: String) -> Result<(), String> {
    let service = validate_service_name(&service)?;
    if !is_valid_api_key(&key) {
        return Err("Please enter a valid API key.".to_string());
    }

    let entry = Entry::new("promptforge", service)
        .map_err(|e| format!("Failed to access keyring: {}", e))?;

    entry
        .set_password(key.trim())
        .map_err(|e| format!("Failed to save key: {}", e))?;

    Ok(())
}

#[tauri::command]
fn has_secure_key(service: String) -> Result<bool, String> {
    let service = validate_service_name(&service)?;
    if let Ok(entry) = Entry::new("promptforge", service)
        && let Ok(key) = entry.get_password()
        && is_valid_api_key(&key)
    {
        return Ok(true);
    }
    if service == "gemini"
        && let Ok(env_key) = std::env::var("GEMINI_API_KEY")
        && is_valid_api_key(&env_key)
    {
        return Ok(true);
    }
    Ok(false)
}

#[tauri::command]
async fn gemini_proxy_request(endpoint: String, payload: Value) -> Result<Value, String> {
    let kind = gemini::normalize_gemini_endpoint(&endpoint)?;
    let api_key = resolve_gemini_api_key()?;
    let request_body = gemini::build_gemini_request_body(kind, &payload)?;

    let client = gemini::get_http_client();

    let response = client
        .post(gemini::GEMINI_MODEL_ENDPOINT)
        .header("x-goog-api-key", api_key)
        .header("User-Agent", "promptforge-desktop")
        .json(&request_body)
        .send()
        .await
        .map_err(|err| {
            if err.is_timeout() {
                "Gemini request timed out after 30 seconds. Your existing project text is untouched—please try again."
                    .to_string()
            } else {
                gemini::sanitize_error_message("Could not reach Gemini AI from the desktop client. Your active form text has been preserved.")
            }
        })?;

    if !response.status().is_success() {
        let status = response.status().as_u16();
        if status == 401 || status == 403 {
            return Err(
                "Gemini rejected the stored API key. Check your key in \"Gemini Key\" settings."
                    .to_string(),
            );
        }
        return Err(
            gemini::sanitize_error_message("Gemini AI returned an error while processing your request. Your active form text has been preserved.")
        );
    }

    let response_json: Value = response.json().await.map_err(|_| {
        "Received an unreadable response from Gemini AI. Your existing text has been safely preserved."
            .to_string()
    })?;

    gemini::extract_gemini_json_text(&response_json)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_dialog::init())
        .setup(|app| {
            if cfg!(debug_assertions) {
                app.handle().plugin(
                    tauri_plugin_log::Builder::default()
                        .level(log::LevelFilter::Info)
                        .build(),
                )?;
            }
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            save_spec_bundle,
            get_secure_key,
            set_secure_key,
            has_secure_key,
            gemini_proxy_request
        ])
        .run(tauri::generate_context!())
        .expect("error while building tauri application");
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn rejects_empty_and_traversal_paths() {
        assert!(validate_and_resolve_dir("").is_err());
        assert!(validate_and_resolve_dir("   ").is_err());
        assert!(validate_and_resolve_dir("/tmp/../etc").is_err());
        assert!(validate_and_resolve_dir("../escape").is_err());
    }

    #[test]
    fn save_spec_bundle_enforces_filename_allowlist_and_writes_files() {
        let test_dir = std::env::temp_dir().join(format!(
            "promptforge_test_{}",
            std::process::id()
        ));
        let dir_str = test_dir.to_string_lossy().to_string();

        let mut bad_files = HashMap::new();
        bad_files.insert("evil.sh".to_string(), "rm -rf /".to_string());
        assert!(save_spec_bundle(dir_str.clone(), bad_files).is_err());

        let mut good_files = HashMap::new();
        good_files.insert("AGENTS.md".to_string(), "# Agents".to_string());
        good_files.insert("spec.md".to_string(), "# Spec".to_string());
        assert_eq!(save_spec_bundle(dir_str, good_files), Ok(true));
        assert_eq!(fs::read_to_string(test_dir.join("AGENTS.md")).unwrap(), "# Agents");
        assert_eq!(fs::read_to_string(test_dir.join("spec.md")).unwrap(), "# Spec");

        let _ = fs::remove_dir_all(&test_dir);
    }

    #[test]
    fn rejects_invalid_keyring_service_names() {
        assert!(validate_service_name("").is_err());
        assert!(validate_service_name("   ").is_err());
        assert!(validate_service_name("bad/service").is_err());
        assert_eq!(validate_service_name("gemini"), Ok("gemini"));
    }

    #[test]
    fn expands_home_prefix_and_rejects_relative_paths() {
        let home = Path::new("/home/sinnoh");
        assert_eq!(expand_home_prefix("~", Some(home)), Ok(PathBuf::from("/home/sinnoh")));
        assert_eq!(
            expand_home_prefix("~/Projects/specs", Some(home)),
            Ok(PathBuf::from("/home/sinnoh/Projects/specs"))
        );
        assert!(expand_home_prefix("~", None).is_err());
        assert!(validate_and_resolve_dir("relative/path").is_err());
    }

}
