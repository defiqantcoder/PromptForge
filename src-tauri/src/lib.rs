use std::collections::HashMap;
use std::fs;
use std::path::{Component, Path, PathBuf};
use std::time::Duration;
use keyring::Entry;
use serde_json::{json, Value};

const GEMINI_MODEL_ENDPOINT: &str =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent";
const GEMINI_TIMEOUT_SECS: u64 = 30;

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

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
enum GeminiEndpoint {
    Expand,
    RandomIdea,
    Grill,
    FillField,
    MiniGrill,
    StitchSurprise,
    RecommendLanguage,
}

fn normalize_gemini_endpoint(endpoint: &str) -> Result<GeminiEndpoint, String> {
    match endpoint.trim() {
        "/api/gemini/expand" | "expand" => Ok(GeminiEndpoint::Expand),
        "/api/gemini/random-idea" | "random-idea" => Ok(GeminiEndpoint::RandomIdea),
        "/api/gemini/grill" | "grill" => Ok(GeminiEndpoint::Grill),
        "/api/gemini/fill-field" | "fill-field" => Ok(GeminiEndpoint::FillField),
        "/api/gemini/mini-grill" | "mini-grill" => Ok(GeminiEndpoint::MiniGrill),
        "/api/gemini/stitch-surprise" | "stitch-surprise" => Ok(GeminiEndpoint::StitchSurprise),
        "/api/gemini/recommend-language" | "recommend-language" => Ok(GeminiEndpoint::RecommendLanguage),
        _ => Err("Unsupported Gemini endpoint.".to_string()),
    }
}

fn fill_field_guidance(field: &str) -> Result<(&'static str, &'static str), String> {
    match field {
        "appName" => Ok((
            "App Name",
            "Generate a crisp, memorable 1-3 word application name in \"value\" based on ALL other filled fields (tagline, coreIdea, targetPlatform, codingLanguage, features, stitchUi).",
        )),
        "tagline" => Ok((
            "One-Sentence Summary",
            "Write a warm, plain-English 1-sentence summary in \"value\" describing what the app does and who it helps using all other filled fields.",
        )),
        "coreIdea" => Ok((
            "Big Idea (Plain English)",
            "Write clear, jargon-free paragraphs in \"value\" explaining the app purpose, target users, and day-to-day experience using ALL other filled fields (appName, tagline, platform, codingLanguage, features, groundRules, clarifications).",
        )),
        "nextStep" => Ok((
            "Next Feature",
            "Suggest 1 concrete, high-value plain-English feature in \"value\" that complements the existing feature list without duplicating any item.",
        )),
        "codingLanguageNote" => Ok((
            "Coding Language Notes",
            "Suggest helpful plain-English library, framework, or version notes in \"value\" tailored to the chosen codingLanguage, targetPlatform, groundRules, and features.",
        )),
        "stackSummary" => Ok((
            "Preferred Tech Stack Summary",
            "Suggest a concise tech stack summary in \"value\" tailored to the codingLanguage, targetPlatform, app idea, ground rules, and clarifications.",
        )),
        "architectureStyle" => Ok((
            "System Architecture Pattern",
            "Suggest a clear 1-sentence architecture pattern in \"value\" matching the codingLanguage, stack, ground rules, and clarification decisions.",
        )),
        "testingStrategy" => Ok((
            "Verification & Testing Rules",
            "Suggest a practical testing and verification strategy in \"value\" aligned with the codingLanguage, targetPlatform, stack, and features.",
        )),
        "securityBoundary" => Ok((
            "Security & Filesystem Boundary",
            "Suggest a concrete security & data privacy boundary in \"value\" reflecting the ground rules, platform, codingLanguage, and app features.",
        )),
        "templateVariable" => Ok((
            "Dynamic Template Token",
            "Suggest 1 useful new template variable NOT already in existing templateVariables: put a short snake_case key in \"value\" and a sensible default string in \"secondaryValue\".",
        )),
        "customRule" => Ok((
            "Persistent AI Coding Rule",
            "Suggest 1 concise, actionable coding or UX convention in \"value\" that is NOT already in existing customRules and fits the project.",
        )),
        "stitchVisualDirection" => Ok((
            "Stitch UI Visual Direction",
            "Describe a vivid, cohesive UI layout, color mood, and component hierarchy in \"value\" for Google Stitch based on all other filled fields.",
        )),
        "uploadedResultNotes" => Ok((
            "Stitch Result Handoff Notes",
            "Summarize in \"value\" how the next coding tool should wire interactive logic, state, and edge cases onto the Stitch UI based on all filled fields.",
        )),
        _ => Err("Unsupported field requested for AI fill.".to_string()),
    }
}

