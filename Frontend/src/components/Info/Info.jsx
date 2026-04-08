// // // import React, { useState } from "react";
// // // import Navbar from "../Navbar/Navbar";

// // // const Info = () => {
// // //   const [sidebarOpen, setSidebarOpen] = useState(true);

// // //   const sections = [
// // //     {
// // //       id: "sensors",
// // //       title: "Sensors",
// // //       subsections: ["MPU6050 Sensor"],
// // //     },
// // //     {
// // //       id: "actuators",
// // //       title: "Actuators",
// // //       subsections: ["LED Control"],
// // //     },
// // //   ];

// // //   return (
// // //     <div>
// // //       <Navbar />

// // //       <div style={{ display: "flex", marginTop: "60px" }}>
        
// // //         {/* Sidebar */}
// // //         {sidebarOpen && (
// // //           <div
// // //           style={{
// // //             width: "250px",
// // //             background: "#212529",
// // //             color: "white",
// // //             padding: "20px",
// // //             position: "fixed",
// // //             top: "60px",
// // //             left: "0",
// // //             bottom: "0",
// // //             overflowY: "auto"
// // //           }}
// // //         >
// // //             <h4>Info</h4>

// // //             <ul>
// // //               {sections.map((section, i) => (
// // //                 <li key={i}>
// // //                   <a href={`#${section.id}`} style={{ color: "white" }}>
// // //                     {section.title}
// // //                   </a>

// // //                   <ul>
// // //                     {section.subsections.map((sub, j) => (
// // //                       <li key={j}>{sub}</li>
// // //                     ))}
// // //                   </ul>
// // //                 </li>
// // //               ))}
// // //             </ul>
// // //           </div>
// // //         )}

// // //         {/* Content */}
// // //         <div
// // //   style={{
// // //     padding: "40px",
// // //     marginLeft: "270px",
// // //     flex: 1,
// // //     width: "calc(100% - 270px)"
// // //   }}
// // // >
// // //           <h1>IoT Hardware Information</h1>
// // //           <p>This page contains information about sensors and actuators used with Raspberry Pi.</p>

// // //           {/* Sensors */}
// // //           <section id="sensors">
// // //             <h2>1. Sensors</h2>

// // //             <h3>1.1 MPU6050 Sensor</h3>

// // //             <p>
// // //               The MPU6050 is a sensor that combines a 3-axis accelerometer and a
// // //               3-axis gyroscope. It is commonly used in IoT and robotics projects
// // //               to detect motion, tilt, and rotation.
// // //             </p>

// // //             <h4>Features</h4>
// // //             <ul>
// // //               <li>3-axis accelerometer</li>
// // //               <li>3-axis gyroscope</li>
// // //               <li>I2C communication</li>
// // //               <li>Low power consumption</li>
// // //             </ul>

// // //             <h4>Use Cases</h4>
// // //             <ul>
// // //               <li>Motion detection</li>
// // //               <li>Drone stabilization</li>
// // //               <li>Robot balancing</li>
// // //             </ul>

// // //             <p>
// // //               Reference: electronicwings MPU6050 Raspberry Pi guide.
// // //             </p>
// // //           </section>

// // //           {/* Actuators */}
// // //           <section id="actuators" style={{ marginTop: "40px" }}>
// // //             <h2>2. Actuators</h2>

// // //             <h3>2.1 LED Control</h3>

// // //             <p>
// // //               An actuator is a device that converts electrical signals into
// // //               physical actions. One simple example is an LED.
// // //             </p>

// // //             <h4>Example: LED with Raspberry Pi</h4>

// // //             <ul>
// // //               <li>Connect LED to GPIO pin</li>
// // //               <li>Use a resistor</li>
// // //               <li>Control LED using Python</li>
// // //             </ul>

// // //             <h4>Simple Python Example</h4>

// // //             <pre>
// // // {`import RPi.GPIO as GPIO
// // // import time

// // // GPIO.setmode(GPIO.BCM)
// // // GPIO.setup(18, GPIO.OUT)

// // // while True:
// // //     GPIO.output(18, True)
// // //     time.sleep(1)
// // //     GPIO.output(18, False)
// // //     time.sleep(1)`}
// // //             </pre>

// // //             <p>
// // //               Reference: Raspberry Pi physical computing projects.
// // //             </p>
// // //           </section>

// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default Info;




