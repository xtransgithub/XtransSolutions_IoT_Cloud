import React from "react";
import PiCameraModules from "../images/Pi_Camera-removebg-preview.png"
import CameraConnected from "../images/camera_connected-removebg-preview.png"
// import CSIPortPosition from "../"
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

function PiCameraModule() {
  return (
    <div style={{ padding: "20px", lineHeight: "1.6" }}>
      <h1>Pi Camera Module Interface with Raspberry Pi using Python</h1>
      <h1>Introduction</h1>

      <img
        src={PiCameraModules}
        alt="Pi Camera Module"
        style={{ width: "400px", marginBottom: "20px" }}
      />

      <p>
        The pi Camera module is a camera that can be used to take pictures and high definition video.
      </p>

      <p>
        Raspberry Pi Board has CSI (Camera Serial Interface) interface to which we can attach the PiCamera module directly.
      </p>

      <p>
        This Pi Camera module can attach to the Raspberry Pi’s CSI port using a 15-pin ribbon cable.
      </p>

      <h1>Features of Pi Camera</h1>

      <ul>
        <li>Resolution – 5 MP</li>
        <li>HD Video recording –   1080p @30fps, 720p @60fps, 960p @45fps and so on.</li>
        <li>It Can capture wide, still (motionless) images of a resolution 2592x1944 pixels</li>
        <li>CSI Interface enabled</li>
      </ul>

      <h1>How to attach Pi Camera to Raspberry Pi?</h1>
      <p>Connect Pi Camera to the CSI interface of the Raspberry Pi board as shown below,</p>
      <img
        src="https://www.electronicwings.com/storage/PlatformSection/TopicContent/336/description/camera%20positon.jpg"
        alt="CSI Port Position"
        style={{ maxWidth: "100%" }}
      />
<br></br>
<p>   </p>
      <img
        src={CameraConnected }
        alt="Camera Connected"
        style={{ maxWidth: "100%", marginTop: "10px" }}
      />

      <p>
        Now, we can use Pi Camera for capturing images and videos using Raspberry Pi.
      </p>

      <p>
        Before using Pi Camera, we need to enable camera for its working.
      </p>

      <h1>How to Enable Camera functionality on Raspberry Pi</h1>

      <p>
        For enabling the camera in Raspberry Pi, open the raspberry pi configuration using the following command,
      </p>

      <pre style={codeStyle}>sudo raspi-config</pre>

      <p>
        then select Interfacing options in which select the camera option to enable its functionality.
      </p>

      <p>Reboot Raspberry Pi.</p>
<p>Now we can access the camera on Raspberry Pi.

</p><p>Now we can capture images and videos using Pi Camera on Raspberry Pi.</p>
      <h1>Example</h1>

      <p>
We can capture images using Python. Here, we will write a Python program to capture images using Pi Camera on Raspberry Pi.

</p><p>Here, we have used picamera package(library) which provides different classes for Raspberry Pi. Out of which we are mainly interested in PiCamera class which is for camera module.      </p>

      <h2>Pi Camera Python Program for Image Capture</h2>

      <pre style={codeStyle}>
{`'''
capture images on Raspberry Pi using Pi Camera
	http://www.electronicwings.com
'''

import picamera
from time import sleep

camera = picamera.PiCamera()
camera.resolution = (1024, 768)
camera.brightness = 60
camera.start_preview()

camera.annotate_text = 'Hi Pi User'
sleep(5)

camera.capture('image1.jpeg')
camera.stop_preview()
`}
      </pre>

      <h2>Functions Used</h2>
      <p>To use picamera python based library we have to include it in our program as given below</p>
      <pre style={codeStyle}>import picamera</pre>
      <p>This picamera library has PiCamera class for the camera module. So, we have to create an object for PiCamera class.</p>
      <p><b>PiCamera Class</b>

To use Pi Camera in Python on Raspberry Pi, we can use PiCamera class which has different APIs for camera functionality. We need to create object for PiCamera class.

</p><p><b>E.g. </b></p>
      <pre style={codeStyle}>Camera = picamera.PiCamera()</pre>
       <p>The above PiCamera class has different member variables and functions which we can access by simply inserting a dot (.) in between object name and member name.</p>
     <p><b>E.g. </b></p>
      {/* <p>Set resolution:</p> */}
      <pre style={codeStyle}>Camera.resolution = (720, 480)</pre>
     <p><b>capture()</b></p>
     <p>It is used to capture images using Pi Camera</p>
     <p><b>E.g. </b></p>
      {/* <p>Capture image:</p> */}
      <pre style={codeStyle}>Camera.capture("/home/pi/image.jpeg")</pre>
      <p>The capture() function has different parameters which we can pass for different operations like resize, format, use_video_port, etc.</p>
      <p><b>E.g. </b></p>
      {/* <p>Add text:</p> */}
      <pre style={codeStyle}>Camera.capture(“/home/pi/image.jpeg”, resize=(720, 480))</pre>

  <p><b>resolution= (width,height)</b></p>
  <p>It sets the resolution of the camera at which image captures, video records, and previews will display. The resolution can be specified as (width, height) tuple, as a string formatted WIDTHxHEIGHT, or as a string containing commonly recognized display resolution names e.g. “HD”, “VGA”, “1080p”, etc.</p>
    <p><b>E.g:</b></p>

      <p>Preview:</p>
      <pre style={codeStyle}><li>Camera.resolution = (720, 480)</li>
<li>Camera.resolution = “720 x 480”</li>
<li>Camera.resolution = “720p”</li>
<li>Camera.resolution = “HD”</li></pre>
  <p><b>Annotate_text = “Text”</b></p>
  <p>It is used to add text on images, videos, etc.</p>
  <p><b>E.g. </b></p>
      <pre style={codeStyle}>Camera.annotate_text = “Hi Pi User”</pre>

<p><b>start_preview()</b></p>
<p>It displays the preview overlay of the default or specified resolution.</p>
<p><b>E.g. </b></p>
<pre style={codeStyle}>Camera.start_preview()</pre>
<p><b>stop_preview()</b></p>
<p>It is used to close the preview overlay.</p>
<p><b>E.g.  </b></p>
<pre style={codeStyle} >Camera.stop_preview()</pre>
      <p><b>Note:</b> There are various APIs of PiCamera class. So, to know more API in detail you can refer</p>
      <h1>Pi Camera Python Program for Video Recording</h1>
   
      <pre style={codeStyle}>
{`'''
Record video on Raspberry Pi using pi Camera
	http://www.electronicwings.com
'''

import picamera
from time import sleep

camera = picamera.PiCamera()
camera.resolution = (640, 480)

camera.start_recording("/home/pi/demo.h264")
camera.wait_recording(20)
camera.stop_recording()
camera.close()

print("video recording stopped")
`}
      </pre>

      <h2>Functions used</h2>
      <p>We have to create an object for PiCamera class. Here, we have create objects as camera.</p>
      <p><b>start_recording()</b></p>
      <p>It is used to start video recording and store it.</p>
      <p><b>E.g.</b></p>
      <p>Start recording:</p>
      <pre style={codeStyle}>Camera.start_recording('demo.h264')</pre>


<p><b>wait_recording(timeout)</b>

</p><p>Wait on the video encoder for specified timeout seconds.

</p><p><b>E.g.</b></p>
      <p>Wait:</p>

      <pre style={codeStyle}>Camera.wait_recording(60)</pre>
<p><b>stop_recording()</b>

</p><p>It is used to stop video recording.

</p><p><b>E.g.</b></p>
      <p>Stop recording:</p>
      <pre style={codeStyle}>Camera.stop_recording()</pre>

      <p><b>Play Recorded Video</b></p>
       <p>To open a video, we can use omxplayer by using the following command,</p>
      <pre style={codeStyle}>omxplayer video_name</pre>

    </div>
  );
}

export default PiCameraModule;