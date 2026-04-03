---
description: "Use when reviewing security, authentication, authorization, input validation, OWASP concerns, secrets management, or data protection."
---

# Security Guidelines

- Never hardcode secrets, API keys, or connection strings. Use `dotnet user-secrets` (dev) or Azure Key Vault (prod).
- Validate all input at system boundaries. Use allowlists over denylists.
- Use `[Authorize]` on all protected endpoints. Prefer policy-based authorization over role checks.
- Anti-forgery: Blazor Server handles this automatically. For APIs, validate tokens explicitly.
- Output encoding: Razor auto-encodes. Never use `MarkupString` with untrusted content.
- CORS: configure explicit origins, never `AllowAnyOrigin()` with credentials.
- CSP: set `Content-Security-Policy` header. Restrict `script-src`, `style-src` to known sources.
- Logging: never log secrets, tokens, passwords, or PII. Redact sensitive fields.
- Dependencies: audit NuGet packages regularly. Use `dotnet list package --vulnerable`.