// // import React, { useEffect, useState } from "react";
// // import Navbar from "../Navbar/Navbar";

// // const Info = () => {
// //     const [sidebarOpen, setSidebarOpen] = useState(true);
// //     useEffect(() => {
// //         document.documentElement.style.scrollBehavior = "smooth";
// //       }, []);
      
// //   const sections = [
// //     {
// //       id: "sensors",
// //       title: "Sensors",
// //       subsections: [
// //         { id: "mpu6050", name: "MPU6050 Sensor" },
// //         { id: "hmc5883l", name: "HMC5883L Magnetometer" },
// //         { id: "dht11", name: "DHT11 Temperature Sensor" },
// //         { id: "pir", name: "PIR Motion Sensor" },
// //         { id: "sai", name: "PIR Motion Sensor" },
// //         { id: "asi", name: "PIR Motion Sensor" },
// //         { id: "isa", name: "PIR Motion Sensor" },
// //         { id: "ias", name: "PIR Motion Sensor" },
// //         { id: "sia", name: "PIR Motion Sensor" },
// //         { id: "sai", name: "PIR Motion Sensor" },
// //         { id: "asi", name: "PIR Motion Sensor" },
// //         { id: "isa", name: "PIR Motion Sensor" },
// //         { id: "ias", name: "PIR Motion Sensor" },
// //         { id: "sia", name: "PIR Motion Sensor" },
// //         { id: "sai", name: "PIR Motion Sensor" },
// //         { id: "asi", name: "PIR Motion Sensor" },
// //         { id: "isa", name: "PIR Motion Sensor" },
// //         { id: "ias", name: "PIR Motion Sensor" },
// //         { id: "sia", name: "PIR Motion Sensor" },
// //         { id: "sai", name: "PIR Motion Sensor" },
// //         { id: "asi", name: "PIR Motion Sensor" },
// //         { id: "isa", name: "PIR Motion Sensor" },
// //         { id: "ias", name: "PIR Motion Sensor" },
// //         { id: "sia", name: "PIR Motion Sensor" },
// //         { id: "sai", name: "PIR Motion Sensor" },
// //         { id: "asi", name: "PIR Motion Sensor" },
// //         { id: "isa", name: "PIR Motion Sensor" },
// //         { id: "ias", name: "PIR Motion Sensor" },
// //         { id: "sia", name: "PIR Motion Sensor" },
// //         { id: "sai", name: "PIR Motion Sensor" },
// //         { id: "asi", name: "PIR Motion Sensor" },
// //         { id: "isa", name: "PIR Motion Sensor" },
// //         { id: "ias", name: "PIR Motion Sensor" },
// //         { id: "sia", name: "PIR Motion Sensor" }

// //       ],
// //     },
// //     {
// //       id: "actuators",
// //       title: "Actuators",
// //       subsections: [
// //         { id: "led", name: "LED Control" },
// //         { id: "buzzer", name: "Buzzer" },
// //         { id: "button", name: "Button" },
// //         { id: "servo", name: "Servo Motor" }
// //       ],
// //     },
// //   ];

// //   return (
// //     <div>

// //       {/* <div style={{ display: "flex", marginTop: "60px" }}> */}
// //       <Navbar />

// //       <button
// //   onClick={() => setSidebarOpen(!sidebarOpen)}
// //   style={{
// //     position: "fixed",
// //     top: "50%",
// //     left: sidebarOpen ? "250px" : "0px",
// //     transform: "translateY(-50%)",
// //     zIndex: 1000,
// //     background: "#343a40",
// //     color: "white",
// //     border: "none",
// //     padding: "10px",
// //     cursor: "pointer",
// //     borderRadius: "0 5px 5px 0"
// //   }}
// // >
// //   {sidebarOpen ? "❮" : "❯"}
// // </button>

// // <div style={{ display: "flex", marginTop: "60px" }}>
// //         {/* Sidebar */}
// //         <div
// //   style={{
// //     width: sidebarOpen ? "250px" : "0px",
// //     background: "#212529",
// //     color: "white",
// //     padding: sidebarOpen ? "20px" : "0px",
// //     position: "fixed",
// //     top: "60px",
// //     bottom: "0",
// //     overflowY: sidebarOpen ? "auto" : "hidden",
// //     transition: "0.3s"
// //   }}
// // >
// //           <h4>Info</h4>

