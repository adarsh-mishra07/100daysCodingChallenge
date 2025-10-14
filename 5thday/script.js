const apiKey = "e453594e081063010714811a9e166732";
const btn = document.getElementById("getWeatherBtn");
const cityInput = document.getElementById("cityInput");
const result = document.getElementById("weatherResult");

function setLoading(isLoading) {
  btn.disabled = isLoading;
  btn.textContent = isLoading ? "Loading..." : "Get Weather";
}

function displayError(message) {
  result.innerHTML = `<p style="color:red;">${message}</p>`;
}

function isLikelyValidCity(input) {
  // Accept letters, spaces, hyphens, apostrophes, and commas (for state/country hints)
  return /^[A-Za-z\s\-\',.]{2,}$/.test(input);
}

async function handleGetWeather() {
  const rawCity = cityInput.value.trim();
  if (!rawCity) {
    alert("Please enter a city name!");
    return;
  }
  if (!isLikelyValidCity(rawCity)) {
    displayError("Please enter a valid city name.");
    return;
  }

  const city = encodeURIComponent(rawCity);
  result.innerHTML = "";
  setLoading(true);

  // Setup a timeout to avoid hanging requests
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`,
      { signal: controller.signal }
    );

    let payload = null;
    try {
      payload = await response.json();
    } catch (_) {
      // no-op: payload stays null if response body isn't JSON
    }

    if (!response.ok) {
      const serverMessage = payload && payload.message ? payload.message : "City not found or API key issue";
      throw new Error(serverMessage);
    }

    displayWeather(payload);
  } catch (error) {
    if (error.name === "AbortError") {
      displayError("Request timed out. Please try again.");
    } else {
      displayError(error.message || "Something went wrong. Please try again.");
    }
    console.error(error);
  } finally {
    clearTimeout(timeoutId);
    setLoading(false);
  }
}

btn.addEventListener("click", handleGetWeather);
cityInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    handleGetWeather();
  }
});

function displayWeather(data) {
  result.innerHTML = `
    <h2>${data.name}, ${data.sys.country}</h2>
    <p>Temperature: ${data.main.temp} °C</p>
    <p>Feels like: ${data.main.feels_like} °C</p>
    <p>Humidity: ${data.main.humidity}%</p>
    <p>Wind: ${Math.round(data.wind.speed)} m/s</p>
    <p>Weather: ${data.weather[0].description}</p>
    <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="${data.weather[0].description}" />
  `;
}
