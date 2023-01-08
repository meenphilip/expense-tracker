const balance = document.getElementById('balance');
const incomeEl = document.getElementById('money-plus');
const expenseEl = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');
const clearBtn = document.getElementById('clear-btn');

// const INITIAL_TRANSACTIONS = [
//   { id: 1, text: 'Flower', amount: -20 },
//   { id: 2, text: 'Salary', amount: 300 },
//   { id: 3, text: 'Book', amount: -10 },
//   { id: 4, text: 'Camera', amount: 150 },
// ];
//let transactions = INITIAL_TRANSACTIONS;

const localStorageTransactions = JSON.parse(
  localStorage.getItem('transactions'),
);

let transactions =
  localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

// Add transaction
function addTransaction(e) {
  e.preventDefault();

  if (text.value.trim() === '' || amount.value.trim() === '') {
    return alert('Please add text and amount');
  } else {
    const transaction = {
      id: generateID(),
      text: text.value,
      amount: +amount.value,
    };
    transactions.push(transaction);

    addTransactionDOM(transaction);

    upadateValues();

    // store in LS
    updateLocalStorage();

    // Clear inputs
    text.value = '';
    amount.value = '';
  }
}

// Generate ID
function generateID() {
  return Math.floor(Math.random() * 1000_000_000);
}

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
  )}</span> <button class='delete-btn' onclick='removeTransaction(${
    transaction.id
  })'><i class="fas fa-trash"></i></button>

  <button class='edit-btn'><i class="fas fa-edit"></i></button>
  `;

  // Add to DOM
  list.appendChild(listItem);
}

// Update the Balance, Income,& Expense
function upadateValues() {
  const amounts = transactions.map(transaction => transaction.amount);
  const total = amounts.reduce((acc, item) => acc + item, 0).toFixed(2);

  const income = amounts
    .filter(item => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  const expense = (
    amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1
  ).toFixed(2);

  // Insert into DOM
  balance.innerText = `$${total}`;
  incomeEl.innerText = `$${income}`;
  expenseEl.innerText = `$${expense}`;
}

// Update local storage transaction
function updateLocalStorage() {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

// Init app
function init() {
  list.innerHTML = '';
  // transactions.forEach(addTransactionDOM);
  transactions.map(addTransactionDOM);
  upadateValues();
}

init();

// Remove transaction by ID
function removeTransaction(id) {
  transactions = transactions.filter(transaction => transaction.id !== id);

  // Remove in LS
  updateLocalStorage();

  // reinit
  init();
}

function clearTransactions() {
  let result = confirm('Are You Sure?');
  if (result) {
    // // First way of doing it
    // list.innerHTML = '';

    //second way of doing it & Faster
    while (list.firstChild) {
      //get ul then remove the first list-items recursive
      list.removeChild(list.firstChild);
    }
  } else {
    return;
  }

  // Set balance,income & expense to zero
  balance.innerText = '$0.00';
  incomeEl.innerText = '$0.00';
  expenseEl.innerText = '$0.00';

  //clear from LS
  clearLocalStorage();
}

// Clear Local Storage
function clearLocalStorage() {
  return localStorage.clear();
}

// Add transaction Eventlistener
form.addEventListener('submit', addTransaction);
clearBtn.addEventListener('click', clearTransactions);
