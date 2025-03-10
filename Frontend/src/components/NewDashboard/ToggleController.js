import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { handleDeviceToggle, handleCreateDevice, handleDeleteDevice } from './ToggleUtils';

const ToggleController = ({ token, setDeviceData }) => {
    const [deviceStatus, setDeviceStatus] = useState({});

    // Validation schema for the device form
    const deviceSchema = Yup.object({
        deviceName: Yup.string().required('Device name is required'),
        channelId: Yup.string().required('Channel ID is required'),
        value: Yup.number().required('Device value is required'),
    });

    return (
        <div className="toggle-controller">
            <h2>Create or Toggle Device</h2>

            {/* Device Creation Form */}
            <Formik
                initialValues={{ deviceName: '', deviceType: '', channelId: '', value: '' }}
                validationSchema={deviceSchema}
                onSubmit={(values, { setSubmitting }) => {
                    handleCreateDevice(values.deviceName, values.deviceType, token, setDeviceData);
                    setSubmitting(false);
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <div className="form-section">
                            <label>Device Name:</label>
                            <Field name="deviceName" type="text" className="form-control" />
                            <ErrorMessage name="deviceName" component="div" className="error-message" />

                            <label>Device Type (e.g., light, relay):</label>
                            <Field name="deviceType" type="text" className="form-control" />
                            <ErrorMessage name="deviceType" component="div" className="error-message" />

                            <label>Channel ID:</label>
                            <Field name="channelId" type="text" className="form-control" />
                            <ErrorMessage name="channelId" component="div" className="error-message" />

                            <label>Device Value:</label>
                            <Field name="value" type="number" className="form-control" />
                            <ErrorMessage name="value" component="div" className="error-message" />

                            <button type="submit" className="btn btn-primary mt-2" disabled={isSubmitting}>
                                Create Device
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>

            {/* Device Toggle Form */}
            <Formik
                initialValues={{ channelId: '', deviceName: '', value: '' }}
                onSubmit={(values, { setSubmitting }) => {
                    handleDeviceToggle(values.channelId, values.deviceName, values.value, token, setDeviceStatus);
                    setSubmitting(false);
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <div className="form-section">
                            <label>Channel ID:</label>
                            <Field name="channelId" type="text" className="form-control" />

                            <label>Device Name:</label>
                            <Field name="deviceName" type="text" className="form-control" />

                            <label>Device Value:</label>
                            <Field name="value" type="number" className="form-control" />

                            <button type="submit" className="btn btn-primary mt-2" disabled={isSubmitting}>
                                Toggle Device
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>

            {/* Device Deletion */}
            <button
                className="btn btn-danger mt-2"
                onClick={() => handleDeleteDevice('deviceIdToDelete', token, setDeviceData)}
            >
                Delete Device
            </button>
        </div>
    );
};

export default ToggleController;