// //           <ul style={{ listStyle: "none", padding: 0 }}>
// //             {sections.map((section, i) => (
// //               <li key={i} style={{ marginBottom: "10px" }}>
// //                 <a href={`#${section.id}`} style={{ color: "white" }}>
// //                   <strong>{section.title}</strong>
// //                 </a>

// //                 <ul style={{ listStyle: "none", paddingLeft: "10px" }}>
// //                   {section.subsections.map((sub, j) => (
// //                     <li key={j}  style={{ paddingLeft: "8px", color: "#ccc" }} >
// //                       <a href={`#${sub.id}`} style={{ color: "#ccc" }}>
// //   {sub.name}
// // </a>
// //                     </li>
// //                   ))}
// //                 </ul>
// //               </li>
// //             ))}
// //           </ul>
// //         </div>

// //         {/* Content */}
// //         <div
// //   style={{
// //     padding: "40px",
// //     marginLeft: sidebarOpen ? "270px" : "40px",
// //     width: sidebarOpen ? "calc(100% - 270px)" : "calc(100% - 40px)",
// //     transition: "0.3s"
// //   }}
// // >

// //           <h1>IoT Hardware Information</h1>
// //           <p>This page explains commonly used Raspberry Pi sensors and actuators.</p>

// //           {/* ================= SENSORS ================= */}

// //           <section id="sensors" style={{ scrollMarginTop: "80px" }}>
// //             <h2>1. Sensors</h2>
// //           </section>

// //           <section id="mpu6050" style={{ scrollMarginTop: "80px" }}>
// //             <h3>1.1 MPU6050 Sensor</h3>
// //             <p>
// //               MPU6050 is a motion tracking device that combines a 3-axis
// //               accelerometer and a 3-axis gyroscope.
// //             </p>

// //             <h4>Features</h4>
// //             <ul>
// //               <li>Measures acceleration and rotation</li>
// //               <li>I2C communication</li>
// //               <li>Used in drones and robots</li>
// //             </ul>
// //           </section>

// //           <section id="hmc5883l" style={{ scrollMarginTop: "80px" }}>
// //             <h3>1.2 HMC5883L Magnetometer</h3>

// //             <p>
// //               HMC5883L is a triple-axis digital magnetometer used to measure
// //               magnetic fields and determine direction (compass).
// //             </p>

// //             <h4>Applications</h4>

// //             <ul>
// //               <li>Digital compass</li>
// //               <li>Navigation systems</li>
// //               <li>Robotics direction sensing</li>
// //             </ul>

// //             <p>
// //               Reference: ElectronicWings HMC5883L Raspberry Pi Guide
// //             </p>
// //           </section>

// //           <section id="dht11" style={{ scrollMarginTop: "80px" }}>
// //             <h3>1.3 DHT11 Temperature & Humidity Sensor</h3>

// //             <p>
// //               DHT11 is a low-cost sensor used to measure temperature and humidity.
// //             </p>

// //             <h4>Features</h4>

// //             <ul>
// //               <li>Measures temperature and humidity</li>
// //               <li>Digital output signal</li>
// //               <li>Low cost environmental sensor</li>
// //             </ul>

// //             <h4>Applications</h4>

// //             <ul>
// //               <li>Weather monitoring</li>
// //               <li>Home automation</li>
// //               <li>IoT environmental systems</li>
// //             </ul>
// //           </section>

// //           <section id="pir" style={{ scrollMarginTop: "80px" }}>
// //             <h3>1.4 PIR Motion Sensor</h3>

// //             <p>
// //               PIR sensors detect motion by measuring infrared radiation changes
// //               caused by moving objects such as humans.
// //             </p>

// //             <h4>Applications</h4>

// //             <ul>
// //               <li>Security systems</li>
// //               <li>Automatic lights</li>
// //               <li>Smart home devices</li>
// //             </ul>
// //           </section>


// //           {/* ================= ACTUATORS ================= */}

// //           <section id="actuators" style={{ marginTop: "40px", scrollMarginTop: "80px" }}>
// //             <h2>2. Actuators</h2>
// //           </section>

// //           <section id="led" style={{ scrollMarginTop: "80px" }}>
// //             <h3>2.1 LED</h3>

// //             <p>
// //               LED is the simplest actuator. It converts electrical signals into
// //               light.
// //             </p>

// //             <h4>Example Python Code</h4>

