import Button from "./Button";

const Name = ({ country }) => {
  return (
    <div>
      {country.name.common}
      <Button country={country} />
    </div>
  );
};

export default Name;
