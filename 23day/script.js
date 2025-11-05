const displayText = document.getElementById("displayText");
const inputText = document.getElementById("inputText");
const startBtn = document.getElementById("startBtn");
const finishBtn = document.getElementById("finishBtn");
const result = document.getElementById("result");

const sentences = [
    "The quick brown fox jumps over the lazy dog.",
    "Practice makes a man perfect.",
    "JavaScript is the language of the web.",
    "Discipline is the key to success."
];

let startTime, endTime;

startBtn.addEventListener("click", () => {
    let randomIndex = Math.floor(Math.random() * sentences.length);
    displayText.textContent = sentences[randomIndex];
    inputText.disabled = false;
    inputText.value = "";
    inputText.focus();
    result.textContent = "";
    startTime = new Date().getTime();
});

finishBtn.addEventListener("click", () => {
    if (!startTime) {
        alert("Please start the test first!");
        return;
    }

    endTime = new Date().getTime();
    let totalTime = (endTime - startTime) / 1000; // seconds
    let totalWords = inputText.value.trim().split(" ").length;

    let speed = Math.round((totalWords / totalTime) * 60); // words per minute

    let originalText = displayText.textContent.trim();
    let typedText = inputText.value.trim();
    let correctWords = 0;

    const originalWords = originalText.split(" ");
    const typedWords = typedText.split(" ");

    originalWords.forEach((word, index) => {
        if (word === typedWords[index]) {
            correctWords++;
        }
    });

    let accuracy = Math.round((correctWords / originalWords.length) * 100);

    result.innerHTML = `
    ⏱️ Time: ${totalTime.toFixed(1)} sec<br>
    ⚡ Speed: ${speed} WPM<br>
    🎯 Accuracy: ${accuracy}%
  `;
});
