import Button from "./Button.jsx";
const months = [
  "Ene",
  "Feb",
  "Mar",
  "Abr",
  "May",
  "Jun",
  "Jul",
  "Ago",
  "Sep",
  "Oct",
  "Nov",
  "Dic",
];

//!for tomorrow, we have to set the date so it shows the date they want to see, based off the current date, we can use date matching and functions increasing or reducing the date base threshold from the doneServices array.

//* for the month we'll take all the months that match with the current month. and add buttons so it goes back and forth I can reuse anterior and siguiente, I'll have to make them resusable components.

export default function DayServices({ services, setDoneServices }) {
  const isClear = services.length === 0;

  const SortedServices = services.toSorted(
    (a, b) => b.date.getTime() - a.date.getTime(),
  );

  function handleRemoveService(id) {
    if (confirm("Seguro que quieres remover esta cita?"))
      setDoneServices((service) => service.filter((s) => s.id !== id));
  }

  return (
    <div className="service-columns">
      <div className="service-summary day-summary">
        <div className="total-summary-nav">
          <Button className="button">Anterior</Button>
          <TotalSummary services={SortedServices} />
          <Button className="button">Siguiente</Button>
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
        <h4>{service.service}</h4> <h3>C${service.price}</h3>
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

function TotalSummary({ services }) {
  const total = services.reduce((acc, cur) => acc + cur.price, 0);
  return (
    <>
      <h3>
        Total de Hoy: <strong>C${total}</strong>
      </h3>
    </>
  );
}
