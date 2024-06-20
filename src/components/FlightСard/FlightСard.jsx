import "./FlightСard.css";
export default function FlightСard({ item }) {
  const days = ["вск", "пн", "вт", "ср", "чт", "пт", "сб"];
  const months = [
    "янв.",
    "февр.",
    "март",
    "апр.",
    "май",
    "июнь",
    "июль",
    "авг.",
    "сент.",
    "окт.",
    "нояб.",
    "дек.",
  ];

  const getDate = (day) => {
    const date = new Date(day);
    return `${date.getDate()} ${months[date.getMonth()]} ${
      days[date.getDay()]
    } `;
  };

  const getTime = (time) => {
    const hour = Math.floor(time / 60);
    const minuts = time % 60;
    return `${hour} ч ${minuts} мин`;
  };

  return (
    <div className="FlightСard">
      <div className="FlightСard_header">
        <div>{item.flight.carrier.caption}</div>
        <div className="price">
          {`${item.flight.price.total.amount} ₽`}
          <span className="price_caption">
            Стоимость для одного взрослого пассажира
          </span>
        </div>
      </div>
      <div className="flight">
        {item.flight.legs[0].segments.length > 1 ? (
          <>
            <div className="destination">
              <div className="city">
                {` ${item.flight.legs[0].segments[0].departureCity.caption}, ${item.flight.legs[0].segments[0].departureAirport.caption}`}
                <span className="city_caption">
                  ({item.flight.legs[0].segments[0].departureAirport.uid})
                </span>
              </div>
              <span className="arrow"></span>
              <div className="city">
                {` ${item.flight.legs[0].segments[1].arrivalCity.caption}, ${item.flight.legs[0].segments[1].arrivalAirport.caption}`}
                <span className="city_caption">
                  ({item.flight.legs[0].segments[1].arrivalAirport.uid})
                </span>
              </div>
            </div>
            <div className="flight_info">
              <div className="flight_infoContainer">
                <div className="time">
                  {item.flight.legs[0].segments[0].departureDate.slice(11, 16)}
                  <span className="day">
                    {getDate(item.flight.legs[0].segments[0].departureDate)}
                  </span>
                </div>
                <div className="duration">
                  <span className="duration_icon"></span>
                  {getTime(item.flight.legs[0].duration)}
                </div>
                <div className="time time_second">
                  <span className="day">
                    {getDate(item.flight.legs[0].segments[1].arrivalDate)}
                  </span>
                  {item.flight.legs[0].segments[1].arrivalDate.slice(11, 16)}
                </div>
              </div>
              <span className="transfer">1 пересадка</span>
            </div>
            <p className="flight_company">
              Рейс выполняет:
              <span className="flight_company_name">
                {item.flight.carrier.caption}
              </span>
            </p>
          </>
        ) : (
          // Если пересадок нету
          <>
            <div className="destination">
              <div className="city">
                {` ${item.flight.legs[0].segments[0].departureCity.caption}, ${item.flight.legs[0].segments[0].departureAirport.caption}`}
                <span className="city_caption">
                  ({item.flight.legs[0].segments[0].departureAirport.uid})
                </span>
              </div>
              <span className="arrow"></span>
              <div className="city">
                {` ${item.flight.legs[0].segments[0].arrivalCity.caption}, ${item.flight.legs[0].segments[0].arrivalAirport.caption}`}
                <span className="city_caption">
                  ({item.flight.legs[0].segments[0].arrivalAirport.uid})
                </span>
              </div>
            </div>
            <div className="flight_info">
              <div className="flight_infoContainer">
                <div className="time">
                  {item.flight.legs[0].segments[0].departureDate.slice(11, 16)}
                  <span className="day">
                    {getDate(item.flight.legs[0].segments[0].departureDate)}
                  </span>
                </div>
                <div className="duration">
                  <span className="duration_icon"></span>
                  {getTime(item.flight.legs[0].duration)}
                </div>
                <div className="time time_second">
                  <span className="day">
                    {getDate(item.flight.legs[0].segments[0].arrivalDate)}
                  </span>
                  {item.flight.legs[0].segments[0].arrivalDate.slice(11, 16)}
                </div>
              </div>
              <span className="transfer"></span>
            </div>
            <p className="flight_company">
              Рейс выполняет:
              <span className="flight_company_name">
                {item.flight.carrier.caption}
              </span>
            </p>
          </>
        )}
      </div>
      <span className="line"></span>
      <div className="flight">
        {item.flight.legs[1].segments.length > 1 ? (
          <>
            <div className="destination">
              <div className="city">
                {` ${item.flight.legs[1].segments[0].departureCity?.caption}, ${item.flight.legs[1].segments[0].departureAirport.caption}`}
                <span className="city_caption">
                  ({item.flight.legs[1].segments[0].departureAirport.uid})
                </span>
              </div>
              <span className="arrow"></span>
              <div className="city">
                {` ${item.flight.legs[1].segments[1].arrivalCity.caption}, ${item.flight.legs[1].segments[1].arrivalAirport.caption}`}
                <span className="city_caption">
                  ({item.flight.legs[1].segments[1].arrivalAirport.uid})
                </span>
              </div>
            </div>
            <div className="flight_info">
              <div className="flight_infoContainer">
                <div className="time">
                  {item.flight.legs[1].segments[0].departureDate.slice(11, 16)}
                  <span className="day">
                    {getDate(item.flight.legs[1].segments[0].departureDate)}
                  </span>
                </div>
                <div className="duration">
                  <span className="duration_icon"></span>
                  {getTime(item.flight.legs[1].duration)}
                </div>
                <div className="time time_second">
                  <span className="day">
                    {getDate(item.flight.legs[1].segments[1].arrivalDate)}
                  </span>
                  {item.flight.legs[1].segments[1].arrivalDate.slice(11, 16)}
                </div>
              </div>
              <span className="transfer">1 пересадка</span>
            </div>
            <p className="flight_company">
              Рейс выполняет:
              <span className="flight_company_name">
                {item.flight.carrier.caption}
              </span>
            </p>
          </>
        ) : (
          <>
            <div className="destination">
              <div className="city">
                {` ${item.flight.legs[1].segments[0].departureCity.caption}, ${item.flight.legs[1].segments[0].departureAirport.caption}`}
                <span className="city_caption">
                  ({item.flight.legs[1].segments[0].departureAirport.uid})
                </span>
              </div>
              <span className="arrow"></span>
              <div className="city">
                {` ${item.flight.legs[1].segments[0].arrivalCity.caption}, ${item.flight.legs[1].segments[0].arrivalAirport.caption}`}
                <span className="city_caption">
                  ({item.flight.legs[1].segments[0].arrivalAirport.uid})
                </span>
              </div>
            </div>
            <div className="flight_info">
              <div className="flight_infoContainer">
                <div className="time">
                  {item.flight.legs[1].segments[0].departureDate.slice(11, 16)}
                  <span className="day">
                    {getDate(item.flight.legs[1].segments[0].departureDate)}
                  </span>
                </div>
                <div className="duration">
                  <span className="duration_icon"></span>
                  {getTime(item.flight.legs[1].duration)}
                </div>
                <div className="time time_second">
                  <span className="day">
                    {getDate(item.flight.legs[1].segments[0].arrivalDate)}
                  </span>
                  {item.flight.legs[1].segments[0].arrivalDate.slice(11, 16)}
                </div>
              </div>
              <span className="transfer"></span>
            </div>
            <p className="flight_company">
              Рейс выполняет:
              <span className="flight_company_name">
                {item.flight.carrier.caption}
              </span>
            </p>
          </>
        )}
      </div>
      <button className="button">ВЫБРАТЬ</button>
    </div>
  );
}
