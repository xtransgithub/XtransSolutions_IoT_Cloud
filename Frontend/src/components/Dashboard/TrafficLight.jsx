import React from "react";
import "./dashboard.css";

const TrafficLight = ({ red, yellow, green }) => {

  const active = (value) => Number(value) === 1;

  return (
    <div className="traffic-container">

      <div 
        className={`light red-light ${active(red) ? "blink-red" : ""}`}
      >
      </div>


      <div 
        className={`light yellow-light ${active(yellow) ? "blink-yellow" : ""}`}
      >
      </div>


      <div 
        className={`light green-light ${active(green) ? "blink-green" : ""}`}
      >
      </div>


    </div>
  );
};

export default TrafficLight;