---
name: component-patterns
description: "Blazor component lifecycle and patterns. Use for: code-behind, parameters, EventCallback, CascadingParameter, state management, disposal, component file structure."
---

# Component Patterns

## File Structure
```
Components/
  Features/
    Dashboard/
      DashboardPage.razor        # @page "/dashboard"
      DashboardPage.razor.cs     # Code-behind (partial class)
      StatCard.razor             # Child component
      StatCard.razor.cs
```

> **Styling rule**: Use Bootstrap 5 classes by default. Custom CSS/JS only when Bootstrap is insufficient — must be a reusable component with `<!-- CUSTOM: [reason] -->` annotation.

## Code-Behind Pattern
```csharp
public partial class DashboardPage : ComponentBase, IAsyncDisposable
{
    [Inject] private IDashboardService DashboardService { get; set; } = default!;
    [Inject] private ILogger<DashboardPage> Logger { get; set; } = default!;

    private List<StatDto>? _stats;

    protected override async Task OnInitializedAsync()
    {
        _stats = await DashboardService.GetStatsAsync();
    }

    public ValueTask DisposeAsync() => ValueTask.CompletedTask;
}
```

## Parameter Patterns
```csharp
[Parameter] public string Title { get; set; } = string.Empty;
[Parameter] public EventCallback<int> OnItemSelected { get; set; }
[CascadingParameter] private Task<AuthenticationState>? AuthState { get; set; }
```

## State Management
- **Component state**: private fields, `StateHasChanged()` when mutated externally
- **Cascading state**: `CascadingValue` for theme, auth, layout config
- **App state**: registered `scoped` service as state container with `OnChange` event
- **URL state**: `[SupplyParameterFromQuery]` for bookmarkable state

## Lifecycle Order
`SetParametersAsync` → `OnInitialized{Async}` → `OnParametersSet{Async}` → `OnAfterRender{Async}`
