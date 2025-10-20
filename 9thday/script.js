const startBtn = document.getElementById("startBtn");
const targetInput = document.getElementById("targetDate");
const message = document.getElementById("message");

const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

let countdown;

startBtn.addEventListener("click", () => {
    clearInterval(countdown);
    const targetTime = new Date(targetInput.value).getTime();

    if (!targetInput.value) {
        alert("Please select a valid date and time!");
        return;
    }

    countdown = setInterval(() => {
        const now = new Date().getTime();
        const diff = targetTime - now;

        if (diff <= 0) {
            clearInterval(countdown);
            message.textContent = "🎉 Time’s Up!";
            daysEl.textContent = hoursEl.textContent = minutesEl.textContent = secondsEl.textContent = "00";
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        daysEl.textContent = days < 10 ? "0" + days : days;
        hoursEl.textContent = hours < 10 ? "0" + hours : hours;
        minutesEl.textContent = minutes < 10 ? "0" + minutes : minutes;
        secondsEl.textContent = seconds < 10 ? "0" + seconds : seconds;
    }, 1000);
});
