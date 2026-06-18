

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

const container = document.getElementById("review-list");

questions.forEach(q => {

    const card = document.createElement("div");
    card.className = "review-card";

    let answerHTML = "";

    // Pilihan ganda biasa
    if (!q.type) {

        answerHTML = `
            <div class="correct-answer">
                <strong>Jawaban Benar:</strong>
                ${String.fromCharCode(65 + q.correct)}.
                ${q.options[q.correct]}
            </div>
        `;
    }

    // True False
    else if(q.type === "truefalse"){

        answerHTML = `
            <div class="correct-answer">
                <strong>Jawaban Benar:</strong>
                ${q.correct.map(v => v ? "Benar" : "Salah").join(", ")}
            </div>
        `;
    }

    // Multiple Answer
    else if(q.type === "multipleanswer"){

        const answers = q.correct
            .map(index => String.fromCharCode(65 + index))
            .join(", ");

        answerHTML = `
            <div class="correct-answer">
                <strong>Jawaban Benar:</strong>
                ${answers}
            </div>
        `;
    }

    card.innerHTML = `
        <h2>Soal ${q.id}</h2>

        <p>${q.question || q.text}</p>

        ${answerHTML}

        <div class="explanation">
            <strong>Pembahasan:</strong>
            <p>${q.explanation}</p>
        </div>
    `;

    container.appendChild(card);
}); 