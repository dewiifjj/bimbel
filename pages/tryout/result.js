

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


const score = localStorage.getItem("finalScore");

document.getElementById("score").innerText = score;

function goToReview() {
    window.location.href = "review.html";
}

