# Blazor Agent Orchestration Framework

- **Project**: Blazor software development via multi-agent orchestration
- **Target**: .NET 9+, Blazor (.razor, .cs), C# 13
- **Memory path**: `.github/memory/<agent-name>/context.md` — read at session start, write summary at end
- **Memory format**: YAML-structured, 50-line cap per file
- **Memory shared**: `.github/memory/shared/` for cross-agent project knowledge
- **Output rule**: All generated code must compile. No pseudocode, no placeholders.
- **Secrets**: Never hardcode secrets. Use `dotnet user-secrets` or Azure Key Vault.
- **Agents**: Invoke the minimum set of specialists needed for each task.
- **Skills**: Reference skills by `/name` when you need domain patterns.
- **Git workflow**: Create a feature branch per task. Commit on branch. User merges.
- **Approval checkpoints**: Off by default. Enable in `.github/settings/approval-checkpoint.json`.
- **Token dashboard**: Run `/token-dashboard` to view estimated token usage.
