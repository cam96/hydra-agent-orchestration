---
description: "View token usage dashboard. Shows estimated token consumption per tool, per session, and trends over time."
agent: "agent"
tools: [execute, read]
argument-hint: "Optional: 'today', 'last 7 days', 'all time', or a specific date (YYYY-MM-DD)"
---

Run the token dashboard script to analyze agent activity and token usage.

Execute: `node .github/hooks/scripts/token-dashboard.mjs {{input}}`

Display the full output as-is — it is pre-formatted.
