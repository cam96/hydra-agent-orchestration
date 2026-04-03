// validate-commands.mjs — PreToolUse hook
// Blocks dangerous terminal commands before execution.
import { readFileSync } from "fs";

const BLOCKED_PATTERNS = [
  /rm\s+(-rf|-fr)\s+[\/\\]/i,
  /git\s+push\s+.*--force/i,
  /git\s+reset\s+--hard/i,
  /DROP\s+(TABLE|DATABASE)/i,
  /TRUNCATE\s+TABLE/i,
  /format\s+[a-z]:/i,
  /del\s+\/[sfq]/i,
  /Remove-Item\s+.*-Recurse\s+.*-Force/i,
  /Invoke-WebRequest.*\|\s*(iex|Invoke-Expression)/i,
  /curl.*\|\s*(bash|sh|powershell)/i,
];

try {
  const input = JSON.parse(readFileSync("/dev/stdin", "utf8"));
  const toolName = input?.toolName ?? "";
  const params = JSON.stringify(input?.toolInput ?? {});

  // Only check terminal/execute tools
  if (
    toolName.includes("terminal") ||
    toolName.includes("execute") ||
    toolName.includes("run")
  ) {
    for (const pattern of BLOCKED_PATTERNS) {
      if (pattern.test(params)) {
        const result = {
          hookSpecificOutput: {
            hookEventName: "PreToolUse",
            permissionDecision: "deny",
            permissionDecisionReason: `Blocked: command matches dangerous pattern ${pattern}`,
          },
        };
        process.stdout.write(JSON.stringify(result));
        process.exit(0);
      }
    }
  }

  // Allow all other tool calls
  const result = {
    hookSpecificOutput: {
      hookEventName: "PreToolUse",
      permissionDecision: "allow",
    },
  };
  process.stdout.write(JSON.stringify(result));
} catch {
  // Non-blocking on parse errors
  process.exit(0);
}
