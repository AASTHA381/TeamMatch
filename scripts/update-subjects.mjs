// One-time script to MERGE in additional trimester subjects (V & VI) for
// already-seeded students, WITHOUT touching self-reported fields (skills,
// availability, workingStyle, goal, groupSize). Only updates `subjects` +
// `subjectsByTrimester`.
//
// NOTE: This script already ran successfully once. It no longer works as-is
// now that Firestore rules require a real authenticated @nmims.in Google
// sign-in for writes (see firestore.rules) — this unauthenticated REST call
// can't satisfy that. Kept for historical reference only.
//
// Usage: node scripts/update-subjects.mjs

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ID = "study-team-matcher";
const WRITE_CODE = "TRIM4-TEAMS-26";

const rosterPath = join(__dirname, "..", "roster-data", "full-roster.json");
const people = JSON.parse(readFileSync(rosterPath, "utf-8"));

const slug = (name) =>
  name.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

function arrayValue(values) {
  return { arrayValue: { values: values.map(v => ({ stringValue: v })) } };
}
function mapValue(obj) {
  const fields = {};
  for (const [k, v] of Object.entries(obj)) fields[k] = arrayValue(v);
  return { mapValue: { fields } };
}

async function updatePerson(person) {
  const id = slug(person.name);
  const params = new URLSearchParams();
  params.append("updateMask.fieldPaths", "subjects");
  params.append("updateMask.fieldPaths", "subjectsByTrimester");
  params.append("updateMask.fieldPaths", "writeCode");
  const url = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/students/${id}?${params.toString()}`;

  const fields = {
    subjects: arrayValue(person.subjects),
    subjectsByTrimester: mapValue(person.subjectsByTrimester),
    writeCode: { stringValue: WRITE_CODE },
  };

  const res = await fetch(url, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fields }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Failed to update ${person.name}: ${res.status} ${body}`);
  }
}

async function main() {
  console.log(`Updating subjects for ${people.length} students...`);
  let ok = 0, fail = 0;
  for (const person of people) {
    try {
      await updatePerson(person);
      ok++;
    } catch (err) {
      fail++;
      console.error(err.message);
    }
  }
  console.log(`Done. Updated: ${ok}, Failed: ${fail}`);
}

main();
