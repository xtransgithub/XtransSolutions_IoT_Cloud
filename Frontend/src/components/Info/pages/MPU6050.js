
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

function MPU6050() {
  return (
    <div style={{ padding: "20px", lineHeight: "1.6" }}>
      
      <h1>MPU6050 (Accelerometer+Gyroscope) Interfacing with Raspberry Pi</h1>

      <h2>Overview of MPU6050 Sensor</h2>

      <p>
        The MPU6050 sensor module is an integrated 6-axis Motion tracking device.
      </p>
      <p>
        It has a 3-axis Gyroscope, 3-axis Accelerometer, Digital Motion Processor,
        and a Temperature sensor, all in a single IC.
      </p>
      <p>
        It can accept inputs from other sensors like a 3-axis magnetometer or
        pressure sensor using its Auxiliary I2C bus.
      </p>
      <p>
        If an external 3-axis magnetometer is connected, it can provide complete
        9-axis Motion Fusion output.
      </p>
      <p>
        A microcontroller can communicate with this module using the I2C
        communication protocol.
      </p>
      <p>
        Gyroscope readings are in degrees per second (dps) and Accelerometer
        readings are in g.
      </p>

      <p>
        Before interfacing, make sure I2C is enabled on Raspberry Pi.
      </p>

      <h2>Connection Diagram of MPU6050 with Raspberry Pi</h2>

      <img
        src="https://www.electronicwings.com/storage/PlatformSection/TopicContent/324/description/MPU6050_interface_with_Raspberry%20Pi.png"
        alt="MPU6050 Connection"
        style={{ maxWidth: "100%", marginBottom: "20px", borderRadius: "10px" }}
      />

      <h2>MPU6050 Example using Raspberry Pi</h2>

      <p>
        Here, we read Accelerometer and Gyroscope values and print them.
      </p>

      <h2>MPU6050 Code for Raspberry Pi using Python</h2>

      <div style={labelStyle}>Python</div>
      <pre style={codeStyle}>
{`'''
Read Gyro and Accelerometer using Raspberry Pi
'''

import smbus
from time import sleep

PWR_MGMT_1 = 0x6B
SMPLRT_DIV = 0x19
CONFIG = 0x1A
GYRO_CONFIG = 0x1B
INT_ENABLE = 0x38
ACCEL_XOUT_H = 0x3B
ACCEL_YOUT_H = 0x3D
ACCEL_ZOUT_H = 0x3F
GYRO_XOUT_H = 0x43
GYRO_YOUT_H = 0x45
GYRO_ZOUT_H = 0x47

def MPU_Init():
    bus.write_byte_data(Device_Address, SMPLRT_DIV, 7)
    bus.write_byte_data(Device_Address, PWR_MGMT_1, 1)
    bus.write_byte_data(Device_Address, CONFIG, 0)
    bus.write_byte_data(Device_Address, GYRO_CONFIG, 24)
    bus.write_byte_data(Device_Address, INT_ENABLE, 1)

def read_raw_data(addr):
    high = bus.read_byte_data(Device_Address, addr)
    low = bus.read_byte_data(Device_Address, addr+1)
    value = ((high << 8) | low)
    if value > 32768:
        value = value - 65536
    return value

bus = smbus.SMBus(1)
Device_Address = 0x68

MPU_Init()

while True:
    acc_x = read_raw_data(ACCEL_XOUT_H)
    acc_y = read_raw_data(ACCEL_YOUT_H)
    acc_z = read_raw_data(ACCEL_ZOUT_H)

    gyro_x = read_raw_data(GYRO_XOUT_H)
    gyro_y = read_raw_data(GYRO_YOUT_H)
    gyro_z = read_raw_data(GYRO_ZOUT_H)

    Ax = acc_x/16384.0
    Ay = acc_y/16384.0
    Az = acc_z/16384.0

    Gx = gyro_x/131.0
    Gy = gyro_y/131.0
    Gz = gyro_z/131.0

    print("Gx=%.2f Gy=%.2f Gz=%.2f Ax=%.2f Ay=%.2f Az=%.2f" % (Gx, Gy, Gz, Ax, Ay, Az))

    sleep(1)
`}
      </pre>

      <h2>MPU6050 Code for Raspberry Pi using C (WiringPi)</h2>

      <div style={{ ...labelStyle, background: "#198754" }}>C (WiringPi)</div>
      <pre style={codeStyle}>
{`#include <wiringPiI2C.h>
#include <stdio.h>
#include <wiringPi.h>

#define Device_Address 0x68

int fd;

void MPU6050_Init(){
    wiringPiI2CWriteReg8(fd, 0x19, 7);
    wiringPiI2CWriteReg8(fd, 0x6B, 1);
    wiringPiI2CWriteReg8(fd, 0x1A, 0);
    wiringPiI2CWriteReg8(fd, 0x1B, 24);
    wiringPiI2CWriteReg8(fd, 0x38, 1);
}

short read_raw_data(int addr){
    short high, low, value;
    high = wiringPiI2CReadReg8(fd, addr);
    low = wiringPiI2CReadReg8(fd, addr+1);
    value = (high << 8) | low;
    return value;
}

int main(){
    fd = wiringPiI2CSetup(Device_Address);
    MPU6050_Init();

    while(1){
        float Ax = read_raw_data(0x3B)/16384.0;
        float Ay = read_raw_data(0x3D)/16384.0;
        float Az = read_raw_data(0x3F)/16384.0;

        float Gx = read_raw_data(0x43)/131.0;
        float Gy = read_raw_data(0x45)/131.0;
        float Gz = read_raw_data(0x47)/131.0;

        printf("Gx=%.2f Gy=%.2f Gz=%.2f Ax=%.2f Ay=%.2f Az=%.2f\\n", Gx, Gy, Gz, Ax, Ay, Az);
        delay(500);
    }
}
`}
      </pre>

      <h2>MPU6050 Output</h2>

      <img
        src="https://www.electronicwings.com/storage/PlatformSection/TopicContent/324/description/MPU6050%20Output.png"
        alt="MPU6050 Output"
        style={{ maxWidth: "100%", borderRadius: "10px" }}
      />

      <ul>
        <li>Gx = Gyroscope X-axis (°/s)</li>
        <li>Gy = Gyroscope Y-axis (°/s)</li>
        <li>Gz = Gyroscope Z-axis (°/s)</li>
        <li>Ax = Accelerometer X-axis (g)</li>
        <li>Ay = Accelerometer Y-axis (g)</li>
        <li>Az = Accelerometer Z-axis (g)</li>
      </ul>

    </div>
  );
}

export default MPU6050;