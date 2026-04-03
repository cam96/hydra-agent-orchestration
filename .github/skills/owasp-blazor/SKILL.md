---
name: owasp-blazor
description: "OWASP Top 10 security checklist for Blazor/.NET. Use for: broken access control, injection prevention, XSS via MarkupString, CSP headers, security misconfiguration, auth failures, logging."
---

# OWASP Top 10 — Blazor Specifics

## A01: Broken Access Control
- Use `[Authorize]` on every protected page/endpoint.
- Don't rely on UI hiding; enforce on server.
- Check object-level access: `if (item.OwnerId != currentUserId) return Forbid()`.

## A02: Cryptographic Failures
- Use Data Protection API for encrypting local data.
- HTTPS only. Set `builder.WebHost.UseUrls("https://...")` or enforce via middleware.
- Never store passwords in plaintext. Identity handles hashing.

## A03: Injection
- Blazor auto-encodes output — XSS via `MarkupString` is the main risk.
- Never: `new MarkupString(userInput)`.
- EF Core parameterizes queries — avoid `FromSqlRaw` with string concatenation.
- Use `FormattableString` with `FromSqlInterpolated` if raw SQL is needed.

## A05: Security Misconfiguration
- Remove default error pages in production: `app.UseExceptionHandler("/Error")`.
- Set `Content-Security-Policy`: `script-src 'self'; style-src 'self'; frame-ancestors 'none'`.
- Disable `Server` header: `builder.WebHost.ConfigureKestrel(k => k.AddServerHeader = false)`.

## A07: Identification and Authentication Failures
- Use ASP.NET Identity — don't roll your own.
- Enforce password complexity, lockout after N failures.
- Use anti-forgery tokens (automatic in Blazor Server).

## A08: Software and Data Integrity
- Verify NuGet packages: `dotnet list package --vulnerable`.
- Pin package versions in CI.
- Use `Subresource Integrity` for CDN scripts.

## A09: Security Logging and Monitoring
- Log auth failures, access denials, input validation failures.
- Never log passwords, tokens, PII.
- Use structured logging with `ILogger<T>`.
