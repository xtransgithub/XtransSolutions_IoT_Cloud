import React from "react";
import Nokia5110LCD from "../images/Nokia_5110_LCD-removebg-preview.png"
import ConnectionDiagram from "../images/ripi_interface_with_Nokia5110-removebg-preview.png"
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

const labelStyle = {
  background: "#0d6efd",
  color: "white",
  padding: "6px 12px",
  borderRadius: "6px",
  display: "inline-block",
  marginBottom: "10px",
  fontSize: "13px",
  fontWeight: "bold"
};

function Nokia5110Display() {
  return (
    <div style={{ padding: "20px", lineHeight: "1.6" }}>

      <h1>Nokia5110 Display Interfacing with Raspberry Pi</h1>

      {/* Header Image */}
      <img
        src="https://www.electronicwings.com/storage/PlatformSection/TopicContent/334/icon/Nokia5110%20Display%20Interfacing%20with%20Raspberry%20Pi.jpg"
        alt="Nokia5110"
        style={{ maxWidth: "100%", marginBottom: "20px", borderRadius: "10px" }}
      />

      <h2>Overview of Nokia5110 Display</h2>

      <img
        src={Nokia5110LCD}
        alt="Nokia5110 LCD"
        style={{ maxWidth: "100%", marginBottom: "20px", borderRadius: "10px" }}
      />

      <p>Nokia5110 Display Module</p>

      <p>
        Nokia5110 is a graphical display that can display text, images, and various patterns.
      </p>

      <p>
        It has a resolution of 48x84 and comes with a backlight.
      </p>

      <p>
        It uses SPI communication to communicate with a microcontroller/microprocessor.
      </p>

      <p>
        Data and commands can be sent through the processor to the display to control the display output.
      </p>

      <p>
        It has 8 pins.
      </p>

      <p>
        For more information about the Nokia5110 display and how to use it, refer the topic Nokia5110 Graphical Display in the sensors and modules section.
      </p>

      {/* <h2>Enable SPI on Raspberry Pi</h2> */}

      <p>
As Nokia5110 uses SPI communication, we need to make sure that the SPI interface of Raspberry Pi is enabled. If it is not enabled then using we have to make it enable.      </p>

      <h3>How to enable SPI?</h3>

      <p>To enable SPI on Raspberry Pi, enter the following command:</p>

      <pre style={codeStyle}>sudo raspi-config</pre>

      <p>
        Then, a window will pop up in which select <b>Interface Options</b>.
      </p>

      <p>
        After selecting the Interface option, enable the SPI interface and reboot Raspberry Pi.
      </p>

      <p>Now, we can establish SPI communication.</p>

      <h2>Connection Diagram of Nokia5110 Display with Raspberry Pi</h2>

      <img
        src={ConnectionDiagram}
        alt="Connection Diagram"
        style={{ maxWidth: "100%", marginBottom: "20px", borderRadius: "10px" }}
      />
<p>Nokia LCD Display Interface with Raspberry Pi 3</p>
      <img
        src="https://www.electronicwings.com/storage/PlatformSection/TopicContent/334/description/Connections%20for%20Nokia5110%20Display%20Interfacing%20with%20Raspberry%20Pi.jpg"
        alt="Connection Real"
        style={{ maxWidth: "100%", marginBottom: "20px", borderRadius: "10px" }}
      />

      <h2>Display Text and Images on Nokia5110 Display using Raspberry Pi</h2>

      <p>
        Here, we are going to interface the Nokia5110 display with Raspberry Pi 3.
      </p>

      <p>
        We will be using the Nokia5110 Python library by Adafruit from GitHub.
      </p>

      <p>Download and install the library:</p>
      <p>Extract the above library and install it in the directory of the above library by executing the following command,</p>
      <pre style={codeStyle}>sudo python setup.py install</pre>

      <p>Also, we need to install python imaging library as given below,</p>

      <pre style={codeStyle}>sudo apt-get install python-imaging</pre>

      <p>
        Once the library has been added, we can test the Nokia LCD interfacing with Raspberry Pi by executing existing examples kept in examples folder of the library.
      </p>
      <p>Here, we are going to create a small python program in which we will display text, image,s and flying bird animation. This python program file along with sample images is kept in the “example” folder of the library provided in the attachment.</p>
      <p>
       <b> Note:</b> While displaying image on Nokia5110 display, we have to provide image to the program. This image should be of display size (84x48 here). If we provide image with other resolution it will give error.
      </p>

      <h2>Nokia5110 Python Program for Raspberry Pi</h2>

      <div style={labelStyle}>Python</div>
      <pre style={codeStyle}>
{`'''
Nokia5110 LCD Display Interface with Raspberry Pi
	http://www.electronicwings.com
'''

import time
import Adafruit_Nokia_LCD as LCD
import Adafruit_GPIO.SPI as SPI

from PIL import ImageDraw
from PIL import Image
from PIL import ImageFont

DC = 23
RST = 24
SPI_PORT = 0
SPI_DEVICE = 0

disp = LCD.PCD8544(DC, RST, spi=SPI.SpiDev(SPI_PORT, SPI_DEVICE, max_speed_hz=4000000))

disp.begin(contrast=40)
disp.clear()
disp.display()

font = ImageFont.load_default()

image = Image.new('1', (LCD.LCDWIDTH, LCD.LCDHEIGHT))
draw = ImageDraw.Draw(image)
draw.rectangle((0,0,LCD.LCDWIDTH,LCD.LCDHEIGHT), outline=255, fill=255)
draw.text((3,24), 'Welcome to EW', font=font)

disp.image(image)
disp.display()
time.sleep(1.0)

image = Image.open('pi_logo.png').convert('1')
disp.image(image)
disp.display()
time.sleep(0.5)

print('Press Ctrl-C to quit.')

while True:
    image2 = Image.open('bird_1.png').convert('1')
    disp.image(image2)
    disp.display()
    time.sleep(0.1)

    image2 = Image.open('bird_2.png').convert('1')
    disp.image(image2)
    disp.display()
    time.sleep(0.1)

    image2 = Image.open('bird_3.png').convert('1')
    disp.image(image2)
    disp.display()
    time.sleep(0.1)

    image2 = Image.open('bird_4.png').convert('1')
    disp.image(image2)
    disp.display()
    time.sleep(0.1)

    image2 = Image.open('bird_5.png').convert('1')
    disp.image(image2)
    disp.display()

    image2 = Image.open('bird_4.png').convert('1')
    disp.image(image2)
    disp.display()
    time.sleep(0.1)

    image2 = Image.open('bird_3.png').convert('1')
    disp.image(image2)
    disp.display()
    time.sleep(0.1)

    image2 = Image.open('bird_2.png').convert('1')
    disp.image(image2)
    disp.display()
    time.sleep(0.1)
`}
      </pre>

      <h2>Output</h2>

      <img
        src="https://www.electronicwings.com/storage/PlatformSection/TopicContent/334/description/Nokia5110%20Display%20Interfacing%20with%20Raspberry%20Pi1.jpg"
        alt="Output"
        style={{ maxWidth: "100%", borderRadius: "10px" }}
      />
      <h2>Output Video of Nokia5110 Display using Raspberry Pi</h2>

<div style={{ marginTop: "20px" }}>
  <iframe
    width="50%"
    height="400"
    src="https://www.youtube.com/embed/CON2ZY5AgGg"
    title="Nokia5110 Output Video"
    frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
    style={{ borderRadius: "10px" }}
  ></iframe>
</div>

    </div>
  );
}

export default Nokia5110Display;