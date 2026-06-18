
let currentQuestion = parseInt(localStorage.getItem("currentQuestion")) || 0;
let answers = JSON.parse(localStorage.getItem("answers")) || {};
let savedTime = localStorage.getItem("remainingTime");
let time = savedTime !== null ? parseInt(savedTime) : 3600;

console.log("savedTime =", savedTime);
console.log("time =", time);

const qText = document.getElementById("question-text");
const qImage = document.getElementById("question-image");
const qSubtext = document.getElementById("question-subtext");
const optionsDiv = document.getElementById("options");
const nav = document.getElementById("nav");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const finishBtn = document.getElementById("finish-btn");
const questionCounter = document.getElementById("question-counter");
const progressFill = document.getElementById("progress-fill");
const progressCount = document.getElementById("progress-count");
const skipBtn = document.getElementById("skipBtn");

// fungsi render soal
function renderQuestion() {
    updateQuestionMeta();
    const q = questions[currentQuestion];

    if(q.type === "truefalse"){
        renderTrueFalse(q);
        return;
    }

    if(q.type === "multipleanswer") {
        renderMultipleAnswer(q);
        return;
    }

    // soal
    qText.innerHTML=`${currentQuestion +1}. ${q.text}`;
    function updateQuestionMeta() {
        const typeMap = {
            "truefalse": "Benar / Salah",
            "multipleanswer": "Pilihan Ganda Kompleks",
        };
        const q = questions[currentQuestion];
        const badge = document.querySelector(".question-badge");
        if (badge) {
            badge.textContent = typeMap[q.type] || "Pilihan Ganda";
        }
        if (questionCounter) {
            questionCounter.textContent = `Soal ${currentQuestion + 1} dari ${questions.length}`;
        }
}
    // gambar soal
    if(q.image) {
        qImage.src = q.image;
        qImage.style.display = "block";
    } else {
        qImage.style.display = "none";
    }

    // soal dari gambar
    if (q.question) {
        qSubtext.innerText = q.question;
    } else {
        qSubtext.innerText = "";
    }

    // pilihan ganda
    optionsDiv.innerHTML="";

    q.options.forEach((opt, index) => {
        const div = document.createElement("div");
        div.classList.add("option");
        const optionLabels = ["A", "B", "C", "D", "E"]
        div.innerText = `${optionLabels[index]}. ${opt}`;

    // kalau sudah pernah dijawab
    if(answers[q.id] === index) {
        div.classList.add("selected");
    }

    div.onclick = () => {
        answers[q.id]=index;
        localStorage.setItem("answers", JSON.stringify(answers));
        renderQuestion();
        updateNav();
    };

    optionsDiv.appendChild(div);
});

updateNav()
updateNavigationButtons();

if(window.MathJax) {
    MathJax.typesetPromise();
}
}

// soal true/false
function renderTrueFalse(q){
    qText.innerHTML = `${currentQuestion + 1}. ${q.text}`;

    // untuk gambar 
    if(q.image) {
        qImage.src = q.image;
        qImage.style.display = "block";
    } else {
        qImage.style.display = "none";
    }

    // untuk subtext
    if(q.subtext) {
        qSubtext.innerText = q.question;
    } else {
        qSubtext.innerText = "";
    }
    
    optionsDiv.innerHTML="";

    q.statements.forEach((statement, index) => {
        const wrapper = document.createElement("div");
        wrapper.classList.add("tf-item");

        const statementText = document.createElement("p");
        statementText.innerText = `${index +1 }. ${statement}`;

        const buttonContainer = document.createElement("div");
        buttonContainer.classList.add("tf-buttons");

        const trueBtn = document.createElement("button");
        trueBtn.innerText = "Benar";

        const falseBtn = document.createElement("button");
        falseBtn.innerText = "Salah";

        // kalau sudah dipilih
        if(answers[q.id] && answers[q.id][index] == true) {
            trueBtn.classList.add("selected");
        }

        if(answers[q.id] && answers[q.id][index] === false) {
            falseBtn.classList.add("selected");
        }

        trueBtn.onclick = () => {
            if(!answers[q.id]) {
                answers[q.id] = [];
            }
            answers[q.id][index] = true;
            localStorage.setItem("answers", JSON.stringify(answers));
            renderQuestion();
            updateNav();
        };

        falseBtn.onclick = () => {
            if(!answers[q.id]) {
                answers[q.id] = [];
            }
            answers[q.id][index] = false;
            localStorage.setItem("answers", JSON.stringify(answers));
            renderQuestion();
            updateNav();
        };

        buttonContainer.appendChild(trueBtn);
        buttonContainer.appendChild(falseBtn);

        wrapper.appendChild(statementText);
        wrapper.appendChild(buttonContainer);

        optionsDiv.appendChild(wrapper);

    });

    updateNav();
    updateNavigationButtons();

    if(window.MathJax) {
        MathJax.typesetPromise();
    }
}

