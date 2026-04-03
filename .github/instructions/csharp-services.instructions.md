---
description: "Use when writing C# services, APIs, data access, middleware, or DI registration. Covers async patterns, EF Core, and service conventions."
applyTo: "**/*.cs"
---

# C# Service Standards

- Target .NET 9+ / C# 13. Use primary constructors, file-scoped namespaces, collection expressions.
- Register services via DI in `Program.cs` or extension methods. No `new` for services.
- All I/O methods must be `async Task<T>`. Use `CancellationToken` on every async signature.
- EF Core: use `DbContext` via DI (scoped). Migrations via `dotnet ef`. No raw SQL unless perf-critical.
- Validation: use `FluentValidation` or `DataAnnotations` at API boundaries only.
- Exceptions: throw specific exceptions (`NotFoundException`, `ValidationException`). Use `ProblemDetails` for HTTP errors.
- Logging: inject `ILogger<T>`. Use structured logging with message templates, never string interpolation.
- Naming: `I[Name]Service` for interfaces, `[Name]Service` for implementations, `[Name]Dto` for data transfer.
