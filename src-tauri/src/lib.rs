mod export;
mod gemini;

use std::collections::HashMap;
use keyring::Entry;
use serde_json::Value;


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
    export::save_spec_bundle_to_dir(target_dir, files)
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
    fn rejects_invalid_keyring_service_names() {
        assert!(validate_service_name("").is_err());
        assert!(validate_service_name("   ").is_err());
        assert!(validate_service_name("bad/service").is_err());
        assert_eq!(validate_service_name("gemini"), Ok("gemini"));
    }
}
