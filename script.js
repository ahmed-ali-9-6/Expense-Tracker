const inputNameElement = document.querySelector(".input-name");
const inputAmountElement = document.querySelector(".input-amount");
const addBtnElement = document.querySelector(".add-btn");
const expenseListElement = document.querySelector(".expense-list");
const totalNumElement = document.querySelector(".total-num");

const editBtnElements = () => document.querySelectorAll(".edit-btn");
const deleteBtnElements = () => document.querySelectorAll(".delete-btn");

const fetchData = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : false;
};


const renderExpense = (expenses) => {
  
  let item = "";

  expenses.forEach((expense) => {
   item += `
        <li class="expense-item">
          <span class="name">${expense.name}</span>
          <span class="amount">$${expense.amount}</span>
          <div class="btns-box">
            <button class="edit-btn" type="submit">Edit</button>
            <button class="delete-btn" type="submit">Delete</button>
          </div>
        </li>
  `
})
expenseListElement.innerHTML = item;
inputNameElement.value = "";
inputAmountElement.value = "";
};

const addExpense = (e) => {
  e.preventDefault();
  const name = inputNameElement.value;
  const amount = inputAmountElement.value;

  if (!inputNameElement.value || !inputAmountElement.value) {
    alert ("Please Fill The Fields")
    return;
  }

  const expense = {
    name,
    amount,
  }

  const expenses = fetchData("expenses") || [];
  
  expenses.push(expense);
  saveToDB("expenses", expenses);

  renderExpense(expenses);
  initExpense();
  totalNum();
};
addBtnElement.addEventListener("click", (e) => addExpense(e));


const deleteExpense = (index) => {
  const expenses = fetchData("expenses");

  expenses.splice(index, 1);
  saveToDB("expenses", expenses);
  renderExpense(expenses);
  initExpense();
  totalNum();
};

const editExpense = (index) => {
  const expenses = fetchData("expenses");

  const editItem = expenses[index];
  inputNameElement.value = editItem.name;
  inputAmountElement.value = editItem.amount;
  
  expenses.splice(index, 1);
  
  saveToDB("expenses", expenses);
  initExpense();
  totalNum();
};

const initExpense = () => {
  deleteBtnElements().forEach((element,index) => {
    element.addEventListener("click", () => deleteExpense(index));
  });

  editBtnElements().forEach((element,index) => {
    element.addEventListener("click", () => editExpense(index));
  });
};

const totalNum = () => {
  let total = 0;
  const expenses = fetchData("expenses");
  expenses.forEach((expense) => {
    const expenseValue = parseFloat(expense.amount);
    total += expenseValue;
  })
  totalNumElement.textContent = total.toFixed(2);
};


const saveToDB = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

renderExpense(fetchData("expenses"));
initExpense();
totalNum();




