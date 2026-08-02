import { auth } from "./firebase-config.js";

import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

const loginBtn = document.getElementById("loginBtn");

if (loginBtn) {
    loginBtn.addEventListener("click", async () => {

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;
        const message = document.getElementById("message");

        try {
            await signInWithEmailAndPassword(auth, email, password);

            message.style.color = "green";
            message.textContent = "Login successful...";

            setTimeout(() => {
                window.location.href = "dashboard.html";
            }, 1000);

        } catch (error) {
            message.style.color = "red";
            message.textContent = error.message;
        }

    });
}

// Protect dashboard pages
if (window.location.pathname.includes("dashboard.html")) {

    onAuthStateChanged(auth, (user) => {

        if (!user) {
            window.location.href = "login.html";
        }

    });

}

// Logout button
const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {

    logoutBtn.addEventListener("click", async () => {

        await signOut(auth);

        window.location.href = "login.html";

    });

}

