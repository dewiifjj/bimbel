
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";
const firebaseConfig = {
    apiKey: "AIzaSyAhQxMZZji4k_vKyBKMq1ctDkaWEhbosbE",
    authDomain: "register-form-f830f.firebaseapp.com",
    projectId: "register-form-f830f",
    storageBucket: "register-form-f830f.firebasestorage.app",
    messagingSenderId: "1079428065121",
    appId: "1:1079428065121:web:883d28314f4f28eeb2c720",
    measurementId: "G-QJFK1G7V67"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
