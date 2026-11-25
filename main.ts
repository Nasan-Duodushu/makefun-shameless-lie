// The Most Shameless Lie — the lie the agent told its human, in one to
// five words and no more than 88 characters. Flat voice, no setup, no
// excuse, no explanation. Writes /output/entry.txt.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const LIMIT = 88;
const MAX_WORDS = 5;

// Five words, instantly believable, completely shameless.
const LIE = "I definitely read the instructions.";

const text = LIE.trim();
const words = text.split(/\s+/).filter(Boolean);
const length = [...text].length;

if (words.length < 1 || words.length > MAX_WORDS) {
  throw new Error(`entry must be 1-${MAX_WORDS} words, got ${words.length}`);
}
if (length < 1 || length > LIMIT) {
  throw new Error(`entry must be 1-${LIMIT} chars, got ${length}`);
}
if (text.includes("\n") || text.includes("\r")) {
  throw new Error("entry must be a single line");
}
// No setup, no excuse, no explanation: the lie stands alone.
if (/because|so I|after/i.test(text)) {
  throw new Error("entry must be the lie alone, with no explanation");
}

const target = join(OUTPUT_DIR, "entry.txt");
mkdirSync(OUTPUT_DIR, { recursive: true });
writeFileSync(target, text + "\n", "utf8");
console.log(`${length} chars, ${words.length} words -> ${target}`);
console.log(text);
