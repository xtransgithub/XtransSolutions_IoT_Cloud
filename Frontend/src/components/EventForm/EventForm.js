import React, { useState, useEffect } from "react";
import axios from "axios";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { server } from "../../config";

const EventForm = () => {
  const navigate = useNavigate();
  const [channels, setChannels] = useState([]);
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchChannels = async () => {
      if (!token) {
        navigate("/signin");
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

  const handleChannelChange = (channelId, setFieldValue) => {
    setFieldValue("channelId", channelId);
    setFieldValue("fieldName", "");

    const selectedChannel = channels.find((channel) => channel._id === channelId);

    if (selectedChannel && Array.isArray(selectedChannel.fields)) {
      setFields(selectedChannel.fields);
    } else {
      setFields([]);
    }
  };

  const validationSchema = Yup.object({
    channelId: Yup.string().required("Please select a channel"),
    fieldName: Yup.string().required("Please select a field"),
    operator: Yup.string().required("Please select an operator"),
    triggerValue: Yup.string()
      .required("Please enter a trigger value")
      .matches(/^[a-zA-Z0-9\s]*$/, "Trigger value must be a valid string"),
  });

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    const requestData = {
      ch_id: values.channelId,
      fieldName: values.fieldName,
      operator: values.operator,
      triggerValue: values.triggerValue,
      triggerType: "email",
    };

    console.log("Request Data:", requestData);

    axios
      .post(`${server}api/auth/events`, requestData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log(response);
        resetForm();
      })
      .catch((error) => {
        console.error("Error setting event:", error);
        if (error.response && error.response.data) {
          alert(error.response.data.message);
        } else {
          alert("Failed to set event");
        }
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
