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

// Only students signed in with a Google account in this email domain may
// claim/edit a profile or create/join groups. Enforced server-side by
// Firestore Security Rules (see firestore.rules) — not just client-side.
export const ALLOWED_EMAIL_DOMAIN = "nmims.in";
