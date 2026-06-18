const logout = document.getElementById('logout');
import {auth, db} from "../../js/firebase.js";
import { signOut, 
    onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-auth.js";
import { 
    getDoc, 
    doc, 
} from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";

const username = document.getElementById("username");

onAuthStateChanged(auth, async (currentUser)=>{
    try {
        if (!currentUser) {
            return window.location.replace("signup.html");
        }
        const userRef = doc(db, "users", currentUser.uid);
        const user = await getDoc(userRef);
        if (user.exists()) {
            username.innerText = user.data().username;
        }
    } catch (error) {
        console.log(error);   
    }
})

logout.addEventListener("click", async () => {
    await signOut(auth);
});