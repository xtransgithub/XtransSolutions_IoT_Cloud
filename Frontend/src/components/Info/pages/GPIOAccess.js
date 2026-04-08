import React from "react";
import GPIOPins  from "../images/Raspberry_pi_3_GPIO_pins_v2-removebg-preview.png"
import LEDControl from "../images/led_control_using_RaspberryPi-removebg-preview.png"
function GPIOAccess() {
  return (
    <div style={{ padding: "20px", lineHeight: "1.8" }}>
      <h1>Raspberry Pi GPIO Access</h1>

      <h2>Introduction</h2>

      <p>
        GPIO (General Purpose Input Output) pins can be used as input or output and allows raspberry pi to connect with general purpose I/O devices.
      </p>

      <p>Raspberry pi 3 model B took out 26 GPIO pins on board.</p>

      <p>
        Raspberry pi can control many external I/O devices using these GPIO’s.
      </p>

      <p>
        These pins are a physical interface between the Pi and the outside world.
      </p>

      <p>
        We can program these pins according to our needs to interact with external devices. For example, if we want to read the state of a physical switch, we can configure any of the available GPIO pins as input and read the switch status to make decisions. We can also configure any GPIO pin as an output to control LED ON/OFF.
      </p>

      <p>
        Raspberry Pi can connect to the Internet using on-board Wi-Fi or Wi-Fi USB adapter. Once the Raspberry Pi is connected to the Internet then we can control devices, which are connected to the Raspberry Pi, remotely.
      </p>

      <p>
        GPIO Pins of Raspberry Pi 3 are shown in below figure:
      </p>

      <img
        src={GPIOPins}
        alt="GPIO Pins"
        style={imgStyle}
      />

      <p>Raspberry Pi 3 Model B GPIO Pin Mapping</p>

      <p>
        Some of the GPIO pins are multiplexed with alternate functions like I2C, SPI, UART etc.
      </p>

      <p>We can use any of the GPIO pins for our application.</p>

      <h2>Pin Numbering</h2>

      <p>
        We should define GPIO pin which we want to use as an output or input. But Raspberry Pi has two ways of defining pin number which are as follows:
      </p>

      <ul>
        <li>GPIO Numbering</li>
        <li>Physical Numbering</li>
      </ul>

      <p>
        In GPIO Numbering, pin number refers to number on Broadcom SoC (System on Chip). So, we should always consider the pin mapping for using GPIO pin.
      </p>

      <p>
        While in Physical Numbering, pin number refers to the pin of 40-pin P1 header on Raspberry Pi Board. The above physical numbering is simple as we can count pin number on P1 header and assign it as GPIO.
      </p>

      <p>
        But, still we should consider the pin configuration diagram shown above to know which are GPIO pins and which are VCC and GND.
      </p>

      <h2>Control LED with Push Button using Raspberry Pi</h2>

      <img
        src={LEDControl}
        alt="LED Control"
        style={imgStyle}
      />

      <p>Control LED using Raspberry Pi Interfacing Diagram</p>

      <h2>Example</h2>

      <p>
        Now, let’s control LED using a switch connected to the Raspberry Pi. Here, we are using Python and C (WiringPi) for LED ON-OFF control.
      </p>

      <h3>Control LED using Python</h3>

      <p>
        Now, let’s turn an ON and OFF LED using Python on Raspberry Pi. The switch is used to control the LED ON-OFF.
      </p>

      <h3>Python Program for Raspberry Pi to control LED using Push Button</h3>

      <pre style={codeBlock}>
{`import RPi.GPIO as GPIO		#import RPi.GPIO module

LED = 32			#pin no. as per BOARD, GPIO18 as per BCM
Switch_input = 29		#pin no. as per BOARD, GPIO27 as per BCM
GPIO.setwarnings(False) 	#disable warnings
GPIO.setmode(GPIO.BOARD)	#set pin numbering format
GPIO.setup(LED, GPIO.OUT)	#set GPIO as output
GPIO.setup(Switch_input, GPIO.IN, pull_up_down=GPIO.PUD_UP)

while True:
    if(GPIO.input(Switch_input)):
        GPIO.output(LED,GPIO.LOW)
    else:
        GPIO.output(LED,GPIO.HIGH)`}
      </pre>

      <h2>Functions Used:</h2>

      <h3>RPi.GPIO</h3>

      <p>
        To use Raspberry Pi GPIO pins in Python, we need to import RPi.GPIO package which has class to control GPIO. This RPi.GPIO Python package is already installed on Raspbian OS. So, we don’t need to install it externally. Just, we should include library in our program to use functions for GPIO access using Python. This is given as follows.
      </p>

      <pre style={codeStyle}>
{`import RPi.GPIO as GPIO`}
      </pre>

      <h3>GPIO.setmode (Pin Numbering System)</h3>

      <p>
        This function is used to define Pin numbering system i.e. GPIO numbering or Physical numbering.
      </p>

      <p>
        In RiPi.GPIO GPIO numbering is identified by BCM whereas Physical numbering is identified by BOARD
      </p>

      <pre style={codeStyle}>
{`Pin Numbering System = BOARD/BCM`}
      </pre>

      <p>E.g. If we use pin number 40 of P1 header as a GPIO pin which we have to configure as output then,</p>

      <pre style={codeBlock}>
{`In BCM,
GPIO.setmode(GPIO.BCM)
GPIO.setup(21, GPIO.OUT)

In BOARD,
GPIO.setmode(GPIO.BOARD)
GPIO.setup(40, GPIO.OUT)`}
      </pre>

      <h3>GPIO.setup (channel, direction, initial value, pull up/pull down)</h3>

      <p>This function is used to set the direction of GPIO pin as an input/output.</p>

      <pre style={codeBlock}>
{`channel – GPIO pin number as per numbering system.
direction – set direction of GPIO pin as either Input or Output.
initial value – can provide initial value
pull up/pull down – enable pull up or pull down if required`}
      </pre>

      <h4>Examples:</h4>

      <pre style={codeBlock}>
{`GPIO as Output
                 GPIO.setup(channel, GPIO.OUT)

GPIO as Input
                 GPIO.setup(channel, GPIO.IN)

GPIO as Output with initial value
                 GPIO.setup(channel, GPIO.OUT, initial=GPIO.HIGH)

GPIO as Input with Pull up resistor
                 GPIO.setup(channel, GPIO.IN, pull_up_down = GPIO.PUD_UP)`}
      </pre>

      <h3>GPIO.output(channel, state)</h3>
       <p>This function is used to set the output state of GPIO pin.

<li>channel – GPIO pin number as per numbering system.</li>

<li>state – Output state i.e. HIGH or LOW of GPIO pin.</li>
<p>e.g</p>
</p>
      <pre style={codeStyle}>
{`GPIO.output(7, GPIO.HIGH)`}
      </pre>

      <h3>GPIO.input(channel)</h3>
<p>This function is used to read the value of GPIO pin.</p>
<p>e.g</p>
      <pre style={codeStyle}>
{`GPIO.input(9)`}
      </pre>

      <h2>Control LED using C (WiringPi)</h2>

      <p>
        We can access Raspberry Pi GPIO using C. Here, we are using WiringPi library for accessing Raspberry Pi GPIO using C.
      </p>

      <p>
        Before implementing LED blinking using wiringPi, you can refer How to use WiringPi library.
      </p>

      <h3>C Program</h3>

      <pre style={codeBlock}>
{`#include <wiringPi.h>
#include <stdio.h>

int LED = 26;
int switch_input = 21;

int main(){
    wiringPiSetup();
    pinMode(LED,OUTPUT);
    pullUpDnControl(switch_input, PUD_UP);

    while (1){
        if(digitalRead(switch_input))
            digitalWrite(LED,LOW);
        else
            digitalWrite(LED, HIGH);
    }
}`}
      </pre>
    </div>
  );
}

// styles
const imgStyle = {
  width: "100%",
  maxWidth: "700px",
  margin: "20px 0",
};

const codeStyle = {
  background: "#111",
  color: "#0f0",
  padding: "10px",
};

const codeBlock = {
  background: "#1e1e1e",
  color: "#fff",
  padding: "10px",
};

export default GPIOAccess;