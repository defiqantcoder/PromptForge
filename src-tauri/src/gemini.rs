use serde_json::{json, Value};
use std::sync::OnceLock;
use std::time::Duration;

pub(crate) const GEMINI_MODELS_BASE_URL: &str =
    "https://generativelanguage.googleapis.com/v1beta/models/";
pub(crate) const GEMINI_TIMEOUT_SECS: u64 = 30;

pub(crate) fn resolve_model_and_thinking(payload: &Value) -> (&'static str, &'static str) {
    let raw = payload
        .get("aiModel")
        .and_then(Value::as_str)
        .or_else(|| {
            payload
                .get("context")
                .and_then(|ctx| ctx.get("aiModel"))
                .and_then(Value::as_str)
        })
        .unwrap_or("gemini-3.8-flash")
        .trim();

    match raw {
        "gemini-3.5-flash-lite" => ("gemini-3.5-flash-lite", "MINIMAL"),
        "gemini-3.6-flash" => ("gemini-3.6-flash", "LOW"),
        "gemini-3.1-pro-preview" => ("gemini-3.1-pro-preview", "LOW"),
        "gemini-4-argon" => ("gemini-4-argon", "LOW"),
        _ => ("gemini-3.8-flash", "LOW"),
    }
}

pub(crate) static HTTP_CLIENT: OnceLock<reqwest::Client> = OnceLock::new();

pub(crate) fn get_http_client() -> &'static reqwest::Client {
    HTTP_CLIENT.get_or_init(|| {
        reqwest::Client::builder()
            .timeout(Duration::from_secs(GEMINI_TIMEOUT_SECS))
            .build()
            .expect("failed to build reqwest client")
    })
}

pub(crate) fn sanitize_error_message(err_str: &str) -> String {
    let lower = err_str.to_lowercase();
    if lower.contains("x-goog-api-key") || lower.contains("credentials") {
        return "An internal authentication error occurred. Please check your API key.".to_string();
    }
    err_str.to_string()
}
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub(crate) enum GeminiEndpoint {
    Expand,
    RandomIdea,
    Grill,
    FillField,
    MiniGrill,
    StitchSurprise,
    RecommendLanguage,
}

pub(crate) fn normalize_gemini_endpoint(endpoint: &str) -> Result<GeminiEndpoint, String> {
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

pub(crate) fn fill_field_guidance(field: &str) -> Result<(&'static str, &'static str), String> {
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
        "stitchScreenNotes" => Ok((
            "Stitch Screen / Menu Prompt Notes",
            "Describe the exact layout zones, navigation affordances, states (loading, empty, active), and interactive controls in \"value\" for this specific Google Stitch screen/menu/modal based on all filled fields.",
        )),
        "uploadedResultNotes" => Ok((
            "Stitch Result Handoff Notes",
            "Summarize in \"value\" how the next coding tool should wire interactive logic, state, and edge cases onto the Stitch UI based on all filled fields.",
        )),
        "localAgentNotes" => Ok((
            "Local AI Agent Rules (Ollama / Continue)",
            "Write concise local-first instructions in \"value\" for Ollama & Continue (.continuerules) specifying small focused edits, coding style, and verification commands tailored to this project.",
        )),
        "multiAgentProtocol" => Ok((
            "Multi-Agent Coordination Protocol",
            "Write clear coordination rules in \"value\" for COLLABORATION.md explaining how parallel agents claim lanes, avoid file collisions, and signal handoffs.",
        )),
        _ => Err("Unsupported field requested for AI fill.".to_string()),
    }
}

pub(crate) fn mini_grill_topic_guidance(topic: &str) -> Result<&'static str, String> {
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

