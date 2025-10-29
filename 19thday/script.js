// HTML elements ko JS me connect kar rahe hain
const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

// Local storage se data lena agar pehle se saved hai
const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));
let transactions = localStorageTransactions !== null ? localStorageTransactions : [];

// Transaction ko list me dikhane ke liye function
function addTransactionDOM(transaction) {
    const sign = transaction.amount < 0 ? '-' : '+';
    const item = document.createElement('li');
    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

    item.innerHTML = `
    ${transaction.text} <span>${sign}₹${Math.abs(transaction.amount)}</span>
    <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
  `;

    list.appendChild(item);
}

// Balance, Income aur Expense update karne ke liye function
function updateValues() {
    const amounts = transactions.map(trans => trans.amount);

    const total = amounts.reduce((acc, val) => acc + val, 0).toFixed(2);
    const income = amounts.filter(val => val > 0).reduce((acc, val) => acc + val, 0).toFixed(2);
    const expense = (amounts.filter(val => val < 0).reduce((acc, val) => acc + val, 0) * -1).toFixed(2);

    balance.innerText = `₹${total}`;
    money_plus.innerText = `+₹${income}`;
    money_minus.innerText = `-₹${expense}`;
}

// Transaction add karne ka function
function addTransaction(e) {
    e.preventDefault();

    if (text.value.trim() === '' || amount.value.trim() === '') {
        alert('Please enter text and amount');
    } else {
        const transaction = {
            id: Math.floor(Math.random() * 1000000),
            text: text.value,
            amount: +amount.value
        };

        transactions.push(transaction);
        addTransactionDOM(transaction);
        updateValues();
        updateLocalStorage();

        text.value = '';
        amount.value = '';
    }
}

// Transaction delete karne ka function
function removeTransaction(id) {
    transactions = transactions.filter(trans => trans.id !== id);
    updateLocalStorage();
    init();
}

// Local storage update karne ka function
function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

// App ko initialize karne ka function
function init() {
    list.innerHTML = '';
    transactions.forEach(addTransactionDOM);
    updateValues();
}

init();
form.addEventListener('submit', addTransaction);
