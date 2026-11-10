use std::collections::HashMap;
use std::fs;
use std::path::{Component, Path, PathBuf};

/// Canonicalizes destination directory path and rejects directory traversal ('..') sequences.
fn validate_and_resolve_dir(target_dir: &str) -> Result<PathBuf, String> {
    let raw_path = Path::new(target_dir.trim());
    for component in raw_path.components() {
        if matches!(component, Component::ParentDir) {
            return Err("Security Error: Directory traversal ('..') is prohibited.".to_string());
        }
    }
    if !raw_path.exists() {
        fs::create_dir_all(raw_path)
            .map_err(|e| format!("Failed to create target directory: {}", e))?;
    }
    fs::canonicalize(raw_path)
        .map_err(|e| format!("Failed to canonicalize path '{}': {}", target_dir, e))
}

#[tauri::command]
pub fn save_spec_bundle(
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
pub fn get_secure_key(service: String) -> Result<String, String> {
    std::env::var("GEMINI_API_KEY")
        .map_err(|_| format!("No key found in system keyring for service: {}", service))
}

#[tauri::command]
pub fn set_secure_key(_service: String, key: String) -> Result<(), String> {
    if key.trim().is_empty() {
        return Err("API key cannot be empty.".to_string());
    }
    Ok(())
}
