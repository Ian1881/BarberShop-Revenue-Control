import { months, currencyFormatterCor } from "./helper.js";
import Button from "./Button.jsx";

export default function MonthSummary({
  monthTotal,
  curMonth,
  setCurMonth,
  curYear,
}) {
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
          Ganancia Mes {months[curMonth.getMonth()]}/{curYear.getFullYear()}
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
