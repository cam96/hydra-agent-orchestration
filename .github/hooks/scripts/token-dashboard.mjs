// token-dashboard.mjs — Token usage dashboard
// Reads activity.jsonl and produces a summary report.
import { readFileSync, existsSync } from "fs";

const LOG_PATH = ".github/memory/logs/activity.jsonl";
const filter = process.argv[2] ?? "all";

if (!existsSync(LOG_PATH)) {
  console.log("No activity log found. Run some agent tasks first.");
  console.log(`Expected log at: ${LOG_PATH}`);
  process.exit(0);
}

const lines = readFileSync(LOG_PATH, "utf8")
  .trim()
  .split("\n")
  .filter(Boolean)
  .map((l) => {
    try {
      return JSON.parse(l);
    } catch {
      return null;
    }
  })
  .filter(Boolean);

// Apply date filter
const now = new Date();
const filtered = lines.filter((e) => {
  if (filter === "all" || !filter) return true;
  const ts = new Date(e.timestamp);
  if (filter === "today") {
    return ts.toDateString() === now.toDateString();
  }
  if (filter.startsWith("last")) {
    const days = parseInt(filter.replace(/\D/g, "")) || 7;
    const cutoff = new Date(now - days * 86400000);
    return ts >= cutoff;
  }
  // Specific date: YYYY-MM-DD
  if (/^\d{4}-\d{2}-\d{2}$/.test(filter)) {
    return e.timestamp.startsWith(filter);
  }
  return true;
});

if (filtered.length === 0) {
  console.log(`No activity found for filter: ${filter}`);
  process.exit(0);
}

// Aggregate by tool
const byTool = {};
let totalInput = 0;
let totalOutput = 0;
let totalCalls = 0;

for (const e of filtered) {
  const tool = e.tool ?? "unknown";
  if (!byTool[tool]) {
    byTool[tool] = { calls: 0, input_tokens: 0, output_tokens: 0, input_bytes: 0, output_bytes: 0 };
  }
  byTool[tool].calls++;
  byTool[tool].input_tokens += e.est_input_tokens ?? 0;
  byTool[tool].output_tokens += e.est_output_tokens ?? 0;
  byTool[tool].input_bytes += e.input_bytes ?? 0;
  byTool[tool].output_bytes += e.output_bytes ?? 0;
  totalInput += e.est_input_tokens ?? 0;
  totalOutput += e.est_output_tokens ?? 0;
  totalCalls++;
}

// Aggregate by date
const byDate = {};
for (const e of filtered) {
  const date = e.timestamp.split("T")[0];
  if (!byDate[date]) {
    byDate[date] = { calls: 0, tokens: 0 };
  }
  byDate[date].calls++;
  byDate[date].tokens += (e.est_input_tokens ?? 0) + (e.est_output_tokens ?? 0);
}

// Render
console.log("# Token Usage Dashboard");
console.log(`Filter: ${filter} | Period: ${filtered[0]?.timestamp?.split("T")[0] ?? "?"} to ${filtered[filtered.length - 1]?.timestamp?.split("T")[0] ?? "?"}`);
console.log();

console.log("## Summary");
console.log(`| Metric | Value |`);
console.log(`|--------|-------|`);
console.log(`| Total tool calls | ${totalCalls.toLocaleString()} |`);
console.log(`| Est. input tokens | ${totalInput.toLocaleString()} |`);
console.log(`| Est. output tokens | ${totalOutput.toLocaleString()} |`);
console.log(`| Est. total tokens | ${(totalInput + totalOutput).toLocaleString()} |`);
console.log();

console.log("## By Tool");
console.log(`| Tool | Calls | Est. Input Tokens | Est. Output Tokens | Est. Total |`);
console.log(`|------|-------|-------------------|--------------------|-----------:|`);
const toolsSorted = Object.entries(byTool).sort((a, b) => (b[1].input_tokens + b[1].output_tokens) - (a[1].input_tokens + a[1].output_tokens));
for (const [tool, data] of toolsSorted) {
  const total = data.input_tokens + data.output_tokens;
  console.log(`| ${tool} | ${data.calls} | ${data.input_tokens.toLocaleString()} | ${data.output_tokens.toLocaleString()} | ${total.toLocaleString()} |`);
}
console.log();

console.log("## Daily Trend");
console.log(`| Date | Calls | Est. Tokens |`);
console.log(`|------|-------|------------|`);
for (const [date, data] of Object.entries(byDate).sort()) {
  console.log(`| ${date} | ${data.calls} | ${data.tokens.toLocaleString()} |`);
}
