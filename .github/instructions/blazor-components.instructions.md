---
description: "Use when creating or editing Blazor Razor components, layouts, or pages. Covers render modes, component lifecycle, state, forms, Bootstrap styling."
applyTo: "**/*.razor"
---

# Blazor Component Standards

- Use `@rendermode InteractiveServer` unless WASM is explicitly required.
- One component per file. Name: `[Feature]Component.razor`.
- Co-locate code-behind in `[Name].razor.cs` with `partial class`.
- Use `[Parameter]` for parent-to-child data. Use cascading values sparingly.
- Prefer `EventCallback<T>` over raw `Action<T>` for child-to-parent communication.
- Use `EditForm` with `DataAnnotationsValidator` for forms. Never trust client input.
- Dispose event handlers in `IAsyncDisposable.DisposeAsync()`.
- **Styling**: Use Bootstrap 5 classes by default. Custom CSS/JS is allowed only when Bootstrap cannot achieve the requirement.
- **Custom CSS/JS rule**: When unavoidable, create a reusable component, add `<!-- CUSTOM: [reason] -->` comment, and co-locate the CSS in `.razor.css` or JS in `wwwroot/js/custom/`.
