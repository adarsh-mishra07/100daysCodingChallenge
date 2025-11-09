// 🔹 Step 1: HTML Elements ko connect karna
const questionBox = document.getElementById("questionBox");
const optionsBox = document.getElementById("optionsBox");
const scoreText = document.getElementById("score");
const nextBtn = document.getElementById("nextBtn");

// 🔹 Step 2: Variables
let score = 0;
let correctAnswer = null;

// 🔹 Step 3: Random Math Question Banana
function generateQuestion() {
    const num1 = Math.floor(Math.random() * 10);
    const num2 = Math.floor(Math.random() * 10);
    const operators = ["+", "-", "*", "/"];
    const operator = operators[Math.floor(Math.random() * operators.length)];

    // Expression aur correct answer
    let question;
    switch (operator) {
        case "+": correctAnswer = num1 + num2; break;
        case "-": correctAnswer = num1 - num2; break;
        case "*": correctAnswer = num1 * num2; break;
        case "/": correctAnswer = (num2 !== 0) ? (num1 / num2).toFixed(1) : num1; break;
    }

    question = `${num1} ${operator} ${num2} = ?`;
    questionBox.textContent = question;

    generateOptions();
}

// 🔹 Step 4: Options Banana
function generateOptions() {
    optionsBox.innerHTML = ""; // old options hatao
    const options = new Set(); // duplicate avoid karne ke liye

    // correct + 3 random wrong options
    options.add(correctAnswer);
    while (options.size < 4) {
        options.add(Math.floor(Math.random() * 20));
    }

    // shuffle options
    Array.from(options).sort(() => Math.random() - 0.5).forEach((opt) => {
        const btn = document.createElement("button");
        btn.textContent = opt;
        btn.addEventListener("click", () => checkAnswer(opt));
        optionsBox.appendChild(btn);
    });
}

// 🔹 Step 5: Answer Check Karna
function checkAnswer(selected) {
    if (selected == correctAnswer) {
        score++;
        scoreText.textContent = `Score: ${score}`;
        alert("✅ Correct Answer!");
    } else {
        alert(`❌ Wrong! Correct Answer: ${correctAnswer}`);
    }
}

// 🔹 Step 6: Next Question Button
nextBtn.addEventListener("click", generateQuestion);

// 🔹 Step 7: Start Quiz
generateQuestion();
