import React from "react";
import StepperMotors from "../images/Stepper1-removebg-preview.png"
import ConnectionDiagram from "../images/Stepper_Motor_Interfcae_with_Raspberry-removebg-preview.png"
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

function StepperMotor() {
  return (
    <div style={{ padding: "20px", lineHeight: "1.6" }}>

      <h1>Stepper Motor Interfacing with Raspberry Pi</h1>

      {/* Top Image */}
      <img
        src="https://www.electronicwings.com/storage/PlatformSection/TopicContent/340/icon/Stepper%20Motor%20Interfacing%20with%20Raspberry%20Pi.jpg"
        alt="Stepper Motor Interfacing"
        style={{ maxWidth: "100%", borderRadius: "10px" }}
      />

      <h1>Overview of Stepper Motor</h1>

      <img
        src={StepperMotors}
        alt="Stepper Motor"
        style={{ maxWidth: "60%", display: "block", margin: "20px auto" }}
      />

      <ul>
        <li>Stepper motor is a brushless DC motor that divides the full rotation angle of 360° into number of equal steps.</li>
        <li>The motor is rotated by applying certain sequence of control signals. The speed of rotation can be changed by changing the rate at which the control signals are applied.</li>
       <li>For more information about Stepper Motor, its control sequence and how to use it, refer the topic Stepper Motor in the sensors and modules section.</li>
        <li>Raspberry Pi’s GPIOs can be used to control stepper motor rotation. We can generate sequence of control signals on the GPIO pins of Raspberry Pi. To know more about Raspberry Pi GPIO refer Raspberry Pi GPIO Access.</li>
        </ul>

      <h1>Connection Diagram of Stepper Motor with Raspberry Pi</h1>

      <img
        src="https://www.electronicwings.com/storage/PlatformSection/TopicContent/340/description/Stepper%20Motor%20Interfcae%20with%20Raspberry.png"
        alt="Connection Diagram"
        style={{ maxWidth: "100%", borderRadius: "10px" }}
      />
      <p>Stepper Motor Interfacing with Raspberry Pi</p>
      <img
        src="https://www.electronicwings.com/storage/PlatformSection/TopicContent/340/description/Connections%20for%20Stepper%20Motor%20Interfacing%20with%20Raspberry%20Pi.jpg"
        alt="Real Connection"
        style={{ maxWidth: "100%", borderRadius: "10px", marginTop: "10px" }}
      />

      <h1>Rotate Stepper Motor using Raspberry Pi</h1>

      <p>
        Let’s rotate a Stepper Motor in clockwise and counter-clockwise directions alternately.
      </p>

      <ul>
        <li>Here, we are using six wire unipolar stepper motor. Only four wires are required to control this stepper motor. The two center tap wires of the stepper motor are connected to the 5V supply.</li>
        <li>ULN2003 driver is used to drive unipolar stepper motor.</li>
        <li>We will interface Stepper Motor with Raspberry Pi using Python language. In this program, we have used the keyboard key as input for selecting motor rotation direction (i.e. clockwise or anti-clockwise).</li>
        
     </ul>

      <blockquote>
        <b>Note:</b> To find winding coils and their center tap leads, measure resistance in between the leads. From center leads we will get half the resistance value as compared to resistance between winding ends.
      </blockquote>

      <img
        src="https://www.electronicwings.com/storage/PlatformSection/TopicContent/340/description/Stepper%20Motor%20Interfacing%20with%20Raspberry%20Pi%201.jpg"
        alt="Stepper Output"
        style={{ maxWidth: "100%", borderRadius: "10px" }}
      />

      <h1>Stepper Motor Python Program for Raspberry Pi</h1>

      <div style={labelStyle}>Python</div>

      <pre style={codeStyle}>
{` '''
    Stepper Motor interfacing with Raspberry Pi
    http:///www.electronicwings.com
'''
import RPi.GPIO as GPIO
from time import sleep
import sys

#assign GPIO pins for motor
motor_channel = (29,31,33,35)  
GPIO.setwarnings(False)
GPIO.setmode(GPIO.BOARD)
#for defining more than 1 GPIO channel as input/output use
GPIO.setup(motor_channel, GPIO.OUT)

motor_direction = input('select motor direction a=anticlockwise, c=clockwise: ')
while True:
    try:
        if(motor_direction == 'c'):
            print('motor running clockwise\n')
            GPIO.output(motor_channel, (GPIO.HIGH,GPIO.LOW,GPIO.LOW,GPIO.HIGH))
            sleep(0.02)
            GPIO.output(motor_channel, (GPIO.HIGH,GPIO.HIGH,GPIO.LOW,GPIO.LOW))
            sleep(0.02)
            GPIO.output(motor_channel, (GPIO.LOW,GPIO.HIGH,GPIO.HIGH,GPIO.LOW))
            sleep(0.02)
            GPIO.output(motor_channel, (GPIO.LOW,GPIO.LOW,GPIO.HIGH,GPIO.HIGH))
            sleep(0.02)

        elif(motor_direction == 'a'):
            print('motor running anti-clockwise\n')
            GPIO.output(motor_channel, (GPIO.HIGH,GPIO.LOW,GPIO.LOW,GPIO.HIGH))
            sleep(0.02)
            GPIO.output(motor_channel, (GPIO.LOW,GPIO.LOW,GPIO.HIGH,GPIO.HIGH))
            sleep(0.02)
            GPIO.output(motor_channel, (GPIO.LOW,GPIO.HIGH,GPIO.HIGH,GPIO.LOW))
            sleep(0.02)
            GPIO.output(motor_channel, (GPIO.HIGH,GPIO.HIGH,GPIO.LOW,GPIO.LOW))
            sleep(0.02)

            
    #press ctrl+c for keyboard interrupt
    except KeyboardInterrupt:
        #query for setting motor direction or exit
        motor_direction = input('select motor direction a=anticlockwise, c=clockwise or q=exit: ')
        #check for exit
        if(motor_direction == 'q'):
            print('motor stopped')
            sys.exit(0)
`}
      </pre>

    </div>
  );
}

export default StepperMotor;