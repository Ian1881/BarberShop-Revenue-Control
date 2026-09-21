import { useState } from "react";
import NavBar from "./NavBar.jsx";
import "../index.css";
import Services from "./Services.jsx";
import DayServices from "./DayServices.jsx";

function App() {
  const [services, setServices] = useState([]);
  const [doneServices, setDoneServices] = useState([]);

  return (
    <div className="app-shell">
      <NavBar />
      <Services
        onAddService={setServices}
        services={services}
        setDoneServices={setDoneServices}
      />
      <DayServices services={doneServices} setDoneServices={setDoneServices} />
    </div>
  );
}

export default App;
