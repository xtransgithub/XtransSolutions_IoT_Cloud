import React from "react";

const boxStyle = {
  background: "#f1f1f1",
  border: "1px solid #ddd",
  padding: "12px",
  borderRadius: "6px",
  fontFamily: "monospace",
  marginTop: "10px",
  marginBottom: "10px"
};

function LANAccess() {
  return (
    <div style={{ padding: "20px", lineHeight: "1.6" }}>
     <h1>Access Raspberry Pi Home Screen on Laptop Display using LAN(Ethernet)</h1>
      <h1>Introduction</h1>

      <ul>
        <li>Raspberry Pi is a small computer with provision of GPIO accessibility. But in order to access the Raspberry Pi, we need a display to log in and perform other tasks. If we have a Digital display or a TV screen then we can use it to access Raspberry Pi.</li>
        <li>But, if we don’t have a display, we can use our Laptop screen with Raspberry Pi for accessing CLI (Command Line Interface) or GUI (Graphical User Interface) of Raspberry Pi.</li>
        <li>As Raspberry Pi have On-board Ethernet Port, we can use this port to connect Laptop. It does not require any Extra display apart from the Laptop’s display.</li>
        <li>Here, we will access Raspberry Pi home screen using Laptop through LAN/Ethernet port.</li>
      </ul>

      <h1>How to use Laptop Screen to access Raspberry Pi using LAN</h1>

      <p>To access Raspberry Pi on Laptop screen, follow the steps given below,</p>

      <p>Open <b>Control Panel</b> and select <b>Network and Sharing Centre</b>.</p>

      <img src="https://www.electronicwings.com/storage/PlatformSection/TopicContent/335/description/network%20and%20sharing%20center.png" style={{ maxWidth: "100%" }} />

      <p>Then, select <b>change adapter settings</b> option</p>

      <img src="https://www.electronicwings.com/storage/PlatformSection/TopicContent/335/description/change%20adapter%20setting.png" style={{ maxWidth: "100%" }} />

      <p>After selecting change adapter settings option, we will get window which is as shown below:</p>

      <img src="https://www.electronicwings.com/storage/PlatformSection/TopicContent/335/description/after%20select%20adapter%20options.png" style={{ maxWidth: "100%" }} />

      <p>Now, check properties of both LAN and Wireless Network connection. Double click on Wireless Network connection and select properties option as shown below.</p>

      <img src="https://www.electronicwings.com/storage/PlatformSection/TopicContent/335/description/Wireless%20Properties.png" style={{ maxWidth: "100%" }} />

      <p>In properties, check for IPv4 configuration as follows.</p>

      <img src="https://www.electronicwings.com/storage/PlatformSection/TopicContent/335/description/select%20IPv4%20properties.png" style={{ maxWidth: "100%" }} />

      <p>After selecting IPv4 properties, make sure that <b>obtain an IP address automatically</b> and <b>obtain DNS server automatically</b> option is selected as shown below.</p>

      <img src="https://www.electronicwings.com/storage/PlatformSection/TopicContent/335/description/obtain%20ip%20automatically.png" style={{ maxWidth: "100%" }} />

      <p>Do the same process for Local Area Network (LAN).</p>

      <p>
        Now, select both <b>Local Area Connection (LAN)</b> and <b>Wireless Connection Network</b> and create network bridging connection  between them. This can be done by right clicking on them which is shown as follows.
      </p>

      <img src="https://www.electronicwings.com/storage/PlatformSection/TopicContent/335/description/bridging%20connections.png" style={{ maxWidth: "100%" }} />

      <p>Now, bridge is created in between them as shown in below image.</p>

      <img src="https://www.electronicwings.com/storage/PlatformSection/TopicContent/335/description/created%20bridging%20connection.png" style={{ maxWidth: "100%" }} />

      <p>Now, connect LAN cable with one end connect to Raspberry Pi and other end connect to the Laptop.</p>

      <p>Now, check your IP and Default Gateway IP by entering following command in command prompt of windows.</p>

      <div style={boxStyle}>ipconfig</div>

      <img src="https://www.electronicwings.com/storage/PlatformSection/TopicContent/335/description/ipconfig.png" style={{ maxWidth: "100%" }} />

      <p>
      We can see in above image the default gateway IP is 192.168.0.1. So, our Raspberry Pi’s dynamic IP will be in the range of 192.168.0.2 – 192.168.0.255 as it is in the same network.      </p>

      <p>
      We need to know IP address of Raspberry Pi for logging in Raspberry Pi using SSH (Shell Script). We can find this IP address using <b>“Advanced IP Scanner”</b> Application. Install this application and open it.      </p>
      <p>After opening this application, we will see a window as shown below,</p>
      <img src="https://www.electronicwings.com/storage/PlatformSection/TopicContent/335/description/advance%20IP%20Scanner.png" style={{ maxWidth: "100%" }} />

      <p>To search IP address assigned to Raspberry Pi, please type the IP address range of network as shown in below image</p>

      <img src="https://www.electronicwings.com/storage/PlatformSection/TopicContent/335/description/type%20ip%20address.png" style={{ maxWidth: "100%" }} />
       <p>And click on Scan button.</p>
      <p>We will get IP addresses of all devices connected to the network as shown below,</p>

      <img src="https://www.electronicwings.com/storage/PlatformSection/TopicContent/335/description/found%20pi_edited.png" style={{ maxWidth: "100%" }} />
      <p>In above image, we can see IP address of Raspberry Pi.</p>
      <p>
      To Login into the Raspberry Pi, use Putty for using SSH port. Open putty and enter Raspberry Pi’s IP address in Host Name Field. Following demonstration will show how to Log in to the Raspberry Pi using SSH.
      </p>

      {/* YouTube Video */}
      <h2>SSH Login Demonstration</h2>

      <div style={{
        borderRadius: "12px",
        overflow: "hidden",
        marginTop: "20px"
      }}>
        <iframe
          width="100%"
          height="400"
          src="https://www.youtube.com/embed/RtzVl8bKvFQ"
          title="SSH Demo"
          allowFullScreen
        ></iframe>
      </div>

      <p>
      Hurray!!! We are successfully logged into the Raspberry Pi’s Command Line Interface (CLI) and able to access Internet over it as we connect to Raspberry Pi through LAN.      </p>

      <h1>Still facing Problem in Accessing Internet?</h1>

      <p>After sharing wi-fi with Raspberry Pi through LAN (ethernet), we need to test that our internet is working or not. We can test this by using ping request as shown below,</p>

      <div style={boxStyle}>ping www.google.com</div>

      <p>If ping request is successful then our internet is working properly. But, if it is not responding then we need to resolve this internet connectivity problem.</p>
      <p>To solve this issue, we can do following things,</p>
      <p>Add dns-nameserver and nameserver manually. To do this open resolv.conf using following command.</p>
      <div style={boxStyle}>sudo nano /etc/resolv.conf</div>

      <p>Add our default gateway as dns-nameserver and 8.8.8.8 as nameserver which is shown below,</p>

      <img src="https://www.electronicwings.com/storage/PlatformSection/TopicContent/335/description/resolv_conf.png" style={{ maxWidth: "100%" }} />

      <p>And save the above configuration.</p>
      <p>To make this change permanent, enter following command</p>

      <div style={boxStyle}>sudo chattr +i /etc/resolv.conf</div>

      <p>And reboot the Raspberry Pi.</p>

      <p>Now, you can access internet over Raspberry Pi.</p>

    </div>
  );
}

export default LANAccess;