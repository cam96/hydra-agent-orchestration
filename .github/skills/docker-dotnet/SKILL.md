---
name: docker-dotnet
description: "Docker multi-stage builds for .NET/Blazor. Use for: Dockerfile, .dockerignore, SDK vs runtime images, layer caching, non-root user, container configuration."
disable-model-invocation: true
---

# Docker Multi-Stage Build

## Blazor Server Dockerfile
```dockerfile
# Build stage
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src
COPY *.sln .
COPY src/App.Web/*.csproj src/App.Web/
COPY src/App.Application/*.csproj src/App.Application/
COPY src/App.Domain/*.csproj src/App.Domain/
COPY src/App.Infrastructure/*.csproj src/App.Infrastructure/
RUN dotnet restore
COPY . .
RUN dotnet publish src/App.Web -c Release -o /app/publish

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS runtime
WORKDIR /app
EXPOSE 8080
COPY --from=build /app/publish .
USER $APP_UID
ENTRYPOINT ["dotnet", "App.Web.dll"]
```

## .dockerignore
```
**/bin/
**/obj/
**/.git
**/node_modules
.github/
tests/
```

## Rules
- Always use multi-stage builds — SDK image for build, ASP.NET image for runtime.
- Copy `.csproj` files first for layer caching.
- Run as non-root user (`USER $APP_UID`).
- Don't copy `.git`, tests, or IDE files into the image.
- Use specific version tags, not `latest`.