// fungsi multiple answer soal
function renderMultipleAnswer(q) {
    qText.innerHTML = `${currentQuestion + 1}. ${q.text}`;
    // untuk image
    if(q.image) {
        qImage.src = q.image;
        qImage.style.display = "block";
    } else {
        qImage.style.display = "none";
    }
     // untuk subtext
    if(q.question) {
        qSubtext.innerText = q.question;
    } else {
        qSubtext.innerText = "";
    }

    optionsDiv.innerHTML = "";

    const optionLabels = ["(1)", "(2)", "(3)", "(4)", "(5)"]

    q.statements.forEach((statement, index) => {
        const div = document.createElement("div");
        div.classList.add("option");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.onclick = (e) => {
                e.stopPropagation();
            }
        // kalau belum ada array jawaban
        if(!answers[q.id]){
            answers[q.id] = [];
        }
        // tampil selected kalau sudah dipilih
        if(answers[q.id].includes(index)){
            div.classList.add("selected");
            checkbox.checked = true;
                    }

        const label = document.createElement("label");
        label.innerText= ` ${optionLabels[index]} ${statement}`;
        checkbox.onchange = () => {
            if(checkbox.checked){
                if(!answers[q.id].includes(index)){
                    answers[q.id].push(index);
                }
            } else {
                answers[q.id] = answers[q.id].filter(
                    item => item !== index
                );
            }
            localStorage.setItem("answers", JSON.stringify(answers));
            updateNav();
        };

        optionsDiv.appendChild(div);
        div.appendChild(checkbox);
        div.appendChild(label)
    });

    updateNav();
    updateNavigationButtons();

    if(window.MathJax){
        MathJax.typesetPromise();
    }
    
}

// fungsi navigasi nomor soal
function updateNav() {
    const buttons =nav.querySelectorAll("button");

    buttons.forEach((btn, i) => {
        btn.classList.remove("active", "answered");

        if(i === currentQuestion){
            btn.classList.add("active");
        }

        const answer = answers[questions[i].id];

        if(
            answer !== undefined &&
            (
                !Array.isArray(answer)
                || answer.length > 0
            )
        ){
            btn.classList.add("answered");
        }
    });
    updateProgress();
}

function updateProgress() {
    const answered = Object.keys(answers).filter(id => {
        const a = answers[id];
        return a !== undefined && (!Array.isArray(a) || a.length > 0);
    }).length;
    const total = questions.length;
 
    progressFill.style.width = (answered / total * 100) + "%";
    progressCount.textContent = `${answered} / ${total}`;
}

// fungsi waktu
function startTimer(){
    const timeEl = document.getElementById("time");

    const timer = setInterval(() => {
        let hours = Math.floor(time/3600);
        let minutes = Math.floor((time % 3600) / 60);
        let seconds = time % 60;

        timeEl.innerText =
            `${String(hours).padStart(2,'0')}:` +
            `${String(minutes).padStart(2,'0')}:` +
            `${String(seconds).padStart(2, '0')}`;
        
        time--;

        localStorage.setItem("remainingTime", time);
        if(time <= 0) {
            clearInterval(timer);
            submitExam();
        }

        
        
    }, 1000);
}

