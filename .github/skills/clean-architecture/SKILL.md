---
name: clean-architecture
description: "Clean Architecture solution layout for Blazor. Use for: project structure, folder conventions, dependency rules, feature folders, shared kernel, project scaffolding."
---

# Clean Architecture for Blazor

## Solution Layout
```
src/
  [App].Web/              # Blazor host — pages, components, Program.cs
    Components/
      Pages/              # Routable pages (@page "/path")
      Layout/             # MainLayout, NavMenu
      Shared/             # Reusable components
    wwwroot/              # Static assets, CSS, JS
  [App].Application/      # Use cases, interfaces, DTOs, validators
    Features/
      [Feature]/
        I[Feature]Service.cs
        [Feature]Dto.cs
        [Feature]Validator.cs
  [App].Domain/           # Entities, value objects, enums, domain events
    Entities/
    ValueObjects/
  [App].Infrastructure/   # EF Core, external APIs, file I/O
    Data/
      AppDbContext.cs
      Migrations/
    Services/
tests/
  [App].Tests.Unit/
  [App].Tests.Integration/
```

## Dependency Rule
- Web → Application → Domain (inward only)
- Infrastructure → Application (implements interfaces)
- Domain has ZERO external dependencies

## Feature Folder Convention
Group by feature, not by type. Each feature folder contains its page, component, service interface, and DTO.

## Shared Kernel
Cross-cutting code in `[App].Application/Common/`:
- `Result<T>` for operation outcomes (no exceptions for expected failures)
- `Guard` class for argument validation
- `IDateTimeProvider` for testable time
