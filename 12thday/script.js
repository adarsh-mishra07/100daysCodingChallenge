const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const convertBtn = document.getElementById("convertBtn");
const amountInput = document.getElementById("amount");
const result = document.getElementById("result");

// Load currency codes
const currencyList = ["USD", "EUR", "INR", "GBP", "JPY", "CAD", "AUD"];

currencyList.forEach(currency => {
    const option1 = document.createElement("option");
    const option2 = document.createElement("option");
    option1.value = option1.textContent = currency;
    option2.value = option2.textContent = currency;
    fromCurrency.appendChild(option1);
    toCurrency.appendChild(option2);
});

fromCurrency.value = "USD";
toCurrency.value = "INR";

convertBtn.addEventListener("click", async () => {
    const amount = parseFloat(amountInput.value);
    if (isNaN(amount) || amount <= 0) {
        result.textContent = "Please enter a valid amount!";
        return;
    }

    const from = fromCurrency.value;
    const to = toCurrency.value;

    result.textContent = "Converting...";

    try {
        const res = await fetch(`https://api.exchangerate-api.com/v4/latest/${from}`);
        const data = await res.json();
        const rate = data.rates[to];
        const converted = (amount * rate).toFixed(2);
        result.innerHTML = `${amount} ${from} = <b>${converted} ${to}</b>`;
    } catch (error) {
        result.textContent = "Error fetching data. Try again!";
    }
});
