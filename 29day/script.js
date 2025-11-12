const apiKey = "6fbe859b1aa346a78db17d4603e1c1ad"; // get it from newsapi.org
const newsContainer = document.getElementById("newsContainer");
const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("search");

async function getNews(query = "latest") {
    const url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();

    newsContainer.innerHTML = "";
    data.articles.slice(0, 10).forEach(article => {
        const div = document.createElement("div");
        div.classList.add("newsCard");

        div.innerHTML = `
      <img src="${article.urlToImage}" alt="news image">
      <h2>${article.title}</h2>
      <p>${article.description || "No description available"}</p>
      <a href="${article.url}" target="_blank">Read More</a>
    `;
        newsContainer.appendChild(div);
    });
}

searchBtn.addEventListener("click", () => {
    const query = searchInput.value || "latest";
    getNews(query);
});

// default load
getNews();
