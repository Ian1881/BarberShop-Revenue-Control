import { useState } from "react";
import Button from "./Button.jsx";
import { months } from "./helper.js";

export default function Expenses({
  ExpensesTotal,
  expenses,
  setExpenses,
  curMonth,
  setCurMonth,
  curYear,
}) {
  const [description, setDescription] = useState("");
  const [cost, setCost] = useState("");

  function handlePrevMonth() {
    curMonth.getMonth() > 0 &&
      setCurMonth((m) => {
        const newMonth = new Date(m);
        newMonth.setMonth(newMonth.getMonth() - 1);
        return newMonth;
      });
  }

  function handleNextMonth() {
    curMonth.getMonth() < new Date().getMonth() &&
      setCurMonth((m) => {
        const newMonth = new Date(m);
        newMonth.setMonth(newMonth.getMonth() + 1);
        return newMonth;
      });
  }

  function addExpense() {
    const newExpense = {
      expense: description,
      cost: cost,
      id: crypto.randomUUID(),
      date: new Date(),
    };

    setExpenses((expense) => [...expense, newExpense]);
    setDescription("");
    setCost("");
  }

  const filteredExpenses = expenses.filter(
    (exp) =>
      exp.date.getMonth() === curMonth.getMonth() &&
      exp.date.getFullYear() === curYear.getFullYear(),
  );

  return (
    <div className="month-view gastos-view expenses-view">
      <div className="expenses-form">
        <input
          className="expense-input expense-name-input"
          type="text"
          placeholder="Añade gastos del mes"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          className="expense-input expense-cost-input"
          type="numeric"
          inputMode="decimal"
          placeholder="Costo"
          value={cost}
          onChange={(e) => setCost(Number(e.target.value))}
        />
        <Button onClicked={addExpense}>Añadir</Button>
      </div>
      <div className="expenses-table-panel">
        {filteredExpenses.length === 0 ? (
          <NoExpenses>
            <HeadBar
              handlePrevMonth={handlePrevMonth}
              handleNextMonth={handleNextMonth}
              curMonth={curMonth}
              ExpensesTotal={ExpensesTotal}
            />
          </NoExpenses>
        ) : (
          <ExpensesList expenses={filteredExpenses}>
            <HeadBar
              handlePrevMonth={handlePrevMonth}
              handleNextMonth={handleNextMonth}
              curMonth={curMonth}
              ExpensesTotal={ExpensesTotal}
            />
          </ExpensesList>
        )}
      </div>
    </div>
  );
}

function ExpensesList({ children, expenses }) {
  return (
    <main className="expenses-content">
      {children}
      <div className="expenses-table-wrap">
        <table className="expenses-table">
          <thead>
            <tr>
              <th scope="col">Gasto</th>
              <th scope="col">Costo</th>
              <th scope="col">Fecha</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <Expense expense={expense} key={expense.id} />
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}

function Expense({ expense }) {
  const date = expense.date.getDate();
  const month = months[expense.date.getMonth()];
  const year = expense.date.getFullYear();

  return (
    <tr>
      <td className="time-cell">{expense.expense}</td>
      <td>
        <span>{expense.cost}</span>
      </td>
      <td>{`${date}-${month}-${year}`}</td>
    </tr>
  );
}

function NoExpenses({ children }) {
  return (
    <main className="expenses-content expenses-empty-content">
      {children}
      <div className="expenses-empty-state">
        <h3>Sin gastos este mes</h3>
      </div>
    </main>
  );
}

function HeadBar({
  handlePrevMonth,
  curMonth,
  handleNextMonth,
  ExpensesTotal,
}) {
  return (
    <div className="expenses-heading">
      <button className="expenses-month-button" onClick={handlePrevMonth}>
        &larr;
      </button>
      {/* {change it to the actual month} */}
      <h2>Gastos de {months[curMonth.getMonth()]}</h2>
      <button className="expenses-month-button" onClick={handleNextMonth}>
        &rarr;
      </button>
      <span className="expenses-total">Total: C${ExpensesTotal}</span>
    </div>
  );
}
