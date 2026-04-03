---
name: auth-identity
description: "ASP.NET Identity and authorization patterns. Use for: Identity setup, policy-based authorization, AuthorizeView, Authorize attribute, claims, roles, cookie auth, IAuthorizationService."
---

# Authentication & Authorization

## ASP.NET Identity Setup
```csharp
builder.Services.AddAuthentication(IdentityConstants.ApplicationScheme)
    .AddIdentityCookies();
builder.Services.AddAuthorizationBuilder()
    .AddPolicy("Admin", p => p.RequireRole("Admin"))
    .AddPolicy("CanEdit", p => p.RequireClaim("Permission", "Edit"));
builder.Services.AddIdentityCore<ApplicationUser>()
    .AddEntityFrameworkStores<AppDbContext>()
    .AddSignInManager()
    .AddDefaultTokenProviders();
```

## Policy-Based Authorization (Preferred)
```csharp
// Define policies, not role checks
[Authorize(Policy = "CanEdit")]
public class EditPage : ComponentBase { }

// API endpoint
group.MapPut("/{id}", Update).RequireAuthorization("CanEdit");
```

## Component Authorization
```razor
<AuthorizeView Policy="Admin">
    <Authorized>
        <AdminPanel />
    </Authorized>
    <NotAuthorized>
        <p>Access denied.</p>
    </NotAuthorized>
</AuthorizeView>
```

## Rules
- Use policy-based auth over `[Authorize(Roles = "...")]`.
- Never check roles in component logic — use `AuthorizeView` or `[Authorize]`.
- Use `IAuthorizationService` for imperative checks in services.
- Session timeout: configure cookie expiration, not just sliding.
- Multi-factor: enable via Identity TOTP or external providers.
