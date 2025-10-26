const textInput = document.getElementById("textInput");
const speakBtn = document.getElementById("speakBtn");
const stopBtn = document.getElementById("stopBtn");
const speedControl = document.getElementById("speed");

let utterance = null;

speakBtn.addEventListener("click", () => {
    const text = textInput.value.trim();
    if (text === "") {
        alert("Please enter some text!");
        return;
    }

    // Agar already bol raha hai, to usse stop karo
    window.speechSynthesis.cancel();

    // Text ko voice me badlo
    utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = speedControl.value;
    speechSynthesis.speak(utterance);
});

stopBtn.addEventListener("click", () => {
    window.speechSynthesis.cancel();
});
