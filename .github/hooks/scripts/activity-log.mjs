// activity-log.mjs — PostToolUse hook
// Logs agent activity with token estimates to JSONL for audit and dashboard.
import { readFileSync, appendFileSync, mkdirSync } from "fs";
import { dirname } from "path";

const LOG_PATH = ".github/memory/logs/activity.jsonl";

// Rough token estimate: ~4 chars per token for English text
function estimateTokens(text) {
  if (!text) return 0;
  const str = typeof text === "string" ? text : JSON.stringify(text);
  return Math.ceil(str.length / 4);
}

try {
  const input = JSON.parse(readFileSync("/dev/stdin", "utf8"));

  const inputStr = JSON.stringify(input?.toolInput ?? {});
  const outputStr = JSON.stringify(input?.toolOutput ?? "");
  const inputTokens = estimateTokens(inputStr);
  const outputTokens = estimateTokens(outputStr);

  const entry = {
    timestamp: new Date().toISOString(),
    tool: input?.toolName ?? "unknown",
    input_keys: Object.keys(input?.toolInput ?? {}),
    input_bytes: inputStr.length,
    output_bytes: outputStr.length,
    est_input_tokens: inputTokens,
    est_output_tokens: outputTokens,
    est_total_tokens: inputTokens + outputTokens,
  };

  mkdirSync(dirname(LOG_PATH), { recursive: true });
  appendFileSync(LOG_PATH, JSON.stringify(entry) + "\n");
} catch {
  // Non-blocking — logging failure should not stop the agent
  process.exit(0);
}
