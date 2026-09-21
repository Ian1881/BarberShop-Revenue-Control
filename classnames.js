<main className="dashboard" id="inicio">
  <section className="page-heading" aria-labelledby="page-title">
    <div>
      <p className="eyebrow">Control diario</p>
      <h1 id="page-title">Ingresos de hoy</h1>
    </div>
    <time className="date-note" dateTime="2026-09-20">
      20 septiembre 2026
    </time>
  </section>

  <section className="ledger-grid" aria-label="Resumen de ingresos">
    <article className="ledger-panel service-panel">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Registro</p>
          <h2>Servicios</h2>
        </div>
        <span className="service-count">5 servicios</span>
      </div>
      <div className="service-list">
        <div className="service-row service-row-heading" aria-hidden="true">
          <span>Servicio</span>
          <span>Hora</span>
          <span>Valor</span>
        </div>
        {[
          ["Corte + barba", "4:00 pm", "$180"],
          ["Corte", "3:00 pm", "$130"],
          ["Corte", "2:00 pm", "$130"],
          ["Barba", "11:00 am", "$50"],
          ["Corte + ceja", "9:00 am", "$160"],
        ].map(([service, time, amount]) => (
          <div className="service-row" key={`${service}-${time}`}>
            <span>{service}</span>
            <span>{time}</span>
            <strong>{amount}</strong>
          </div>
        ))}
      </div>
    </article>

    <aside className="summary-stack">
      <article className="ledger-panel total-panel">
        <p className="eyebrow">Total del dia</p>
        <strong className="total-amount">$650</strong>
        <span className="total-caption">5 servicios registrados</span>
      </article>
      <article className="ledger-panel month-panel">
        <div>
          <p className="eyebrow">Este mes</p>
          <h2>$4,780</h2>
        </div>
        <span className="month-trend">+7%</span>
      </article>
    </aside>
  </section>

  <section className="quick-entry" aria-labelledby="quick-entry-title">
    <div>
      <p className="eyebrow">Nuevo registro</p>
      <h2 id="quick-entry-title">Agrega un servicio</h2>
    </div>
    <button className="primary-action" type="button">
      + Registrar ingreso
    </button>
  </section>
</main>;
