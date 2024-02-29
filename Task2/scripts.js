// script.js
document.addEventListener('DOMContentLoaded', () => {
    const expenseForm = document.getElementById('expense-form');
    const expenseList = document.getElementById('expense-list');

    // Load expenses from local storage
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

    // Display expenses
    function displayExpenses() {
        expenseList.innerHTML = '';
        expenses.forEach((expense, index) => {
            const li = document.createElement('li');
            li.textContent = `${expense.name} - $${expense.amount} - ${expense.date}`;
            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.addEventListener('click', () => editExpense(index));
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => deleteExpense(index));
            li.appendChild(editButton);
            li.appendChild(deleteButton);
            expenseList.appendChild(li);
        });
    }

    displayExpenses();

    // Add new expense
    expenseForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('expense-name').value;
        const amount = document.getElementById('expense-amount').value;
        const date = document.getElementById('expense-date').value;
        const expense = { name, amount, date };
        expenses.push(expense);
        localStorage.setItem('expenses', JSON.stringify(expenses));
        saveToFile(expenses);
        displayExpenses();
        expenseForm.reset();
    });

    // Edit expense
    function editExpense(index) {
        // Implement edit functionality
    }

    // Delete expense
    function deleteExpense(index) {
        expenses.splice(index, 1);
        localStorage.setItem('expenses', JSON.stringify(expenses));
        saveToFile(expenses);
        displayExpenses();
    }

    // Save expenses to file
    function saveToFile(expenses) {
        const data = expenses.map(expense => `${expense.name} - $${expense.amount} - ${expense.date}`).join('\n');
        const blob = new Blob([data], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'expenses.txt';
        a.click();
        URL.revokeObjectURL(url);
    }
});
