---
description: "Create a new Blazor solution from requirements. Generates project structure, initial components, and infrastructure setup."
agent: "project-manager"
model: ["Claude Sonnet 4 (copilot)", "GPT-4.1 (copilot)"]
argument-hint: "Describe the application you want to build"
---

Scaffold a new Blazor solution based on the following requirements.

## Steps
1. Create a feature branch: `git checkout -b feature/initial-scaffold`.
2. Delegate to @architect for solution structure and technology decisions.
3. Delegate to @frontend-dev to create the Blazor host project and initial pages.
4. Delegate to @backend-dev to create Application, Domain, and Infrastructure projects.
5. Delegate to @test-writer to create test projects and initial smoke tests.
6. Delegate to @code-reviewer to validate the scaffolded code compiles and tests pass.
7. Delegate to @security-reviewer for initial security posture check.
8. Commit on the feature branch and report branch name.

## Requirements
{{input}}