// fungsi submit
function submitExam() {

    const confirmFinish = confirm("Yakin ingin menyelesaikan ujian?");
    if(confirmFinish) {
        localStorage.setItem("answers", JSON.stringify(answers));
        localStorage.setItem("hasFinished", "true");
        localStorage.removeItem("remainingTime");
        window.location.href = "result.html";
    }
}

// navigasi halaman

function updateNavigationButtons(){

    prevBtn.disabled = currentQuestion === 0;

    if(currentQuestion === questions.length - 1) {
        nextBtn.style.display = "none";
        finishBtn.style.display = "inline-block";
    } else {
        nextBtn.style.display = "inline-block";
        finishBtn.style.display = "none";
    }
}


// button navigasi
prevBtn.addEventListener("click", () => {
    if(currentQuestion > 0) {
        currentQuestion--;

        localStorage.setItem("currentQuestion", currentQuestion);
        renderQuestion();
    }
});

nextBtn.addEventListener("click", () =>{
    if(currentQuestion < questions.length - 1) {
        currentQuestion++;
        localStorage.setItem("currentQuestion", currentQuestion);
        renderQuestion();
    }
});

if (skipBtn) {
    skipBtn.addEventListener("click", () => {
        if (currentQuestion < questions.length - 1) {
            currentQuestion++;
            localStorage.setItem("currentQuestion", currentQuestion);
            renderQuestion();
        }
    });
}


if (finishBtn) {
    finishBtn.addEventListener("click", submitExam);
}



// buat nmr soal
questions.forEach((q,index)=> {
    const  btn = document.createElement("button");
    btn.innerText = index + 1;

    btn.onclick = () => {
        currentQuestion = index;
        
        localStorage.setItem("currentQuestion", currentQuestion);
        renderQuestion();
    };


    nav.appendChild(btn);
});

// mekanisme scoring 
function calculateScore() {
    let score =0;
    questions.forEach(q => {
        const userAnswer = answers[q.id];
        // pilihan ganda biasa
        if(!q.type){
            if(userAnswer === q.correct) {
                score++;
            }
        }

        // true false
        else if(q.type === "truefalse"){
            let poinPerStatement = 1 / q.correct.length;
            q.correct.forEach((ans, index) => {
                if(userAnswer && userAnswer[index]=== ans) {
                    score += poinPerStatement;
                }
            });
        }

        // multiple answer
        else if(q.type === "multipleanswer"){
            if(!userAnswer) return;

            let pointPerStatement = 1/ q.statements.length;
            q.statements.forEach((statement, index) => {
                const shouldBeChecked = q.correct.includes(index);
                const userChecked = userAnswer.includes(index);
                if(shouldBeChecked === userChecked){
                    score += pointPerStatement;
                }
            });
        }
    });
    const finalScore = (score / questions.length) * 100;
    return finalScore;
}


renderQuestion();
updateNav();
startTimer();

console.log(calculateScore());

localStorage.setItem("finalScore", finalScore.toFixed(0));
// reset sementara

function clearExamData() {
    localStorage.removeItem("hasFinished");
    localStorage.removeItem("answers");
    localStorage.removeItem("currentQuestion");
    localStorage.removeItem("remainingTime");
}

function resetExam() {
    clearExamData();
    location.reload();
}

// anticopy
// document.addEventListener("contextmenu", e => {
//     e.preventDefault();
// });

document.addEventListener("keydown", e => {
    if (
        (e.ctrlKey && ["c", "u", "a"].includes(e.key.toLowerCase())) ||
        e.key === "F12"
    ) {
        e.preventDefault();
    }
});