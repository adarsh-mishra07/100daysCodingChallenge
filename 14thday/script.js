const searchBtn = document.getElementById("searchBtn");
const resultBox = document.getElementById("result");
const wordInput = document.getElementById("wordInput");

searchBtn.addEventListener("click", getMeaning);
wordInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") getMeaning();
});

async function getMeaning() {
    const word = wordInput.value.trim();
    if (word === "") {
        alert("Please enter a word!");
        return;
    }

    resultBox.innerHTML = "Loading...";

    try {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        if (!response.ok) throw new Error("Word not found");

        const data = await response.json();
        const meaning = data[0].meanings[0].definitions[0].definition;
        const example = data[0].meanings[0].definitions[0].example || "No example available.";
        const partOfSpeech = data[0].meanings[0].partOfSpeech;
        const audioSrc = data[0].phonetics[0]?.audio;

        resultBox.innerHTML = `
      <h2>${word}</h2>
      <p><strong>Part of Speech:</strong> ${partOfSpeech}</p>
      <p class="meaning"><strong>Meaning:</strong> ${meaning}</p>
      <p class="example"><strong>Example:</strong> ${example}</p>
      ${audioSrc ? `<audio controls><source src="${audioSrc}" type="audio/mpeg"></audio>` : ""}
    `;
    } catch (error) {
        resultBox.innerHTML = `<p style="color:red;">${error.message}</p>`;
    }
}
