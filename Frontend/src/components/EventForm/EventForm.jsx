import React, { useState, useEffect } from "react";
import axios from "axios";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { server } from "../../config";
import AlertModal from "../Alert/Alert";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import reminder1 from "../../assets/tutorial/alert/reminder1.jpeg";
import alert__1 from "../../assets/tutorial/alert/Alert_1.png";
import alert__2 from "../../assets/tutorial/alert/Alert_2.png";
import alert__3 from "../../assets/tutorial/alert/Alert_3.png";
import alert__4 from "../../assets/tutorial/alert/Alert_4.png";
import alert__5 from "../../assets/tutorial/alert/Alert_5.png";

const tutorialSteps = [
  { src: reminder1, title: "Home", text: "Event Alerts" },
  { src: alert__1, title: "Step 1", text: "Select Channel from the dropdown" },
  { src: alert__2, title: "Step 2", text: "Select Field from the field dropdown" },
  { src: alert__3, title: "Step 3", text: "Select Operator" },
  { src: alert__4, title: "Step 4", text: "Input Trigger Value and Email Address then Click on Set Event" },
  { src: alert__5, title: "Step 5", text: "Click on OK" },
];

const EventForm = () => {
  const navigate = useNavigate();
  const [channels, setChannels] = useState([]);
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const token = localStorage.getItem("token");
  const [activeIndex, setActiveIndex] = useState(0);

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
    triggerValue: Yup.number()
      .required("Please enter a trigger value")
      .typeError("Trigger value must be a number"),
    email: Yup.string()
      .required("Please enter an email address")
      .email("Invalid email address"),
  });

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    const requestData = {
      reciver_email: values.email,
      operator: values.operator,
      ch_id: values.channelId,
      fieldName: values.fieldName,
      triggerValue: parseFloat(values.triggerValue),
    };

    axios
      .post(`${server}api/auth/events`, requestData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setAlertMessage(response.data.message);
        setShowAlert(true);
        resetForm();
      })
      .catch((error) => {
        console.error("Error setting event:", error);
        const errorMessage =
          error.response && error.response.data
            ? error.response.data.message
            : "Failed to set event";
        setAlertMessage(errorMessage);
        setShowAlert(true);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const handleSelect = (selectedIndex) => {
    setActiveIndex(selectedIndex);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center text-primary mb-4">Set Event Alerts</h2>
      <div className="row">
        <div className="col-md-6 d-flex flex-column align-items-center">
          <Carousel fade interval={2000} className="w-100" onSelect={handleSelect}>
            {tutorialSteps.map((step, index) => (
              <Carousel.Item key={index}>
                <img className="carousel-img" src={step.src} alt={step.title} />
              </Carousel.Item>
            ))}
          </Carousel>

          <div className="carousel-caption-below text-center mt-3">
            <h5 className="fw-bold">{tutorialSteps[activeIndex].title}</h5>
            <p>{tutorialSteps[activeIndex].text}</p>
          </div>
        </div>

        <style>{`
          .carousel-img {
            max-width: 100%;
            max-height: 450px; /* Adjust this value as needed */
            width: auto;
            height: auto;
            object-fit: contain;
            display: block;
            margin: auto;
          }

          .carousel-control-prev-icon,
          .carousel-control-next-icon {
            filter: invert(100%); /* Turns arrows black */
          }
        `}</style>

        <div className="col-md-6">
          {loading && <div>Loading channels...</div>}
          {error && <div className="alert alert-danger">{error}</div>}

          {showAlert && <AlertModal message={alertMessage} onClose={handleCloseAlert} />}

          <Formik
            initialValues={{
              channelId: "",
              fieldName: "",
              operator: "greater than",
              triggerValue: "",
              reciver_email: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, values, setFieldValue }) => (
              <Form className="card p-4 shadow">
                <div className="mb-3">
                  <label className="form-label">Select Channel:</label>
                  <Field as="select" name="channelId" className="form-select" onChange={(e) => handleChannelChange(e.target.value, setFieldValue)}>
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
                  <label className="form-label">Select Field:</label>
                  <Field as="select" name="fieldName" className="form-select" disabled={!values.channelId}>
                    <option value="">Select a Field</option>
                    {fields.map((field, index) => (
                      <option key={index} value={field}>{field}</option>
                    ))}
                  </Field>
                  <ErrorMessage name="fieldName" component="div" className="text-danger" />
                </div>

                {/* Operator Selection */}
                <div className="mb-3">
                  <label className="form-label">Operator:</label>
                  <Field as="select" name="operator" className="form-select">
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

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email Address:
                  </label>
                  <Field
                    type="email"
                    name="email"
                    id="reciver_email"
                    className="form-control"
                  />
                  <ErrorMessage name="email" component="div" className="text-danger" />
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
      </div>
    </div>
  );
};

export default EventForm;
