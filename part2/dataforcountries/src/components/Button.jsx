import { useState } from "react";
import SingleCountry from "./SingleCountry";

const Button = (props) => {
  const { country } = props;
  const [isClicked, setIsClicked] = useState(false);
  const hanleClick = () => setIsClicked(!isClicked);
  return (
    <>
      <button onClick={hanleClick}>{isClicked ? "collapse" : "show"}</button>
      {isClicked ? <SingleCountry country={country} /> : <></>}
    </>
  );
};

export default Button;
