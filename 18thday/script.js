const quizData = [
    { question: "What does HTML stand for?", options: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language"], answer: "Hyper Text Markup Language" },
    { question: "Which language is used for styling web pages?", options: ["HTML", "CSS", "Python"], answer: "CSS" },
    { question: "Inside which HTML element do we put JavaScript?", options: ["<script>", "<js>", "<javascript>"], answer: "<script>" },
    { question: "Which company developed JavaScript?", options: ["Netscape", "Google", "Microsoft"], answer: "Netscape" }
];

const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const nextBtn = document.getElementById("next-btn");
const result = document.getElementById("result");


let currentQuestion = 0;
let score = 0;

function showQuestion() {
    answersElement.innerHTML = "";
    const current = quizData[currentQuestion];
    questionElement.textContent = current.question;

    current.options.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option;
        button.classList.add("option");
        button.addEventListener("click", () => checkAnswer(option));
        answersElement.appendChild(button);
    });
}

function checkAnswer(selected) {
    const correctAnswer = quizData[currentQuestion].answer;
    if (selected === correctAnswer) {
        score++;
    }
    currentQuestion++;
    if (currentQuestion < quizData.length) {
        showQuestion();
    } else {
        showResult();
    }
}
function showResult() {
    questionElement.classList.add("hidden");
    answersElement.classList.add("hidden");
    nextBtn.classList.add("hidden");
    result.classList.remove("hidden");
    result.textContent = `🎉 You scored ${score} out of ${quizData.length}!`;
}

showQuestion();