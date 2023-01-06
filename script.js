const balance = document.getElementById('balance');
const income = document.getElementById('money-plus');
const expense = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');
const addBtn = document.getElementById('add-btn');

const INITIAL_TRANSACTIONS = [
  { id: 1, text: 'Flower', amount: -20 },
  { id: 2, text: 'Salary', amount: 300 },
  { id: 3, text: 'Book', amount: -10 },
  { id: 4, text: 'Camera', amount: 150 },
];

let transactions = INITIAL_TRANSACTIONS;

// Add transactions to DOM list
function addTransactionDOM(transaction) {
  //Get sign
  const sign = transaction.amount < 0 ? '-' : '+';

  // Create list item
  const listItem = document.createElement('li');

  // Add class based on value
  listItem.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

  listItem.innerHTML = `
    ${transaction.text} <span>${sign} ${Math.abs(
    transaction.amount,
  )}</span> <button class='delete-btn'>x</button>
  `;

  // Add to DOM
  list.appendChild(listItem);
}

// Init app
function init() {
  list.innerHTML = '';
  // transactions.forEach(addTransactionDOM);
  transactions.map(addTransactionDOM);
}

init();
