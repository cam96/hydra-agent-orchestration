---
name: forms-validation
description: "Blazor forms and validation patterns. Use for: EditForm, DataAnnotationsValidator, FluentValidation, input binding, SSR forms with FormName, server-side re-validation."
---

# Forms & Validation

## EditForm Pattern
```razor
<EditForm Model="@_model" OnValidSubmit="HandleSubmit" FormName="login">
    <DataAnnotationsValidator />
    <ValidationSummary />

    <InputText @bind-Value="_model.Email" />
    <ValidationMessage For="() => _model.Email" />

    <InputText @bind-Value="_model.Password" type="password" />
    <ValidationMessage For="() => _model.Password" />

    <button type="submit">Submit</button>
</EditForm>
```

## Model Validation
```csharp
public class LoginModel
{
    [Required, EmailAddress]
    public string Email { get; set; } = string.Empty;

    [Required, MinLength(8)]
    public string Password { get; set; } = string.Empty;
}
```

## FluentValidation Integration
```csharp
public class LoginModelValidator : AbstractValidator<LoginModel>
{
    public LoginModelValidator()
    {
        RuleFor(x => x.Email).NotEmpty().EmailAddress();
        RuleFor(x => x.Password).NotEmpty().MinimumLength(8);
    }
}
```

## Rules
- Always use `EditForm`, never raw `<form>`.
- Bind with `@bind-Value`, not `@onchange` for form fields.
- Use `OnValidSubmit` (not `OnSubmit`) to get automatic validation.
- For SSR forms, add `FormName` attribute and `[SupplyParameterFromForm]`.
- Server-side: re-validate on submit. Never trust client validation alone.
