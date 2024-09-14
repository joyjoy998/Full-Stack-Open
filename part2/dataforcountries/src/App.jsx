import axios from "axios";
import { useEffect, useState } from "react";
import MultipleCountries from "./components/MultipleCountries";
import SingleCountry from "./components/SingleCountry";

function App() {
  const [value, setValue] = useState("");
  const [country, setCountry] = useState([]);
  const [isSingle, setIsSingle] = useState(false);
  const [countryToShow, setCountryToShow] = useState([]);

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        setCountry(response.data);
      });
  }, []);

  const handleChange = (event) => {
    const inputValue = event.target.value;
    setValue(inputValue);
    const filteredCountries = country.filter((c) =>
      c.name.common.toLowerCase().includes(inputValue.toLowerCase())
    );
    setCountryToShow(filteredCountries);
  };

  useEffect(() => {
    if (countryToShow.length === 1) {
      setIsSingle(true);
    } else {
      setIsSingle(false);
    }
  }, [countryToShow]);
  console.log(countryToShow);

  const renderCountries = () => {
    if (countryToShow.length === 0 && value === "") {
      return <p>Too many matches, specify another filter</p>;
    }

    if (countryToShow.length > 10) {
      return <p>Too many matches, specify another filter</p>;
    }

    if (countryToShow.length === 1) {
      return <SingleCountry country={countryToShow[0]} />;
    }

    return <MultipleCountries countries={countryToShow} />;
  };

  return (
    <div>
      find countries
      <input onChange={handleChange} value={value} />
      {renderCountries()}
    </div>
  );
}

export default App;
