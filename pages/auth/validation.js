import { auth, db } from "../../js/firebase.js"
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-auth.js";


import { 
    doc, 
    setDoc,
    serverTimestamp 
} from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";

const form = document.getElementById("form");
const usernameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const repeatPasswordInput = document.getElementById("repeat-password");
const errorMessage = document.getElementById("error-message");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    errorMessage.innerText = "";

    const username = usernameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const repeatPassword = repeatPasswordInput.value;

console.log("Password:", password);
console.log("Repeat Password:", repeatPassword);
console.log(password === repeatPassword);

    // Validasi
    if (!username || !email || !password || !repeatPassword) {
        errorMessage.innerText = "Semua field wajib diisi.";
        return;
    }

    if (password.length < 8) {
        errorMessage.innerText = "Password minimal 8 karakter.";
        return;
    }

    if (password !== repeatPassword) {
        errorMessage.innerText = "Password tidak sama.";
        return;
    }

    try {

        console.log("Mau membuat akun...");
        // Buat akun
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );

        // Simpan ke Firestore
        await setDoc(doc(db, "users", userCredential.user.uid), {
            username: username,
            email: email,
            created_at: serverTimestamp()
        });

        // Redirect
        window.location.href = "../../index.html";

    } catch (error) {
        errorMessage.innerText = error.message;
        console.error(error);
    }
});
