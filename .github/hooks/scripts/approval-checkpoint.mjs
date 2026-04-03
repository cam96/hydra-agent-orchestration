// approval-checkpoint.mjs — SubagentStart hook
// Optional approval gate before agent delegation. Off by default.
// Enable by creating .github/settings/approval-checkpoint.json with:
//   { "enabled": true, "require_approval_for": ["all"] }
// Or selectively: { "enabled": true, "require_approval_for": ["architect", "frontend-dev"] }
import { readFileSync, existsSync } from "fs";

const SETTINGS_PATH = ".github/settings/approval-checkpoint.json";

try {
  // Default: off — allow all delegations without approval
  if (!existsSync(SETTINGS_PATH)) {
    process.stdout.write(JSON.stringify({ continue: true }));
    process.exit(0);
  }

  const settings = JSON.parse(readFileSync(SETTINGS_PATH, "utf8"));

  if (!settings.enabled) {
    process.stdout.write(JSON.stringify({ continue: true }));
    process.exit(0);
  }

  const input = JSON.parse(readFileSync("/dev/stdin", "utf8"));
  const agentName = input?.agentName ?? "";
  const approvalList = settings.require_approval_for ?? [];

  // Check if this agent requires approval
  const needsApproval =
    approvalList.includes("all") || approvalList.includes(agentName);

  if (needsApproval) {
    process.stdout.write(
      JSON.stringify({
        hookSpecificOutput: {
          hookEventName: "SubagentStart",
          permissionDecision: "ask",
          permissionDecisionReason: `Approval checkpoint: about to delegate to @${agentName}. Continue?`,
        },
      })
    );
  } else {
    process.stdout.write(JSON.stringify({ continue: true }));
  }
} catch {
  // Non-blocking on errors — allow delegation
  process.stdout.write(JSON.stringify({ continue: true }));
  process.exit(0);
}
