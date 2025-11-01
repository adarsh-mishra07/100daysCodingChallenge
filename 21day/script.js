// 1️⃣ Select important elements from HTML
const jokeText = document.getElementById("joke");
const newJokeBtn = document.getElementById("newJokeBtn");
const speakBtn = document.getElementById("speakBtn");
const copyBtn = document.getElementById("copyBtn");

// 2️⃣ Create function to get jokes from API
async function getJoke() {
    const response = await fetch("https://v2.jokeapi.dev/joke/Any?type=single");
    const data = await response.json();
    jokeText.innerText = data.joke; // show joke in <p>
}

// 3️⃣ Add event listener to button
newJokeBtn.addEventListener("click", getJoke);

// 4️⃣ Speak the joke
speakBtn.addEventListener("click", () => {
    let utterance = new SpeechSynthesisUtterance(jokeText.innerText);
    utterance.rate = 1; // normal speaking speed
    utterance.pitch = 1; // normal tone
    speechSynthesis.speak(utterance);
});

// 5️⃣ Copy the joke text
copyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(jokeText.innerText);
    alert("Joke copied to clipboard! 📋");
});
