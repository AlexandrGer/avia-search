import "./App.css";
import React, { useEffect, useState } from "react";
import { data } from "./flights";
import FlightСard from "./components/FlightСard/FlightСard";

function App() {
  const bla = [];
  const bla2 = [];

  const departureCity = "Москва";
  const arrivalCity = "ЛОНДОН";

  data.result.flights.map((item) => {
    return item.flight.legs.map((i) => {
      return i.segments.map((j) => {
        if (j.departureCity && j.departureCity.caption === departureCity)
          bla.push(item);
        return j;
      });
    });
  });

  bla.map((item) => {
    return item.flight.legs.map((i) => {
      return i.segments.map((j) => {
        if (j.arrivalCity && j.arrivalCity.caption === arrivalCity)
          bla2.push(item);
        return j;
      });
    });
  });

  const [sortPriceIncrease, setSortPriceIncrease] = useState(false); // Сортировка по возрастанию цены
  const [sortPriceReduction, setSortPriceReduction] = useState(false); // Сортировка по убыванию цены
  const [duration, setDuration] = useState(false); // Сортировка по времени в пути
  const [oneTransfer, setOneTransfer] = useState(false);
  const [noTransfers, setNoTransfers] = useState(false);

  useEffect(() => {
    localStorage.setItem("PriceIncrease", sortPriceIncrease);
    localStorage.setItem("PriceReduction", sortPriceReduction);
    localStorage.setItem("Duration", duration);
    localStorage.setItem("OneTransfer", oneTransfer);
    localStorage.setItem("NoTransfers", noTransfers);
    if (JSON.parse(localStorage.getItem("airline")) === null) {
      localStorage.setItem("airline", JSON.stringify([]));
    }
  });

  const [initial, setInitial] = useState(bla2);

  const filterAirlane = (e) => {
    const airline = JSON.parse(localStorage.getItem("airline"));
    const input = e.target;
    if (airline.includes(input.value) && input.checked === false) {
      const index = airline.indexOf(input.value);
      airline.splice(index, 1);
      localStorage.setItem("airline", JSON.stringify(airline));
    } else if (airline.includes(input.value)) {
      return;
    } else {
      airline.push(input.value);
      localStorage.setItem("airline", JSON.stringify(airline));
    }
    return airline;
  };

  function sort(array) {
    const PriceIncrease = JSON.parse(localStorage.getItem("PriceIncrease"));
    const PriceReduction = JSON.parse(localStorage.getItem("PriceReduction"));
    const Duration = JSON.parse(localStorage.getItem("Duration"));
    if (PriceIncrease === true) {
      return array.sort((a, b) =>
        +a.flight.price.total.amount > +b.flight.price.total.amount ? 1 : -1
      );
    } else if (PriceReduction === true) {
      return array.sort((a, b) =>
        +a.flight.price.total.amount < +b.flight.price.total.amount ? 1 : -1
      );
    } else if (Duration === true) {
      return array.sort((a, b) =>
        +(a.flight.legs[0].duration + a.flight.legs[1].duration) >
        +(b.flight.legs[0].duration + b.flight.legs[1].duration)
          ? 1
          : -1
      );
    }
    return array;
  }

  const filter = () => {
    // const t = JSON.parse(localStorage.getItem("airline"));
    // console.log(t);
    const OneTransfer = JSON.parse(localStorage.getItem("OneTransfer"));
    const NoTransfers = JSON.parse(localStorage.getItem("NoTransfers"));
    const array1 = bla2;

    if (OneTransfer === false && NoTransfers === false) {
      setInitial(sort(array1));
    }
    if (OneTransfer === true && NoTransfers === false) {
      setInitial(
        sort(array1).filter(
          (item) =>
            item.flight.legs[0].segments.length > 1 &&
            item.flight.legs[1].segments.length > 1
        )
      );
    }
    if (OneTransfer === false && NoTransfers === true) {
      setInitial(
        sort(array1).filter(
          (item) =>
            item.flight.legs[0].segments.length === 1 &&
            item.flight.legs[1].segments.length === 1
        )
      );
    }
  };

  //   console.log(initial);

  return (
    <div className="App">
      <div>
        <div className="sort">
          <p className="text">Сортировать</p>
          <div className="sort_container">
            <input
              type="radio"
              checked={sortPriceIncrease || false}
              onChange={() => {
                setSortPriceIncrease(!sortPriceIncrease);
                localStorage.setItem("PriceIncrease", !sortPriceIncrease);
                setSortPriceReduction(false);
                localStorage.setItem("PriceReduction", false);
                setDuration(false);
                localStorage.setItem("Duration", false);
                filter();
              }}
            />
            <label> - по возрастанию цены</label>
          </div>
          <div>
            <input
              type="radio"
              checked={sortPriceReduction || false}
              onChange={() => {
                setSortPriceReduction(!sortPriceReduction);
                localStorage.setItem("PriceReduction", !sortPriceReduction);
                setSortPriceIncrease(false);
                localStorage.setItem("PriceIncrease", false);
                setDuration(false);
                localStorage.setItem("Duration", false);
                filter();
              }}
            />
            <label> - по убыванию цены</label>
          </div>
          <div>
            <input
              type="radio"
              checked={duration || false}
              onChange={() => {
                setDuration(!duration);
                localStorage.setItem("Duration", !duration);
                setSortPriceIncrease(false);
                localStorage.setItem("PriceIncrease", false);
                setSortPriceReduction(false);
                localStorage.setItem("PriceReduction", false);
                filter();
              }}
            />
            <label> - по времени в пути</label>
          </div>
        </div>
        <div className="sort">
          <p className="text">Фильтровать</p>
          <div className="sort_container">
            <input
              type="checkbox"
              checked={oneTransfer || false}
              onChange={() => {
                setOneTransfer(!oneTransfer);
                localStorage.setItem("OneTransfer", !oneTransfer);
                setNoTransfers(false);
                localStorage.setItem("NoTransfers", false);
                filter();
              }}
            />
            <label> - 1 пересадка</label>
          </div>
          <div className="sort_container">
            <input
              type="checkbox"
              checked={noTransfers || false}
              onChange={() => {
                setNoTransfers(!noTransfers);
                localStorage.setItem("NoTransfers", !noTransfers);
                setOneTransfer(false);
                localStorage.setItem("OneTransfer", false);
                filter();
              }}
            />
            <label> - без пересадок</label>
          </div>
        </div>
        <div className="sort">
          <p className="text">Авиакомпании</p>
          {[...new Set(bla2.map((i) => i.flight.carrier.caption))].map(
            (i, index) => (
              <div className="sort_container" key={index}>
                <input
                  id={index}
                  type="checkbox"
                  //   defaultChecked={false}
                  value={i}
                  onClick={(e) => filterAirlane(e)}
                />
                <label> - {i}</label>
              </div>
            )
          )}
        </div>
      </div>

      <div>
        {initial.map((item, index) => (
          <FlightСard key={index} item={item} />
        ))}
      </div>
      {/* <FlightСard item={bla2[66]} /> */}
    </div>
  );
}

export default App;
