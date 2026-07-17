// Firebase Web config — this is NOT a secret key. Access control is enforced
// entirely by Firestore Security Rules (see README / setup notes), not by
// hiding this value.
export const firebaseConfig = {
  apiKey: "AIzaSyA5OMocHZ4BM5iiMoapFE5PdZYLC_TJ-B0",
  authDomain: "study-team-matcher.firebaseapp.com",
  projectId: "study-team-matcher",
  storageBucket: "study-team-matcher.firebasestorage.app",
  messagingSenderId: "671053914943",
  appId: "1:671053914943:web:d9119b6be773803ae3298a",
  measurementId: "G-8FWB702LHF"
};

// Shared "write code" — a low-friction speed bump, NOT real security (it's
// visible in this public source file). It only deters casual bots/spam from
// writing to the open Firestore collection. Change this value + the matching
// value in your Firestore Security Rules together if you want a new code.
export const WRITE_CODE = "TRIM4-TEAMS-26";
