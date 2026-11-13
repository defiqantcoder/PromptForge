use std::collections::HashMap;
use std::fs;
use std::io::Write;
use std::path::{Component, Path, PathBuf};

pub(crate) fn expand_home_prefix(trimmed: &str, home_dir: Option<&Path>) -> Result<PathBuf, String> {
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
pub(crate) fn validate_and_resolve_dir(target_dir: &str) -> Result<PathBuf, String> {
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

pub(crate) fn save_spec_bundle_to_dir(
    target_dir: String,
    files: HashMap<String, String>,
) -> Result<bool, String> {
    let resolved_dir = validate_and_resolve_dir(&target_dir)?;
    let allowed_files = [
        "AGENTS.md",
        "spec.md",
        "plan.md",
        "tasks.md",
        "GEMINI.md",
        "USER_GUIDE.md",
        "COLLABORATION.md",
        ".continuerules",
    ];

    for (filename, content) in files {
        if !allowed_files.contains(&filename.as_str()) {
            return Err(format!("Disallowed specification filename: {}", filename));
        }
        let dest = resolved_dir.join(&filename);

        // Prevent symlink escapes: If a file exists at the destination, and it's a symlink, canonicalize it and verify it's within the canonicalized `target_dir`. If not, return an error.
        if dest.is_symlink() {
            let canonical_dest = fs::canonicalize(&dest)
                .map_err(|e| format!("Failed to canonicalize destination symlink: {}", e))?;

            if !canonical_dest.starts_with(&resolved_dir) {
                return Err(format!("Security Error: Symlink {} escapes destination directory", filename));
            }
        }

        // Write content to a temporary file in the canonical target directory.
        // Remove any pre-existing .tmp file or symlink first and use create_new(true) to prevent symlink overwrite attacks.
        let temp_dest = resolved_dir.join(format!("{}.tmp", filename));
        let _ = fs::remove_file(&temp_dest);
        let mut temp_file = fs::OpenOptions::new()
            .write(true)
            .create_new(true)
            .open(&temp_dest)
            .map_err(|e| format!("Failed to create {}: {}", temp_dest.display(), e))?;
        temp_file
            .write_all(content.as_bytes())
            .map_err(|e| {
                let _ = fs::remove_file(&temp_dest);
                format!("Failed to write {}: {}", temp_dest.display(), e)
            })?;

        // Atomically rename the temporary file to the final destination file using `fs::rename`.
        fs::rename(&temp_dest, &dest)
            .map_err(|e| {
                let _ = fs::remove_file(&temp_dest); // Cleanup on failure
                format!("Failed to rename {} to {}: {}", temp_dest.display(), dest.display(), e)
            })?;
    }

    Ok(true)
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

    #[test]
    fn save_spec_bundle_enforces_filename_allowlist_and_writes_files() {
        let test_dir = std::env::temp_dir().join(format!(
            "promptforge_test_{}",
            std::process::id()
        ));
        let dir_str = test_dir.to_string_lossy().to_string();

        let mut bad_files = HashMap::new();
        bad_files.insert("evil.sh".to_string(), "rm -rf /".to_string());
        assert!(save_spec_bundle_to_dir(dir_str.clone(), bad_files).is_err());

        let mut good_files = HashMap::new();
        good_files.insert("AGENTS.md".to_string(), "# Agents".to_string());
        good_files.insert("spec.md".to_string(), "# Spec".to_string());
        good_files.insert("GEMINI.md".to_string(), "# Gemini".to_string());
        good_files.insert("USER_GUIDE.md".to_string(), "# Guide".to_string());
        assert_eq!(save_spec_bundle_to_dir(dir_str.clone(), good_files), Ok(true));
        assert_eq!(fs::read_to_string(test_dir.join("AGENTS.md")).unwrap(), "# Agents");
        assert_eq!(fs::read_to_string(test_dir.join("spec.md")).unwrap(), "# Spec");
        assert_eq!(fs::read_to_string(test_dir.join("GEMINI.md")).unwrap(), "# Gemini");
        assert_eq!(fs::read_to_string(test_dir.join("USER_GUIDE.md")).unwrap(), "# Guide");

        let _ = fs::remove_dir_all(&test_dir);
    }

    #[test]
    fn save_spec_bundle_atomic_overwrite() {
        let test_dir = std::env::temp_dir().join(format!(
            "promptforge_test_atomic_{}",
            std::process::id()
        ));
        let dir_str = test_dir.to_string_lossy().to_string();
        let _ = fs::create_dir_all(&test_dir);

        let dest_file = test_dir.join("plan.md");
        fs::write(&dest_file, "Initial content").unwrap();

        let mut files = HashMap::new();
        files.insert("plan.md".to_string(), "Overwritten content".to_string());

        assert_eq!(save_spec_bundle_to_dir(dir_str, files), Ok(true));
        assert_eq!(fs::read_to_string(&dest_file).unwrap(), "Overwritten content");

        let _ = fs::remove_dir_all(&test_dir);
    }

    #[test]
    #[cfg(unix)]
    fn save_spec_bundle_rejects_escaping_symlinks() {
        use std::os::unix::fs::symlink;

        let base_dir = std::env::temp_dir().join(format!(
            "promptforge_test_symlink_{}",
            std::process::id()
        ));
        let test_dir = base_dir.join("target");
        let escape_dir = base_dir.join("escape");

        let _ = fs::create_dir_all(&test_dir);
        let _ = fs::create_dir_all(&escape_dir);

        // Escape file we don't want overwritten
        let escape_file = escape_dir.join("target.txt");
        fs::write(&escape_file, "Sensitive Data").unwrap();

        // Symlink pointing to the escape file (and named as an allowed file)
        let symlink_path = test_dir.join("tasks.md");
        symlink(&escape_file, &symlink_path).unwrap();

        let dir_str = test_dir.to_string_lossy().to_string();
        let mut files = HashMap::new();
        files.insert("tasks.md".to_string(), "Malicious content".to_string());

        let res = save_spec_bundle_to_dir(dir_str, files);
        assert!(res.is_err());
        assert!(res.unwrap_err().contains("Security Error: Symlink tasks.md escapes destination directory"));

        // Ensure original data was untouched
        assert_eq!(fs::read_to_string(&escape_file).unwrap(), "Sensitive Data");

        let _ = fs::remove_dir_all(&base_dir);
    }
}
