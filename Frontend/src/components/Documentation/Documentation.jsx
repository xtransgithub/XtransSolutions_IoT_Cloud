import React from "react";
import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";

const Documentation = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      {/* Navbar */}
      <Navbar />

      {/* Main Content Wrapper */}
      <div style={{ display: "flex", flexGrow: 1 }}>
        {/* Sidebar */}
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
          }}
        >
          <h5 style={{ marginBottom: "1.5rem", color: "rgb(169, 201, 233)" }}>
            Documentation
          </h5>
          <ul className="nav flex-column">
            <li className="nav-item">
              <a
                className="nav-link"
                href="#introduction"
                style={{
                  color: "rgb(169, 201, 233)",
                  textDecoration: "none",
                  padding: "10px 0",
                }}
              >
                Introduction
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="#usage"
                style={{
                  color: "rgb(169, 201, 233)",
                  textDecoration: "none",
                  padding: "10px 0",
                }}
              >
                How to Use
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="#navigation"
                style={{
                  color: "rgb(169, 201, 233)",
                  textDecoration: "none",
                  padding: "10px 0",
                }}
              >
                Navigation
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="#signup"
                style={{
                  color: "rgb(169, 201, 233)",
                  textDecoration: "none",
                  padding: "10px 0",
                }}
              >
                How to Sign Up
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="#create-channel"
                style={{
                  color: "rgb(169, 201, 233)",
                  textDecoration: "none",
                  padding: "10px 0",
                }}
              >
                How to Create a Channel
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="#channel-dashboard"
                style={{
                  color: "rgb(169, 201, 233)",
                  textDecoration: "none",
                  padding: "10px 0",
                }}
              >
                How to Use the Channel Dashboard
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="#alerts"
                style={{
                  color: "rgb(169, 201, 233)",
                  textDecoration: "none",
                  padding: "10px 0",
                }}
              >
                Configuring Event Alerts
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="#reset-password"
                style={{
                  color: "rgb(169, 201, 233)",
                  textDecoration: "none",
                  padding: "10px 0",
                }}
              >
                Steps to Reset Your Password
              </a>
            </li>
          </ul>
        </nav>

        {/* Main Content */}
        <div
          style={{
            marginLeft: "250px",
            padding: "1rem",
            flexGrow: 1,
            overflowY: "auto",
            marginTop: "3.5rem", // Adjusted to leave space for the navbar
            backgroundColor: "#f8f9fa",
          }}
        >
          <h1 style={{ color: "#0e2238" }}>Documentation</h1>
          <p>
            Welcome to the documentation page! Here you'll find guidance on how to navigate and use the website effectively.
          </p>
        
          <section id="introduction" style={{ marginBottom: "2rem", scrollMarginTop: "4rem",}}>
            <h2>Introduction</h2>
            <p>
              This platform is designed to provide a seamless experience for users to explore IoT-related projects and services. The website has been organized to make it easy for you to find the information and tools you need.
            </p>
          </section>
        
          <section id="usage" style={{ marginBottom: "2rem", scrollMarginTop: "4rem", }}>
            <h2>How to Use</h2>
            <p>To get the most out of the platform, follow these steps:</p>
            <ol>
              <li>
                <strong>Explore the Homepage</strong>: Start by visiting the homepage to understand the core offerings and services.
              </li>
              <li>
                <strong>Sign Up/Sign In</strong>: To access all the features, you’ll need to sign up or log in. For more details, see the "How to Sign Up" section below.
              </li>
              <li>
                <strong>Services Exploration</strong>: Go to the "Services" section to learn more about the specific services we offer like cloud analytics, real-time monitoring, and AIoT solutions.
              </li>
              <li>
                <strong>Channel Management</strong>: Manage and configure communication channels through the "Channels" section for seamless integration.
              </li>
              <li>
                <strong>Check the Documentation</strong>: Visit this documentation page anytime to get help with navigating or using the platform's features.
              </li>
            </ol>
          </section>

          <section id="navigation" style={{ marginBottom: "2rem", scrollMarginTop: "4rem", }}>
            <h2>Navigation</h2>
            <p>
              The website is divided into several key sections to make navigation simple:
            </p>
            <ul>
              <li>
                <strong>Home</strong>: The landing page where you can get an overview of the services and features offered.
              </li>
              <li>
                <strong>Services</strong>: Explore the range of services available for IoT projects, such as cloud analytics and real-time monitoring.
              </li>
              <li>
                <strong>Documentation</strong>: The page you are currently viewing, where you can find detailed information on how to use the platform and navigate through various sections.
              </li>
              <li>
                <strong>Channels</strong>: View and manage different communication channels available for data transfer.
              </li>
              <li>
                <strong>Contact</strong>: Reach out to support or the team for any queries or assistance.
              </li>
            </ul>
            <p>
              Use the sidebar to navigate between the sections of this documentation for detailed insights.
            </p>
          </section>
        
        
        
          <section id="signup" style={{ marginBottom: "2rem", scrollMarginTop: "4rem", }}>
            <h2>How to Sign Up</h2>
            <p>Follow the steps below to sign up for an account:</p>
            <ol>
              <li>
                <strong>Go to the Sign-Up Page</strong>: Visit the{" "}
                <Link to="/signup">Sign Up</Link> page.
              </li>
              <li>
                <strong>Fill in the Registration Form</strong>: Provide your details, including your first name, last name, email, password, mobile number, and optionally, your avatar URL.
              </li>
              <li>
                <strong>Agree to the Terms</strong>: Make sure to check the box agreeing to the Terms of Service.
              </li>
              <li>
                <strong>Submit the Form</strong>: After filling in all the necessary details, click the "Register" button.
              </li>
            </ol>
          </section>
        
          <section id="create-channel" style={{ marginBottom: "2rem", scrollMarginTop: "4rem", }}>
            <h2>How to Create a Channel</h2>
            <p>Follow these steps to create a new channel:</p>
            <ol>
              <li>
                <strong>Navigate to the Channels Section</strong>: Go to the "Channels" page from the main navigation menu.
              </li>
              <li>
                <strong>Click on "Create Channel"</strong>: Look for the "Create Channel" button and click it to open the channel creation form.
              </li>
              <li>
                <strong>Fill in the Details</strong>: Provide the required details such as the channel name, description, and type (e.g., public or private).
              </li>
              <li>
                <strong>Set Up Parameters</strong>: Configure any necessary parameters for the channel, such as data fields, thresholds, or permissions.
              </li>
              <li>
                <strong>Save the Channel</strong>: Click the "Save" button to create the channel. Your new channel will now appear in the list of available channels.
              </li>
            </ol>
            <p>
              Once the channel is created, you can manage it from the "Channels" section, where you can edit settings, view data, or delete the channel if needed.
            </p>
          </section>

          <section id="channel-dashboard" style={{ marginBottom: "2rem", scrollMarginTop: "4rem",}}>
            <h2>How to Use the Channel Dashboard</h2>
            <p>
              The Channel Dashboard is a versatile tool for monitoring and managing your data. Here's a step-by-step guide to help you navigate and make the most out of it:
            </p>
            <ol>
            <li>
              <strong>Viewing Channel Details:</strong> The left panel displays the channel's basic information, including:
              <ul>
                <li>Channel Name</li>
                <li>Description</li>
                <li>Channel ID</li>
                <li>User ID</li>
                <li>List of Fields in the channel</li>
              </ul>
              Use this section to get an overview of your channel and its metadata.
            </li>
            <li>
              <strong>Exporting Data:</strong> Click the <em>Export Data</em> button in the left panel to download the channel's data as a CSV file for offline analysis.
            </li>
            <li>
              <strong>Editing Channel Details:</strong> Click the <em>Edit</em> button to modify channel properties:
              <ul>
                <li>Update the channel name.</li>
                <li>Add new fields to the channel.</li>
                <li>Rename existing fields.</li>
                <li>Remove unnecessary fields.</li>
              </ul>
              Once you're done, save your changes to reflect them in the dashboard.
            </li>
            <li>
              <strong>Viewing Charts:</strong> The right panel displays data visualizations for each field in the channel. For each field, you can:
              <ul>
                <li>View data using Gauge Chart (real-time value) or Line Chart (historical data over time).</li>
                <li>Switch between chart types using the dropdown menu next to the field's name.</li>
              </ul>
            </li>
            <li>
              <strong>Switching Chart Types:</strong> Select the chart type from the dropdown:
              <ul>
                <li><strong>Gauge Chart:</strong> Displays the current value of the field.</li>
                <li><strong>Line Chart:</strong> Displays historical trends.</li>
                <li><strong>All Charts:</strong> Displays both gauge and line charts.</li>
              </ul>
            </li>
            <li>
              <strong>Adding New Fields:</strong> In edit mode:
              <ul>
                <li>Add new fields by entering their names.</li>
                <li>Click <em>Add Another Field</em> to include multiple new fields.</li>
                <li>Submit your additions to integrate them into the channel.</li>
              </ul>
            </li>
            <li>
              <strong>Removing Fields:</strong> Specify the field name you want to remove in the provided input box. Click <em>Remove Field</em> to delete it from the channel.
            </li>
            <li>
              <strong>Viewing Historical Data:</strong> Line charts display historical data trends with time-stamped labels. Hover over the chart points to view specific values at different times.
            </li>
            <li>
              <strong>Real-Time Monitoring:</strong> Gauge charts show the current real-time value of a field, helping you monitor live updates.
            </li>
            <li>
              <strong>Customizing the Dashboard:</strong> Each field’s display and charts can be tailored to your needs by editing field names or switching chart types.
            </li>
          </ol>
          <p>
            By following these steps, you can effectively manage and monitor your channels to optimize IoT workflows.
          </p>
          </section>

          <section id="alerts" style={{ marginBottom: "2rem", scrollMarginTop: "4rem", }}>
            <h2>Configuring Event Alerts</h2>
            <p>To configure event alerts on your channels, follow these steps:</p>
            <ol>
              <li><strong>Go to the Channel Settings</strong>: Navigate to the "Channels" section and select the channel for which you want to configure alerts.</li>
              <li><strong>Enable Event Alerts</strong>: In the channel settings, toggle the "Enable Event Alerts" option.</li>
              <li><strong>Select Event Types</strong>: Choose the types of events that should trigger an alert, such as device malfunction, threshold exceedance, or security breach.</li>
              <li><strong>Set Alert Thresholds</strong>: Define the conditions under which the alert will be triggered, such as a specific temperature, humidity level, or other parameters.</li>
              <li><strong>Configure Notification Preferences</strong>: Choose how you would like to receive alerts (e.g., via email, SMS, or push notification).</li>
              <li><strong>Save Settings</strong>: Once you have configured the event alerts, click "Save" to apply your settings. Alerts will now be triggered based on the conditions you've defined.</li>
            </ol>
            <p>If you need further assistance configuring alerts or troubleshooting, please refer to the support section or contact our team.</p>
          </section>
        
          <section id="reset-password" style={{ marginBottom: "2rem", scrollMarginTop: "4rem", }}>
            <h2>Steps to Reset Your Password</h2>
            <p>
              If you’ve forgotten your password or need to reset it, follow these steps:
            </p>
            <ol>
              <li>
                Navigate to the <Link to="/reset-password">Reset Password</Link>{" "} page.
              </li>
              <li>Enter the reset token sent to your email.</li>
              <li>Provide and confirm your new password.</li>
              <li>Click "Reset Password" to submit.</li>
            </ol>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Documentation;
