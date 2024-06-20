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

  console.log(bla);
  console.log(bla2);

  const [sortPriceIncrease, setSortPriceIncrease] = useState(false);
  const [sortPriceReduction, setSortPriceReduction] = useState(false);
  const [duration, setDuration] = useState(false);
  const [oneTransfer, setOneTransfer] = useState(false);
  const [noTransfers, setNoTransfers] = useState(false);
  const [priceFrom, setPriceFrom] = useState(0);
  const [priceTo, setPriceTo] = useState(1000000);
  const [initial, setInitial] = useState(bla2);
  const [air, setAir] = useState(bla2);

  useEffect(() => {
    localStorage.removeItem("airline");
  }, []);

  useEffect(() => {
    localStorage.setItem("PriceIncrease", sortPriceIncrease);
    localStorage.setItem("PriceReduction", sortPriceReduction);
    localStorage.setItem("Duration", duration);
    localStorage.setItem("OneTransfer", oneTransfer);
    localStorage.setItem("NoTransfers", noTransfers);
    localStorage.setItem("priceFrom", priceFrom);
    localStorage.setItem("priceTo", priceTo);
    if (JSON.parse(localStorage.getItem("airline")) === null) {
      localStorage.setItem("airline", JSON.stringify([]));
    }
  });

  // Функция фильтрации по авиакомпаниям
  function filterAirlane(e) {
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
    filter();
  }

  // Функция сортировки
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

  // Функция фильтрации по пересадкам
  function filterByTransfers(array) {
    const OneTransfer = JSON.parse(localStorage.getItem("OneTransfer"));
    const NoTransfers = JSON.parse(localStorage.getItem("NoTransfers"));
    if (OneTransfer === false && NoTransfers === false) {
      return sort(array);
    }
    if (OneTransfer === true && NoTransfers === false) {
      return sort(array).filter(
        (item) =>
          item.flight.legs[0].segments.length > 1 &&
          item.flight.legs[1].segments.length > 1
      );
    }
    if (OneTransfer === false && NoTransfers === true) {
      return sort(array).filter(
        (item) =>
          item.flight.legs[0].segments.length === 1 &&
          item.flight.legs[1].segments.length === 1
      );
    }
    return array;
  }

  const filter = () => {
    const airline = JSON.parse(localStorage.getItem("airline"));
    const priceFrom = localStorage.getItem("priceFrom");
    const priceTo = localStorage.getItem("priceTo");

    const initialArray = bla2;
    const filterArrayByPrice = [];
    const filterArray = [];

    initialArray.forEach((e) => {
      if (
        e.flight.price.total.amount > +priceFrom &&
        e.flight.price.total.amount < +priceTo
      ) {
        filterArrayByPrice.push(e);
      }
    });

    if (airline.length === 0) {
      setInitial(filterByTransfers(filterArrayByPrice));
      setAir(filterByTransfers(filterArrayByPrice));
    }
    if (airline.length > 0) {
      filterArrayByPrice.forEach((i) => {
        airline.forEach((e) => {
          if (i.flight.carrier.caption.includes(e)) {
            filterArray.push(i);
          }
        });
      });
      setInitial(filterByTransfers(filterArray));
    }
  };

  function filterAirlanes(array) {
    const initialAirlines = [];
    const test = [];
    const test2 = [];

    [...new Set(array.map((i) => i.flight.carrier.caption))].forEach((i) => {
      let maxPrice = 1000000;
      array.forEach((e) => {
        if (e.flight.carrier.caption === i) {
          if (+e.flight.price.total.amount < maxPrice) {
            maxPrice = e.flight.price.total.amount;
          }
        }
      });
      initialAirlines.push({ airline: i, maxPrice: maxPrice, disabled: false });
    });

    [...new Set(air.map((i) => i.flight.carrier.caption))].forEach((i) => {
      let maxPrice = 1000000;
      air.forEach((e) => {
        if (e.flight.carrier.caption === i) {
          if (+e.flight.price.total.amount < maxPrice) {
            maxPrice = e.flight.price.total.amount;
          }
        }
      });
      test.push({ airline: i, maxPrice: maxPrice, disabled: false });
    });

    initialAirlines.forEach((e) => {
      test.forEach((j) => {
        if (e.airline === j.airline) {
          if (e.maxPrice === j.maxPrice) {
            test2.push({
              airline: j.airline,
              maxPrice: j.maxPrice,
              disabled: false,
            });
          } else if (e.maxPrice !== j.maxPrice)
            test2.push({
              airline: j.airline,
              maxPrice: j.maxPrice,
              disabled: false,
            });
        }
      });
      return test2.push({
        airline: e.airline,
        maxPrice: e.maxPrice,
        disabled: true,
      });
    });

    for (let i = 0; i < test2.length; i++) {
      if (test2[i].airline === test2[i + 1]?.airline) test2.splice([i + 1], 1);
    }
    return test2;
  }

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
          <p className="text">Цена</p>
          <div>
            От{" "}
            <input
              name="priceFrom"
              value={priceFrom}
              onChange={(e) => {
                setPriceFrom(e.target.value);
                localStorage.setItem("priceFrom", e.target.value);
                filter();
              }}
            ></input>
          </div>
          <div>
            До{" "}
            <input
              name="priceTo"
              value={priceTo}
              onChange={(e) => {
                setPriceTo(e.target.value);
                localStorage.setItem("priceTo", e.target.value);
                filter();
              }}
            ></input>
          </div>
        </div>
        <div className="sort">
          <p className="text">Авиакомпании</p>
          {filterAirlanes(bla2).map((i, index) => (
            <div className="sort_container" key={index}>
              <input
                id={index}
                type="checkbox"
                value={i.airline}
                onClick={(e) => filterAirlane(e)}
                disabled={i.disabled}
              />
              <label>
                - {i.airline} от {i.maxPrice}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div>
        {initial.length > 0 ? (
          <>
            {initial.map((item, index) => (
              <FlightСard key={index} item={item} />
            ))}
          </>
        ) : (
          <p>По вашему запросу ничего не найдено</p>
        )}
      </div>
    </div>
  );
}

export default App;
