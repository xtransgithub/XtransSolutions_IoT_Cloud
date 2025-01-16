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
    // Set the selected channel id in Formik form state
    setFieldValue("channelId", channelId);

    console.log("Fetching fields for channel ID:", channelId); // Debugging statement

    // Fetch fields for the selected channel
    axios
      .get(`api/auth/channels/${channelId}/entries/read`) // Replace with your actual endpoint
      .then((response) => {
        console.log("Fields fetched successfully:", response.data.fields); // Debugging statement
        setFields(response.data.fields);
      })
      .catch((error) => {
        console.error("Error fetching fields:", error.response ? error.response.data : error.message); // Log full error details
        setFields([]); // Clear fields if error occurs
        setError("Failed to fetch fields. Please try again.");
      });
  };

  // Validation Schema
  const validationSchema = Yup.object({
    channelId: Yup.string().required("Please select a channel"),
    fieldName: Yup.string().required("Please select a field"),
    operator: Yup.string().required("Please select an operator"),
    triggerValue: Yup.number()
      .required("Please enter a trigger value")
      .positive("Trigger value must be a positive number"),
  });

  // Submit function
  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    const requestData = {
      ch_id: values.channelId,
      fieldName: values.fieldName,
      operator: values.operator,
      triggerValue: parseFloat(values.triggerValue),
    };

    axios
      .post("/api/auth/events", requestData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming token is stored in localStorage
        },
      })
      .then((response) => {
        alert(response.data.message);
        resetForm();
      })
      .catch((error) => {
        console.error("Error setting event:", error);
        alert("Failed to set event");
      })
      .finally(() => {
        setSubmitting(false);
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
              <ErrorMessage
                name="channelId"
                component="div"
                className="text-danger"
              />
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
                {fields.length > 0 ? (
                  fields.map((field, index) => (
                    <option key={index} value={field}>
                      {field}
                    </option>
                  ))
                ) : (
                  <option value="">No fields available</option>
                )}
              </Field>
              <ErrorMessage
                name="fieldName"
                component="div"
                className="text-danger"
              />
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
              <ErrorMessage
                name="operator"
                component="div"
                className="text-danger"
              />
            </div>

            {/* Trigger Value Input */}
            <div className="mb-3">
              <label htmlFor="triggerValue" className="form-label">
                Trigger Value:
              </label>
              <Field
                type="number"
                name="triggerValue"
                id="triggerValue"
                className="form-control"
              />
              <ErrorMessage
                name="triggerValue"
                component="div"
                className="text-danger"
              />
            </div>

            {/* Submit Button */}
            <div className="d-grid">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
              >
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
