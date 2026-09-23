import { useState } from "react";
import Button from "./Button.jsx";
import { months } from "./helper.js";

//!for tomorrow, we have to set the date so it shows the date they want to see, based off the current date, we can use date matching and functions increasing or reducing the date base threshold from the doneServices array.

//* for the month we'll take all the months that match with the current month. and add buttons so it goes back and forth I can reuse anterior and siguiente, I'll have to make them resusable components.

export default function DayServices({ services, setDoneServices }) {
  const [todayDate, setTodayDate] = useState(() => new Date());

  function handlePrevDay() {
    setTodayDate((date) => {
      const newDate = new Date(date);
      newDate.setDate(newDate.getDate() - 1);
      return newDate;
    });
  }

  function handleNextDay() {
    setTodayDate((date) => {
      const newDate = new Date(date);
      newDate.setDate(newDate.getDate() + 1);

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const targetDate = new Date(newDate);
      targetDate.setHours(0, 0, 0, 0);

      if (targetDate > today) return date;

      return newDate;
    });
  }

  const SortedServices = services
    .toSorted((a, b) => b.date.getTime() - a.date.getTime())
    .filter(
      (service) =>
        service.date.getDate() === todayDate.getDate() &&
        service.date.getMonth() === todayDate.getMonth() &&
        service.date.getFullYear() === todayDate.getFullYear(),
    );

  const isClear = SortedServices.length === 0;

  function handleRemoveService(id) {
    if (confirm("Seguro que quieres remover esta cita?"))
      setDoneServices((service) => service.filter((s) => s.id !== id));
  }

  const date = new Date().getDate();
  const month = new Date().getMonth();
  const year = new Date().getFullYear();

  const dayEqual = todayDate.getDate() === date;
  const monthEqual = todayDate.getMonth() === month;
  const yearEqual = todayDate.getFullYear() === year;

  return (
    <div className="service-columns">
      <div className="service-summary day-summary">
        <div className="total-summary-nav">
          <Button className="button" onClicked={handlePrevDay}>
            Anterior
          </Button>
          <TotalSummary services={SortedServices} todayDate={todayDate} />
          <Button //! fix this
            className={`button ${dayEqual && monthEqual && yearEqual ? "grayed" : ""}`}
            onClicked={handleNextDay}
          >
            Siguiente
          </Button>
        </div>
        {isClear ? (
          <EmptyDoneServices />
        ) : (
          SortedServices.map((service) => (
            <Summary
              service={service}
              key={service.id}
              handleRemoveService={handleRemoveService}
            />
          ))
        )}
      </div>
    </div>
  );
}

function Summary({ service, handleRemoveService }) {
  const date = `${service.date.getDate()}-${months[service.date.getMonth()]}-${service.date.getFullYear()}`;

  const hour = service.date
    .toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
    .toLowerCase();

  return (
    <div className="summary-item">
      <span className="summary-service">
        <button
          className="close-btn"
          onClick={() => handleRemoveService(service.id)}
        >
          &times;
        </button>
        <h4>{service.service.slice(0, 14)}</h4>{" "}
        <h3 translate="no">C${service.price}</h3>
      </span>
      <p className="summary-date">
        {date} - {hour}
      </p>
    </div>
  );
}

function EmptyDoneServices() {
  return (
    <div className="empty-service">
      <h3>Si cortaras bien el pelo esto estaria hasta la mierda!</h3>
    </div>
  );
}

function TotalSummary({ services, todayDate }) {
  const date = new Date().getDate();
  const month = new Date().getMonth();
  const year = new Date().getFullYear();
  const dateText =
    todayDate.getDate() === date &&
    todayDate.getMonth() === month &&
    todayDate.getFullYear() === year
      ? "de Hoy"
      : `del ${todayDate.getDate()} de ${months[new Date(todayDate).getMonth()]}`;

  const total = services.reduce((acc, cur) => acc + cur.price, 0);
  return (
    <>
      <h3>
        Total {dateText}: <strong translate="no">C${total}</strong>
      </h3>
    </>
  );
}
