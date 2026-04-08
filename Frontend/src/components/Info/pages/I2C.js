import React from "react";
import RaspberryPiI2CPins from "../images/Raspberry_pi_I2C_pins-removebg-preview.png"
function I2C() {
  return (
    <div style={{ padding: "20px", lineHeight: "1.6" }}>
      <h1>Raspberry Pi I2C</h1>

      <h2>Introduction to I2C</h2>
      <p>
        I2C (Inter Integrated Circuit) is a synchronous serial protocol that
        communicates data between two devices.
      </p>
      <p>
        It is a master-slave protocol which may have one master or many masters
        and many slaves whereas SPI has only one master.
      </p>
      <p>It is generally used for communication over short distance.</p>
      <p>
        The I2C device has 7-bit or 10-bit unique address. So, to access these
        devices, master should address them by the unique address.
      </p>
      <p>
        I2C is used in many applications like reading RTC (Real time clock),
        accessing external EEPROM memory. It is also used in sensor modules like
        gyro, magnetometer etc.
      </p>
      <p>It is also called as Two Wire Interface (TWI) protocol.</p>

      <h2>Raspberry Pi I2C</h2>
      <p>
        Raspberry Pi has Broadcom processor having Broadcom Serial Controller
        (BSC) which is a master, fast-mode (400Kb/s) controller.
      </p>
      <p>
        The BSC bus is compliant with the Philips I2C bus. It supports both 7-bit
        and 10-bit addressing.
      </p>
      <p>
        It also has BSC2 master which is dedicatedly used with HDMI interface
        and should not be accessed by user.
      </p>
      <p>
        I2C bus/interface is used to communicate with external devices like RTC,
        MPU6050, Magnetometer, etc with only 2 lines.
      </p>
      <p>
       To access I2C bus in Raspberry Pi, we should make some extra configuration. Raspberry Pi has I2C pins which are given as follows
      </p>

      <h3>Raspberry Pi I2C Pins</h3>
      <img
        src={RaspberryPiI2CPins}
        alt="Raspberry Pi I2C Pins"
        style={{ maxWidth: "100%", marginBottom: "20px" }}
      />

      <h2>Raspberry Pi I2C Configurations</h2>
      <p>
        Before start interfacing I2C devices with Raspberry some prior configurations need to be done. These configurations are given as follows:
      </p>

       <p>First, we should enable I2C in Raspberry Pi. We can enable it through terminal which is given below:</p>
      {/* <pre>sudo raspi-config</pre> */}
       <pre style={codeStyle}>
       sudo raspi-config
      </pre> 
      <img
        src="https://www.electronicwings.com/storage/PlatformSection/TopicContent/317/description/raspi_config_cmd.png"
        alt="raspi-config command"
        style={{ maxWidth: "100%" }}
      />

      <p>Select Interfacing Configurations</p>
      <img
        src="https://www.electronicwings.com/storage/PlatformSection/TopicContent/317/description/interfacing_options.png"
        alt="Interfacing Options"
        style={{ maxWidth: "100%" }}
      />

      <p>In Interfacing option Select → I2C</p>
      <img
        src="https://www.electronicwings.com/storage/PlatformSection/TopicContent/317/description/I2C%20option.png"
        alt="I2C Option"
        style={{ maxWidth: "100%" }}
      />

      <p>Enable I2C Configuration</p>
      <img
        src="https://www.electronicwings.com/storage/PlatformSection/TopicContent/317/description/enable%20I2C.png"
        alt="Enable I2C"
        style={{ maxWidth: "100%" }}
      />

      <img
        src="https://www.electronicwings.com/storage/PlatformSection/TopicContent/317/description/I2C%20enabled.png"
        alt="I2C Enabled"
        style={{ maxWidth: "100%" }}
      />

      <p>Select Yes when it asks to reboot.</p>
      <p>Now, after booting raspberry Pi, we can check user-mode I2C port by entering following command.</p>
      <pre style={codeStyle}>
      ls /dev/*i2c*</pre>
      <p>then Pi will respond with name of i2c port</p>

      <img
        src="https://www.electronicwings.com/storage/PlatformSection/TopicContent/317/description/list%20I2C%20port.png"
        alt="List I2C Port"
        style={{ maxWidth: "100%" }}
      />

      <p>
        Above response represents the user-mode of I2C interface. Older versions of Raspberry pi may respond with i2c-0 user-mode port.
      </p>

      <h2>Scan or Test I2C Device</h2>
      <p>Now, we can test/scan for any I2C device connected to our Raspberry Pi board by installing i2c tools. We can get i2c tools by using apt package manager. Use following command in Raspberry Pi terminal.</p>
     
      <pre style={codeStyle}>sudo apt-get install -y i2c-tools</pre>

      <p>Now connect any I2C based device to the user-mode port and scan that port using following command,</p>
      <pre style={codeStyle}>sudo i2cdetect -y 1</pre>
       <p>Then it will respond with device address.</p>
       <p>e.g. </p>
       <p>Here, we connected MPU6050 I2C based device to the Raspberry Pi and try to detect that device which is shown in below image,</p>
      
      <img
        src="https://www.electronicwings.com/storage/PlatformSection/TopicContent/317/description/I2C%20device%20scan.png"
        alt="I2C Device Scan"
        style={{ maxWidth: "100%" }}
      />

      <p>
        i2cdetect command will scan the I2C port to get the address of device if connected.

If no device is connected to I2C port then it will return field with (- -).

We can also get or set data of I2C device using following command

i2cget, i2cset, etc
      </p>

      <p>e.g.</p>
      <pre style={codeStyle}>
        sudo i2cget -y I2C_user_mode_Port address_of_device Register_addresssudo i2cget 1 0x68 0x01    

      </pre>
      <pre style={codeStyle}>
        sudo i2cget 1 0x68 0x01
      </pre>

      <p>
       and it will respond with data present in the register having address 0x01
      </p>

      <h2>Access I2C Devices using SMBus</h2>
      <p>
       We can access I2C bus on Raspberry Pi using SMBus. SMBus is a subset of I2C bus/interface. SMBus provides support for I2C based devices. While writing program to access I2C based device, make use of SMBus commands.
      </p>
      <p>
        While developing program for Raspberry Pi I2C communication in python, use SMBus library package which has great support to access I2C devices. So, we should add SMBus support for Python by using apt packet manager,
      </p>

      <pre style={codeStyle}>sudo apt-get install python-smbus</pre>
<h2>Python based I2C functions for Raspberry Pi</h2>

<p>
  Let’s see basic Python based I2C functions which are frequently used for
  I2C communication on Raspberry Pi.
</p>

<p>
  While developing program for Raspberry Pi I2C communication in python, we can use SMBus library package which has great support to access I2C devices. So, we should add SMBus support for Python by using apt packet manager,
</p>

<pre style={codeStyle}>sudo apt-get install python-smbus</pre>
<h3>Python based I2C Functions</h3>
<p><b>Import SMBus</b></p>
<ul>
<li>To access I2C bus on Raspberry Pi using SMBus Python module, import SMBus module as follows.</li>

<pre style={codeStyle}>{`import smbus`}</pre>

<p>create object of SMBus class to access I2C based Python function.
</p>
<pre>{"<Object name> = smbus.SMBus(I2C port no.)"}</pre>
<pre style={codeStyle}> I2C port no : I2C port no. i.e. 0 or 1</pre>
<pre>{`Example - Bus = smbus.SMBus(1)`}</pre>
  <p>Now, we can access SMBus class with Bus object.</p>


<p><b>Bus.write_byte_data(Device Address, Register Address, Value)</b></p>
<li>This function is used to write data to the required register.</li>
<pre>{`Device Address : 7-bit or 10-bit device address`}</pre>
<pre>{`Register Address : Register address to which we need to write`}</pre>
<pre>{`Value : pass value which needs to write into the register`}</pre>
<li>{`Example - Bus.write_byte_data(0x68, 0x01, 0x07)`}</li>
<p><b>Bus.write_i2c_block_data(Device Address, Register Address, [value1, value2,….])</b></p>
<li>This function is used to write a block of 32 bytes.</li>
<pre>Device Address : 7-bit or 10-bit device address

</pre><pre>Register Address : Register address to which we need to write data

</pre><pre>Value1 Value2…. : write a block of bytes to the required address</pre>
<li><pre>Example - Bus.write_i2c_block_data(0x68, 0x00, [0, 1, 2, 3, 4, 5]) # write 6 bytes of data from 0 address.</pre></li>

<p><b>Bus.read_byte_data(Device Address, Register Address)</b></p>
<li>This function is used to read data byte from required register.</li>
<pre>Device Address : 7-bit or 10-bit device address

</pre><pre>Register Address : Register address from which we need to read data</pre>
<li><pre>Example - Bus.read_byte_data (0x68, 0x01)</pre></li>
<p><b>Bus.read_i2c_block_data(Device Address, Register Address, block of bytes)</b></p>
<pre>
  Device Address – 7-bit or 10-bit device address

</pre><pre>Register Address – Register address from which we need to read data

</pre><pre>Block of Bytes      – readno of bytes from the required address
</pre>
<li>
  <pre>Example - Bus.read_i2c_block_data(0x68, 0x00, 8) # returnvalue is a list of 6 bytes</pre>
</li>

</ul>
    </div>
  );
  
}

const codeStyle = {
  backgroundColor: "#1e1e1e",
  color: "#00ffcc",
  padding: "15px",
  borderRadius: "8px",
  overflowX: "auto",
  margin: "20px 0",
};
export default I2C;