pub(crate) fn build_multimodal_parts(prompt: String, payload: &Value) -> Value {
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

pub(crate) fn build_gemini_request_body(kind: GeminiEndpoint, payload: &Value) -> Result<Value, String> {
    let (_, thinking_level) = resolve_model_and_thinking(payload);
    let mut body: Value = (|| -> Result<Value, String> {
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
                "Analyze this live application specification and dynamically generate 5 fresh, sharp multiple-choice clarification questions (\"Grill Me\") tailored directly to everything the user already filled in.\n\
Strictly avoid repeating topics or questions already answered in Previous Decisions / Answers below — keep those remembered and dig into 5 NEW unaddressed product, data, error-handling, or UX decisions.\n\n\
App Name: {app_name}\n\
Tagline: {tagline}\n\
Target Device: {target_platform}\n\
Coding Language: {coding_language}\n\
Core Idea: {core_idea}\n\
Feature List: {features}\n\
Ground Rules: {ground_rules}\n\
Previous Decisions / Answers (DO NOT REPEAT THESE): {clarifications}\n\
Technical Stack & Pro Details: {pro_config}\n\
Stitch UI Details: {stitch_ui}\n\n\
Rules for the 5 questions:\n\
- Write questions in plain, everyday English (no intimidating jargon).\n\
- Reference specific features, device, or coding language choices the user already made.\n\
- Each question must have 3 distinct, practical multiple-choice options (under 14 words each).\n\
- Prefix the best option with \"(Recommended) \".\n\
- Set selectedAnswer to that recommended first option."
            );

            Ok(json!({
                "systemInstruction": {
                    "parts": [{
                        "text": "You are a Socratic product coach. Return exactly 5 fresh, non-duplicate high-value multiple-choice questions in valid JSON."
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
            let current_value = payload
                .get("currentValue")
                .and_then(Value::as_str)
                .map(str::trim)
                .filter(|s| !s.is_empty());
            let variation_nonce = payload
                .get("variationNonce")
                .and_then(|v| v.as_u64().or_else(|| v.as_str().and_then(|s| s.parse().ok())))
                .unwrap_or(1);
            let current_value_hint = match current_value {
                Some(existing) => format!(
                    "\nCurrent Field Draft (user clicked Fill with AI again — refine, elevate, or offer a fresh complementary alternative instead of repeating identically):\n{existing}\nVariation Seed: {variation_nonce}\n"
                ),
                None => String::new(),
            };

            let prompt = format!(
                "You are PromptForge, helping a builder fill out one specific field using ALL other filled fields in their project.\n\n\
Target Field: {field} ({label})\n\
Task: {instruction}{current_value_hint}\n\n\
Full Project Context (JSON):\n\
{serialized_context}\n\n\
Return valid JSON with \"value\" (and \"secondaryValue\" only when Target Field is \"templateVariable\"). Avoid jargon in Simple/Balanced fields and stay completely consistent with every filled section (including coding language, feature list, ground rules, clarifications, Pro config, Stitch UI direction, local agents, and multi-agent protocol)."
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
    })()?;
    if let Some(gen_cfg) = body.get_mut("generationConfig").and_then(Value::as_object_mut) {
        gen_cfg.insert(
            "thinkingConfig".to_string(),
            json!({ "thinkingLevel": thinking_level }),
        );
    }
    Ok(body)
}



pub(crate) fn extract_gemini_json_text(response_json: &Value) -> Result<Value, String> {
    let mut text = response_json
        .pointer("/candidates/0/content/parts/0/text")
        .and_then(Value::as_str)
        .map(str::trim)
        .filter(|s| !s.is_empty())
        .ok_or_else(|| {
            "Received an unexpected response from Gemini AI. Your existing text has been safely preserved."
                .to_string()
        })?;

    if text.starts_with("```json") {
        text = text.strip_prefix("```json").unwrap_or(text);
    } else if text.starts_with("```") {
        text = text.strip_prefix("```").unwrap_or(text);
    }
    if text.ends_with("```") {
        text = text.strip_suffix("```").unwrap_or(text);
    }

    text = text.trim();

    serde_json::from_str::<Value>(text).map_err(|_| {
        "Received an invalid JSON response from Gemini AI. Your existing text has been safely preserved."
            .to_string()
    })
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_markdown_fenced_json_extraction() {
        let ok_resp = json!({
            "candidates": [{
                "content": { "parts": [{ "text": "```json\n{\"appName\":\"FocusDeck\"}\n```" }] }
            }]
        });
        assert_eq!(
            extract_gemini_json_text(&ok_resp).unwrap(),
            json!({ "appName": "FocusDeck" })
        );

        let ok_resp_bare = json!({
            "candidates": [{
                "content": { "parts": [{ "text": "{\"appName\":\"FocusDeck\"}" }] }
            }]
        });
        assert_eq!(
            extract_gemini_json_text(&ok_resp_bare).unwrap(),
            json!({ "appName": "FocusDeck" })
        );
    }

    #[test]
    fn test_client_initialization_once_lock() {
        let client = get_http_client();
        let client2 = get_http_client();
        assert!(std::ptr::eq(client, client2));
    }

    #[test]
    fn test_sanitize_error_message() {
        assert_eq!(
            sanitize_error_message("Error: x-goog-api-key is invalid"),
            "An internal authentication error occurred. Please check your API key."
        );
        assert_eq!(
            sanitize_error_message("Normal timeout error"),
            "Normal timeout error"
        );
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
            assert_eq!(
                lang["generationConfig"]["thinkingConfig"]["thinkingLevel"],
                "LOW"
            );
        }

        #[test]
        fn resolves_models_thinking_levels_and_unlimited_fill_variations() {
            assert_eq!(
                resolve_model_and_thinking(&json!({ "aiModel": "gemini-3.5-flash-lite" })),
                ("gemini-3.5-flash-lite", "MINIMAL")
            );
            assert_eq!(
                resolve_model_and_thinking(&json!({ "context": { "aiModel": "gemini-3.1-pro-preview" } })),
                ("gemini-3.1-pro-preview", "LOW")
            );
            assert_eq!(
                resolve_model_and_thinking(&json!({ "aiModel": "gemini-4-argon" })),
                ("gemini-4-argon", "LOW")
            );
            assert_eq!(
                resolve_model_and_thinking(&json!({ "aiModel": "untrusted-model" })),
                ("gemini-3.8-flash", "LOW")
            );

            for field in ["stitchScreenNotes", "localAgentNotes", "multiAgentProtocol"] {
                let body = build_gemini_request_body(
                    GeminiEndpoint::FillField,
                    &json!({
                        "field": field,
                        "aiModel": "gemini-3.5-flash-lite",
                        "currentValue": "Previous draft",
                        "variationNonce": 42,
                        "context": { "appName": "PromptForge" }
                    }),
                )
                .unwrap();
                assert_eq!(
                    body["generationConfig"]["thinkingConfig"]["thinkingLevel"],
                    "MINIMAL"
                );
                let prompt_text = body["contents"][0]["parts"][0]["text"].as_str().unwrap();
                assert!(prompt_text.contains("Previous draft"));
                assert!(prompt_text.contains("Variation Seed: 42"));
            }
        }

}
