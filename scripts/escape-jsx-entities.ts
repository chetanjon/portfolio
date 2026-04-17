#!/usr/bin/env bun
/**
 * One-shot script: reads ESLint's JSON output, finds every
 * `react/no-unescaped-entities` violation, and replaces the offending
 * character at its exact (line, column) with the HTML entity.
 *
 * Safe because we use ESLint's own coordinates — entities inside strings,
 * attribute values, and comments are never flagged, so we only touch JSX text.
 *
 * Usage: bun run scripts/escape-jsx-entities.ts
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';

type LintMessage = {
  ruleId: string | null;
  line: number;
  column: number;
  endColumn?: number;
  message: string;
};

type LintResult = {
  filePath: string;
  messages: LintMessage[];
};

const REPLACEMENTS: Record<string, string> = {
  "'": '&apos;',
  '"': '&quot;',
};

const result = spawnSync('bunx', ['eslint', '--format', 'json', '.'], {
  encoding: 'utf8',
  maxBuffer: 100 * 1024 * 1024,
});

if (!result.stdout) {
  console.error('ESLint produced no stdout.');
  console.error(result.stderr);
  process.exit(1);
}

const results: LintResult[] = JSON.parse(result.stdout);

let totalFixed = 0;
const filesTouched: string[] = [];

for (const { filePath, messages } of results) {
  const entityMessages = messages.filter(
    (m) => m.ruleId === 'react/no-unescaped-entities',
  );
  if (entityMessages.length === 0) continue;

  const source = readFileSync(filePath, 'utf8');
  const lines = source.split('\n');

  // Sort descending so later columns on the same line don't shift earlier ones.
  entityMessages.sort((a, b) => {
    if (b.line !== a.line) return b.line - a.line;
    return b.column - a.column;
  });

  let changedInFile = 0;
  for (const m of entityMessages) {
    const lineIdx = m.line - 1;
    const colIdx = m.column - 1;
    const line = lines[lineIdx];
    if (line === undefined) continue;
    const ch = line[colIdx];
    const replacement = REPLACEMENTS[ch];
    if (!replacement) {
      console.warn(
        `skip ${filePath}:${m.line}:${m.column} — char '${ch}' has no replacement`,
      );
      continue;
    }
    lines[lineIdx] = line.slice(0, colIdx) + replacement + line.slice(colIdx + 1);
    changedInFile++;
  }

  if (changedInFile > 0) {
    writeFileSync(filePath, lines.join('\n'), 'utf8');
    totalFixed += changedInFile;
    filesTouched.push(filePath);
  }
}

console.log(`Fixed ${totalFixed} unescaped entities across ${filesTouched.length} files.`);
for (const f of filesTouched) console.log(`  ${f}`);
