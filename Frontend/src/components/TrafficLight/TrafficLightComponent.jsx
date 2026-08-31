import React from "react";
import "./TrafficLight.css";

const TrafficLightComponent = ({ color }) => {

    return (
        <div className="traffic-container">

            <div 
                className={`light red ${color === "red" ? "blink" : ""}`}
            ></div>

            <div 
                className={`light yellow ${color === "yellow" ? "blink" : ""}`}
            ></div>

            <div 
                className={`light green ${color === "green" ? "blink" : ""}`}
            ></div>

        </div>
    );
};

export default TrafficLightComponent;