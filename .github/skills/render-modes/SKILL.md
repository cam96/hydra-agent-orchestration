---
name: render-modes
description: "Blazor render mode selection guide. Use for: choosing between Static SSR, Interactive Server, Interactive WASM, or Interactive Auto. Covers per-component vs global render modes, prerendering, and mode constraints."
---

# Render Mode Guide

## Modes (.NET 9+)

| Mode | Directive | Interactivity | Connection |
|------|-----------|--------------|------------|
| Static SSR | (none) | None | None |
| Interactive Server | `@rendermode InteractiveServer` | Full | SignalR |
| Interactive WASM | `@rendermode InteractiveWebAssembly` | Full | None (client) |
| Interactive Auto | `@rendermode InteractiveAuto` | Full | Server first, then WASM |

## Decision Matrix

- **Static content / SEO pages**: Static SSR (no directive)
- **Internal apps, real-time data**: Interactive Server
- **Offline capability needed**: Interactive WASM
- **Best of both (startup + offline)**: Interactive Auto

## Per-Component vs Global
```csharp
// Per-component (preferred — granular control)
@rendermode InteractiveServer

// Global in App.razor (all pages interactive)
<Routes @rendermode="InteractiveServer" />
```

## Rules
- Static SSR components cannot use `@onclick` or other event handlers.
- Don't nest Interactive WASM inside Interactive Server — they use different runtimes.
- Use `[SupplyParameterFromQuery]` for URL state in SSR pages.
- Prerendering is ON by default. Disable with `@rendermode @(new InteractiveServerRenderMode(prerender: false))` when component has expensive `OnInitializedAsync`.
