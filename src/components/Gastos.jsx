import buho from "../assets/photo.jpg";

export default function Gastos() {
  return (
    <div className="month-view gastos-view">
      <div className="gastos-copy">
        <span className="gastos-kicker">Pendiente</span>
        <p className="gastos-message">
          Pendiente para cuando se me ronque! Foto del C.E.O de Buho BarberShop
        </p>
      </div>
      <div className="gastos-image-frame">
        <img className="gastos-image" src={buho} alt="photo-Buho" />
      </div>
    </div>
  );
}
/* return (
    <div className="month-view">
      <div className="month-navigation">
        <Button
          className={curMonth > 0 ? "button" : "grayed"}
          onclicked={handlePrevMonth}
        >
          Mes Anterior
        </Button>
        <div className="month-name">
          Total del Mes de {fullMonths[curMonth]}/{curYear}
        </div>
        <Button
          className={curMonth === new Date().getMonth() ? "grayed" : "button"}
          onclicked={handleNextMonth}
        >
          Siguiente Mes
        </Button>
      </div>
      <div className="month-total-card">
        <span className="month-total-value">{`C$${monthTotal}`}</span>
      </div>
    </div>
  ); */
