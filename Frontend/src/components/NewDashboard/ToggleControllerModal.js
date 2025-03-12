import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { handleCreateDevice, handleDeleteDevice } from './ToggleUtils';

const ToggleControllerModal = ({ isOpen, onClose, token, setDeviceData }) => {
    if (!isOpen) return null;

    const deviceSchema = Yup.object({
        deviceName: Yup.string().required('Device name is required'),
        deviceType: Yup.string().required('Device type is required'),
    });

    return (
        <div className="modal-overlay d">
            <div className="modal-content d">
                <h2>Manage Toggle Devices</h2>

                {/* Create Device Form */}
                <Formik
                    initialValues={{ deviceName: '', deviceType: '' }}
                    validationSchema={deviceSchema}
                    onSubmit={(values, { setSubmitting }) => {
                        handleCreateDevice(values.deviceName, values.deviceType, token, setDeviceData);
                        setSubmitting(false);
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <label>Device Name:</label>
                            <Field name="deviceName" type="text" />
                            <ErrorMessage name="deviceName" component="div" className="error-message" />

                            <label>Device Type:</label>
                            <Field name="deviceType" type="text" />
                            <ErrorMessage name="deviceType" component="div" className="error-message" />

                            <button type="submit" disabled={isSubmitting}>Create Device</button>
                        </Form>
                    )}
                </Formik>

                {/* Delete Device */}
                <button className="delete-btn-d" onClick={() => handleDeleteDevice('deviceIdToDelete', token, setDeviceData)}>
                    Delete Device
                </button>

                <button className="close-btn-d" onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default ToggleControllerModal;
