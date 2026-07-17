// One-time script to seed the Firestore `students` collection from the
// privacy-minimized roster JSON (name, major, minor, subjects only — no SAP
// ID or emails). Uses the Firestore REST API directly (no service account
// key needed) because Firestore Security Rules already allow writes that
// include the correct writeCode.
//
// Usage:
//   node scripts/seed-roster.mjs
//
// Requires: Firestore must already be created in the Firebase project, and
// the security rules from README/setup notes must be published first.

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ID = "study-team-matcher";
const WRITE_CODE = "TRIM4-TEAMS-26"; // must match firebase-config.js and Firestore rules

const rosterPath = join(__dirname, "..", "roster-data", "trim4.json");
const people = JSON.parse(readFileSync(rosterPath, "utf-8"));

const slug = (name) =>
  name.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

function toFirestoreValue(value) {
  if (Array.isArray(value)) {
    return { arrayValue: { values: value.map(v => ({ stringValue: v })) } };
  }
  return { stringValue: value ?? "" };
}

async function seedPerson(person) {
  const id = slug(person.name);
  const url = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/students?documentId=${id}`;

  const fields = {
    name: toFirestoreValue(person.name),
    major: toFirestoreValue(person.major),
    minor: toFirestoreValue(person.minor),
    subjects: toFirestoreValue(person.subjects),
    skills: toFirestoreValue([]),
    custom: { booleanValue: false },
    writeCode: toFirestoreValue(WRITE_CODE),
  };

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fields }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Failed to seed ${person.name}: ${res.status} ${body}`);
  }
}

async function main() {
  console.log(`Seeding ${people.length} students into Firestore project "${PROJECT_ID}"...`);
  let ok = 0, fail = 0;
  for (const person of people) {
    try {
      await seedPerson(person);
      ok++;
    } catch (err) {
      fail++;
      console.error(err.message);
    }
  }
  console.log(`Done. Seeded: ${ok}, Failed: ${fail}`);
}

main();
