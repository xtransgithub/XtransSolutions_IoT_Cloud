import React from "react";

const codeStyle = {
  background: "#1e1e1e",
  color: "#d4d4d4",
  padding: "15px",
  borderRadius: "10px",
  overflowX: "auto",
  fontSize: "14px",
  lineHeight: "1.5",
  marginBottom: "20px",
  border: "1px solid #333"
};
function WifiAccess() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>
        Access Raspberry Pi on Laptop using Wi-Fi
      </h1>
      <h1>Introduction</h1>
      <ul>
        <li>
        Raspberry Pi is a small computer which needs a display to access Raspberry Pi Home (CLI or GUI). So, we need external display to access Raspberry Pi.        </li>
        <li>
         If we have display/TV then we can connect Raspberry Pi to the display using HDMI or VGA cable. But, if we don’t have a display, then we can access Raspberry Pi using Laptop’s Screen. This can be done by using Raspberry Pi Wi-Fi.        </li>
        <li>
         To access Raspberry Pi, we need to connect Raspberry Pi to a wifi network after boot so that we can access it on Laptop using wi-fi network.        </li>
        <li>
         When Raspberry Pi is connected to the wifi network, we can access it on Laptop by finding its IP address. This method is suitable when we don’t have display for logging into Raspberry Pi.
        </li>
      </ul>

      <h1>How to Connect Raspberry Pi to Laptop?</h1>
      <ul>
        <li>Download the Raspbian OS.</li>
        <li>After downloading Raspbian OS on the SD card, open the SD card on laptop and then open directory is given below:</li>
      </ul>

      <pre style={codeStyle}>
{`sudo nano /etc/wpa_supplicant/wpa_supplicant.conf`}
      </pre>

      <p>Add following details in the opened file,</p>

      <pre style={codeStyle}>
{`ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
update_config=1
country=US

network={
    ssid="Enter your SSID"
    psk="Enter your password"
    key_mgmt=WPA-PSK
}`}
      </pre>

      <ul>
        <li>Then, save above file using Ctrl+X.</li>
        <li>Now, open following directory and add highlighted line shown in below image,</li>
      </ul>

      <pre style={codeStyle}>
{`sudo nano /etc/network/interfaces`}
      </pre>

      <img
        src="https://www.electronicwings.com/storage/PlatformSection/TopicContent/337/description/network_interface_conf.png"
        alt="Network interface configuration"
        style={{ width: "100%", maxWidth: "600px" }}
      />

      <p>Save the file.</p>

      <h1>SSH Remote Login</h1>
      <p>Now, we have to login to Raspberry Pi using SSH.</p>
      <p>Also for remote login into raspberry using SSH, we need to enable SSH on Raspberry Pi.</p>
      <p>
        To enable SSH, just add a file named <b>ssh</b> with no extension onto the boot partition of SD card. We don’t need to write anything in ssh file.      </p>
      <p>Now, eject the SD card and insert it into Raspberry Pi Board and power-on Raspberry Pi.</p>
      <p>Raspberry Pi will now connect to WiFi network automatically after booting. Now, we can find the IP address of Raspberry Pi using Advance IP scanner. Advance IP scanner scans the network and provides list of connected device. In that we will get IP address of Raspberry Pi. to know about how to use Advance IP scanner, you can refer Access Raspberry Pi Home Screen on Laptop Display using LAN</p>
      <p>
          After getting IP address of Raspberry Pi, use Putty (SSH) for logging into the raspberry Pi given in below demo,      </p>

      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/RtzVl8bKvFQ"
        title="SSH Demo"
        frameBorder="0"
        allowFullScreen
      ></iframe>
      <p>Now, we can access Raspberry Pi CLI (Command Line Interface). If we have to access Raspberry Pi GUI then we can access it using VNC viewer. Before using VNC viewer, we need to enable it using command.</p>

      <h1>VNC (Virtual Network Computing) Viewer Enabling</h1>
      <p>To access Raspberry Pi’s Graphical user interface, we can use VNC viewer which allows us to control the Raspberry Pi home remotely using Mobile, Laptop, etc. With VNC server, we can see Raspberry Pi home on our computer or mobile.</p>
     <p>To enable VNC viewer on Raspberry Pi use CLI (command line interface) and following few steps given below,</p>
      <pre style={codeStyle}>
{`sudo raspi-config`}
      </pre>

      <p>Now, select Interfacing option for enabling VNC.</p>

      <img
        src="https://www.electronicwings.com/storage/PlatformSection/TopicContent/337/description/vnc_enable.png"
        alt="Enable VNC viewer"
        style={{ width: "100%", maxWidth: "600px" }}
      />
     <p>Then enable VNC as shown in below image,</p>
      <img
        src="https://www.electronicwings.com/storage/PlatformSection/TopicContent/337/description/vnc_enabled.png"
        alt="VNC enabled"
        style={{ width: "100%", maxWidth: "600px" }}
      />

      <p>Now, reboot raspberry pi to apply changes.</p>

      <h1>Connecting to Raspberry Pi with VNC Viewer</h1>
       <p>Now, we can connect to Raspberry Pi using VNC Server. For login to Raspberry Pi using VNC, Download and Install VNC viewer application on laptop.</p>
      <p>
        After installing VNC viewer application, the application window will appear as shown below,
      </p>

      <img
        src="https://www.electronicwings.com/storage/PlatformSection/TopicContent/337/description/Screenshot_0.png"
        alt="VNC Viewer Home"
        style={{ width: "100%", maxWidth: "600px" }}
      />

      <p>
      Now, select File option and in that select new connection as shown below,      </p>
      <img src="https://www.electronicwings.com/storage/PlatformSection/TopicContent/337/description/Screenshot_1.png" alt="VNC Viewer Home"
        style={{ width: "100%", maxWidth: "600px" }}/>
        <p>Then, following window will pop-up</p>
        <img src="https://www.electronicwings.com/storage/PlatformSection/TopicContent/337/description/Screenshot_2.png" alt="VNC Viewer Home"
        style={{ width: "100%", maxWidth: "600px" }}/>
        <p>Enter IP of your Raspberry Pi which was found by Advance IP scanner and provide any name as shown below,</p>
        <img src="https://www.electronicwings.com/storage/PlatformSection/TopicContent/337/description/Screenshot_3.png" alt="VNC Viewer Home"
        style={{ width: "100%", maxWidth: "600px" }} />
        <p>Then a small window will pop-up which is shown below,</p>
        <img src="https://www.electronicwings.com/storage/PlatformSection/TopicContent/337/description/Screenshot_4.png" alt="VNC Viewer Home"
        style={{ width: "100%", maxWidth: "600px" }}/>
        <p>And select continue.</p>
        <p>Then, add login details as shown below,</p>
        <img src="https://www.electronicwings.com/storage/PlatformSection/TopicContent/337/description/Screenshot_5.png" alt="VNC Viewer Home"
        style={{ width: "100%", maxWidth: "600px" }} />
        <p>Now, we successfully logged into the Raspberry Pi.</p>
        <p>We can see the CLI (Command Line Interface) of raspberry Pi. To access Raspberry Pi in GUI mode, enter following command</p>
        <pre style={codeStyle}>{`startx`}</pre>
        <p>and we will get GUI home screen of Raspberry Pi as shown below.</p>
        <img src="https://www.electronicwings.com/storage/PlatformSection/TopicContent/337/description/Screenshot_7.png" alt="VNC Viewer Home"
        style={{ width: "100%", maxWidth: "600px" }}/>
        <p>Now, we can access Raspberry Pi home screen on Laptop’s display.</p>
    </div>
  );
}

export default WifiAccess;