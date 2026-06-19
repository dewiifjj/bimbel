import { auth} from "./js/firebase.js"
import { signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-auth.js";

const toggleBtn = document.querySelector('.toggle_btn')
const toggleBtnIcon = document.querySelector('.toggle_btn i')
const dropDownMenu = document.querySelector('.dropdown_menu')
const overlay = document.querySelector('.overlay');
const registerBtn = document.getElementById('register-btn')
const logoutItemDesktop = document.getElementById('logout-item-desktop') 
const logoutBtnDesktop = document.getElementById('logout-desktop')
const logoutItemMobile = document.getElementById('logout-item-mobile') 
const logoutBtnMobile = document.getElementById('logout-mobile')
const startBtn = document.getElementById('start-btn')
const tryoutCard = document.getElementById("tryout-card");
const banksoalCard = document.getElementById("bank-card");

onAuthStateChanged(auth, (user) => {

    if (!startBtn) return;

    if (user) {

        registerBtn.style.display = "none";
        logoutItemDesktop.style.display = "list-item";
        logoutItemMobile.style.display = "list-item";


        // sudah login
        startBtn.href = "#features";
        tryoutCard.href = "./pages//menu-tryout/index.html";
        banksoalCard.href = "./pages/banksoal/index.html";


    } else {

        logoutItemDesktop.style.display = "none";
        logoutItemMobile.style.display = "none";

        // Register hanya tampil di desktop
        if (window.innerWidth > 992) {
            registerBtn.style.display = "block";
        }

        // belum login
        startBtn.href = "./pages/auth/signup.html";
        tryoutCard.href = "./pages/auth/signup.html";
        banksoalCard.href = "./pages/auth/signup.html";
    }
});

logoutBtnDesktop.addEventListener("click", async (e) => {
    e.preventDefault();

    try {
        await signOut(auth);

        window.location.href = "./pages/auth/signup.html";

    } catch (error) {
        console.error(error);
    }
});

logoutBtnMobile.addEventListener("click", async (e) => {
    e.preventDefault();

    try {
        await signOut(auth);

        window.location.href = "./pages/auth/signup.html";

    } catch (error) {
        console.error(error);
    }
});

toggleBtn.onclick = function () {

    dropDownMenu.classList.toggle('open');
    overlay.classList.toggle('open');

    const isOpen = dropDownMenu.classList.contains('open');

    toggleBtnIcon.className = isOpen
    ? 'fa-solid fa-xmark'
    : 'fa-solid fa-bars';
}

overlay.onclick = function(){

    dropDownMenu.classList.remove('open');
    overlay.classList.remove('open');

    toggleBtnIcon.className = 'fa-solid fa-bars';
}

document.querySelectorAll('.dropdown_menu a').forEach(link => {
    link.addEventListener('click', () => {
        dropDownMenu.classList.remove('open');
        overlay.classList.remove('open');

        toggleBtnIcon.classList =  'fa-solid fa-bars';
    });
});

const reveals = document.querySelectorAll('.reveal');

function revealOnScroll(){

    reveals.forEach(item => {

        const windowHeight = window.innerHeight;
        const revealTop = item.getBoundingClientRect().top;

        if(revealTop < windowHeight - 100){
            item.classList.add('active');
        }

    });

}

window.addEventListener('scroll', () => {
        requestAnimationFrame(revealOnScroll);
    });
