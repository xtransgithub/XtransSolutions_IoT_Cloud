import React from "react";
import HDMICable from "../images/HDMI-Cable-removebg-preview.png"
import HDMItoVGAConverter from "../images/HDMI_to_VGA_converter-removebg-preview.png"
import VGACable from "../images/VGA_cable-removebg-preview.png"
function GettingStarted() {
  return (
    <div style={{ padding: "20px", lineHeight: "1.8" }}>
      <h1>Getting Started with Raspberry Pi</h1>

      <p>
        To get started with Raspberry Pi, we have to store required OS on SD card.
        Now to store OS on SD card we need to install OS on SD card. If you want
        to know how to install/store OS on SD card you can refer Installing
        Operating System Image on SD card.
      </p>

      <p>
        Here, we installed the Raspbian OS on SD card.
      </p>
      <p> Now, we have an SD card
        with installed OS and Raspberry Pi Board.</p>

      <p>
        Initially to use raspberry Pi we need computer monitor or Digital Display.
        We can directly connect Raspberry Pi to the Digital Display using HDMI cable.
      </p>

      <h3>HDMI Cable</h3>
      <img
        src={HDMICable}
        alt="HDMI Cable"
        style={{ width: "300px", marginBottom: "20px" }}
      />

      <p>
        But, if we have a computer monitor (VGA Display), then we need an HDMI to
        VGA converter along with a VGA cable for connecting Raspberry Pi with
        monitors. HDMI to VGA converter and VGA cable is shown below.
      </p>

      <h3>HDMI to VGA Converter</h3>
      <img
        src={HDMItoVGAConverter}
        alt="HDMI to VGA Converter"
        style={{ width: "300px", marginBottom: "20px" }}
      />

      <h3>VGA Cable</h3>
      <img
        src={VGACable}
        alt="VGA Cable"
        style={{ width: "300px", marginBottom: "20px" }}
      />

      <p>
        Now, connect the Raspberry Pi to the Display/monitor and Power-On
        Raspberry Pi. We will get a Black command window asking for Login and
        Password as shown below:
      </p>

      <img
        src="https://www.electronicwings.com/storage/PlatformSection/TopicContent/297/description/Raspberry%20Pi%20login.png"
        alt="Login Screen"
        style={{ width: "400px", marginBottom: "20px" }}
      />

      <h3>Default Login Credentials</h3>
      <pre
        style={{
          background: "#111",
          color: "#0f0",
          padding: "15px",
          borderRadius: "8px",
        }}
      >
{`raspberrypi Login: pi
Password: raspberry`}
      </pre>

      <p>
        This is the default user name and password. You can change the password
        after the first login. The above command window can be used to operate
        Raspberry Pi.
      </p>

      <h3>Start GUI</h3>
      <p>To get GUI environment on Raspberry Pi, use below command:</p>

      <pre
        style={{
          background: "#111",
          color: "#0f0",
          padding: "15px",
          borderRadius: "8px",
        }}
      >
{`startx`}
      </pre>

      <p>
        And we will get Home Screen of Raspberry Pi as shown below:
      </p>

      <img
        src="https://www.electronicwings.com/storage/PlatformSection/TopicContent/297/description/homescreen.jpg"
        alt="Home Screen"
        style={{ width: "500px", marginBottom: "20px" }}
      />

      <p>
        On display, there is a symbol of raspberry to the top-left corner of
        display. After clicking on it, we will get menu as shown below:
      </p>

      <img
        src="https://www.electronicwings.com/storage/PlatformSection/TopicContent/297/description/Home%20Screen%20navigation.jpg"
        alt="Menu Navigation"
        style={{ width: "400px", marginBottom: "20px" }}
      />

      <p>
        As we can see, the Raspbian OS has installed Python 2 & 3. It also has
        different programming IDE like Geany, BlueJ Java IDE, etc. As raspberry
        pi 3 has On-chip WiFi, we can connect it to the network and will get
        access over Internet.
      </p>

      <p>We can also change password of “Pi” user.</p>

      <p>
        To change password, click on preferences and then select Raspberry Pi
        Configuration which will provide a pop-up window.
      </p>

      <img
        src="https://www.electronicwings.com/storage/PlatformSection/TopicContent/297/description/raspi-config.jpg"
        alt="Raspberry Pi Config"
        style={{ width: "400px", marginBottom: "20px" }}
      />

      <p>Then, click on change password option shown below.</p>

      <img
        src="https://www.electronicwings.com/storage/PlatformSection/TopicContent/297/description/Raspi%20configuration.png"
        alt="Change Password"
        style={{ width: "400px", marginBottom: "20px" }}
      />

      <p>Now, we are quite familiar with Raspberry Pi OS.</p>

      <h2>How to write C program on Raspbian OS</h2>

      <p>
        <li>So, let’s write our First C code on Raspbian and execute it. </li>
        <li>First Create Empty file and label it with .c extension.</li>
       <li>  Now write a small program to print “Hello World”</li>
      </p>

      <h3>Program</h3>

      <pre
        style={{
          background: "#1e1e1e",
          color: "#fff",
          padding: "15px",
          borderRadius: "8px",
          overflowX: "auto",
        }}
      >
{`#include<stdio.h>

int main(){
     printf("Hello World");
     return 0;
}`}
      </pre>

      <p>
        After writing the code, open terminal (ctrl+alt+t) to execute it. Then,
        type following commands for compiling and execution.
      </p>

      <img
        src="https://www.electronicwings.com/storage/PlatformSection/TopicContent/297/description/C%20program%20execution.png"
        alt="C Program Execution"
        style={{ width: "500px", marginBottom: "20px" }}
      />
    </div>
  );
}

export default GettingStarted;