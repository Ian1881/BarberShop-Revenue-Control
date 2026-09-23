import { useState } from "react";
import { months } from "./helper.js";
import Button from "./Button.jsx";

export default function MonthSummary({ doneServices }) {
  const [curMonth, setCurMonth] = useState(() => new Date());
  const [curYear] = useState(() => new Date());

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

  const filteredServices = doneServices.filter(
    (service) =>
      service.date.getMonth() === curMonth.getMonth() &&
      service.date.getFullYear() === curYear.getFullYear(),
  );

  const monthTotal = filteredServices.reduce((acc, cur) => acc + cur.price, 0);

  return (
    <div className="month-view">
      <div className="month-navigation">
        <Button
          className={curMonth.getMonth() > 0 ? "button" : "grayed"}
          onClicked={handlePrevMonth}
        >
          Mes Anterior
        </Button>
        <div className="month-name">
          Total Mes {months[curMonth.getMonth()]}/{curYear.getFullYear()}
        </div>
        <Button
          className={
            curMonth.getMonth() === new Date().getMonth() ? "grayed" : "button"
          }
          onClicked={handleNextMonth}
        >
          Siguiente Mes
        </Button>
      </div>
      <div className="month-total-card">
        <span className="month-total-value">{`C$${monthTotal}`}</span>
      </div>
    </div>
  );
}
