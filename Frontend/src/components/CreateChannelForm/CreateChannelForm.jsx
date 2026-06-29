import React, { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import config from "../../config";
import "./CreateChannel.css";

const CreateChannelForm = ({ onClose }) => {
  const [showAlert, setShowAlert] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [fieldLimitAlert, setFieldLimitAlert] = useState(false);
  const [uniqueFieldAlert, setUniqueFieldAlert] = useState(false);
  const [uniqueChannelNameAlert, setUniqueChannelNameAlert] = useState(false);
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    name: Yup.string().required("Channel name is required"),
    description: Yup.string().required("Description is required")
    .max(120, "Description cannot exceed 100 characters"),
    fields: Yup.array()
      .of(
        Yup.string()
          .required("Field name is required")
          .matches(
            /^[a-z0-9]+$/,
            "Field name can only contain lowercase letters and numbers"
          )
      )
      .min(1, "At least one field is required"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const token = localStorage.getItem("token");

    const fieldNames = values.fields;
    const uniqueFieldNames = new Set(fieldNames);
    if (fieldNames.length !== uniqueFieldNames.size) {
      setUniqueFieldAlert(true);
      setSubmitting(false);
      return;
    }

    try {
      const response = await axios.post(`${config.BACKEND_URL}api/auth/channels`, values, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 201) {
        localStorage.setItem("x-api-key", response.data.channel.apiKey);
        setResponseMessage("Channel created successfully!");
        setShowAlert(true);
        setTimeout(() => {
          navigate(`/dashboard/${response.data.channel._id}`);
        }, 2000);
        resetForm();
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setUniqueChannelNameAlert(true);
      } else {
        setResponseMessage(
          error.response ? error.response.data.message : "Something went wrong"
        );
        setShowAlert(true);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="close-btn my-2" onClick={onClose}>&times;</button>

        <h2 className="mb-3">Create a New Channel</h2>

        {showAlert && <div className="alert alert-info">{responseMessage}</div>}
        {fieldLimitAlert && (
          <div className="alert alert-warning">You can only add up to 5 fields.</div>
        )}
        {uniqueFieldAlert && (
          <div className="alert alert-warning">Field names must be unique.</div>
        )}
        {uniqueChannelNameAlert && (
          <div className="alert alert-warning">Channel name must be unique.</div>
        )}

        <Formik
          initialValues={{ name: "", description: "", fields: [""] }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, values }) => (
            <Form className="row g-2">
              <div className="col-md-12">
                <label htmlFor="name" className="form-label">Channel Name</label>
                <Field type="text" id="name" name="name" placeholder="Enter channel name" className="form-control" />
                <ErrorMessage name="name" component="div" className="text-danger" />
              </div>

              <div className="col-md-12">
                <label htmlFor="description" className="form-label">Description</label>
                <Field name="description">
                  {({ field }) => (
                    <TextareaAutosize {...field} id="description" placeholder="Enter description (Max 100)" className="form-control" minRows={2} />
                  )}
                </Field>
                <ErrorMessage name="description" component="div" className="text-danger" />
              </div>

              <div className="col-12">
                <label className="form-label">Fields</label>
                <FieldArray name="fields">
                  {({ insert, remove, push }) => (
                    <div>
                      {values.fields.length > 0 &&
                        values.fields.map((field, index) => (
                          <div key={index} className="field-container mb-2">
                            <Field type="text" name={`fields.${index}`} placeholder={`Field ${index + 1}`} className="form-control" />
                            <ErrorMessage name={`fields.${index}`} component="div" className="text-danger" />
                            {values.fields.length > 1 && (
                              <button type="button" className="btn btn-danger btn-sm mt-1" onClick={() => remove(index)}>
                                Delete
                              </button>
                            )}
                          </div>
                        ))}
                      <button
                        type="button"
                        className="btn btn-secondary mt-2"
                        onClick={() => {
                          if (values.fields.length >= 5) {
                            setFieldLimitAlert(true);
                          } else {
                            push("");
                            setFieldLimitAlert(false);
                          }
                        }}
                      >
                        Add Field
                      </button>
                    </div>
                  )}
                </FieldArray>
              </div>

              <div className="col-12">
                <button type="submit" className="btn btn-success" disabled={isSubmitting}>
                  {isSubmitting ? "Creating..." : "Create Channel"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CreateChannelForm;