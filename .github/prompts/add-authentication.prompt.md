---
description: "Add authentication to an existing Blazor project. Configures Identity, login/register pages, and authorization policies."
agent: "project-manager"
model: ["Claude Sonnet 4 (copilot)", "GPT-4.1 (copilot)"]
argument-hint: "Auth type: cookie, JWT, external provider (Google, Microsoft)"
---

Add authentication to the current Blazor project.

## Workflow
1. @architect: Design auth flow and choose approach.
2. @backend-dev: Implement Identity setup, auth services, and middleware.
3. @frontend-dev: Create Login, Register, and AccessDenied pages.
4. @security-reviewer: Audit the auth implementation.

## Requirements
{{input}}
