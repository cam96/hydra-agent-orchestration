---
description: "Implement a feature end-to-end: architecture → development → code review → security review."
agent: "project-manager"
model: ["Claude Sonnet 4 (copilot)", "GPT-4.1 (copilot)"]
argument-hint: "Describe the feature to implement"
---

Implement this feature using the full agent pipeline.

## Workflow
1. Create a feature branch: `git checkout -b feature/<short-name>`.
2. @architect: Design the feature (components, data model, API contracts).
3. @backend-dev: Implement services, entities, API endpoints.
4. @frontend-dev: Implement Blazor components and pages.
5. @test-writer: Write unit, integration, and/or E2E tests for the new code.
6. @code-reviewer: Review all generated code and run tests.
7. @security-reviewer: Audit for security vulnerabilities.
8. Commit on the feature branch and report branch name for user to review/merge.

## Feature
{{input}}
