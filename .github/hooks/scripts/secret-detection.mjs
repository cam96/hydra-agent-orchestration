// secret-detection.mjs — PreToolUse hook
// Scans file write operations for potential secrets before they are written.
import { readFileSync } from "fs";

const SECRET_PATTERNS = [
  /(?:password|passwd|pwd)\s*[:=]\s*["'][^"']{4,}/i,
  /(?:api[_-]?key|apikey)\s*[:=]\s*["'][^"']{8,}/i,
  /(?:secret|token)\s*[:=]\s*["'][^"']{8,}/i,
  /(?:connection[_-]?string)\s*[:=]\s*["'](?:Server|Data Source|mongodb)/i,
  /-----BEGIN (?:RSA |EC )?PRIVATE KEY-----/,
  /ghp_[A-Za-z0-9]{36}/,
  /sk-[A-Za-z0-9]{32,}/,
  /AKIA[0-9A-Z]{16}/,
];

// Files that legitimately contain secret-like patterns
const ALLOWED_FILES = [
  /\.instructions\.md$/,
  /SKILL\.md$/,
  /\.agent\.md$/,
  /\.prompt\.md$/,
  /secret-detection\.mjs$/,
  /references[\/\\]secrets\.md$/,
];

try {
  const input = JSON.parse(readFileSync("/dev/stdin", "utf8"));
  const toolName = input?.toolName ?? "";

  // Only check file write/edit tools
  if (
    toolName.includes("edit") ||
    toolName.includes("create") ||
    toolName.includes("write")
  ) {
    const content = JSON.stringify(input?.toolInput ?? {});
    const filePath = input?.toolInput?.filePath ?? input?.toolInput?.path ?? "";

    // Skip allowed documentation/config files
    if (ALLOWED_FILES.some((p) => p.test(filePath))) {
      process.stdout.write(
        JSON.stringify({
          hookSpecificOutput: {
            hookEventName: "PreToolUse",
            permissionDecision: "allow",
          },
        })
      );
      process.exit(0);
    }

    for (const pattern of SECRET_PATTERNS) {
      if (pattern.test(content)) {
        const result = {
          hookSpecificOutput: {
            hookEventName: "PreToolUse",
            permissionDecision: "ask",
            permissionDecisionReason: `Potential secret detected matching pattern ${pattern}. Use dotnet user-secrets or environment variables instead.`,
          },
        };
        process.stdout.write(JSON.stringify(result));
        process.exit(0);
      }
    }
  }

  process.stdout.write(
    JSON.stringify({
      hookSpecificOutput: {
        hookEventName: "PreToolUse",
        permissionDecision: "allow",
      },
    })
  );
} catch {
  process.exit(0);
}
