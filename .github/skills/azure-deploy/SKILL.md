---
name: azure-deploy
description: "Azure deployment patterns for .NET. Use for: App Service, Container Apps, Azure Developer CLI (azd), environment configuration, health checks, deployment slots, Managed Identity."
disable-model-invocation: true
---

# Azure Deployment

## Azure App Service
```bash
# Create and deploy
az webapp create --resource-group myRG --plan myPlan --name myApp --runtime "DOTNET|9.0"
az webapp deploy --resource-group myRG --name myApp --src-path ./publish.zip --type zip
```

## Azure Container Apps
```bash
az containerapp create \
  --name myapp \
  --resource-group myRG \
  --environment myEnv \
  --image myregistry.azurecr.io/myapp:latest \
  --target-port 8080 \
  --ingress external
```

## Azure Developer CLI (azd)
```bash
azd init          # Initialize project
azd provision     # Create Azure resources
azd deploy        # Deploy application
azd up            # provision + deploy
```

## Environment Configuration
```csharp
// Use environment-specific appsettings
builder.Configuration
    .AddJsonFile("appsettings.json")
    .AddJsonFile($"appsettings.{builder.Environment.EnvironmentName}.json", optional: true)
    .AddEnvironmentVariables();
```

## Rules
- Use Managed Identity for Azure service connections — no connection strings.
- Configure health checks: `app.MapHealthChecks("/health")`.
- Use deployment slots for zero-downtime deployments.
- Store environment config in Azure App Configuration or Key Vault.
