import { useState } from "react";
import Button from "./Button.jsx";

export default function Services({ onAddService, services, setDoneServices }) {
  const [service, setService] = useState("");
  const [price, setPrice] = useState("");

  function handleService() {
    if (!service || !price || price < 0) return;
    onAddService((services) => [
      ...services,
      {
        service: service.trim(),
        price: price,
        id: crypto.randomUUID(),
        added: false,
      },
    ]);
    setService("");
    setPrice("");
  }

  function handleAddService(id) {
    onAddService((services) =>
      services.map((service) =>
        service.id === id ? { ...service, added: !service.added } : service,
      ),
    );
  }

  function handleRemoveService(id) {
    if (confirm("Vos cochon, Estas seguro de eliminar este servicio?")) {
      onAddService((services) =>
        services.filter((service) => service.id !== id),
      );
    }
  }

  function handleTodayServices() {
    const selectedServices = services.filter((service) => service.added);
    if (selectedServices.length === 0) return;

    setDoneServices((doneServices) => [
      ...doneServices,
      {
        service: `${selectedServices
          .map((service) => service.service.slice(0, 3))
          .join(" + ")
          .trim()}`,
        price: selectedServices
          .map((service) => service.price)
          .reduce((acc, cur) => acc + cur, 0),
        id:
          Date.now().toString(12) + Math.random().toString(36).substring(2, 9),
        date: new Date(),
      },
    ]);
  }

  return (
    <>
      <div className="service-list">
        <h3>Servicios</h3>
        <input
          type="text"
          placeholder="Servicio"
          value={service}
          onChange={(e) => setService(e.target.value)}
        />
        <input
          type="number"
          inputMode="decimal"
          placeholder="Costo"
          value={price}
          onChange={(e) => setPrice(+e.target.value)}
        />
        <Button onClicked={handleService} active={true}>
          Añadir
        </Button>
      </div>
      <div className="services-columns">
        <div className="service-history">
          {services.length === 0 ? (
            <EmptyService />
          ) : (
            <ServicesList
              services={services}
              handleAddService={handleAddService}
              handleRemoveService={handleRemoveService}
            />
          )}
        </div>
        <div className="service-summary">
          <AddDoneService
            services={services}
            handleTodayServices={handleTodayServices}
          />
        </div>
      </div>
    </>
  );
}

function EmptyService() {
  return (
    <div className="empty-service">
      <h3>Agrega los servicios que ofreces!</h3>
    </div>
  );
}

export function ServicesList({
  services,
  handleAddService,
  handleRemoveService,
}) {
  return (
    <div>
      {services.map((service) => (
        <List
          service={service}
          key={service.id}
          handleAddService={handleAddService}
          handleRemoveService={handleRemoveService}
        />
      ))}
    </div>
  );
}

function List({ service, handleAddService, handleRemoveService }) {
  return (
    <div className="list">
      <button
        className="close-btn"
        onClick={() => handleRemoveService(service.id)}
      >
        &times;
      </button>
      <h3>{service.service}</h3>
      <p>C${service.price}</p>
      <input
        type="checkbox"
        checked={service.added}
        className="checkbox"
        onChange={() => handleAddService(service.id)}
      />
    </div>
  );
}

function AddDoneService({ services, handleTodayServices }) {
  if (!services) return null;
  const total = services
    .filter((service) => service.added)
    .reduce((acc, cur) => acc + cur.price, 0);
  return (
    <div>
      <h4>Precio Total</h4>
      <h2>C${total}</h2>
      <Button onClicked={handleTodayServices}>+1 Agregar Servicio</Button>
    </div>
  );
}
