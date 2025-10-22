const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

let currentInput = "";

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        const value = button.textContent;

        if (value === "AC") {
            currentInput = "";
            display.value = "";
        }
        else if (value === "DEL") {
            currentInput = currentInput.slice(0, -1);
            display.value = currentInput;
        }
        else if (value === "=") {
            try {
                const formattedInput = currentInput
                    .replace(/×/g, "*")
                    .replace(/÷/g, "/")
                    .replace(/−/g, "-");
                display.value = eval(formattedInput);
                currentInput = display.value;
            } catch {
                display.value = "Error";
                currentInput = "";
            }
        }
        else {
            currentInput += value;
            display.value = currentInput;
        }
    });
});
