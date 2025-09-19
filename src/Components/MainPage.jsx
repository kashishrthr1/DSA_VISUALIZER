import { useState } from "react";
import Controler from "./Controler";
import NavMain from "./NavMain";
import BarsDisplay from "./BarsDisplay";
import "../App.css";

export default function MainPage() {
  const [bars, setBars] = useState([1, 69, 10, 82, 11, 25, 8, 14, 2, 51]);
  const [inputSize, setInputSize] = useState(10);
  return (
    <>
      <div className="mainPage">
        <NavMain />
        <BarsDisplay bars={bars}></BarsDisplay>
        <Controler
          bars={bars}
          setBars={setBars}
          inputSize={inputSize}
          setInputSize={setInputSize}
        />
      </div>
    </>
  );
}
