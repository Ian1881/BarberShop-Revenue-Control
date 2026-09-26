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
  const currencyFormatterCor = new Intl.NumberFormat("es-NI", {
    style: "currency",
    currency: "NIO",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
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
        <span
          translate="no"
          className="month-total-value"
        >{`${currencyFormatterCor.format(monthTotal)}`}</span>
      </div>
    </div>
  );
}
