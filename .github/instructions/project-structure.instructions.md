---
description: "Use when scaffolding a new Blazor solution, deciding project layout, or organizing features. Covers Clean Architecture and vertical slice conventions."
---

# Solution Layout

Preferred structure for Blazor solutions:

```
src/
  [App].Web/              # Blazor Server host, pages, components
  [App].Application/      # Use cases, DTOs, interfaces, validation
  [App].Domain/           # Entities, value objects, domain events
  [App].Infrastructure/   # EF Core, external services, file I/O
tests/
  [App].Tests.Unit/       # xUnit + FluentAssertions
  [App].Tests.Integration/ # WebApplicationFactory tests
  [App].Tests.E2E/        # Playwright browser tests
```

- Feature folders inside each project (e.g., `Features/Auth/`, `Features/Dashboard/`).
- Shared kernel for cross-cutting concerns (Result types, Guard clauses).
- One `.sln` at root. Reference via `dotnet sln add`.
