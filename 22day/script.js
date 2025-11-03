// Step 1: Get references to HTML elements
const searchBtn = document.getElementById("searchBtn");
const movieInput = document.getElementById("movieInput");
const movieResult = document.getElementById("movieResult");

// Step 2: Add event listener to the button
searchBtn.addEventListener("click", () => {
    const movieName = movieInput.value.trim(); // remove extra spaces
    if (movieName === "") {
        alert("Please enter a movie name!");
        return;
    }
    getMovie(movieName); // function call
});

// Step 3: Function to fetch movie details from API
async function getMovie(name) {
    const API_KEY = "40bc6d08"; // get from omdbapi.com
    const url = `https://www.omdbapi.com/?t=${name}&apikey=${API_KEY}`;

    try {
        const response = await fetch(url); // wait until data comes
        const data = await response.json(); // convert to JS object

        if (data.Response === "True") {
            // Step 4: Show movie info
            movieResult.innerHTML = `
        <h2>${data.Title} (${data.Year})</h2>
        <img src="${data.Poster}" alt="Poster">
        <p><strong>Genre:</strong> ${data.Genre}</p>
        <p><strong>Actors:</strong> ${data.Actors}</p>
        <p><strong>Plot:</strong> ${data.Plot}</p>
      `;
        } else {
            movieResult.innerHTML = `<p>❌ Movie not found!</p>`;
        }
    } catch (error) {
        movieResult.innerHTML = `<p>⚠️ Error loading movie details!</p>`;
    }
}
