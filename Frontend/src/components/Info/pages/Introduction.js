import React from "react";
import piImage from "../images/Raspberry-Pi-3_model-removebg-preview.png";
import reberrypizero from "../images/Raspberry_Pi_Zero-removebg-preview.png";
import resperrypi3 from "../images/Raspberry-Pi-3-removebg-preview.png"
function Introduction() {
  return (
    <div style={{ padding: "20px", lineHeight: "1.8" }}>
      <h1>Raspberry Pi Introduction</h1>

      <img
  src={piImage}
  alt="Raspberry Pi Model"
  style={{ width: "400px", marginBottom: "20px" }}
/>

      <h2>What is Raspberry Pi?</h2>
      <p>
        Raspberry Pi is a small single board computer. By connecting peripherals
        like Keyboard, mouse, display to the Raspberry Pi, it will act as a mini
        personal computer.
      </p>

      <p>
        Raspberry Pi is popularly used for real time Image/Video Processing, IoT
        based applications and Robotics applications.
      </p>

      <p>
        Raspberry Pi is slower than laptop or desktop but is still a computer
        which can provide all the expected features or abilities, at a low power
        consumption.
      </p>

      <h5><b>OS for Raspberry Pi</b></h5>
      <p>
        Raspberry Pi Foundation officially provides Debian based Raspbian OS.
        Also, they provide NOOBS OS for Raspberry Pi. We can install several
        Third-Party versions of OS like Ubuntu, Archlinux, RISC OS, Windows 10
        IOT Core, etc.
      </p>

      <p>
        Raspbian OS is official Operating System available for free to use. This
        OS is efficiently optimized to use with Raspberry Pi. Raspbian have GUI
        which includes tools for Browsing, Python programming, office, games,
        etc.
      </p>

      <p>
        We should use SD card (minimum 8 GB recommended) to store the OS
        (operating System).
      </p>

      <h5><b>Raspberry Pi Features </b></h5>
      <p>
        Raspberry Pi is more than computer as it provides access to the on-chip
        hardware i.e. GPIOs for developing an application. By accessing GPIO, we
        can connect devices like LED, motors, sensors, etc and can control them
        too.
      </p>

      <h2>Raspberry Pi Processor</h2>
      <p>
        It has ARM based Broadcom Processor SoC along with on-chip GPU (Graphics
        Processing Unit).
      </p>

      <p>
        The CPU speed of Raspberry Pi varies from 700 MHz to 1.2 GHz. Also, it
        has on-board SDRAM that ranges from 256 MB to 1 GB.
      </p>

      <p>
        Raspberry Pi also provides on-chip SPI, I2C, I2S and UART modules.
      </p>

      <h2>Versions of Raspberry Pi Models</h2>
      <p>
        There are different versions of raspberry pi available as listed below:
      </p>

    <ol style={{ fontFamily: "Arial", lineHeight: "1.8" }}>
  <li><b>1.Raspberry Pi 1 Model A</b></li>
  <li><b>2.Raspberry Pi 1 Model A+</b></li>
  <li><b>3.Raspberry Pi 1 Model B</b></li>
  <li><b>4.Raspberry Pi 1 Model B+</b></li>
  <li><b>5.Raspberry Pi 2 Model B</b></li>
  <li><b>6.Raspberry Pi 3 Model B</b></li>
  <li><b>7.Raspberry Pi Zero</b></li>
</ol>

      <h2>Features Comparison Table</h2>

      <table border="1" cellPadding="10" style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Features</th>
            <th>Raspberry Pi Model B+</th>
            <th>Raspberry Pi 2 Model B</th>
            <th>Raspberry Pi 3 Model B</th>
            <th>Raspberry Pi Zero</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>SoC</td>
            <td>BCM2835</td>
            <td>BCM2836</td>
            <td>BCM2837</td>
            <td>BCM2835</td>
          </tr>
          <tr>
            <td>CPU</td>
            <td>ARM11</td>
            <td>Quad Cortex A7</td>
            <td>Quad Cortex A53</td>
            <td>ARM11</td>
          </tr>
          <tr>
            <td>Operating Freq.</td>
            <td>700 MHz</td>
            <td>900 MHz</td>
            <td>1.2 GHz</td>
            <td>1 GHz</td>
          </tr>
          <tr>
            <td>RAM</td>
            <td>512 MB SDRAM</td>
            <td>1 GB SDRAM</td>
            <td>1 GB SDRAM</td>
            <td>512 MB SDRAM</td>
          </tr>
          <tr>
            <td>GPU</td>
            <td>250 MHz Videocore IV</td>
            <td>250 MHz Videocore IV</td>
            <td>400 MHz Videocore IV</td>
            <td>250 MHz Videocore IV</td>
          </tr>
          <tr>
            <td>Storage</td>
            <td>micro-SD</td>
            <td>Micro-SD</td>
            <td>micro-SD</td>
            <td>micro-SD</td>
          </tr>
          <tr>
            <td>Ethernet</td>
            <td>Yes</td>
            <td>Yes</td>
            <td>Yes</td>
            <td>No</td>
          </tr>
          <tr>
            <td>Wireless</td>
            <td>WiFi and Bluetooth</td>
            <td>No</td>
            <td>No</td>
            <td>No</td>
          </tr>
        </tbody>
      </table>

      <h2>Raspberry Pi Zero Board</h2>
      <img
        src={reberrypizero}
        alt="Raspberry Pi Zero"
        style={{ width: "400px", marginBottom: "20px" }}
      />
      <p>Raspberry Pi Zero</p>
      <h2>Raspberry Pi Board</h2>
      <img
        src={resperrypi3}
        alt="Raspberry Pi 3"
        style={{ width: "400px", marginBottom: "20px" }}
      />
       <p>Raspberry Pi Board</p>
      <h2>Raspberry Pi 3 Hardware Details</h2>
     <p>The On-chip hardware of Raspberry Pi 3 (here) is as shown in below figure,</p>

      <img
        src="https://www.electronicwings.com/storage/PlatformSection/TopicContent/296/description/Raspberry%20Pi%203%20hardware(0).png"
        alt="Raspberry Pi 3 Hardware"
        style={{ width: "500px", marginBottom: "20px" }}
      />
      <p>Raspberry Pi 3 Model B Hardware</p>
      <h5> <b>Some Hardware Components shown above are mention below:</b></h5>

      <ul>
        <li>
          <strong>1.HDMI (High-Definition Multimedia Interface):</strong> It is
          used for transmitting uncompressed video or digital audio data to the
          Computer Monitor, Digital TV, etc. Generally, this HDMI port helps to
          connect Raspberry Pi to the Digital television.
        </li>

        <li>
          <strong>2.CSI Camera Interface:</strong> CSI (Camera Serial Interface)
          interface provides a connection in between Broadcom Processor and Pi
          camera. This interface provides electrical connections between two
          devices.
        </li>

        <li>
          <strong>3.DSI Display Interface:</strong> DSI (Display Serial Interface)
          Display Interface is used for connecting LCD to the Raspberry Pi using
          15-pin ribbon cable. DSI provides fast High-resolution display
          interface specifically used for sending video data directly from GPU
          to the LCD display.
        </li>

        <li>
          <strong>4.Composite Video and Audio Output:</strong> The composite Video
          and Audio output port carries video along with audio signal to the
          Audio/Video systems.
        </li>

        <li>
          <strong>5.Power LED:</strong> It is a RED colored LED which is used for
          Power indication. This LED will turn ON when Power is connected to the
          Raspberry Pi. It is connected to 5V directly and will start blinking
          whenever the supply voltage drops below 4.63V.
        </li>

        <li>
          <strong>6.ACT PWR:</strong> ACT PWR is Green LED which shows the SD card
          activity.
        </li>
      </ul>
    </div>
  );
}

export default Introduction;