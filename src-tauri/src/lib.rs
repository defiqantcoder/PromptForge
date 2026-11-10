use std::collections::HashMap;
use std::fs;
use std::path::{Component, Path, PathBuf};
use keyring::Entry;

/// Validates and canonicalizes a target directory path, rejecting any '..' traversal segments.
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
    let entry = Entry::new("promptforge", &service)
        .map_err(|e| format!("Failed to access keyring: {}", e))?;
        
    entry.get_password()
        .map_err(|_| format!("No key configured in keyring for service: {}", service))
}

#[tauri::command]
fn set_secure_key(service: String, key: String) -> Result<(), String> {
    if key.trim().is_empty() {
        return Err("Key cannot be empty".to_string());
    }
    
    let entry = Entry::new("promptforge", &service)
        .map_err(|e| format!("Failed to access keyring: {}", e))?;
        
    entry.set_password(&key)
        .map_err(|e| format!("Failed to save key: {}", e))?;
        
    Ok(())
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
            set_secure_key
        ])
        .run(tauri::generate_context!())
        .expect("error while building tauri application");
}
