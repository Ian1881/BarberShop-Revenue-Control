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

export default function Expenses() {
  return (
    <div className="month-view gastos-view expenses-view">
      <div className="expenses-form">
        <input
          className="expense-input expense-name-input"
          type="text"
          placeholder="Añade gastos del mes"
        />
        <input
          className="expense-input expense-cost-input"
          type="numeric"
          inputMode="decimal"
          placeholder="Costo"
        />
        <Button> Añadir </Button>
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
        <h2>Gastos</h2>
        {/* {change it to the actual month} */}
        <span>del mes Sep</span>
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
            {tempData.map((task) => (
              <Expense task={task} key={task.id} />
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}

function Expense({ task }) {
  return (
    <tr>
      <td className="time-cell">{task.expense}</td>
      <td>
        <span>{task.cost}</span>
      </td>
      <td>{task.date}</td>
    </tr>
  );
}
