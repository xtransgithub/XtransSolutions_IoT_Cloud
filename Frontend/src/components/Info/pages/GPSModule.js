import React from "react";
import GPS from "../images/GPS_Receiver_module-removebg-preview.png"
import Connection from "../images/GPS_interface_to_Raspberry_Pi-removebg-preview.png"
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


function GPSModule() {
  return (
    <div style={{ padding: "20px", lineHeight: "1.6" }}>
<h1>GPS Module Interfacing with Raspberry Pi</h1>
<img
  src="https://www.electronicwings.com/storage/PlatformSection/TopicContent/306/icon/GPS%20Module%20Interfacing%20with%20Raspberry%20Pi.jpg"
  alt="GPS Module Interfacing with Raspberry Pi"
  style={{ maxWidth: "100%", borderRadius: "10px" }}
/>
      <h1>Overview of GPS</h1>
       
      <ul  style={{ listStylePosition: 'inside', paddingLeft: 0, lineHeight: '1.6' }} >
        <li>Global Positioning System (GPS) makes use of signals sent by satellites in space and ground stations on Earth to accurately determine their position on Earth.</li>
        <li>Radio Frequency signals sent from satellites and ground stations are received by the GPS. GPS makes use of these signals to determine its exact position.</li>
        <li>The GPS itself does not need to transmit any information.</li>
        <li>The signals received from the satellites and ground stations contain time stamps of the time when the signals were transmitted. By calculating the difference between the time when the signal was transmitted and the time when the signal was received. Using the speed of the signal, the distance between the satellites and the GPS receiver can be determined using a simple formula for distance using speed and time.</li>
        <li>Using information from 3 or more satellites, the exact position of the GPS can be triangulated.</li>
        <li>For more information about GPS and how to use it, refer the topic GPS Receiver Module in the sensors and modules section.</li>
        <li>The GPS receiver module uses UART communication to communicate with controller or PC terminal.</li>
      </ul>

      <p>
      Before using UART on Raspberry Pi, we should configure and enable it. For more information about UART in Raspberry Pi and how to use it, refer the Raspberry Pi UART Communication Using Python And C topic  in the Raspberry Pi section.
      </p>

      <img
        src={GPS}
        alt="GPS Module"
        style={{ maxWidth: "400px", borderRadius: "10px" }}
      />
      <p>GPS Module </p>

      <h1>Connection Diagram of GPS Module with Raspberry Pi</h1>

      <img
        src={Connection}
        alt="Connection"
        style={{ maxWidth: "100%", borderRadius: "10px" }}
      />
       <p>GPS Module Interfacing with Raspberry Pi</p>
      <img
        src="https://www.electronicwings.com/storage/PlatformSection/TopicContent/306/description/Connections%20for%20GPS%20Module%20Interfacing%20with%20Raspberry%20Pi.jpg"
        alt="Real Connection"
        style={{ maxWidth: "100%", borderRadius: "10px" }}
      />

      <h1>Get GPS Location using Raspberry Pi</h1>

      <p>
         Let’s interface the GPS module with Raspberry Pi and will extract GPS information. We can interface the GPS module to Raspberry Pi using Python and C (WiringPi). To interface the GPS module, connect the GPS module to the Raspberry Pi as shown in the above figure.      </p>

      <h1>Using Python</h1>
       <p>Let’s extract Latitude, Longitude, and time information from the NMEA GPGGA string received from the GPS module using Python. And print them on the console (terminal). By using these latitude and longitude, locate the current position on Google Map.</p>
      <h2>GPS Code for Raspberry Pi using Python</h2>

      <div style={labelStyle}>Python</div>
      <pre style={codeStyle}>
{`'''
GPS Interfacing with Raspberry Pi using Pyhton
http://www.electronicwings.com
'''
import serial               #import serial pacakge
from time import sleep
import webbrowser           #import package for opening link in browser
import sys                  #import system package

def GPS_Info():
    global NMEA_buff
    global lat_in_degrees
    global long_in_degrees
    nmea_time = []
    nmea_latitude = []
    nmea_longitude = []
    nmea_time = NMEA_buff[0]                    #extract time from GPGGA string
    nmea_latitude = NMEA_buff[1]                #extract latitude from GPGGA string
    nmea_longitude = NMEA_buff[3]               #extract longitude from GPGGA string
    
    print("NMEA Time: ", nmea_time,'\n')
    print ("NMEA Latitude:", nmea_latitude,"NMEA Longitude:", nmea_longitude,'\n')
    
    lat = float(nmea_latitude)                  #convert string into float for calculation
    longi = float(nmea_longitude)               #convertr string into float for calculation
    
    lat_in_degrees = convert_to_degrees(lat)    #get latitude in degree decimal format
    long_in_degrees = convert_to_degrees(longi) #get longitude in degree decimal format
    
#convert raw NMEA string into degree decimal format   
def convert_to_degrees(raw_value):
    decimal_value = raw_value/100.00
    degrees = int(decimal_value)
    mm_mmmm = (decimal_value - int(decimal_value))/0.6
    position = degrees + mm_mmmm
    position = "%.4f" %(position)
    return position
    


gpgga_info = "$GPGGA,"
ser = serial.Serial ("/dev/ttyS0")              #Open port with baud rate
GPGGA_buffer = 0
NMEA_buff = 0
lat_in_degrees = 0
long_in_degrees = 0

try:
    while True:
        received_data = (str)(ser.readline())                   #read NMEA string received
        GPGGA_data_available = received_data.find(gpgga_info)   #check for NMEA GPGGA string                 
        if (GPGGA_data_available>0):
            GPGGA_buffer = received_data.split("$GPGGA,",1)[1]  #store data coming after "$GPGGA," string 
            NMEA_buff = (GPGGA_buffer.split(','))               #store comma separated data in buffer
            GPS_Info()                                          #get time, latitude, longitude
 
            print("lat in degrees:", lat_in_degrees," long in degree: ", long_in_degrees, '\n')
            map_link = 'http://maps.google.com/?q=' + lat_in_degrees + ',' + long_in_degrees    #create link to plot location on Google map
            print("<<<<<<<<press ctrl+c to plot location on google maps>>>>>>\n")               #press ctrl+c to plot on map and exit 
            print("------------------------------------------------------------\n")
                        
except KeyboardInterrupt:
    webbrowser.open(map_link)        #open current position information in google map
    sys.exit(0)
`}
      </pre>
    <p>Output for Python</p>
      <h3>Output on Python IDE</h3>

      <img
        src="https://www.electronicwings.com/storage/PlatformSection/TopicContent/306/description/GPS%20info.png"
        alt="Python Output"
        style={{ maxWidth: "100%", borderRadius: "10px" }}
      />

      <h3> Output Location on Google Map</h3>

      <img
        src="https://www.electronicwings.com/storage/PlatformSection/TopicContent/306/description/plot%20location%20on%20google%20map.png"
        alt="Map Output"
        style={{ maxWidth: "100%", borderRadius: "10px" }}
      />
      <p>Location on Google Map</p>
      <p>
      To plot our location on Google map, we need to call URL link for Google map. We can use following link for opening google map with our extracted longitude and latitude.
        <b> http://maps.google.com/?q=latitude,longitude</b>
      </p>

      <img
        src="https://www.electronicwings.com/storage/PlatformSection/TopicContent/306/description/GPS%20Module%20Interfacing%20with%20Raspberry%20Pi%201.jpg"
        alt="Extra Output"
        style={{ maxWidth: "100%", borderRadius: "10px" }}
      />

      <h1>Using C</h1>
       <p>We will extract the NMEA GPGGA string and print it on the output window. Here, we are using the WiringPi library written in C to read the GPS module.

</p><p>To know more about WiringPi, you can refer How To Use WiringPi Library On Raspberry Pi</p>
      <h2>GPS Code for Raspberry Pi using C (WiringPi)</h2>

      <div style={{ ...labelStyle, background: "#198754" }}>C</div>
      <pre style={codeStyle}>
{`/*
	GPS Interfacing with Raspberry Pi using C (WiringPi Library)
	http://www.electronicwings.com
*/

#include <stdio.h>
#include <string.h>
#include <errno.h>

#include <wiringPi.h>
#include <wiringSerial.h>

int main ()
{
  int serial_port; 
  char dat,buff[100],GGA_code[3];
  unsigned char IsitGGAstring=0;
  unsigned char GGA_index=0;
  unsigned char is_GGA_received_completely = 0;
  
  if ((serial_port = serialOpen ("/dev/ttyS0", 9600)) < 0)		/* open serial port */
  {
    fprintf (stderr, "Unable to open serial device: %s\n", strerror (errno)) ;
    return 1 ;
  }

  if (wiringPiSetup () == -1)							/* initializes wiringPi setup */
  {
    fprintf (stdout, "Unable to start wiringPi: %s\n", strerror (errno)) ;
    return 1 ;
  }

  while(1){
	  
		if(serialDataAvail (serial_port) )		/* check for any data available on serial port */
		  { 
			dat = serialGetchar(serial_port);		/* receive character serially */		
			if(dat == '$'){
				IsitGGAstring = 0;
				GGA_index = 0;
			}
			else if(IsitGGAstring ==1){
				buff[GGA_index++] = dat;
				if(dat=='\r')
					is_GGA_received_completely = 1;
				}
			else if(GGA_code[0]=='G' && GGA_code[1]=='G' && GGA_code[2]=='A'){
				IsitGGAstring = 1;
				GGA_code[0]= 0; 
				GGA_code[0]= 0;
				GGA_code[0]= 0;		
				}
			else{
				GGA_code[0] = GGA_code[1];
				GGA_code[1] = GGA_code[2];
				GGA_code[2] = dat;
				}
		  }
		if(is_GGA_received_completely==1){
			printf("GGA: %s",buff);
			is_GGA_received_completely = 0;
		}
	}
	return 0;
}
`}
      </pre>

      <h3>Output</h3>

      <img
        src="https://www.electronicwings.com/storage/PlatformSection/TopicContent/306/description/GGA%20Info%20using%20C.png"
        alt="C Output"
        style={{ maxWidth: "100%", borderRadius: "10px" }}
      />

      <blockquote>
        <b>Note:</b> As we interfaced GPS module with Raspberry Pi 3, we used /dev/ttyS0 serial port for UART communication. Those who are interfacing it with Raspberry Pi 2 and previous model, you should use /dev/ttyAMA0 instead.
      </blockquote>

    </div>
  );
}

export default GPSModule;