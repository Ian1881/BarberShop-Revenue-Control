import { useState } from "react";
import logo from "../assets/download.png";
import Button from "./Button.jsx";

export default function NavBar() {
  const [activeView, setActiveView] = useState("Inicio");

  const handleNavigation = (view) => {
    setActiveView(view);
  };

  return (
    <header className="site-header">
      <nav className="nav-bar">
        <a
          className="brand"
          href="#inicio"
          aria-label="Barberia ingresos, inicio"
        >
          <img src={logo} alt="logo de barberia" className="navbar-logo" />
          <span>
            Barberia <strong>ingresos</strong>
          </span>
        </a>
        <div className="nav-links" aria-label="Navegacion principal">
          {["Inicio", "Mes", "Gastos"].map((view) => (
            <Button
              key={view}
              active={activeView === view}
              onclicked={() => handleNavigation(view)}
            >
              {view}
            </Button>
          ))}
        </div>
      </nav>
    </header>
  );
}