fn mini_grill_topic_guidance(topic: &str) -> Result<&'static str, String> {
    match topic {
        "idea" => Ok("Clarify the core user problem, audience, or daily workflow so the Big Idea description becomes much sharper."),
        "features" => Ok("Clarify missing user interactions or edge cases so a concrete new feature can be added to the Feature List."),
        "groundRules" => Ok("Clarify offline behavior, speed expectations, or data privacy expectations."),
        "codingLanguage" => Ok("Clarify developer ergonomics, target ecosystem, or deployment priorities to refine coding language notes."),
        "proArch" => Ok("Clarify technical architecture, testing coverage, or security constraints for AGENTS.md."),
        "stitchUi" => Ok("Grill the user specifically about visual UI design (layout density, navigation pattern, color mood, typography, and component style) using any attached reference images."),
        _ => Err("Unsupported mini-grill topic.".to_string()),
    }
}

fn optional_str(payload: &Value, key: &str) -> Result<Option<String>, String> {
    match payload.get(key) {
        None | Some(Value::Null) => Ok(None),
        Some(Value::String(s)) => Ok(Some(s.clone())),
        Some(_) => Err(format!("Invalid '{}' payload.", key)),
    }
}

fn optional_features(payload: &Value) -> Result<Vec<String>, String> {
    match payload.get("features") {
        None | Some(Value::Null) => Ok(Vec::new()),
        Some(Value::Array(arr)) => {
            let mut out = Vec::with_capacity(arr.len());
            for item in arr {
                match item {
                    Value::String(s) => out.push(s.clone()),
                    _ => return Err("Invalid features payload.".to_string()),
                }
            }
            Ok(out)
        }
        Some(_) => Err("Invalid features payload.".to_string()),
    }
}

fn build_multimodal_parts(prompt: String, payload: &Value) -> Value {
    let mut parts = vec![json!({ "text": prompt })];
    if let Some(images) = payload.get("images").and_then(Value::as_array) {
        for img in images {
            if let Some(data_url) = img.get("dataUrl").and_then(Value::as_str)
                && let Some(rest) = data_url.strip_prefix("data:")
                && let Some((mime, b64)) = rest.split_once(";base64,")
                && mime.starts_with("image/")
                && !b64.is_empty()
            {
                parts.push(json!({
                    "inlineData": {
                        "mimeType": mime,
                        "data": b64
                    }
                }));
            }
        }
    }
    Value::Array(parts)
}

