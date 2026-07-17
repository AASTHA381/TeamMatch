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

// Students sign in with a one-time link sent to any email they own (personal
// Gmail, Outlook, NMIMS, etc.). Signing in just proves they own that inbox;
// each profile is then locked to whoever claimed it first. Access control is
// enforced server-side by Firestore Security Rules (see firestore.rules).
//
// Set this to an email domain (e.g. "nmims.in") to restrict sign-in to that
// domain, or leave it empty ("") to allow any email address.
export const ALLOWED_EMAIL_DOMAIN = "";
