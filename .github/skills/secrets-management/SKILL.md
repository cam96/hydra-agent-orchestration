---
name: secrets-management
description: "Secrets management for .NET. Use for: dotnet user-secrets, Azure Key Vault, environment variables, connection strings, Managed Identity, secret rotation, appsettings placeholders."
---

# Secrets Management

## Development — User Secrets
```bash
dotnet user-secrets init --project src/App.Web
dotnet user-secrets set "ConnectionStrings:DefaultConnection" "Server=..."
dotnet user-secrets set "ExternalApi:ApiKey" "key-value-here"
```

Access in code:
```csharp
// Automatically loaded in Development
builder.Configuration["ExternalApi:ApiKey"]
```

## Production — Azure Key Vault
```csharp
builder.Configuration.AddAzureKeyVault(
    new Uri($"https://{vaultName}.vault.azure.net/"),
    new DefaultAzureCredential());
```

## Environment Variables (CI/CD)
```yaml
# GitHub Actions
env:
  ConnectionStrings__DefaultConnection: ${{ secrets.DB_CONNECTION }}
```

## Rules
- Never commit secrets to source control. Use `.gitignore` for `secrets.json`.
- Rotate secrets on a schedule. Use Key Vault expiration policies.
- Use Managed Identity in Azure — no connection strings in production.
- Audit secret access via Key Vault logging.
- In `appsettings.json`, use placeholder values: `"ApiKey": "SET_VIA_USER_SECRETS"`.
