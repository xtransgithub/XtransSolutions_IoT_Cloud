import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import Loading from "../loading";

import Home_page from "../../assets/tutorial/home.jpg";
import email_verify_page from "../../assets/tutorial/email_verify.png";
import email_page from "../../assets/tutorial/email.jpg";
import Signin_page from "../../assets/tutorial/Signin.jpg";
import Signin2_page from "../../assets/tutorial/Signin2.jpg";
import Verify1_page from "../../assets/tutorial/Verify1.jpg";
import Signup_page from "../../assets/tutorial/Signup.jpg";

const Tutorials = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTutorial, setSelectedTutorial] = useState("raspberry-pi");

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Navbar />
      {isLoading ? (
        <Loading message={"Loading Documentation..."} />
      ) : (
        <div style={{ marginLeft: "2rem", marginTop: "5rem" }}>
          <h1 style={{ color: "#0e2238" }}>Tutorials</h1>
          <p>
            Welcome to the Tutorial page! Select a tutorial from the dropdown below.
          </p>

          {/* Dropdown Selection */}
          <select
            value={selectedTutorial}
            onChange={(e) => setSelectedTutorial(e.target.value)}
            style={{ padding: "0.5rem", fontSize: "1rem", marginBottom: "1rem" }}
          >
            <option value="xtrans-signup">Creating an Account on Xtrans IoT Cloud</option>
            <option value="raspberry-pi">Connecting Raspberry Pi to IoT Cloud</option>
            <option value="dummy-tutorial">Dummy Tutorial: Getting Started with IoT</option>
          </select>

          {/* Connecting Raspberry Pi to IoT Cloud */}
          {selectedTutorial === "raspberry-pi" && (
            <section id="raspberry-pi" style={{ marginBottom: "2rem", scrollMarginTop: "4rem" }}>
              <h4>Connecting Raspberry Pi to IoT Cloud</h4>
              <p>
                The following documentation provides a step-by-step guide to
                connect your Raspberry Pi to an IoT cloud platform and upload
                sensor data dynamically.
              </p>

              <h5>1 Hardware Requirements</h5>
              <ul>
                <li>Xtrans AIOT Kit</li>
              </ul>

              <h5>2 Software Requirements</h5>
              <ol>
                <li>
                  <strong>2.1 Python Libraries:</strong>
                  <p>
                    Install the following Python libraries before running the
                    script:
                  </p>
                  <pre>
                    sudo pip install Adafruit_DHT Adafruit_GPIO RPi.GPIO requests
                  </pre>
                </li>
                <li>
                  <strong>2.2 IoT Cloud Setup:</strong>
                  <ul>
                    <li>
                      Visit your IoT cloud platform and log in or create an
                      account.
                    </li>
                    <li>
                      Create a new channel with a unique name and description.
                    </li>
                    <li>
                      Add fields in the channel to correspond with the sensor
                      readings:
                      <ul>
                        <li>field1: Temperature</li>
                        <li>field2: Humidity</li>
                        <li>field3: Light</li>
                        <li>field4: Gas</li>
                        <li>field5: Soil Moisture</li>
                      </ul>
                    </li>
                  </ul>
                </li>
              </ol>

              <h5>3 Python Script Explanation</h5>
              <ol>
                <li>
                  <strong>3.1 Sensor Configuration:</strong>
                  <ul>
                    <li>
                      The script initializes sensors like DHT11 and connects the
                      MCP3008 ADC to handle analog sensor inputs.
                    </li>
                    <li>GPIO pins are used for the LDR light detection.</li>
                  </ul>
                </li>
                <li>
                  <strong>3.2 API Endpoint:</strong>
                  <p>
                    Replace the <code>base_url</code> in the script with the URL
                    of your IoT cloud channel's API. Example:
                  </p>
                  <pre>
                    base_url =
                    'http://&lt;cloud-platform-ip&gt;:&lt;port&gt;/api/channels/&lt;channel-id&gt;/entries'
                  </pre>
                </li>
                <li>
                  <strong>3.3 Data Preparation:</strong>
                  <p>
                    Sensor data is read in real-time, and values are dynamically
                    mapped to the IoT cloud fields:
                  </p>
                  <pre>{`fields = {
                      "field1": temperature,  # Temperature in °C
                      "field2": humidity,     # Humidity in %
                      "field3": light,        # Light status (0: detected, 1: not detected)
                      "field4": gas,          # Gas sensor reading (ADC value)
                      "field5": soilmois      # Soil moisture sensor reading (ADC value)
                    }`}
                  </pre>
                </li>
                <li>
                  <strong>3.4 Data Upload:</strong>
                  <p>
                    The script sends the data to the IoT cloud using the requests
                    library.
                  </p>
                </li>
              </ol>

              <h5>4 Running the Script on Raspberry Pi</h5>
              <ol>
                <li>
                  <strong>4.1 Enable SPI and GPIO:</strong>
                  <p>
                    Run <code>raspi-config</code> and enable SPI under "Interface
                    Options."
                  </p>
                </li>
                <li>
                  <strong>4.2 Set Up Sensors:</strong>
                  <ul>
                    <li>Connect the DHT11 sensor to GPIO pin 4.</li>
                    <li>
                      Connect the LDR and other analog sensors to MCP3008 channels
                      as per the script:
                      <ul>
                        <li>ADC Channel 0: Gas Sensor.</li>
                        <li>ADC Channel 1: Soil Moisture Sensor.</li>
                      </ul>
                    </li>
                  </ul>
                </li>
                <li>
                  <strong>4.3 Run the Script:</strong>
                  <p>
                    Save the script as <code>send_data_to_cloud.py</code> and
                    execute it with:
                  </p>
                  <pre>python3 send_data_to_cloud.py</pre>
                </li>
                <li>
                  <strong>4.4 Verify Data:</strong>
                  <p>
                    Check the IoT cloud dashboard for incoming data. Ensure the
                    field names (<code>f1</code>, <code>f2</code>, etc.) match
                    between the script and the cloud channel configuration.
                  </p>
                </li>
              </ol>

              <h5>5 Example Channel Setup</h5>
              <ul>
                <li>
                  <strong>5.1 Channel Name:</strong> Environmental Monitoring
                </li>
                <li>
                  <strong>5.2 Description:</strong> This channel logs data from
                  temperature, humidity, light, gas, and soil moisture sensors.
                </li>
                <li>
                  <strong>5.3 Fields:</strong>
                  <ul>
                    <li>field1: Temperature</li>
                    <li>field2: Humidity</li>
                    <li>field3: Light</li>
                    <li>field4: Gas</li>
                    <li>field5: Soil Moisture</li>
                  </ul>
                </li>
              </ul>
            </section>
          )}

          {/* Creating an Account on Xtrans IoT Cloud */}
          {selectedTutorial === "xtrans-signup" && (
            <section id="xtrans-signup" style={{ marginBottom: "2rem", scrollMarginTop: "4rem" }}>
              <h4>Creating an Account on Xtrans IoT Cloud</h4>
              <p>
                Follow these steps to create an account on the Xtrans IoT Cloud platform.
              </p>

              <ol>
                <li>
                  1. Go to the home page.
                  <br />
                  <img src={Home_page} alt="Home Page" width="500px" />
                </li>
                <li>
                  2. Click on the <strong>Sign In</strong> button.
                  <br />
                  <img src={Signin_page} alt="Sign In Page" width="500px" />
                </li>
                <li>
                  3. Click on <strong>Sign Up</strong> to create a new account.
                  <br />
                  <img src={Signup_page} alt="Sign Up Page" width="500px" />
                </li>
                <li>
                  4. Fill in the required details:
                  <ul>
                    <li>First Name</li>
                    <li>Last Name</li>
                    <li>Email</li>
                    <li>Password</li>
                    <li>Mobile Number (Optional)</li>
                  </ul>
                </li>
                <li>
                  5. Check the box to agree to the <strong>Terms of Service</strong>.
                </li>
                <li>
                  6. Click the <strong>Register</strong> button to complete your sign-up.
                </li>
                <li>
                  7. You will see a confirmation message stating that a verification email has been sent.
                  <br />
                  <img src={Verify1_page} alt="Email Verification Message" width="500px" />
                </li>
                <li>
                  8. Open the email you used for registration and find the verification email.
                  <br />
                  <img src={email_page} alt="Email Verification" width="500px" />
                </li>
                <li>
                  9. Click on the verification link in the email.
                </li>
                <li>
                  10. A confirmation message will appear stating that your email has been successfully verified.
                  <br />
                  <img src={email_verify_page} alt="Email Verified" width="500px" />
                </li>
                <li>
                  11. You will be redirected to the <strong>Sign In</strong> page.
                  <br />
                  <img src={Signin2_page} alt="Sign In Page After Verification" width="500px" />
                </li>
                <li>
                  12. Enter your registered email and password to log in and start using the Xtrans IoT Cloud services.
                </li>
              </ol>
            </section>
          )}

          {/* Dummy Tutorial */}
          {selectedTutorial === "dummy-tutorial" && (
            <section id="dummy-tutorial" style={{ marginBottom: "2rem", scrollMarginTop: "4rem" }}>
              <h4>Dummy Tutorial: Getting Started with IoT</h4>
              <p>
                This is a placeholder tutorial to demonstrate the dropdown functionality. Here, you'll learn the basics of IoT device setup.
              </p>
              <h5>1. Introduction</h5>
              <p>Internet of Things (IoT) is a network of devices connected to exchange data.</p>
              <h5>2. Setting Up IoT Devices</h5>
              <ul>
                <li>Choose an IoT platform (AWS IoT, Google Cloud IoT, etc.).</li>
                <li>Connect your device using MQTT or HTTP protocols.</li>
              </ul>
              <h5>3. Sending Data to Cloud</h5>
              <pre>mqtt.publish("iot/topic", "Hello IoT World")</pre>
            </section>
          )}
        </div>
      )}
    </div>
  );
};

export default Tutorials;
