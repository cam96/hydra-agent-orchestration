---
name: github-actions
description: "GitHub Actions CI/CD for .NET/Blazor. Use for: build workflows, test pipelines, publish artifacts, security scanning, NuGet caching, vulnerability checks."
disable-model-invocation: true
---

# GitHub Actions for .NET/Blazor

## Build & Test Workflow
```yaml
name: CI
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-dotnet@v4
        with:
          dotnet-version: '9.0.x'
      - run: dotnet restore
      - run: dotnet build --no-restore --configuration Release
      - run: dotnet test --no-build --configuration Release --verbosity normal
```

## Publish Artifact
```yaml
      - run: dotnet publish src/App.Web -c Release -o ./publish
      - uses: actions/upload-artifact@v4
        with:
          name: app
          path: ./publish
```

## Security Scanning
```yaml
      - run: dotnet list package --vulnerable --include-transitive 2>&1 | tee vulnerability-report.txt
      - name: Fail on vulnerabilities
        run: |
          if grep -q "has the following vulnerable packages" vulnerability-report.txt; then
            exit 1
          fi
```

## Rules
- Pin action versions with full SHA for supply chain security.
- Cache NuGet packages: `actions/cache` with `~/.nuget/packages`.
- Use `GITHUB_TOKEN` for auth, never commit PATs.
- Run security scan on every PR.
