import { useLocalStorage } from "./useLocalStorage";
import { useState } from "react";
import NavBar from "./NavBar.jsx";
import "../index.css";
import Services from "./Services.jsx";
import DayServices from "./DayServices.jsx";
import MonthSummary from "./MonthSummary.jsx";
import Expenses from "./Expenses.jsx";
import Inventory from "./Inventory.jsx";

function App() {
  const [services, setServices] = useLocalStorage("services", []);
  const [doneServices, setDoneServices] = useLocalStorage("doneServices", []);
  const [activeView, setActiveView] = useState("Inicio");
  const [expenses, setExpenses] = useLocalStorage("expenses", []);
  const [curMonth, setCurMonth] = useState(() => new Date());
  const [curYear] = useState(() => new Date());

  const parsedDoneServices = doneServices.map((item) => {
    return { ...item, date: new Date(item.date) };
  });

  const filteredServices = parsedDoneServices.filter(
    (service) =>
      service.date.getMonth() === curMonth.getMonth() &&
      service.date.getFullYear() === curYear.getFullYear(),
  );

  const doneServicesTotal = filteredServices.reduce(
    (acc, cur) => acc + cur.price,
    0,
  );

  const parsedExpenses = expenses.map((exp) => {
    return { ...exp, date: new Date(exp.date) };
  });

  const ExpensesTotal = parsedExpenses
    .filter(
      (exp) =>
        exp.date.getMonth() === curMonth.getMonth() &&
        exp.date.getFullYear() === curYear.getFullYear(),
    )
    .reduce((acc, cur) => acc + cur.cost, 0);

  const monthTotal = doneServicesTotal - ExpensesTotal;

  return (
    <div className="app-shell">
      <NavBar setActiveView={setActiveView} activeView={activeView} />
      {activeView === "Inicio" && (
        <Home
          setActiveView={setActiveView}
          services={services}
          setServices={setServices}
          parsedDoneServices={parsedDoneServices}
          setDoneServices={setDoneServices}
        />
      )}
      {activeView === "Mes" && (
        <MonthSummary
          monthTotal={monthTotal}
          curMonth={curMonth}
          setCurMonth={setCurMonth}
          curYear={curYear}
        />
      )}
      {activeView === "Gastos" && (
        <Expenses
          ExpensesTotal={ExpensesTotal}
          expenses={parsedExpenses}
          setExpenses={setExpenses}
          curMonth={curMonth}
          setCurMonth={setCurMonth}
          curYear={curYear}
        />
      )}
      {activeView === "Inventario" && <Inventory />}
    </div>
  );
}

function Home({ services, setServices, parsedDoneServices, setDoneServices }) {
  return (
    <>
      <Services
        onAddService={setServices}
        services={services}
        setDoneServices={setDoneServices}
      />
      <DayServices
        services={parsedDoneServices}
        setDoneServices={setDoneServices}
      />
    </>
  );
}

export default App;
