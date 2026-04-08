import React from "react";

function WiringPiLibrary() {
  return (
    <div style={{ padding: "20px", lineHeight: "1.8" }}>
      <h1>How to use WiringPi Library on Raspberry Pi</h1>

      <h2>What is WiringPi?</h2>
      <p>
        WiringPi is a library written in C used to access GPIO pins on Raspberry
        for BCM2835 (Broadcom Processor) SoC (System on Chip). There are various
        libraries available to access GPIO in C like bcm2835, sysfs, pigpio,
        etc. Here, we are using WiringPi library for Raspberry Pi GPIO access.
      </p>

      <p>
        To use wiringPi, first we should install it on Raspberry Pi. This
        installation can be done in two ways which is as follows,
      </p>

      <h2>How to Install WiringPi Library?</h2>

      <h3>Step 1</h3>
      <p>This way of installing WiringPi library will use git.</p>

      <p>Follow the following steps to install it on Raspberry Pi,</p>

      <p>
        Make sure our Raspbian is updated. So, first check for any update and
        upgrade on Raspberry Pi.
      </p>

      <pre style={codeStyle}>
{`sudo apt-get update
sudo apt-get upgrade`}
      </pre>

      <p>
        Now, we can use git to download WiringPi library. For that we should
        install git on Raspberry Pi if already not installed.
      </p>

      <pre style={codeStyle}>
{`sudo apt-get install git-core`}
      </pre>

      <p>To get WiringPi use git as follows,</p>

      <pre style={codeStyle}>
{`git clone git://git.drogon.net/wiringPi`}
      </pre>

      <p>
        Now, create directory for WiringPi and build it. Also, fetch the updated
        version from git.
      </p>

      <pre style={codeStyle}>
{`cd wiringPi
git pull origin
./build`}
      </pre>

      <p>Installation of WiringPi library is done.</p>

      <h3>Step 2</h3>

      <p>
        We can install WiringPi library in other way also. To install WiringPi
        library on Raspberry Pi, first we should download it. We can download
        WiringPi Library here.
      </p>

      <p>
        On above link, there are more files to download. Just download file which
        is at the top, is the latest updated file. By clicking on snapshot, we
        can download it.
      </p>

      <p>
        Now follow the steps(commands) given below to install the above downloaded
        library,
      </p>

      <pre style={codeStyle}>
{`cd
tar xfz downloaded_filename.tar.gz
cd downloaded_filename
./build`}
      </pre>

      <p>Now, we can check/test the installation of WiringPi library as follows:</p>
      <pre style={codeStyle}>
{` gpio -v`}
      </pre>
      <img
        src="https://www.electronicwings.com/storage/PlatformSection/TopicContent/300/description/check%20wiringPi%20version.png"
        alt="Check WiringPi Version"
        style={imgStyle}
      />

      <p>
        The above screenshot tells that the WiringPi library is installed successfully.
      </p>

      <p>
        Now, we can access GPIO using WiringPi library. But, the pin numbering used
        in Wiring Pi library is different than GPIO numbering (BCM) and Physical
        numbering(BOARD).
      </p>

      <p>
        To get information about pin numbering on our respective Raspberry Pi version,
        we can use following command:
      </p>

      <pre style={codeStyle}>
{`gpio readall`}
      </pre>

      <img
        src="https://www.electronicwings.com/storage/PlatformSection/TopicContent/300/description/GPIO%20wiringPi%20config.png"
        alt="GPIO Pin Numbering"
        style={imgStyle}
      />

      <p>
        The above screenshot shows pin numbering as per WiringPi, BCM (GPIO numbering)
        and Physical numbering(Board).
      </p>

      <h2>Use WiringPi library</h2>

      <p>
        Here, we will access GPIO on Raspberry Pi using WiringPi library to blink LED.
      </p>

      <h3>LED Interfacing With Raspberry Pi</h3>

      <img
        src="https://www.electronicwings.com/storage/PlatformSection/TopicContent/300/description/led%20blinking%20using%20Pi.png"
        alt="LED Blinking"
        style={imgStyle}
      />

      <pre style={codeStyle}>
{`gpio -v`}
      </pre>

      <h3>Raspberry Pi LED Blinking code using C (wiringPi)</h3>

      <p>
        Let’s write a C program to access GPIO using WiringPi library. To write a
        C program, create new file by right clicking and select empty file. Write
        a program and save that file with .c extension.
      </p>

      <p>In this program, we will blink LED connected to Raspberry Pi.</p>

      <h3>Program</h3>

      <pre style={codeBlock}>
{`#include <wiringPi.h>
#include <stdio.h>

int LED = 26; /* GPIO26 as per wiringPi, GPIO12 as per BCM, pin no.32 */

int main(){
    wiringPiSetup();   /* initialize wiringPi setup */
    pinMode(LED, OUTPUT);   /* set GPIO as output */

    while (1){
        digitalWrite(LED, HIGH);   /* write high on GPIO */
        delay(1000);
        digitalWrite(LED, LOW);    /* write low on GPIO */
        delay(1000);
    }
}`}
      </pre>

      <h2>How to Compile and Execute C Program using command terminal</h2>

      <p>
        Now, we should compile above C program with wiringPi library which is
        given as follows.
      </p>

      <pre style={codeStyle}>
{`gcc -o led_blink led_blink.c -l wiringPi`}
      </pre>

      <p>
        The above command will create an executable file of name led_blink. Then,
        use following command to execute above program.
      </p>

      <pre style={codeStyle}>
{`sudo ./led_blink`}
      </pre>

      <p>After executing above command LED will starts blinking.</p>

      <h2>Compile and Execute C Program using IDE</h2>

      <p>
        In Raspbian OS, there is an installed Geany Programmer’s Editor. We can
        use this editor as an IDE for developing programs and execute them.
      </p>

      <img
        src="https://www.electronicwings.com/storage/PlatformSection/TopicContent/300/description/Geany%20IDE.jpg"
        alt="Geany IDE"
        style={imgStyle}
      />

      <p>
        After opening it, create new file and write program in it. To create new
        file, click on file and select new option which is shown as follows,
      </p>

      <img
        src="https://www.electronicwings.com/storage/PlatformSection/TopicContent/300/description/create_new_file.png"
        alt="Create New File"
        style={imgStyle}
      />

      <p>Write a program in editor and save it with .c extension</p>

      <p>
        Before compiling and executing a program with WiringPi library in Geany
        Programmer’s Editor, we should add few lines in build settings.
      </p>

      <p>
        To add these lines, click on Build and select Set Build Commands which is
        shown as follows,
      </p>

      <img
        src="https://www.electronicwings.com/storage/PlatformSection/TopicContent/300/description/set_build_command.png"
        alt="Set Build Command"
        style={imgStyle}
      />

      <p>
        Modify C and Execute commands section for compiling and executing program
        using WiringPi Library shown as follows,
      </p>

      <img
        src="https://www.electronicwings.com/storage/PlatformSection/TopicContent/300/description/geany%20build%20settings.png"
        alt="Build Settings"
        style={imgStyle}
      />

      <p>Click on OK.</p>

      <p>
        Now, we can build C program and execute it with WiringPi library.
      </p>
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

export default WiringPiLibrary;