const bars = document.querySelectorAll('.progress-bar');
const percentages = document.querySelectorAll('.percentage');
const toggleBtn = document.getElementById('theme-toggle');

// Animate skill bars and numbers
bars.forEach((bar, index) => {
    const width = parseInt(bar.getAttribute('data-width'));
    let counter = 0;

    // animate bar
    setTimeout(() => {
        bar.style.width = width + '%';
    }, 300);

    // animate number
    const interval = setInterval(() => {
        if (counter < width) {
            counter++;
            percentages[index].textContent = counter + '%';
        } else {
            clearInterval(interval);
        }
    }, 20);
});

// Theme toggle
toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    toggleBtn.textContent =
        document.body.classList.contains('dark-mode') ? '☀️ Light Mode' : '🌙 Dark Mode';
});
