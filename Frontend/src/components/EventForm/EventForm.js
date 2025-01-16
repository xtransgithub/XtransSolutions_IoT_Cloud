import React, { useState, useEffect } from "react";
import axios from "axios";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

const EventForm = () => {
  const navigate = useNavigate();
  const [channels, setChannels] = useState([]);
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");
  const server = "http://162.255.85.191:8000/";

  // Fetch channels when the component mounts
  useEffect(() => {
    const fetchChannels = async () => {
      if (!token) {
        navigate("/signin"); // Redirect to sign-in page if token is not found
        return;
      }

      try {
        const response = await axios.get(`${server}api/auth/channels`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 200) {
          setChannels(response.data.channels);
        } else {
          setError("Failed to fetch channels. Please try again.");
        }
      } catch (err) {
        console.error("Error fetching channels:", err);
        setError("Something went wrong while fetching channels.");
      } finally {
        setLoading(false);
      }
    };

    fetchChannels();
  }, [navigate, token]);

  // Fetch fields when a channel is selected
  const handleChannelChange = (channelId, setFieldValue) => {
    setFieldValue("channelId", channelId);
    setFieldValue("fieldName", ""); // Reset field selection when the channel changes

    console.log("Fetching fields for channel ID:", channelId); // Debugging statement

    // Fetch fields for the selected channel
    axios
      .get(`${server}api/channels/${channelId}/entries/read`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log("Fields fetched successfully:", response.data); // Debugging statement

        const fields = response.data.entries
          .flatMap(entry => entry.fieldData) // Extract all fieldData from entries
          .map(field => field.name) // Extract only the field names
          .filter((value, index, self) => self.indexOf(value) === index); // Remove duplicates if any

        setFields(fields); // Set fields for dropdown
      })
      .catch((error) => {
        console.error("Error fetching fields:", error.response ? error.response.data : error.message);
        setFields([]); // Clear fields if error occurs
        setError("Failed to fetch fields. Please try again.");
      });
  };

  // Validation Schema
  const validationSchema = Yup.object({
    channelId: Yup.string().required("Please select a channel"),
    fieldName: Yup.string().required("Please select a field"),
    operator: Yup.string().required("Please select an operator"),
    triggerValue: Yup.string()
      .required("Please enter a trigger value")
      .matches(/^[a-zA-Z0-9\s]*$/, "Trigger value must be a valid string"), // Only allow alphanumeric and spaces
  });

  // Submit function
  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    const requestData = {
      ch_id: values.channelId,        // Correct field name for channel ID
      fieldName: values.fieldName,    // The field name selected
      operator: values.operator,      // The operator selected (greater than, less than, etc.)
      triggerValue: values.triggerValue,  // Trigger value as a string
      triggerType: "email",           // Assuming triggerType is fixed as email for now
    };

    console.log("Request Data:", requestData);

    // Make the API request to create the event
    axios
      .post(`${server}api/auth/events`, requestData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming token is stored in localStorage
        },
      })
      .then((response) => {
        alert(response.data.message);  // Notify user about the result
        resetForm();                    // Reset the form after successful submission
      })
      .catch((error) => {
        console.error("Error setting event:", error);
        if (error.response && error.response.data) {
          alert(error.response.data.message); // Display the error message from the backend
        } else {
          alert("Failed to set event");    // Show a generic error message
        }
      })
      .finally(() => {
        setSubmitting(false);  // Allow submission again after the request completes
      });
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Set Event Alerts</h1>

      {loading && <div>Loading channels...</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <Formik
        initialValues={{
          channelId: "",
          fieldName: "",
          operator: "greater than",
          triggerValue: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, values, setFieldValue }) => (
          <Form className="card p-4 shadow">
            {/* Channel Selection */}
            <div className="mb-3">
              <label htmlFor="channelId" className="form-label">
                Select Channel:
              </label>
              <Field
                as="select"
                name="channelId"
                id="channelId"
                className="form-select"
                onChange={(e) => handleChannelChange(e.target.value, setFieldValue)}
              >
                <option value="">Select a Channel</option>
                {channels.map((channel) => (
                  <option key={channel._id} value={channel._id}>
                    {channel.name}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="channelId" component="div" className="text-danger" />
            </div>

            {/* Field Selection */}
            <div className="mb-3">
              <label htmlFor="fieldName" className="form-label">
                Select Field:
              </label>
              <Field
                as="select"
                name="fieldName"
                id="fieldName"
                className="form-select"
                disabled={!values.channelId}
              >
                <option value="">Select a Field</option>
                {fields && fields.length > 0 ? (
                  fields.map((field, index) => (
                    <option key={index} value={field}>
                      {field}
                    </option>
                  ))
                ) : (
                  <option value="">No fields available</option>
                )}
              </Field>
              <ErrorMessage name="fieldName" component="div" className="text-danger" />
            </div>

            {/* Operator Selection */}
            <div className="mb-3">
              <label htmlFor="operator" className="form-label">
                Operator:
              </label>
              <Field
                as="select"
                name="operator"
                id="operator"
                className="form-select"
              >
                <option value="less than">Less Than</option>
                <option value="greater than">Greater Than</option>
                <option value="equal to">Equal To</option>
                <option value="less than equal to">Less Than Equal To</option>
                <option value="greater than equal to">Greater Than Equal To</option>
                <option value="not equal to">Not Equal To</option>
              </Field>
              <ErrorMessage name="operator" component="div" className="text-danger" />
            </div>

            {/* Trigger Value Input */}
            <div className="mb-3">
              <label htmlFor="triggerValue" className="form-label">
                Trigger Value:
              </label>
              <Field
                type="text"
                name="triggerValue"
                id="triggerValue"
                className="form-control"
              />
              <ErrorMessage name="triggerValue" component="div" className="text-danger" />
            </div>

            {/* Submit Button */}
            <div className="d-grid">
              <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                {isSubmitting ? "Setting Event..." : "Set Event"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EventForm;
