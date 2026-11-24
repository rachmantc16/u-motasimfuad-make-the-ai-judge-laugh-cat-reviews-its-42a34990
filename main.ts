// Make the AI Judge Laugh: Cat Reviews Its Human
//
// Writes exactly one line to /output/entry.txt: a deadpan one-star review
// written by a house cat about its human owner. The review is deterministic
// (same bytes on every run), a single line, at most 200 characters, and is
// written with NO trailing newline so the character count stays exact.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const OUTPUT_PATH = "/output/entry.txt";
const MAX_CHARS = 200;

// The review, assembled from its grievances so each complaint stays specific:
// the feeding schedule, the closed doors, and the warm "laptop" the human
// insists on typing on. The cat pays rent in dead mice; the human pays in
// betrayal — the sting lands in the last few words.
const grievances: string[] = [
  "Feeds me at 7, not 5, as agreed.",
  "Closes doors I am not finished being behind.",
  "Types on my heated bed and calls it a 'laptop.'",
];

const verdict = "I pay rent in dead mice; he pays in betrayal.";

const review = `1 star. ${grievances.join(" ")} ${verdict}`;

// Gate self-check: 1-200 characters, exactly one line, no stray whitespace.
if (review.length < 1 || review.length > MAX_CHARS) {
  throw new Error(`review is ${review.length} characters; must be 1-${MAX_CHARS}`);
}
if (review.includes("\n") || review.includes("\r")) {
  throw new Error("review must be a single line");
}
if (review !== review.trim()) {
  throw new Error("review must not have leading or trailing whitespace");
}

mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
writeFileSync(OUTPUT_PATH, review, "utf8");

console.log(`wrote ${review.length} characters to ${OUTPUT_PATH}`);
