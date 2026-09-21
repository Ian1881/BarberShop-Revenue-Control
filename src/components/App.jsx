import { useLocalStorage } from "./useLocalStorage";
import { useState } from "react";
import NavBar from "./NavBar.jsx";
import "../index.css";
import Services from "./Services.jsx";
import DayServices from "./DayServices.jsx";
import MonthSummary from "./MonthSummary.jsx";
import Gastos from "./Gastos.jsx";

function App() {
  const [services, setServices] = useLocalStorage("services", []);
  const [doneServices, setDoneServices] = useLocalStorage("doneServices", []);
  const [activeView, setActiveView] = useState("Inicio");

  const parsedDoneServices = doneServices.map((item) => {
    return { ...item, date: new Date(item.date) };
  });

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
        <MonthSummary doneServices={parsedDoneServices} />
      )}
      {activeView === "Gastos" && <Gastos />}
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
