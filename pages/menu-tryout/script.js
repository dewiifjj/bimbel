import {auth} from "../../js/firebase.js";
import {onAuthStateChanged} from "https://www.gstatic.com/firebasejs/12.14.0/firebase-auth.js";

onAuthStateChanged(auth, (user) => {
    if (!user) {
        window.location.href = "../auth/login.html";
    }
});

const packages = [
    {
        id:1,
        title: "TKA Tryout 1",
        question: 60,
        duration: 120,
        type: "free",
        link: "../tryout/index.html"
    },
    {
        id:2,
        title: "SNBT Tryout 2",
        question: 60,
        duration: 120,
        type: "premium"
    },
    {
        id:3,
        title: "TKA Matematika Wajib",
        question: 30,
        duration: 90,
        type: "free"
    }
];

const container = document.getElementById("package-list");

// navbar
const toggleBtn = document.querySelector('.toggle_btn')
const toggleBtnIcon = document.querySelector('.toggle_btn i')
const dropDownMenu = document.querySelector('.dropdown_menu')
const overlay = document.querySelector('.overlay');

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

        toggleBtnIcon.className =  'fa-solid fa-bars';
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


packages.forEach(pkg => {
    const card = document.createElement("div");
    card.className = "card";

    let badgeClass = pkg.type === "free" ? "free" : "premium";
    let badgeText = pkg.type === "free" ? "Gratis" : "Premium";

    card.innerHTML = `
    <div class="badge ${badgeClass}">${badgeText}</div>
    <div class="title">${pkg.title}</div>
    <div class="info">📚${pkg.question} soal • ${pkg.duration} menit </div>
    `;
    card.addEventListener("click", () => {
        startTest(pkg.id);
    });
    container.appendChild(card);
});

function startTest(id) {

    localStorage.removeItem("hasFinished");
    localStorage.removeItem("answers");
    localStorage.removeItem("currentQuestion");
    localStorage.removeItem("remainingTime");

    const selectedPackage = packages.find(pkg => pkg.id === id);
    
    if (!selectedPackage.link) {
        alert("Tryout ini belum tersedia.");
        return;
    }
    

    window.location.href = selectedPackage.link;
}
