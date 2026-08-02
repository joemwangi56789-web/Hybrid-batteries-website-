import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBROKgzP1rL-wwJ96bl3aOE1VvegeR-ziQ",
  authDomain: "mombasa-hybrid-batteries.firebaseapp.com",
  projectId: "mombasa-hybrid-batteries",
  storageBucket: "mombasa-hybrid-batteries.firebasestorage.app",
  messagingSenderId: "152265604806",
  appId: "1:152265604806:web:56bb6d13f3ef3c35a6a1c7"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
