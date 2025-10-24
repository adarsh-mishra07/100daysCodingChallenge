const passwordBox = document.getElementById("password");
const copyBtn = document.getElementById("copy");
const generateBtn = document.getElementById("generate");

const lengthInput = document.getElementById("length");
const upperCase = document.getElementById("uppercase");
const lowerCase = document.getElementById("lowercase");
const numbers = document.getElementById("numbers");
const symbols = document.getElementById("symbols");

const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerChars = "abcdefghijklmnopqrstuvwxyz";
const numberChars = "0123456789";
const symbolChars = "!@#$%^&*()_+~|}{[]></-=";

function generatePassword() {
    let length = lengthInput.value;
    let characters = "";

    if (upperCase.checked) characters += upperChars;
    if (lowerCase.checked) characters += lowerChars;
    if (numbers.checked) characters += numberChars;
    if (symbols.checked) characters += symbolChars;

    if (characters === "") {
        alert("Please select at least one character type!");
        return;
    }

    let password = "";
    for (let i = 0; i < length; i++) {
        let randomIndex = Math.floor(Math.random() * characters.length);
        password += characters[randomIndex];
    }

    passwordBox.value = password;
}

generateBtn.addEventListener("click", generatePassword);

copyBtn.addEventListener("click", () => {
    if (passwordBox.value === "") {
        alert("Please generate a password first!");
        return;
    }
    navigator.clipboard.writeText(passwordBox.value);
    alert("Password copied to clipboard!");
});
