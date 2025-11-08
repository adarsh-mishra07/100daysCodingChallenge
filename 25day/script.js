// Step 1: Check if the browser supports Speech Recognition API
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

// Step 2: Handle browser support issue
if (!SpeechRecognition) {
    alert("❌ Your browser does not support Speech Recognition. Please use Google Chrome!");
} else {
    // Step 3: Create a recognition object
    const recognition = new SpeechRecognition();
    const startBtn = document.getElementById("startBtn");
    const output = document.getElementById("output");

    // Step 4: Recognition settings
    recognition.continuous = false;  // listen once at a time
    recognition.lang = "en-US";      // English (United States)

    // Step 5: When speech is detected and converted to text
    recognition.onresult = (event) => {
        const command = event.results[0][0].transcript.toLowerCase();
        output.textContent = `🎤 You said: "${command}"`;

        // Step 6: Respond to specific voice commands
        if (command.includes("youtube")) {
            window.open("https://www.youtube.com", "_blank");
        } else if (command.includes("google")) {
            window.open("https://www.google.com", "_blank");
        } else if (command.includes("time")) {
            const time = new Date().toLocaleTimeString();
            output.textContent = `🕒 Current time is: ${time}`;
        } else if (command.includes("background red")) {
            document.body.style.background = "red";
            output.textContent += " — Background changed to red!";
        } else if (command.includes("background black")) {
            document.body.style.background = "#101820";
            output.textContent += " — Background reset to default!";
        } else {
            output.textContent += " (Command not recognized 😅)";
        }
    };

    // Step 7: Start listening when button is clicked
    startBtn.addEventListener("click", () => {
        recognition.start();
        output.textContent = "🎧 Listening... please speak!";
    });
}
