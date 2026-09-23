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
      return newDate;
    });
  }

  const SortedServices = services
    .toSorted((a, b) => b.date.getTime() - a.date.getTime())
    .filter((service) => service.date.getDate() === todayDate.getDate());

  const isClear = SortedServices.length === 0;

  function handleRemoveService(id) {
    if (confirm("Seguro que quieres remover esta cita?"))
      setDoneServices((service) => service.filter((s) => s.id !== id));
  }

  return (
    <div className="service-columns">
      <div className="service-summary day-summary">
        <div className="total-summary-nav">
          <Button className="button" onClicked={handlePrevDay}>
            Anterior
          </Button>
          <TotalSummary services={SortedServices} todayDate={todayDate} />
          <Button
            className={`button ${todayDate.getDate() === new Date().getDate() ? "grayed" : ""}`}
            onClicked={() =>
              todayDate.getDate() < new Date().getDate() && handleNextDay()
            }
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
        <h4>{service.service.slice(0, 14)}</h4> <h3>C${service.price}</h3>
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
  const todayServices = services.filter(
    (item) =>
      item.date.getDate() === todayDate.getDate() &&
      item.date.getMonth() === new Date().getMonth(),
  );

  const dateText =
    todayDate === new Date().getDate()
      ? "de Hoy"
      : todayDate < new Date().getDate()
        ? `del ${todayDate} de ${months[new Date().getMonth()]}`
        : "";

  const total = todayServices.reduce((acc, cur) => acc + cur.price, 0);
  return (
    <>
      <h3>
        Total {dateText}: <strong>C${total}</strong>
      </h3>
    </>
  );
}
