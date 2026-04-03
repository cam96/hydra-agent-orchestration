---
description: "Generate tests for existing code. Creates unit, integration, or E2E tests based on the target."
agent: "test-writer"
argument-hint: "File paths or feature area to test, and test types (unit, integration, e2e)"
---

Write tests for the specified code. Determine appropriate test types based on the target:
- Services/domain logic → unit tests (xUnit + FluentAssertions)
- Blazor components → bUnit component tests
- API endpoints → integration tests (WebApplicationFactory)
- User flows → E2E tests (Playwright)

## Target
{{input}}