fn build_gemini_request_body(kind: GeminiEndpoint, payload: &Value) -> Result<Value, String> {
    match kind {
        GeminiEndpoint::Expand => {
            let core_idea = optional_str(payload, "coreIdea")?
                .filter(|s| !s.trim().is_empty())
                .ok_or_else(|| {
                    "Please enter at least a rough phrase or sentence for your app idea first."
                        .to_string()
                })?;
            let app_name = optional_str(payload, "appName")?
                .filter(|s| !s.trim().is_empty())
                .unwrap_or_else(|| "Untitled App".to_string());
            let target_platform = optional_str(payload, "targetPlatform")?
                .filter(|s| !s.trim().is_empty())
                .unwrap_or_else(|| "desktop".to_string());
            let features = optional_features(payload)?;
            let steps = if features.is_empty() {
                "None yet".to_string()
            } else {
                features.join("; ")
            };

            let prompt = format!(
                "You are PromptForge, a friendly product architect that translates rough, plain-English app thoughts into clear, jargon-free specifications.\n\n\
Current App Name: {app_name}\n\
Target Device: {target_platform}\n\
Rough Idea: {core_idea}\n\
Current Feature List: {steps}\n\n\
Expand this rough idea into:\n\
1. A crisp, memorable app name (if the current one is generic or empty, improve it; otherwise keep it).\n\
2. A 1-sentence plain-English tagline.\n\
3. A rich, well-structured 2-paragraph plain-English description of what the app does, who it helps, and how it feels to use (avoid obscure compiler/database jargon).\n\
4. 5 to 6 concrete, practical features written in everyday language."
            );

            Ok(json!({
                "systemInstruction": {
                    "parts": [{
                        "text": "Always respond with valid JSON matching the requested schema. Use clear, warm, non-intimidating language suitable for both non-coders and developers."
                    }]
                },
                "contents": [{ "role": "user", "parts": [{ "text": prompt }] }],
                "generationConfig": {
                    "responseMimeType": "application/json",
                    "responseSchema": {
                        "type": "OBJECT",
                        "properties": {
                            "appName": { "type": "STRING", "description": "Polished name for the application." },
                            "tagline": { "type": "STRING", "description": "Short 1-sentence summary of the app value." },
                            "expandedIdea": { "type": "STRING", "description": "2-paragraph expanded plain-English product description." },
                            "suggestedFeatures": {
                                "type": "ARRAY",
                                "items": { "type": "STRING" },
                                "description": "5 to 6 plain-language user steps or core capabilities."
                            }
                        },
                        "required": ["appName", "tagline", "expandedIdea", "suggestedFeatures"]
                    }
                }
            }))
        }
        GeminiEndpoint::RandomIdea => {
            let category_hint = optional_str(payload, "categoryHint")?
                .map(|s| s.trim().to_string())
                .filter(|s| !s.is_empty())
                .unwrap_or_else(|| {
                    "a local-first Ubuntu creative, productivity, or developer utility".to_string()
                });

            let prompt = format!(
                "Invent an original, practical, and inspiring application idea around the theme: \"{category_hint}\".\n\
Make it concrete, distinctive, and immediately understandable by a non-technical builder.\n\
Include:\n\
- A catchy appName and 1-sentence tagline\n\
- A 2-paragraph plain-English coreIdea explaining what problem it solves and how people interact with it\n\
- targetPlatform ('desktop', 'web', 'mobile', or 'cli')\n\
- 5 specific plain-English features\n\
- 3 tailored multiple-choice clarification questions (with 3 concise options each and a default selectedAnswer)\n\
- Recommended stackSummary and architectureStyle for Pro mode."
            );

            Ok(json!({
                "systemInstruction": {
                    "parts": [{
                        "text": "Generate an imaginative, realistic software application concept with zero filler jargon. Return strictly valid JSON."
                    }]
                },
                "contents": [{ "role": "user", "parts": [{ "text": prompt }] }],
                "generationConfig": {
                    "responseMimeType": "application/json",
                    "responseSchema": {
                        "type": "OBJECT",
                        "properties": {
                            "appName": { "type": "STRING" },
                            "tagline": { "type": "STRING" },
                            "coreIdea": { "type": "STRING" },
                            "targetPlatform": { "type": "STRING", "description": "One of: desktop, web, mobile, cli" },
                            "features": { "type": "ARRAY", "items": { "type": "STRING" } },
                            "groundRules": {
                                "type": "OBJECT",
                                "properties": {
                                    "offlineFirst": { "type": "BOOLEAN" },
                                    "highPerformance": { "type": "BOOLEAN" },
                                    "localPrivacy": { "type": "BOOLEAN" },
                                    "darkModeDefault": { "type": "BOOLEAN" }
                                },
                                "required": ["offlineFirst", "highPerformance", "localPrivacy", "darkModeDefault"]
                            },
                            "clarifications": {
                                "type": "ARRAY",
                                "items": {
                                    "type": "OBJECT",
                                    "properties": {
                                        "id": { "type": "STRING" },
                                        "category": { "type": "STRING" },
                                        "question": { "type": "STRING" },
                                        "options": { "type": "ARRAY", "items": { "type": "STRING" } },
                                        "selectedAnswer": { "type": "STRING" }
                                    },
                                    "required": ["id", "category", "question", "options", "selectedAnswer"]
                                }
                            },
                            "stackSummary": { "type": "STRING" },
                            "architectureStyle": { "type": "STRING" }
                        },
                        "required": [
                            "appName",
                            "tagline",
                            "coreIdea",
                            "targetPlatform",
                            "features",
                            "groundRules",
                            "clarifications",
                            "stackSummary",
                            "architectureStyle"
                        ]
                    }
                }
            }))
        }
        GeminiEndpoint::Grill => {
            let core_idea = optional_str(payload, "coreIdea")?
                .filter(|s| !s.trim().is_empty())
                .ok_or_else(|| {
                    "Please describe your app idea first so PromptForge knows what to ask."
                        .to_string()
                })?;
            let app_name = optional_str(payload, "appName")?
                .filter(|s| !s.trim().is_empty())
                .unwrap_or_else(|| "Untitled App".to_string());
            let tagline = optional_str(payload, "tagline")?
                .filter(|s| !s.trim().is_empty())
                .unwrap_or_default();
            let target_platform = optional_str(payload, "targetPlatform")?
                .filter(|s| !s.trim().is_empty())
                .unwrap_or_else(|| "desktop".to_string());
            let coding_language = optional_str(payload, "codingLanguage")?
                .filter(|s| !s.trim().is_empty())
                .unwrap_or_else(|| "auto".to_string());
            let features = optional_features(payload)?.join(" | ");
            let ground_rules = match payload.get("groundRules") {
                None | Some(Value::Null) => "{}".to_string(),
                Some(v) if v.is_object() => v.to_string(),
                Some(_) => return Err("Invalid ground rules payload.".to_string()),
            };
            let clarifications = payload
                .get("clarifications")
                .map(|v| v.to_string())
                .unwrap_or_else(|| "[]".to_string());
            let pro_config = payload
                .get("proConfig")
                .map(|v| v.to_string())
                .unwrap_or_else(|| "{}".to_string());
            let stitch_ui = payload
                .get("stitchUi")
                .map(|v| v.to_string())
                .unwrap_or_else(|| "{}".to_string());

            let prompt = format!(
                "Analyze this live application specification and dynamically generate 3 fresh, sharp multiple-choice clarification questions (\"Grill Me\") tailored directly to everything the user already filled in.\n\
Avoid repeating questions that are already answered in the existing decisions below — focus on the next most valuable unresolved product, UX, or edge-case decisions.\n\n\
App Name: {app_name}\n\
Tagline: {tagline}\n\
Target Device: {target_platform}\n\
Coding Language: {coding_language}\n\
Core Idea: {core_idea}\n\
Feature List: {features}\n\
Ground Rules: {ground_rules}\n\
Previous Decisions / Answers: {clarifications}\n\
Technical Stack & Pro Details: {pro_config}\n\
Stitch UI Details: {stitch_ui}\n\n\
Rules for the 3 questions:\n\
- Write questions in plain, everyday English (no intimidating jargon).\n\
- Reference specific features, device, or coding language choices the user already made.\n\
- Each question must have 3 distinct, practical multiple-choice options (under 14 words each).\n\
- Prefix the best option with \"(Recommended) \".\n\
- Set selectedAnswer to that recommended first option."
            );

            Ok(json!({
                "systemInstruction": {
                    "parts": [{
                        "text": "You are a Socratic product coach. Return exactly 3 high-value multiple-choice questions in valid JSON."
                    }]
                },
                "contents": [{ "role": "user", "parts": [{ "text": prompt }] }],
                "generationConfig": {
                    "responseMimeType": "application/json",
                    "responseSchema": {
                        "type": "OBJECT",
                        "properties": {
                            "questions": {
                                "type": "ARRAY",
                                "items": {
                                    "type": "OBJECT",
                                    "properties": {
                                        "id": { "type": "STRING" },
                                        "category": {
                                            "type": "STRING",
                                            "description": "Short plain-English topic like User Flow, Data & Privacy, or Visual Polish"
                                        },
                                        "question": { "type": "STRING" },
                                        "options": { "type": "ARRAY", "items": { "type": "STRING" } },
                                        "selectedAnswer": { "type": "STRING" }
                                    },
                                    "required": ["id", "category", "question", "options", "selectedAnswer"]
                                }
                            }
                        },
                        "required": ["questions"]
                    }
                }
            }))
        }
        GeminiEndpoint::FillField => {
            let field = payload
                .get("field")
                .and_then(Value::as_str)
                .ok_or_else(|| "Unsupported field requested for AI fill.".to_string())?;
            let (label, instruction) = fill_field_guidance(field)?;
            let context = payload
                .get("context")
                .filter(|v| v.is_object())
                .ok_or_else(|| "Invalid project context payload.".to_string())?;
            let serialized_context = context.to_string();

            let prompt = format!(
                "You are PromptForge, helping a builder fill out one specific field using ALL other filled fields in their project.\n\n\
Target Field: {field} ({label})\n\
Task: {instruction}\n\n\
Full Project Context (JSON):\n\
{serialized_context}\n\n\
Return valid JSON with \"value\" (and \"secondaryValue\" only when Target Field is \"templateVariable\"). Avoid jargon in Simple/Balanced fields and stay completely consistent with every filled section (including coding language, feature list, ground rules, clarifications, Pro config, and Stitch UI direction)."
            );

            Ok(json!({
                "systemInstruction": {
                    "parts": [{
                        "text": "You are a thoughtful product architect. Read all prior sections carefully and return strictly valid JSON with a smart, tailored answer for the requested field."
                    }]
                },
                "contents": [{ "role": "user", "parts": [{ "text": prompt }] }],
                "generationConfig": {
                    "responseMimeType": "application/json",
                    "responseSchema": {
                        "type": "OBJECT",
                        "properties": {
                            "value": {
                                "type": "STRING",
                                "description": "Smart context-aware value for the target field."
                            },
                            "secondaryValue": {
                                "type": "STRING",
                                "description": "Optional secondary value (used as token value when field is templateVariable)."
                            }
                        },
                        "required": ["value"]
                    }
                }
            }))
        }
        GeminiEndpoint::MiniGrill => {
            let topic = payload
                .get("topic")
                .and_then(Value::as_str)
                .ok_or_else(|| "Unsupported mini-grill topic.".to_string())?;
            let guidance = mini_grill_topic_guidance(topic)?;
            let context = payload
                .get("context")
                .filter(|v| v.is_object())
                .ok_or_else(|| "Invalid project context payload.".to_string())?;
            let serialized_context = context.to_string();

            let prompt = format!(
                "You are PromptForge running a focused \"Mini Grill\" specifically for the section \"{topic}\".\n\
Goal: {guidance}\n\n\
Full Project Context (JSON):\n\
{serialized_context}\n\n\
Generate 2 targeted, plain-English multiple-choice questions so the user can quickly add rich detail to this section.\n\
If visual reference images are attached, inspect them carefully and ask about their concrete layout, style, palette, or interaction details.\n\
Prefix the recommended choice with \"(Recommended) \" and set selectedAnswer to it."
            );

            let parts = build_multimodal_parts(prompt, payload);

            Ok(json!({
                "systemInstruction": {
                    "parts": [{
                        "text": "You are a concise product & UI coach. Return 2 crisp, focused multiple-choice questions in valid JSON."
                    }]
                },
                "contents": [{ "role": "user", "parts": parts }],
                "generationConfig": {
                    "responseMimeType": "application/json",
                    "responseSchema": {
                        "type": "OBJECT",
                        "properties": {
                            "questions": {
                                "type": "ARRAY",
                                "items": {
                                    "type": "OBJECT",
                                    "properties": {
                                        "id": { "type": "STRING" },
                                        "category": { "type": "STRING" },
                                        "question": { "type": "STRING" },
                                        "options": { "type": "ARRAY", "items": { "type": "STRING" } },
                                        "selectedAnswer": { "type": "STRING" }
                                    },
                                    "required": ["id", "category", "question", "options", "selectedAnswer"]
                                }
                            }
                        },
                        "required": ["questions"]
                    }
                }
            }))
        }
        GeminiEndpoint::StitchSurprise => {
            let context = payload
                .get("context")
                .filter(|v| v.is_object())
                .ok_or_else(|| "Invalid project context payload.".to_string())?;
            let serialized_context = context.to_string();

            let prompt = format!(
                "You are PromptForge's Lead UI Designer preparing a \"Surprise Me\" visual direction for Google Stitch.\n\n\
Full Project Context (JSON):\n\
{serialized_context}\n\n\
Invent a cohesive, memorable UI direction tailored to the app idea, target platform, features, ground rules, and any uploaded inspiration images.\n\
Return:\n\
- designConceptName: A short evocative name for the visual theme.\n\
- visualDirection: A rich, plain-English UI blueprint describing layout geometry, navigation structure, color palette mood, typography personality, key component surfaces, and interactive polish.\n\
- uiClarifications: 3 sharp multiple-choice UI design questions (layout, navigation, visual density/aesthetic) with 3 options each (best prefixed with \"(Recommended) \") and selectedAnswer set to the recommended option."
            );

            let parts = build_multimodal_parts(prompt, payload);

            Ok(json!({
                "systemInstruction": {
                    "parts": [{
                        "text": "You are an imaginative UI/UX director for Google Stitch. Return valid JSON matching the requested schema."
                    }]
                },
                "contents": [{ "role": "user", "parts": parts }],
                "generationConfig": {
                    "responseMimeType": "application/json",
                    "responseSchema": {
                        "type": "OBJECT",
                        "properties": {
                            "designConceptName": { "type": "STRING" },
                            "visualDirection": { "type": "STRING" },
                            "uiClarifications": {
                                "type": "ARRAY",
                                "items": {
                                    "type": "OBJECT",
                                    "properties": {
                                        "id": { "type": "STRING" },
                                        "category": { "type": "STRING" },
                                        "question": { "type": "STRING" },
                                        "options": { "type": "ARRAY", "items": { "type": "STRING" } },
                                        "selectedAnswer": { "type": "STRING" }
                                    },
                                    "required": ["id", "category", "question", "options", "selectedAnswer"]
                                }
                            }
                        },
                        "required": ["designConceptName", "visualDirection", "uiClarifications"]
                    }
                }
            }))
        }
        GeminiEndpoint::RecommendLanguage => {
            let context = payload
                .get("context")
                .filter(|v| v.is_object())
                .ok_or_else(|| "Invalid project context payload.".to_string())?;
            let serialized_context = context.to_string();

            let prompt = format!(
                "You are PromptForge's plain-English engineering advisor helping the user choose a coding language.\n\n\
Full Project Context (JSON):\n\
{serialized_context}\n\n\
Supported codingLanguage IDs:\n\
- typescript-react (TypeScript + React: best for web apps, interactive dashboards, cross-platform UI)\n\
- rust-tauri (Rust + TypeScript / Tauri v2: best for fast, private, tiny-footprint Linux/desktop native apps)\n\
- python (Python: best for AI/ML tools, data pipelines, automation scripts, quick backends)\n\
- dart-flutter (Dart + Flutter: best for iOS + Android mobile apps from one codebase)\n\
- kotlin-android (Kotlin: best for Android-native apps)\n\
- swift-ios (Swift: best for iOS/macOS Apple-native apps)\n\
- go (Go: best for high-concurrency backend APIs, CLIs, and network services)\n\
- csharp-dotnet (C# / .NET: best for enterprise backends, Windows desktop, Unity games)\n\n\
Pick the single best recommendedId for this project, give a clear plain-English summary of why it fits, provide a jargon-free tradeoffs explanation, and return 3-4 comparisons covering what language is best for what scenario relative to this app."
            );

            Ok(json!({
                "systemInstruction": {
                    "parts": [{
                        "text": "Give friendly, objective, jargon-free guidance on which coding language fits best for what type of software. Return valid JSON."
                    }]
                },
                "contents": [{ "role": "user", "parts": [{ "text": prompt }] }],
                "generationConfig": {
                    "responseMimeType": "application/json",
                    "responseSchema": {
                        "type": "OBJECT",
                        "properties": {
                            "recommendedId": { "type": "STRING" },
                            "recommendedLabel": { "type": "STRING" },
                            "summary": { "type": "STRING" },
                            "tradeoffs": { "type": "STRING" },
                            "comparisons": {
                                "type": "ARRAY",
                                "items": {
                                    "type": "OBJECT",
                                    "properties": {
                                        "language": { "type": "STRING" },
                                        "bestFor": { "type": "STRING" },
                                        "whyConsiderOrSkip": { "type": "STRING" }
                                    },
                                    "required": ["language", "bestFor", "whyConsiderOrSkip"]
                                }
                            }
                        },
                        "required": [
                            "recommendedId",
                            "recommendedLabel",
                            "summary",
                            "tradeoffs",
                            "comparisons"
                        ]
                    }
                }
            }))
        }
    }
}

