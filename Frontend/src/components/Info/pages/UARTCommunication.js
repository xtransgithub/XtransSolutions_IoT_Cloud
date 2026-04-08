import React from "react";
import UARTFrameStructure from "../images/1_PIC18F4550_USART_Frame_Structure-removebg-preview.png"
import UARTPins  from "../images/Raspberry_pi_3_UART_pins-removebg-preview.png"
import Connection from "../images/RaspberryPi_Interface_with_PC_using_UART-removebg-preview.png"
const UARTCommunication = () => {
  return (
    <div style={{ padding: "20px", lineHeight: "1.6" }}>
      <h1>Raspberry Pi UART Communication using Python and C</h1>

      <h2>Introduction to UART</h2>
      <p>
        UART (Universal Asynchronous Receiver/Transmitter) is a serial communication protocol in which data is transferred serially i.e. bit by bit. Asynchronous serial communication is widely used for byte oriented transmission. In Asynchronous serial communication, a byte of data is transferred at a time.
      </p>

      <p>
        UART serial communication protocol uses a defined frame structure for their data bytes. Frame structure in Asynchronous communication consists:
      </p>

      <ul>
        <li><b>START bit:</b> It is a bit with which indicates that serial communication has started and it is always low.</li>
        <li><b>Data bits packet:</b> Data bits can be packets of 5 to 9 bits. Normally we use 8-bit data packet, which is always sent after the START bit.</li>
        <li><b>STOP bit:</b>  This usually is one or two bits in length. It is sent after data bits packet to indicate the end of frame. Stop bit is always logic high.</li>
      </ul>

      <img
        src={UARTFrameStructure}
        alt="UART Frame Structure"
        style={{ width: "60%", margin: "20px 0" }}
      />

      <p>
      Usually, an asynchronous serial communication frame consists of a START bit (1 bit) followed by a data byte (8 bits) and then a STOP bit (1 bit), which forms a 10-bit frame as shown in the figure above. The frame can also consist of 2 STOP bits instead of a single bit, and there can also be a PARITY bit after the STOP bit.
      </p>

      <h2>Raspberry Pi UART</h2>
      <p>Raspberry Pi has two in-built UART which are as follows:</p>
      <ul>
        <li><b>PL011 UART</b> – High performance and stable</li>
        <li><b>mini UART</b> – Less stable, depends on GPU frequency</li>
      </ul>
      <p><b>PL011</b> UART is an ARM based UART. This UART has better throughput than mini UART.</p>
      <p>
        In Raspberry Pi 3, mini UART is used for Linux console output whereas PL011 is connected to the Bluetooth module.
      </p>
     <p>And in the other versions of Raspberry Pi, PL011 is used for Linux console output</p>
      <p>
      Mini UART uses the frequency which is linked to the core frequency of GPU. So as the GPU core frequency changes, the frequency of UART will also change which in turn will change the baud rate for UART. This makes the mini UART unstable which may lead to data loss or corruption. To make mini UART stable, fix the core frequency. mini UART doesn’t have parity support.
      </p>
     <p>The PL011 is a stable and high performance UART. For better and effective communication use PL011 UART instead of mini UART.

    <p>It is recommended to enable the UART of Raspberry Pi for serial communication. Otherwise, we are not able to communicate serially as UART ports are used for Linux console output and Bluetooth module.</p>
    </p><h3>Raspberry Pi 3 UART Pins</h3>
      <img
        src={UARTPins}
        alt="UART Pins"
        style={{ width: "60%", margin: "20px 0" }}
      />

      <h2>Configure UART on Raspberry Pi</h2>
      <p>In Raspberry Pi, enter following command in Terminal window to enable UART,</p>
      <pre style={codeStyle}>
        sudo raspi-config
      </pre>

      <p>Select → Interfacing Options</p>

      <img src="https://www.electronicwings.com/storage/PlatformSection/TopicContent/305/description/UART%20step%201.png" alt="Step 1" style={imgStyle} />
      <p>After selecting Interfacing option, select Serial option to enable UART</p>

      <img src="https://www.electronicwings.com/storage/PlatformSection/TopicContent/305/description/UART%20step2.png" alt="Step 2" style={imgStyle} />
      <p>Then it will ask for login shell to be accessible over Serial, select No shown as follows.</p>

      <img src="https://www.electronicwings.com/storage/PlatformSection/TopicContent/305/description/UART%20step3.png" alt="Step 3" style={imgStyle} />
      <p>At the end, it will ask for enabling Hardware Serial port, select Yes,</p>

      <img src="https://www.electronicwings.com/storage/PlatformSection/TopicContent/305/description/UART%20step4.png" alt="Step 4" style={imgStyle} />

      <p>Finally, our UART is enabled for Serial Communication on RX and TX pin of Raspberry Pi 3.</p>
      <img src="https://www.electronicwings.com/storage/PlatformSection/TopicContent/305/description/UART%20enabled.png" alt="Enabled" style={imgStyle} />
       <p>Then, reboot the Raspberry Pi.</p>
      <h2>Serial Port for UART Communication</h2>
      <p>By default, mini UART is mapped to UART pins (TX and RX) while PL011 is connected to on-board Bluetooth module on Raspberry Pi 3.</p>
      <p>In previous version of Raspberry Pi models, PL011 is used for Linux Console output (mapped to UART pins) and there is no on-board Bluetooth module.</p>
      <p>After making above configuration, UART can be used at UART pins (GPIO14 and GPIO15).</p>
      <p>To access mini UART in Raspberry Pi 3, ttyS0 port is assigned. And to access PL011 in Raspberry Pi 3 ttyAMA0 port is assigned. But in other models of Raspberry Pi, there is only ttyAMA0 port is accessible.</p>
      <p>Hardware UART port i.e. GPIO14(TXD) and GPIO15 (RXD) is also known as serial0 while other UART port which is connected to Bluetooth module is known as serial1.These names are created as serial aliases for Raspberry Pi version portability.</p>
      <p>We can check which UART i.e. mini UART (ttyS0) or PL011 UART (ttyAMA0) is mapped to UART pins (GPIO14 and GPIO15). To check UART mapping, enter following commands.</p>
      
      <pre style={codeStyle}>
        ls -l /dev
      </pre>
      <p>The UART mapping for /dev/ttyS0 and /dev/ttyAMA0 is shown below,</p>
      
      <img src="https://www.electronicwings.com/storage/PlatformSection/TopicContent/305/description/serial%20port%20before%20swap.png" alt="Before Swap" style={imgStyle} />

      <h2>Test serial communication in between Raspberry Pi and PC</h2>
       <p>To test that our Serial communication is working or not make the connections shown in below figure.</p>
      
      <img src="https://www.electronicwings.com/storage/PlatformSection/TopicContent/305/description/RaspberryPi_Interface%20with%20PC%20using%20UART.png" alt="Connection" style={imgStyle} />
      <p>Open Terminal on Laptop/PC to receive the data which will be transmitted from the Raspberry Pi.
      </p>
      <p>Now, enter the following command to transmit data from Raspberry Pi terminal. </p>
      <pre style={codeStyle}>
        echo "Hello" &gt; /dev/ttyS0
      </pre>
      <p>This command will output “Hello” string on UART port i.e. Tx pin and will display it on terminal application of PC/Laptop.
      </p><p>By default, mini UART is mapped to the GPIO14 (TX) and GPIO15(RX). While PL011 i.e. ttyAMA0 is connected to the on-board Bluetooth module.</p>
      <p><b>Example</b>

Let’s establish serial communication between Raspberry Pi 3 and Laptop/PC using UART. We can perform UART based serial communication using Python and C.

</p> <p>Here, we will generate an echo on PC.</p>
      
      <h2>UART Communication on Raspberry Pi Using Python</h2>
       
      <pre style={codeStyle}>
{`import serial
from time import sleep

ser = serial.Serial ("/dev/ttyS0", 9600)
while True:
    received_data = ser.read()
    sleep(0.03)
    data_left = ser.inWaiting()
    received_data += ser.read(data_left)
    print (received_data)
    ser.write(received_data)`}
      </pre>
      <h1>Functions Used</h1>

<h5>serial.Serial(port, baudrate)</h5>
<p>
It is a class for Serial which is used for opening port. Create instance for this class (here it is named as ser, we can use any name)
</p>
<p>E.g</p>
<pre style={codeStyle}>
{`import serial

ser = serial.Serial('/dev/ttyS0', 9600)`}
</pre>

<p><b>Parameters:</b></p>
<ul>
  <li><b>Port:</b>  port name i.e. ttyUSB0, ttyS0, etc or None</li>
  <li><b>Baudrate:</b> Baud rate such as 9600, 38400, etc.</li>
</ul>
<p>Above function has more parameter but that is not used here. So, for more parameter detail, you can refer Python API for PySerial.</p>

<h5>read(size)</h5>
<p>This function reads data from the serial port.</p>

<pre style={codeStyle}>
{`data = ser.read(1)`}
</pre>

<p><b>Parameter:</b></p>
<ul>
  <li>Size – Number of bytes to read (default = 1)</li>
</ul>
<p><b>Return:</b></p>
<ul>
  <li>  Bytes read from the port.</li>
</ul>

<h5>write(data)</h5>
<p>This function sends data through the serial port.</p>
<p><b>Parameter:</b></p>
<ul>
  <li>  <b> Data </b>– Data to send</li>
</ul>
<p><b>Return::</b></p>
<ul>
  <li> Number of bytes written/sent</li>
</ul>
<p>For more Serial APIs and their detail, you can refer Python API for PySerial.</p>
<pre style={codeStyle}>
{`ser.write(b'Hello')`}
</pre>
<h1>UART Communication on Raspberry Pi using C</h1>
<p>Let’s implement UART serial communication between Raspberry Pi 3 and Laptop/PC using program written in C language. Here, we are using WiringPi library to establish UART communication on Raspberry Pi.</p>
      <pre style={codeStyle}>
{`/*
	UART communication on Raspberry Pi using C (WiringPi Library)
	http://www.electronicwings.com
*/

#include <stdio.h>
#include <string.h>
#include <errno.h>

#include <wiringPi.h>
#include <wiringSerial.h>

int main ()
{
  int serial_port ;
  char dat;
  if ((serial_port = serialOpen ("/dev/ttyS0", 9600)) < 0)	/* open serial port */
  {
    fprintf (stderr, "Unable to open serial device: %s\n", strerror (errno)) ;
    return 1 ;
  }

  if (wiringPiSetup () == -1)					/* initializes wiringPi setup */
  {
    fprintf (stdout, "Unable to start wiringPi: %s\n", strerror (errno)) ;
    return 1 ;
  }

  while(1){
	  
	if(serialDataAvail (serial_port) )
	{ 
		dat = serialGetchar (serial_port);		/* receive character serially*/	
		printf ("%c", dat) ;
		fflush (stdout) ;
		serialPutchar(serial_port, dat);		/* transmit character serially on port */
		  }
	}

}`}
      </pre>

      <h2>Output</h2>
      <p>Raspberry Pi Terminal:</p>
      <img src="https://www.electronicwings.com/storage/PlatformSection/TopicContent/305/description/echo%20output%20at%20Raspberry%20Pi.png" alt="Pi Output" style={imgStyle} />

      <p>PC/Laptop Terminal:</p>
      <img src="https://www.electronicwings.com/storage/PlatformSection/TopicContent/305/description/echo%20output%20at%20Laptop.png" alt="PC Output" style={imgStyle} />
      <p>At PC/Laptop end, we use Realterm Software here.</p>
      <h2>Serial Aliases</h2>
      <p>
      Here, we have used ttyS0 port on which UART (GPIO14 and GPIO15) is mapped in Raspberry Pi 3. But in other models of Raspberry Pi it is mapped to ttyAMA0 as there is no on-board Bluetooth module.

    </p><p>So, the program written for Raspberry Pi 3 will give error on older models of Raspberry Pi as port name is different. To provide portability in port name, serial aliases are created in Raspbian named as serial0 and serial1. serial0 referred to UART port mapped to default port (ttyS0 or ttyAMA0). So, we can replace ttyS0 or ttyAMA0 with serial0.

   </p><p> When we use serial0 as UART port instead of ttyS0 or ttyAMA0 then the program written for Raspberry Pi 3 will also run on older models of Raspberry Pi.
      </p>

      <h2>Swapping UART Ports</h2>
     <p>For better performance, serial communication on GPIO14 and GPIO15 needs to use ttyAMA0 port which is connected to the Bluetooth module. To use this port, we should swap the UART ports i.e. map the ttyAMA0 to the GPIO14 and GPIO15 while ttyS0 (mini UART) to the Bluetooth module.

</p> <p>The swapping of serial ports can be done by using the mini UART (ttyS0) for Bluetooth module via a device overlay i.e. pi3-miniuart-bt. Or it can be done by completely disabling Bluetooth via device overlay i.e. pi3-disable-bt.

</p> <p>To swap the UART ports, open file config.txt as shown below,</p>
      <pre style={codeStyle}>
        sudo nano /boot/config.txt
      </pre>

      <p>then add below line to the end of the file as shown below,</p>

      <pre style={codeStyle}>
{`dtoverlay=pi3-miniuart-bt
OR
dtoverlay=pi3-disable-bt`}
      </pre>

      <p>After adding above line, save the changes to the file and reboot the system.

</p>  <p>We can check the new mapping of serial ports by,</p>

      <pre style={codeStyle}>
        ls -l /dev
      </pre> 
 <p>The mapping of UART port is shown below,</p>
      <img src="https://www.electronicwings.com/storage/PlatformSection/TopicContent/305/description/serial%20port%20after%20swap.png" alt="After Swap" style={imgStyle} />

    </div>
  );
};

const codeStyle = {
  backgroundColor: "#1e1e1e",
  color: "#00ffcc",
  padding: "15px",
  borderRadius: "8px",
  overflowX: "auto",
  margin: "20px 0",
};

const imgStyle = {
  width: "60%",
  margin: "20px 0",
  borderRadius: "10px",
};

export default UARTCommunication;