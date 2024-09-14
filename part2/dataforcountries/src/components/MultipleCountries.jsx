import Name from "./Name";

const MultipleCountries = (props) => {
  const { countries } = props;
  return (
    <div>
      {countries.map((country) => (
        <Name country={country} key={country.name.official} />
      ))}
    </div>
  );
};

export default MultipleCountries;