fn extract_gemini_json_text(response_json: &Value) -> Result<Value, String> {
    let text = response_json
        .pointer("/candidates/0/content/parts/0/text")
        .and_then(Value::as_str)
        .map(str::trim)
        .filter(|s| !s.is_empty())
        .ok_or_else(|| {
            "Received an unexpected response from Gemini AI. Your existing text has been safely preserved."
                .to_string()
        })?;

    serde_json::from_str::<Value>(text).map_err(|_| {
        "Received an invalid JSON response from Gemini AI. Your existing text has been safely preserved."
            .to_string()
    })
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
    let kind = normalize_gemini_endpoint(&endpoint)?;
    let api_key = resolve_gemini_api_key()?;
    let request_body = build_gemini_request_body(kind, &payload)?;

    let client = reqwest::Client::builder()
        .timeout(Duration::from_secs(GEMINI_TIMEOUT_SECS))
        .build()
        .map_err(|_| "Failed to initialize desktop HTTP client.".to_string())?;

    let response = client
        .post(GEMINI_MODEL_ENDPOINT)
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
                "Could not reach Gemini AI from the desktop client. Your active form text has been preserved."
                    .to_string()
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
            "Gemini AI returned an error while processing your request. Your active form text has been preserved."
                .to_string(),
        );
    }

    let response_json: Value = response.json().await.map_err(|_| {
        "Received an unreadable response from Gemini AI. Your existing text has been safely preserved."
            .to_string()
    })?;

    extract_gemini_json_text(&response_json)
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
    fn normalizes_and_rejects_gemini_endpoints() {
        assert_eq!(normalize_gemini_endpoint("/api/gemini/expand"), Ok(GeminiEndpoint::Expand));
        assert_eq!(normalize_gemini_endpoint("random-idea"), Ok(GeminiEndpoint::RandomIdea));
        assert_eq!(normalize_gemini_endpoint("/api/gemini/grill"), Ok(GeminiEndpoint::Grill));
        assert!(normalize_gemini_endpoint("https://evil.example.com").is_err());
        assert!(normalize_gemini_endpoint("/api/health").is_err());
    }

    #[test]
    fn builds_and_validates_gemini_request_bodies() {
        assert!(build_gemini_request_body(GeminiEndpoint::Expand, &json!({})).is_err());
        let expand_body = build_gemini_request_body(
            GeminiEndpoint::Expand,
            &json!({ "coreIdea": "A calm study planner", "features": ["Track sessions"] }),
        )
        .unwrap();
        assert_eq!(
            expand_body["generationConfig"]["responseMimeType"],
            "application/json"
        );

        let random_body = build_gemini_request_body(GeminiEndpoint::RandomIdea, &json!({})).unwrap();
        assert!(random_body["generationConfig"]["responseSchema"]["required"].is_array());

        assert!(
            build_gemini_request_body(
                GeminiEndpoint::Grill,
                &json!({ "coreIdea": "A calm study planner", "groundRules": "not-an-object" })
            )
            .is_err()
        );
    }

    #[test]
    fn extracts_json_from_gemini_candidates_response() {
        let ok_resp = json!({
            "candidates": [{
                "content": { "parts": [{ "text": "{\"appName\":\"FocusDeck\"}" }] }
            }]
        });
        assert_eq!(
            extract_gemini_json_text(&ok_resp).unwrap(),
            json!({ "appName": "FocusDeck" })
        );

        let bad_resp = json!({ "candidates": [] });
        assert!(extract_gemini_json_text(&bad_resp).is_err());
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
    fn builds_and_validates_fill_field_requests() {
        assert_eq!(normalize_gemini_endpoint("/api/gemini/fill-field"), Ok(GeminiEndpoint::FillField));
        assert!(
            build_gemini_request_body(
                GeminiEndpoint::FillField,
                &json!({ "field": "unknownField", "context": {} })
            )
            .is_err()
        );
        let body = build_gemini_request_body(
            GeminiEndpoint::FillField,
            &json!({
                "field": "tagline",
                "context": { "appName": "PulseVault", "coreIdea": "Local vault" }
            }),
        )
        .unwrap();
        assert_eq!(body["generationConfig"]["responseMimeType"], "application/json");

        let long_idea = "a".repeat(25_000);
        assert!(
            build_gemini_request_body(
                GeminiEndpoint::Expand,
                &json!({ "coreIdea": long_idea, "features": ["step 1", "step 2"] })
            )
            .is_ok()
        );
        assert!(
            build_gemini_request_body(
                GeminiEndpoint::FillField,
                &json!({ "field": "stitchVisualDirection", "context": { "appName": "PulseVault" } })
            )
            .is_ok()
        );
    }

    #[test]
    fn builds_mini_grill_stitch_surprise_and_language_advisor_requests() {
        assert_eq!(
            normalize_gemini_endpoint("/api/gemini/mini-grill"),
            Ok(GeminiEndpoint::MiniGrill)
        );
        assert_eq!(
            normalize_gemini_endpoint("stitch-surprise"),
            Ok(GeminiEndpoint::StitchSurprise)
        );
        assert_eq!(
            normalize_gemini_endpoint("/api/gemini/recommend-language"),
            Ok(GeminiEndpoint::RecommendLanguage)
        );

        let mini = build_gemini_request_body(
            GeminiEndpoint::MiniGrill,
            &json!({
                "topic": "stitchUi",
                "context": { "appName": "FocusDeck" },
                "images": [{ "dataUrl": "data:image/png;base64,iVBORw0KGgo=" }]
            }),
        )
        .unwrap();
        assert_eq!(mini["contents"][0]["parts"][1]["inlineData"]["mimeType"], "image/png");

        let surprise = build_gemini_request_body(
            GeminiEndpoint::StitchSurprise,
            &json!({
                "context": { "appName": "FocusDeck" },
                "images": [{ "dataUrl": "data:image/jpeg;base64,/9j/4AAQSkZJRg==" }]
            }),
        )
        .unwrap();
        assert_eq!(surprise["contents"][0]["parts"][1]["inlineData"]["mimeType"], "image/jpeg");

        let lang = build_gemini_request_body(
            GeminiEndpoint::RecommendLanguage,
            &json!({ "context": { "appName": "FocusDeck", "targetPlatform": "desktop" } }),
        )
        .unwrap();
        assert_eq!(lang["generationConfig"]["responseMimeType"], "application/json");
    }
}
