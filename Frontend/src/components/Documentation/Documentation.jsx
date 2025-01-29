import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";
import Loading from "../loading";

const Documentation = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  // Array of documentation sections for dynamic numbering
  const sections = [
    { id: "introduction", title: "Introduction", subsections: [] },
    {
      id: "usage",
      title: "How to Use",
      subsections: [
        "Explore the Homepage",
        "Sign Up/Sign In",
        "Services Exploration",
        "Channel Management",
        "Check the Documentation",
      ],
    },
    {
      id: "navigation",
      title: "Navigation",
      subsections: ["Home", "Services", "Documentation", "Channels", "Contact"],
    },
    {
      id: "signup",
      title: "How to Sign Up",
      subsections: [
        "Go to the Sign-Up Page",
        "Fill in the Registration Form",
        "Agree to the Terms",
        "Submit the Form",
      ],
    },
    {
      id: "create-channel",
      title: "How to Create a Channel",
      subsections: [
        "Navigate to the Channels Section",
        "Click on 'Create Channel'",
        "Fill in the Details",
        "Set Up Parameters",
        "Save the Channel",
      ],
    },
    {
      id: "channel-dashboard",
      title: "How to Use the Channel Dashboard",
      subsections: [
        "Viewing Channel Details",
        "Exporting Data",
        "Editing Channel Details",
        "Viewing Charts",
        "Switching Chart Types",
        "Adding New Fields",
        "Removing Fields",
        "Viewing Historical Data",
        "Real-Time Monitoring",
        "Customizing the Dashboard",
      ],
    },
    {
      id: "raspberry-pi",
      title: "Connecting Raspberry Pi to IoT Cloud",
      subsections: [
        "Hardware Requirements",
        "Software Requirements",
        "Python Script Explanation",
        "Running the Script on Raspberry Pi",
        "Example Channel Setup",
      ],
    },
    {
      id: "alerts",
      title: "Configuring Event Alerts",
    },
    {
      id: "reset-password",
      title: "Steps to Reset Your Password",
    },
  ];  

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Navbar />

      Main Content Wrapper
      <div style={{ display: "flex", flexGrow: 1 }}>
        {/* Sidebar Toggle Button */}
        <button
          onClick={toggleSidebar}
          style={{
            position: "fixed",
            top: "4rem",
            left: isSidebarVisible ? "250px" : "10px",
            zIndex: 1000,
            backgroundColor: "#0e2238",
            color: "white",
            border: "none",
            borderRadius: "5px",
            padding: "10px 15px",
            cursor: "pointer",
            transition: "left 0.3s",
            fontWeight: "bold",
          }}
        >
          {isSidebarVisible ? "✖" : "☰"}
        </button>

        {/* Sidebar Navigation */}
        {isSidebarVisible && (
          <nav
            style={{
              width: "250px",
              backgroundColor: "#0e2238",
              borderRight: "1px solid #dee2e6",
              padding: "1rem",
              position: "fixed",
              top: "3.5rem",
              bottom: 0,
              overflowY: "auto",
              transition: "transform 0.3s",
            }}
          >
            <h5 style={{ marginBottom: "1.5rem", color: "rgb(169, 201, 233)" }}>
              Documentation
            </h5>
            <ul className="nav flex-column">
              {sections.map((section, index) => (
                <li key={section.id} className="nav-item">
                  <a
                    className="nav-link"
                    href={`#${section.id}`}
                    style={{
                      color: "rgb(169, 201, 233)",
                      textDecoration: "none",
                      padding: "10px 0",
                    }}
                  >
                    {`${index + 1}. ${section.title}`}
                  </a>
                  {section.subsections && (
                    <ol style={{ color: "rgb(169, 201, 233)", paddingLeft: "0px" }}>
                      {section.subsections.map((subsection, subIndex) => (
                        <li key={subIndex} style={{ paddingLeft: "20px" }}>
                          <strong>
                            {`${index + 1}.${subIndex + 1} ${subsection}`}
                          </strong>
                        </li>
                      ))}
                    </ol>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        )}

        {/* Main Content */}
        <div
          style={{
            marginLeft: isSidebarVisible ? "250px" : "0",
            padding: "2rem 4rem 0rem 4rem",
            flexGrow: 1,
            overflowY: "auto",
            marginTop: "1.5rem", // Adjusted to leave space for the navbar
            backgroundColor: "#f8f9fa",
            transition: "margin-left 0.3s",
          }}
        >
          {isLoading ? (
            <Loading message={"Loading Documentation..."} />
          ) : (
            <div>
              <h1 style={{ color: "#0e2238" }}>Documentation</h1>
              <p>
                Welcome to the documentation page! Here you'll find guidance on how to navigate and use the website effectively.
              </p>

              <section id="introduction" style={{ marginBottom: "2rem", scrollMarginTop: "4rem", }}>
                <h4>1. Introduction</h4>
                <p>
                  This platform is designed to provide a seamless experience for users to explore IoT-related projects and services. The website has been organized to make it easy for you to find the information and tools you need.
                </p>
              </section>

              <section id="usage" style={{ marginBottom: "2rem", scrollMarginTop: "4rem", }}>
                <h4>2. How to Use</h4>
                <p>To get the most out of the platform, follow these steps:</p>
                <ol>
                  <li><strong>2.1 Explore the Homepage</strong>: Start by visiting the homepage to understand the core offerings and services.</li>
                  <li><strong>2.2 Sign Up/Sign In</strong>: To access all the features, you’ll need to sign up or log in. For more details, see the "How to Sign Up" section below.</li>
                  <li><strong>2.3 Services Exploration</strong>: Go to the "Services" section to learn more about the specific services we offer like cloud analytics, real-time monitoring, and AIoT solutions.</li>
                  <li><strong>2.4 Channel Management</strong>: Manage and configure communication channels through the "Channels" section for seamless integration.</li>
                  <li><strong>2.5 Check the Documentation</strong>: Visit this documentation page anytime to get help with navigating or using the platform's features.</li>
                </ol>
              </section>

              <section id="navigation" style={{ marginBottom: "2rem", scrollMarginTop: "4rem", }}>
                <h4>3. Navigation</h4>
                <p>The website is divided into several key sections to make navigation simple:</p>
                <ul>
                  <li><strong>3.1 Home</strong>: The landing page where you can get an overview of the services and features offered.</li>
                  <li><strong>3.2 Services</strong>: Explore the range of services available for IoT projects, such as cloud analytics and real-time monitoring.</li>
                  <li><strong>3.3 Documentation</strong>: The page you are currently viewing, where you can find detailed information on how to use the platform and navigate through various sections.</li>
                  <li><strong>3.4 Channels</strong>: View and manage different communication channels available for data transfer.</li>
                  <li><strong>3.5 Contact</strong>: Reach out to support or the team for any queries or assistance.</li>
                </ul>
                <p>
                  Use the sidebar to navigate between the sections of this documentation for detailed insights.
                </p>
              </section>

              <section id="signup" style={{ marginBottom: "2rem", scrollMarginTop: "4rem", }}>
                <h4>4. How to Sign Up</h4>
                <p>Follow the steps below to sign up for an account:</p>
                <ol>
                  <li><strong>4.1 Go to the Sign-Up Page</strong>: Visit the <Link to="/signup">Sign Up</Link> page.</li>
                  <li><strong>4.2 Fill in the Registration Form</strong>: Provide your details, including your first name, last name, email, password, mobile number, and optionally, your avatar URL.</li>
                  <li><strong>4.3 Agree to the Terms</strong>: Make sure to check the box agreeing to the Terms of Service.</li>
                  <li><strong>4.4 Submit the Form</strong>: After filling in all the necessary details, click the "Register" button.</li>
                </ol>
              </section>

              <section id="create-channel" style={{ marginBottom: "2rem", scrollMarginTop: "4rem", }}>
              <h4>5. How to Create a Channel</h4>
              <p>Follow these steps to create a new channel:</p>
              <ol>
                <li><strong>5.1 Navigate to the Channels Section</strong>: Go to the "Channels" page from the main navigation menu.</li>
                <li><strong>5.2 Click on "Create Channel"</strong>: Look for the "Create Channel" button and click it to open the channel creation form.</li>
                <li><strong>5.3 Fill in the Details</strong>: Provide the required details such as the channel name, description, and type (e.g., public or private).</li>
                <li><strong>5.4 Set Up Parameters</strong>: Configure any necessary parameters for the channel, such as data fields, thresholds, or permissions.</li>
                <li><strong>5.5 Save the Channel</strong>: Click the "Save" button to create the channel. Your new channel will now appear in the list of available channels.</li>
              </ol>
              <p>
                Once the channel is created, you can manage it from the "Channels" section, where you can edit settings, view data, or delete the channel if needed.
              </p>
            </section>

            <section id="channel-dashboard" style={{ marginBottom: "2rem", scrollMarginTop: "4rem",}}>
              <h4>6. How to Use the Channel Dashboard</h4>
              <p>The Channel Dashboard is a versatile tool for monitoring and managing your data. Here's a step-by-step guide to help you navigate and make the most out of it:</p>
              <ol>
              <li><strong>6.1 Viewing Channel Details:</strong> The left panel displays the channel's basic information, including:
                <ul>
                  <li>Channel Name</li>
                  <li>Description</li>
                  <li>Channel ID</li>
                  <li>User ID</li>
                  <li>List of Fields in the channel</li>
                </ul>
                Use this section to get an overview of your channel and its metadata.
              </li>
              <li><strong>6.2 Exporting Data:</strong> Click the <em>Export Data</em> button in the left panel to download the channel's data as a CSV file for offline analysis.</li>
              <li><strong>6.3 Editing Channel Details:</strong> Click the <em>Edit</em> button to modify channel properties:
                <ul>
                  <li>Update the channel name.</li>
                  <li>Add new fields to the channel.</li>
                  <li>Rename existing fields.</li>
                  <li>Remove unnecessary fields.</li>
                </ul>
                Once you're done, save your changes to reflect them in the dashboard.
              </li>
              <li><strong>6.4 Viewing Charts:</strong> The right panel displays data visualizations for each field in the channel. For each field, you can:
                <ul>
                  <li>View data using Gauge Chart (real-time value) or Line Chart (historical data over time).</li>
                  <li>Switch between chart types using the dropdown menu next to the field's name.</li>
                </ul>
              </li>
              <li><strong>6.5 Switching Chart Types:</strong> Select the chart type from the dropdown:
                <ul>
                  <li><strong>Gauge Chart:</strong> Displays the current value of the field.</li>
                  <li><strong>Line Chart:</strong> Displays historical trends.</li>
                  <li><strong>All Charts:</strong> Displays both gauge and line charts.</li>
                </ul>
              </li>
              <li><strong>6.6 Adding New Fields:</strong> In edit mode:
                <ul>
                  <li>Add new fields by entering their names.</li>
                  <li>Click <em>Add Another Field</em> to include multiple new fields.</li>
                  <li>Submit your additions to integrate them into the channel.</li>
                </ul>
              </li>
              <li><strong>6.7 Removing Fields:</strong> Specify the field name you want to remove in the provided input box. Click <em>Remove Field</em> to delete it from the channel.</li>
              <li><strong>6.8 Viewing Historical Data:</strong> Line charts display historical data trends with time-stamped labels. Hover over the chart points to view specific values at different times.</li>
              <li><strong>6.9 Real-Time Monitoring:</strong> Gauge charts show the current real-time value of a field, helping you monitor live updates.</li>
              <li><strong>6.10 Customizing the Dashboard:</strong> Each field’s display and charts can be tailored to your needs by editing field names or switching chart types.</li>
            </ol>
            <p>By following these steps, you can effectively manage and monitor your channels to optimize IoT workflows.</p>
            </section>

            <section
              id="raspberry-pi"
              style={{ marginBottom: "2rem", scrollMarginTop: "4rem" }}
            >
              <h4>7. Connecting Raspberry Pi to IoT Cloud</h4>
              <p>
                The following documentation provides a step-by-step guide to
                connect your Raspberry Pi to an IoT cloud platform and upload
                sensor data dynamically.
              </p>

              <h5>7.1 Hardware Requirements</h5>
              <ul>
                <li>Xtrans AIOT Kit</li>
              </ul>

              <h5>7.2 Software Requirements</h5>
              <ol>
                <li>
                  <strong>7.2.1 Python Libraries:</strong>
                  <p>
                    Install the following Python libraries before running the
                    script:
                  </p>
                  <pre>
                    sudo pip install Adafruit_DHT Adafruit_GPIO RPi.GPIO requests
                  </pre>
                </li>
                <li>
                  <strong>7.2.2 IoT Cloud Setup:</strong>
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

              <h5>7.3 Python Script Explanation</h5>
              <ol>
                <li>
                  <strong>7.3.1 Sensor Configuration:</strong>
                  <ul>
                    <li>
                      The script initializes sensors like DHT11 and connects the
                      MCP3008 ADC to handle analog sensor inputs.
                    </li>
                    <li>GPIO pins are used for the LDR light detection.</li>
                  </ul>
                </li>
                <li>
                  <strong>7.3.2 API Endpoint:</strong>
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
                  <strong>7.3.3 Data Preparation:</strong>
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
                  <strong>7.3.4 Data Upload:</strong>
                  <p>
                    The script sends the data to the IoT cloud using the requests
                    library.
                  </p>
                </li>
              </ol>

              <h5>7.4 Running the Script on Raspberry Pi</h5>
              <ol>
                <li>
                  <strong>7.4.1 Enable SPI and GPIO:</strong>
                  <p>
                    Run <code>raspi-config</code> and enable SPI under "Interface
                    Options."
                  </p>
                </li>
                <li>
                  <strong>7.4.2 Set Up Sensors:</strong>
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
                  <strong>7.4.3 Run the Script:</strong>
                  <p>
                    Save the script as <code>send_data_to_cloud.py</code> and
                    execute it with:
                  </p>
                  <pre>python3 send_data_to_cloud.py</pre>
                </li>
                <li>
                  <strong>7.4.4 Verify Data:</strong>
                  <p>
                    Check the IoT cloud dashboard for incoming data. Ensure the
                    field names (<code>f1</code>, <code>f2</code>, etc.) match
                    between the script and the cloud channel configuration.
                  </p>
                </li>
              </ol>

              <h5>7.5 Example Channel Setup</h5>
              <ul>
                <li>
                  <strong>7.5.1 Channel Name:</strong> Environmental Monitoring
                </li>
                <li>
                  <strong>7.5.2 Description:</strong> This channel logs data from
                  temperature, humidity, light, gas, and soil moisture sensors.
                </li>
                <li>
                  <strong>7.5.3 Fields:</strong>
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

            <section id="alerts" style={{ marginBottom: "2rem", scrollMarginTop: "4rem", }}>
              <h4>8. Configuring Event Alerts</h4>
              <p>To configure event alerts on your channels, follow these steps:</p>
              <ol>
                <li><strong>8.1 Go to the Channel Settings</strong>: Navigate to the "Channels" section and select the channel for which you want to configure alerts.</li>
                <li><strong>8.2 Enable Event Alerts</strong>: In the channel settings, toggle the "Enable Event Alerts" option.</li>
                <li><strong>8.3 Select Event Types</strong>: Choose the types of events that should trigger an alert, such as device malfunction, threshold exceedance, or security breach.</li>
                <li><strong>8.4 Set Alert Thresholds</strong>: Define the conditions under which the alert will be triggered, such as a specific temperature, humidity level, or other parameters.</li>
                <li><strong>8.5 Configure Notification Preferences</strong>: Choose how you would like to receive alerts (e.g., via email, SMS, or push notification).</li>
                <li><strong>8.6 Save Settings</strong>: Once you have configured the event alerts, click "Save" to apply your settings. Alerts will now be triggered based on the conditions you've defined.</li>
              </ol>
              <p>If you need further assistance configuring alerts or troubleshooting, please refer to the support section or contact our team.</p>
            </section>
          
            <section id="reset-password" style={{ marginBottom: "2rem", scrollMarginTop: "4rem", }}>
              <h4>9. Steps to Reset Your Password</h4>
              <p>
                If you’ve forgotten your password or need to reset it, follow these steps:
              </p>
              <ol>
                <li><strong>9.1</strong> Navigate to the <Link to="/reset-password">Reset Password</Link>{" "} page.</li>
                <li><strong>9.2</strong> Enter the reset token sent to your email.</li>
                <li><strong>9.3</strong> Provide and confirm your new password.</li>
                <li><strong>9.4</strong> Click "Reset Password" to submit.</li>
              </ol>
            </section>

            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Documentation;
