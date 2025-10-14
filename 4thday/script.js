// ✅ 1. Create and style header
const header = document.createElement("header");

const title = document.createElement("h2");
title.textContent = "🕒  Digital Clock || Day 4 ";

const subtitle = document.createElement("p");
subtitle.textContent = "Time and tide wait for none.";

header.appendChild(title);
header.appendChild(subtitle);
document.body.prepend(header);

// ✅ Header Style
header.style.backgroundColor = "#007bff";
header.style.color = "white";
header.style.textAlign = "center";
header.style.padding = "15px 30px";
header.style.borderRadius = "0 0 15px 15px";
header.style.fontFamily = "'Poppins', sans-serif";
header.style.boxShadow = "0 4px 10px rgba(0,0,0,0.2)";
header.style.marginBottom = "10px";
header.style.position = "fixed";
header.style.top = "0";
header.style.left = "0";
header.style.right = "0";
header.style.zIndex = "1000";  //iska matlab hai wo sabse upar rahega (aur koi cheez uske upar na aaye).

title.style.margin = "0";
title.style.fontSize = "1.5rem";
subtitle.style.marginTop = "5px";
subtitle.style.fontSize = "1rem";
subtitle.style.opacity = "0.9";

// ✅ Hover effect
header.addEventListener("mouseenter", () => {
    header.style.backgroundColor = "#0056cc";
});
header.addEventListener("mouseleave", () => {
    header.style.backgroundColor = "#007bff";
});

// ✅ 2. Adjust body layout so clock appears below header and centered
document.body.style.margin = "0";
document.body.style.display = "flex";
document.body.style.flexDirection = "column";
document.body.style.alignItems = "center";
document.body.style.justifyContent = "center";
document.body.style.height = "100vh";
document.body.style.background = "linear-gradient(135deg, #e0eafc, #cfdef3)";
document.body.style.fontFamily = "'Poppins', sans-serif";
document.body.style.overflow = "hidden";

// ✅ 3. Push clock slightly down (since header is fixed)
document.body.style.paddingTop = "100px";

// ✅ 4. Clock Function
function updateClock() {
    const now = new Date();   // to see current time
    const time = now.toLocaleTimeString();   // to correct format of time - ex- 4:25:10 pm 
    const date = now.toDateString();   // // to correct format of date (e.g. Mon Oct 13 2025)

    document.getElementById("clock").textContent = time;  // clock write time in div
    document.getElementById("date").textContent = date;   // date write date in div 
}
setInterval(updateClock, 1000);
updateClock();

// ✅ 5. Optional Dark Mode Toggle (if you have button)
const toggleBtn = document.getElementById("toggleMode");
if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
    });
}

// ✅ 6. Dark Mode CSS
const style = document.createElement("style");
style.textContent = `
.dark-mode {
  background: #121212;
  color: white;
}
.dark-mode .clock-card {
  background: #1e1e1e;
  color: white;
}
`;
document.head.appendChild(style);