// //             <pre>
// // {`import RPi.GPIO as GPIO
// // import time

// // GPIO.setmode(GPIO.BCM)
// // GPIO.setup(18, GPIO.OUT)

// // while True:
// //   GPIO.output(18, True)
// //   time.sleep(1)
// //   GPIO.output(18, False)
// //   time.sleep(1)`}
// //             </pre>
// //           </section>

// //           <section id="buzzer" style={{ scrollMarginTop: "80px" }}>
// //             <h3>2.2 Buzzer</h3>

// //             <p>
// //               A buzzer converts electrical signals into sound and is used in
// //               alarms and alerts.
// //             </p>

// //             <ul>
// //               <li>Security alarms</li>
// //               <li>Warning systems</li>
// //               <li>Notification devices</li>
// //             </ul>
// //           </section>

// //           <section id="button" style={{ scrollMarginTop: "80px" }}>
// //             <h3>2.3 Button</h3>

// //             <p>
// //               Buttons are input actuators that allow users to trigger actions
// //               in Raspberry Pi programs.
// //             </p>

// //             <ul>
// //               <li>Control devices</li>
// //               <li>Start/Stop systems</li>
// //               <li>User interaction</li>
// //             </ul>
// //           </section>

// //           <section id="servo" style={{ scrollMarginTop: "80px" }}>
// //             <h3>2.4 Servo Motor</h3>

// //             <p>
// //               A servo motor is used to control precise angular movement.
// //             </p>

// //             <ul>
// //               <li>Robotics</li>
// //               <li>Camera movement</li>
// //               <li>Automation systems</li>
// //             </ul>
// //           </section>

// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Info;


// import React, { useState, useEffect } from "react";
// import Navbar from "../Navbar/Navbar";

// // SAFE IMPORTS ONLY
// import Introduction from "./pages/Introduction";
// import GettingStarted from "./pages/GettingStarted";
// import WiringPiLibrary from "./pages/WiringPiLibrary";
// import GPIOAccess from "./pages/GPIOAccess";
// import PWMGeneration from "./pages/PWMGeneration";
// import UARTCommunication from "./pages/UARTCommunication";
// import I2C from "./pages/I2C";
// import Nokia5110Display from "./pages/Nokia5110Display";
// import GPSModule from "./pages/GPSModule";
// import StepperMotor from "./pages/StepperMotor";
// import Pi3Bluetooth from "./pages/Pi3Bluetooth";
// import LANAccess from "./pages/LANAccess";
// import PiCameraModule from "./pages/PiCameraModule";
// import WiFiAccess from "./pages/WiFiAccess";

// const Info = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const [activePage, setActivePage] = useState("Introduction");

//   useEffect(() => {
//     document.documentElement.style.scrollBehavior = "smooth";
//   }, []);

//   // CLEAN MENU (ONLY WORKING PAGES)
//   const menu = [
//     {
//       title: "Basics",
//       items: [
//         { name: "Introduction", key: "Introduction" },
//         { name: "Getting Started", key: "GettingStarted" },
//       ],
//     },
//     {
//       title: "Core",
//       items: [
//         { name: "WiringPi Library", key: "WiringPiLibrary" },
//         { name: "GPIO Access", key: "GPIOAccess" },
//         { name: "PWM Generation", key: "PWMGeneration" },
//         { name: "UART Communication", key: "UARTCommunication" },
//         { name: "I2C", key: "I2C" },
//       ],
//     },
//     {
//       title: "Display & Modules",
//       items: [
//         { name: "Nokia5110 Display", key: "Nokia5110Display" },
//         { name: "GPS Module", key: "GPSModule" },
//         { name: "Stepper Motor", key: "StepperMotor" },
//       ],
//     },
//     {
//       title: "IoT & Network",
//       items: [
//         { name: "Pi 3 Bluetooth", key: "Pi3Bluetooth" },
//         { name: "LAN Access", key: "LANAccess" },
//         { name: "Pi Camera Module", key: "PiCameraModule" },
//         { name: "WiFi Access", key: "WiFiAccess" },
//       ],
//     },
//   ];

