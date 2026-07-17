# 🤝 TeamMatch – Project Team Finder

A **Progressive Web App (PWA)** that helps MBA classmates find and form project/study teams — matched by subject, complementary skills, availability, working style, academic background and goals, instead of just picking whoever's sitting nearby.

## Live App

```
https://aastha381.github.io/TeamMatch/
```

## Why

Group projects are usually formed ad-hoc, which often means:
- Mismatched skill sets (e.g. five "strategy" people, no one strong in numbers)
- No visibility into who's already grouped up vs. still available
- No easy way to find people with complementary strengths across trimesters

TeamMatch solves this by letting every student self-report their profile once, then ranking potential teammates by **fit** for a chosen subject — and letting teams actually form and be visible to everyone.

## Features

- **Claim your profile** — search your name from the pre-loaded batch roster (name, major, minor, subjects only — no SAP ID or email is stored)
- **Self-reported profile** — skills (with custom skill entry), academic background (Engineering / B.Com / B.Sc / etc.), experience level, availability, working style, team role, goal for the course, and preferred group size
- **Subject-based matching** — pick any subject across Trimester IV, V or VI; ranked list of classmates by complementary skills, shared availability, matching goals/working style, and academic diversity
- **Groups** — see groups already formed for a subject (with member list and capacity), join one yourself, start a new one, or add classmates directly to your group
- **Live sync** — real-time Firestore listeners mean profile updates and group changes from classmates show up instantly, no refresh needed
- **Email sign-in required** — you sign in with a one-time link sent to your `@nmims.in` inbox, so only you can claim/edit your profile and no one else can overwrite your data
- **Installable** — add to your phone's home screen for a native app feel

## Privacy & data handling

- Only **name, major, minor and enrolled subjects** are pre-seeded from the batch roster — no SAP IDs or email addresses are stored anywhere in the app or database
- All other fields (skills, availability, working style, goal, group size, team role) are entirely **self-reported** by each student
- The Firestore database is read-open (so matching/browsing works for everyone) but **writes require signing in via a one-time email link sent to your `@nmims.in` address**, and each profile can only be edited by the account that first claimed it — enforced server-side by `firestore.rules`, not just client-side
- Raw roster spreadsheets are never committed to this repository (`roster-data/` is gitignored) — only the minimized dataset is loaded into Firestore directly via the seed scripts

## Tech stack

- Plain HTML/CSS/JavaScript (no build step), served as a static PWA
- Firebase Authentication (passwordless email-link sign-in, domain-restricted to `@nmims.in`) + Firebase Firestore for the shared, real-time database
- Deployed via GitHub Pages

## Run locally

```bash
git clone https://github.com/AASTHA381/TeamMatch.git
cd TeamMatch
python3 -m http.server 4173
# Open http://localhost:4173
```

## Project structure

```
index.html            — the entire app (UI + logic)
firebase-config.js     — Firebase web config + shared write-code constant
firestore.rules        — Firestore security rules (read-open, write-gated)
manifest.json, sw.js    — PWA manifest + service worker
icons/                 — app icon
scripts/               — one-time roster seeding/update scripts (not run automatically)
```
