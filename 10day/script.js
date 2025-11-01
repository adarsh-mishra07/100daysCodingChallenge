const jokeBtn = document.getElementById("jokeBtn");
const jokeDiv = document.getElementById("joke");

async function getJoke() {
    joke.innerText = "Loading joke..";
    try {
        const response = await fetch("https://official-joke-api.appspot.com/random_joke");
        const data = await response.json();
        jokeDiv.innerHTML = `${data.setup}🤡 ${data.punchline}`;

    } catch (error) {
        jokeDiv.innerHTML = "Oops! Couldn't load a joke";
    }
}
jokeBtn.addEventListener("click", getJoke);