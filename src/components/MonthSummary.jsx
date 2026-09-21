import { useState } from "react";

//eslint-disable-next-line
import { fullMonths } from "./helper.js";
import Button from "./Button.jsx";

export default function MonthSummary({ doneServices }) {
  const [curMonth, setCurMonth] = useState(() => new Date().getMonth());
  const [curYear] = useState(() => new Date().getFullYear());

  function handlePrevMonth() {
    setCurMonth((m) => m - 1);
  }

  function handleNextMonth() {
    curMonth < new Date().getMonth() && setCurMonth((m) => m + 1);
  }

  const filteredServices = doneServices.filter(
    (service) =>
      service.date.getMonth() === curMonth &&
      service.date.getFullYear() === curYear,
  );

  const monthTotal = filteredServices.reduce((acc, cur) => acc + cur.price, 0);

  return (
    <div className="month-view">
      <div className="month-navigation">
        <Button className="button" onclicked={handlePrevMonth}>
          Anterior
        </Button>
        <div className="month-name">Months total here</div>
        <Button
          className={curMonth === new Date().getMonth() ? "grayed" : "button"}
          onclicked={handleNextMonth}
        >
          Siguiente
        </Button>
      </div>
      <div className="month-total-card">
        <span className="month-total-value">{monthTotal}</span>
      </div>
    </div>
  );
}
