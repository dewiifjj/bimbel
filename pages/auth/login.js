import { auth } from "../../js/firebase.js";

import {
signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.14.0/firebase-auth.js";

const form = document.getElementById("form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const errorMessage = document.getElementById("error-message");

function validateForm(email, password) {

if (!email || !password) {
    return "Semua field wajib diisi.";
}
return null;
}

form.addEventListener("submit", async (e) => {
e.preventDefault();

errorMessage.innerText = "";

const email = emailInput.value.trim();
const password = passwordInput.value;

const validationError = validateForm(email, password);

if (validationError) {
    errorMessage.innerText = validationError;
    return;
}
try {
    await signInWithEmailAndPassword(
        auth,
        email,
        password
    );
    window.location.href = "../../index.html";
} catch (error) {
    switch (error.code) {
        case "auth/invalid-credential":
            errorMessage.innerText = "Email atau password salah.";
            break;
        case "auth/user-not-found":
            errorMessage.innerText = "Akun tidak ditemukan.";
            break;
        case "auth/wrong-password":
            errorMessage.innerText = "Password salah.";
            break;
        default:
            errorMessage.innerText = "Terjadi kesalahan. Silakan coba lagi.";
    }
    console.error(error);
}
});