//   // PAGE RENDER
//   const renderPage = () => {
//     switch (activePage) {
//       case "Introduction": return <Introduction />;
//       case "GettingStarted": return <GettingStarted />;
//       case "WiringPiLibrary": return <WiringPiLibrary />;
//       case "GPIOAccess": return <GPIOAccess />;
//       case "PWMGeneration": return <PWMGeneration />;
//       case "UARTCommunication": return <UARTCommunication />;
//       case "I2C": return <I2C />;
//       case "Nokia5110Display": return <Nokia5110Display />;
//       case "GPSModule": return <GPSModule />;
//       case "StepperMotor": return <StepperMotor />;
//       case "Pi3Bluetooth": return <Pi3Bluetooth />;
//       case "LANAccess": return <LANAccess />;
//       case "PiCameraModule": return <PiCameraModule />;
//       case "WiFiAccess": return <WiFiAccess />;
//       default: return <Introduction />;
//     }
//   };

//   return (
//     <div>
//       <Navbar />

//       {/* Toggle Button */}
//       <button
//         onClick={() => setSidebarOpen(prev => !prev)}
//         style={{
//           position: "fixed",
//           top: "50%",
//           left: sidebarOpen ? "250px" : "0px",
//           transform: "translateY(-50%)",
//           zIndex: 1000,
//           background: "#343a40",
//           color: "white",
//           border: "none",
//           padding: "10px",
//           cursor: "pointer",
//           borderRadius: "0 5px 5px 0",
//         }}
//       >
//         {sidebarOpen ? "❮" : "❯"}
//       </button>

//       <div style={{ display: "flex", marginTop: "60px" }}>
        
//         {/* Sidebar */}
//         <div
//           style={{
//             width: sidebarOpen ? "250px" : "0px",
//             background: "#212529",
//             color: "white",
//             padding: sidebarOpen ? "20px" : "0px",
//             position: "fixed",
//             top: "60px",
//             bottom: "0",
//             overflowY: "auto",
//             transition: "0.3s",
//           }}
//         >
//           <h4>Raspberry Pi Docs</h4>

//           {menu.map((section, i) => (
//             <div key={i}>
//               <h5 style={{ color: "#bbb" }}>{section.title}</h5>

//               <ul style={{ listStyle: "none", paddingLeft: "10px" }}>
//                 {section.items.map((item, j) => (
//                   <li key={j}>
//                     <button
//                       onClick={() => setActivePage(item.key)}
//                       style={{
//                         background: "none",
//                         border: "none",
//                         color: activePage === item.key ? "#0d6efd" : "#ccc",
//                         cursor: "pointer",
//                         textAlign: "left",
//                         marginBottom: "6px",
//                       }}
//                     >
//                       {item.name}
//                     </button>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           ))}
//         </div>

//         {/* Content */}
//         <div
//           style={{
//             padding: "20px",
//             marginLeft: sidebarOpen ? "270px" : "20px",
//             width: "100%",
//             transition: "0.3s",
//           }}
//         >
//           {renderPage()}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Info;


import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";

// Existing imports
import Introduction from "./pages/Introduction";
import GettingStarted from "./pages/GettingStarted";
import WiringPiLibrary from "./pages/WiringPiLibrary";
import GPIOAccess from "./pages/GPIOAccess";
import PWMGeneration from "./pages/PWMGeneration";
import UARTCommunication from "./pages/UARTCommunication";
import I2C from "./pages/I2C";
import Nokia5110Display from "./pages/Nokia5110Display";
import GPSModule from "./pages/GPSModule";
import StepperMotor from "./pages/StepperMotor";
import Pi3Bluetooth from "./pages/Pi3Bluetooth";
import LANAccess from "./pages/LANAccess";
import PiCameraModule from "./pages/PiCameraModule";
import WiFiAccess from "./pages/WiFiAccess";

// ✅ ADD YOUR SENSOR PAGES HERE
import MPU6050 from "./pages/MPU6050";
import HMC5883L from "./pages/HMC5883L";
import DHT11 from "./pages/DHT11Sensor";
import PIR from "./pages/PIRMotionSensor";

