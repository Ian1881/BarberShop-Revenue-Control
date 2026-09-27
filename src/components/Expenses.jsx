import { useState } from "react";
import Button from "./Button.jsx";

const tempData = [
  { expense: "peine", cost: 130, id: 1, date: new Date().toLocaleDateString() },
  {
    expense: "alcohol",
    cost: 50,
    id: 2,
    date: new Date().toLocaleDateString(),
  },
  {
    expense: "cepillo",
    cost: 80,
    id: 3,
    date: new Date().toLocaleDateString(),
  },
  {
    expense: "cuchilla",
    cost: 200,
    id: 4,
    date: new Date().toLocaleDateString(),
  },
  { expense: "gel", cost: 30, id: 5, date: new Date().toLocaleDateString() },
];

export default function Expenses({ setExpenses }) {
  const [description, setDescription] = useState("");
  const [cost, setCost] = useState("");

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
        <ExpensesList />
      </div>
    </div>
  );
}

function ExpensesList() {
  return (
    <main className="expenses-content">
      <div className="expenses-heading">
        {/* {change it to the actual month} */}
        <h2>Gastos de Sep</h2>
        <span>total: total aqui</span>
      </div>
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
            {tempData.map((expense) => (
              <Expense expense={expense} key={expense.id} />
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}

function Expense({ expense }) {
  return (
    <tr>
      <td className="time-cell">{expense.expense}</td>
      <td>
        <span>{expense.cost}</span>
      </td>
      <td>{expense.date}</td>
    </tr>
  );
}