const Info = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activePage, setActivePage] = useState("Introduction");

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
  }, []);

  // ✅ MENU (Sensors AFTER Core)
  const menu = [
    {
      title: "Basics",
      items: [
        { name: "Introduction", key: "Introduction" },
        { name: "Getting Started", key: "GettingStarted" },
      ],
    },
    {
      title: "Core",
      items: [
        { name: "WiringPi Library", key: "WiringPiLibrary" },
        { name: "GPIO Access", key: "GPIOAccess" },
        { name: "PWM Generation", key: "PWMGeneration" },
        { name: "UART Communication", key: "UARTCommunication" },
        { name: "I2C", key: "I2C" },
      ],
    },
    {
      title: "Sensors",
      items: [
        { name: "MPU6050 (Accelerometer+Gyroscope)", key: "MPU6050" },
        { name: "Magnetometer HMC5883L", key: "HMC5883L" },
        { name: "DHT11 Sensor", key: "DHT11" },
        { name: "PIR Motion Sensor", key: "PIR" },
      ],
    },
    {
      title: "Display & Modules",
      items: [
        { name: "Nokia5110 Display", key: "Nokia5110Display" },
        { name: "GPS Module", key: "GPSModule" },
        { name: "Stepper Motor", key: "StepperMotor" },
      ],
    },
    {
      title: "IoT & Network",
      items: [
        { name: "Pi 3 Bluetooth", key: "Pi3Bluetooth" },
        { name: "LAN Access", key: "LANAccess" },
        { name: "Pi Camera Module", key: "PiCameraModule" },
        { name: "WiFi Access", key: "WiFiAccess" },
      ],
    },
  ];

  // ✅ PAGE ROUTING (CLEAN)
  const renderPage = () => {
    switch (activePage) {
      case "Introduction": return <Introduction />;
      case "GettingStarted": return <GettingStarted />;
      case "WiringPiLibrary": return <WiringPiLibrary />;
      case "GPIOAccess": return <GPIOAccess />;
      case "PWMGeneration": return <PWMGeneration />;
      case "UARTCommunication": return <UARTCommunication />;
      case "I2C": return <I2C />;

      // ✅ SENSOR PAGES CONNECTED
      case "MPU6050": return <MPU6050 />;
      case "HMC5883L": return <HMC5883L />;
      case "DHT11": return <DHT11 />;
      case "PIR": return <PIR />;

      case "Nokia5110Display": return <Nokia5110Display />;
      case "GPSModule": return <GPSModule />;
      case "StepperMotor": return <StepperMotor />;
      case "Pi3Bluetooth": return <Pi3Bluetooth />;
      case "LANAccess": return <LANAccess />;
      case "PiCameraModule": return <PiCameraModule />;
      case "WiFiAccess": return <WiFiAccess />;

      default: return <Introduction />;
    }
  };

  return (
    <div>
      <Navbar />

      {/* Toggle Sidebar */}
      <button
        onClick={() => setSidebarOpen(prev => !prev)}
        style={{
          position: "fixed",
          top: "50%",
          left: sidebarOpen ? "250px" : "0px",
          transform: "translateY(-50%)",
          zIndex: 1000,
          background: "#343a40",
          color: "white",
          border: "none",
          padding: "10px",
          cursor: "pointer",
          borderRadius: "0 5px 5px 0",
        }}
      >
        {sidebarOpen ? "❮" : "❯"}
      </button>

      <div style={{ display: "flex", marginTop: "60px" }}>
        
        {/* Sidebar */}
        <div
          style={{
            width: sidebarOpen ? "250px" : "0px",
            background: "#212529",
            color: "white",
            padding: sidebarOpen ? "20px" : "0px",
            position: "fixed",
            top: "60px",
            bottom: "0",
            overflowY: "auto",
            transition: "0.3s",
          }}
        >
          <h4>Raspberry Pi Docs</h4>

          {menu.map((section, i) => (
            <div key={i}>
              <h5 style={{ color: "#bbb" }}>{section.title}</h5>

              <ul style={{ listStyle: "none", paddingLeft: "10px" }}>
                {section.items.map((item, j) => (
                  <li key={j}>
                    <button
                      onClick={() => setActivePage(item.key)}
                      style={{
                        background: activePage === item.key ? "#0d6efd" : "none",
                        border: "none",
                        color: activePage === item.key ? "white" : "#ccc",
                        cursor: "pointer",
                        textAlign: "left",
                        marginBottom: "6px",
                        padding: "5px",
                        width: "100%",
                      }}
                    >
                      {item.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Content */}
        <div
          style={{
            padding: "20px",
            marginLeft: sidebarOpen ? "270px" : "20px",
            width: "100%",
            transition: "0.3s",
          }}
        >
          {renderPage()}
        </div>
      </div>
    </div>
  );
};

export default Info;