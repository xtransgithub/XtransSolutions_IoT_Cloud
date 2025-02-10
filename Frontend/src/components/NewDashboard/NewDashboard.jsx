import React, { useState, useEffect } from 'react';
import GaugeChartComponent from '../GuageChart/GuageChart';
import LineChartComponent from '../LineChart/LineChart';
import './NewDashboard.css';
import FieldDisplay from './FieldDisplay';
import { useParams } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

import { fetchChannelData } from './FetchChannel';
import { getCSV } from './CsvUtils';
import Loading from '../loading';
import { server } from '../../config';

import {
    handleChannelUpdate,
    handleFieldUpdate,
    handleAddMultipleFields,
    handleRemoveField,
} from './EditUtils';

const ChannelDashboard = () => {
    const [channelData, setChannelData] = useState({});
    const [currentChannel, setCurrentChannel] = useState({});
    const [fieldData, setFieldData] = useState({});
    const [fieldCounts, setFieldCounts] = useState({});
    const [historicalData, setHistoricalData] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [newFields] = useState([]);
    const [chartTypes, setChartTypes] = useState({});
    const [showAlert, setShowAlert] = useState(false);
    const [allChannels, setAllChannels] = useState([]);
    const [duplicateChannelAlert, setDuplicateChannelAlert] = useState(false);

    const token = localStorage.getItem('token');
    const { id } = useParams();

    useEffect(() => {
        fetchChannelData(id, token, setFieldData, setHistoricalData, setFieldCounts, setChannelData, setCurrentChannel);
        fetchAllChannels();
    }, [id, token]);

    const fetchAllChannels = async () => {
        try {
            const response = await axios.get(`${server}api/auth/channels`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setAllChannels(response.data.channels);
        } catch (error) {
            console.error('Error fetching channels:', error);
        }
    };

    useEffect(() => {
        if (channelData.fields) {
            const initialChartTypes = channelData.fields.reduce((acc, field) => {
                acc[field] = 'line';
                return acc;
            }, {});
            setChartTypes(initialChartTypes);
        }
    }, [channelData.fields]);

    useEffect(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 1500);
    }, []);

    const toggleEdit = () => {
        setIsEditing(!isEditing);
    };

    const handleChartTypeChange = (field, type) => {
        setChartTypes(prev => ({ ...prev, [field]: type }));
    };

    if(isLoading){
        return <Loading message={"Loading Channel..."} />
    }

    // Validation schema for the Channel Name form
    const channelNameSchema = Yup.object({
        channelName: Yup.string().required('Channel name is required'),
    });

    // Validation schema for the Add New Field form
    const addNewFieldsSchema = Yup.object({
        newFields: Yup.array().of(
            Yup.string().required('New field name is required')
        ),
    });

    // Validation schema for the Remove Field form
    const removeFieldSchema = Yup.object({
        fieldToRemove: Yup.string().required('Field name is required'),
    });

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-3">
                    <div className="card mb-3">
                        <div className="card-header text-center border-2 border-dark">
                            <h2>{currentChannel.currentChannelname}</h2>
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item"><strong>Description:</strong> {currentChannel.currentChannelDesc}</li>                            
                            <li className="list-group-item"><strong>User ID:</strong> {currentChannel.currentChannelUserId}</li>
                            <li className="list-group-item"><strong>Channel ID:</strong> {currentChannel.currentChannelId}</li>
                            <li className="list-group-item"><strong>Fields:</strong> {JSON.stringify(currentChannel.currentChannelFields)}</li>
                        </ul>
                        <div className='card-footer'>
                            <button className="btn btn-secondary w-75" onClick={() => getCSV(id, token)}>
                                Export Data
                            </button>
                        </div>
                        <div className='card-footer'>
                            <button className="btn btn-secondary w-75" onClick={toggleEdit}>
                                Edit
                            </button>
                        </div>
                    </div>
                </div>

                <div className="col-md-9">
                    {(!channelData.fields || Object.keys(fieldData).length === 0) ? (
                        <div className="empty-state-message">
                            <h2>No Data Available</h2>
                            <p>This channel currently has no entries. Please add data to view the charts.</p>
                        </div>
                    ) : (
                        <div className="charts-container">
                            {channelData.fields.map((field, index) => (
                            <div className="chart mb-4" key={index}>
                                <FieldDisplay name={field} value={fieldData[field]} count={fieldCounts[field] || 0} onRemove={() => handleRemoveField(id, field, token, setChannelData, setFieldData, setHistoricalData)} />

                                <select
                                    className="form-select mb-2"
                                    value={chartTypes[field] || 'line'}
                                    onChange={(e) => handleChartTypeChange(field, e.target.value)}
                                >
                                    <option value="all">All Charts</option>
                                    <option value="gauge">Gauge Chart</option>
                                    <option value="line">Line Chart</option>
                                </select>

                                {(chartTypes[field] === 'all' || chartTypes[field] === 'gauge') && (
                                    <div className='GuageChart'>
                                        <GaugeChartComponent value={fieldData[field]} />
                                    </div>
                                )}

                                {(chartTypes[field] === 'all' || chartTypes[field] === 'line') && (
                                    <div className='LineChart'>
                                        <LineChartComponent
                                            data={{
                                                series1: historicalData[field]?.map(entry => entry.value) || [],
                                            }}
                                            timeLabels={historicalData[field]?.map(entry => {
                                                const date = new Date(entry.timestamp);
                                                return date.toLocaleTimeString([], { day: 'numeric', month: 'numeric', hour: '2-digit', minute: '2-digit' });
                                            }) || []}
                                        />  
                                    </div>
                                )}
                            </div>
                        ))}
                        </div>
                    )}
                </div>
            </div>

            {isEditing && (
                <div className="edit-modal">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h2 className="mb-0">Edit Channel Details</h2>
                        <button className="btn-close" onClick={() => setIsEditing(false)} aria-label="Close"></button>
                    </div>

                    {/* Channel Name Form */}
                    <Formik
                        initialValues={{ channelName: currentChannel.currentChannelname || '' }}
                        validationSchema={channelNameSchema}
                        onSubmit={(values, { setSubmitting }) => {
                            const isDuplicate = allChannels.some(channel => channel.name === values.channelName);
                            if (isDuplicate) {
                                setDuplicateChannelAlert(true);
                                setSubmitting(false);
                            } else {
                                setDuplicateChannelAlert(false);
                                handleChannelUpdate(id, values.channelName, token, setChannelData, setIsEditing);
                                setSubmitting(false);
                            }
                        }}
                    >
                        {({ isSubmitting }) => (
                            <Form>
                                <div className="edit-section">
                                    <label>Channel Name:</label>
                                    <Field name="channelName" type="text" className="form-control" />
                                    <ErrorMessage name="channelName" component="div" className="error-message" />
                                    {duplicateChannelAlert && (
                                        <div className="alert alert-danger mt-2" role="alert">
                                            Channel name already exists. Please choose a different name.
                                        </div>
                                    )}
                                    <button type="submit" className="btn btn-primary mt-2" disabled={isSubmitting}>
                                        Save Channel Name
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>

                    {/* Update Field Names Form */}
                    <Formik
                        initialValues={{
                            fields: (currentChannel.currentChannelFields || []).map(field => ({
                                oldName: field.oldName || field,
                                newName: field.newName || field
                            }))
                        }}
                        validationSchema={Yup.object({
                            fields: Yup.array().of(
                                Yup.object({
                                    oldName: Yup.string().required('Old name is required'),
                                    newName: Yup.string()
                                        .matches(/^[a-z0-9]+$/, 'Field names can only contain lowercase letters and numbers')
                                        .required('New name is required')
                                })
                            )
                        })}
                        onSubmit={(values, { setSubmitting }) => {
                            handleFieldUpdate(
                                id,
                                values.fields,
                                token,
                                setChannelData,
                                setIsEditing
                            );
                            setSubmitting(false);
                        }}
                    >
                        {({ isSubmitting, values }) => (
                            <Form>
                                <div className="edit-section">
                                    <h5>Update Field Names</h5>
                                    {values.fields.map((field, index) => (
                                        <div className="field-edit-row" key={index}>
                                            <label>Field {index + 1}</label>
                                            <Field
                                                name={`fields[${index}].newName`}
                                                type="text"
                                                className="form-control"
                                            />
                                            <ErrorMessage name={`fields[${index}].newName`} component="div" className="error-message" />
                                        </div>
                                    ))}
                                    <button
                                        type="submit"
                                        className="btn btn-primary mt-2"
                                        disabled={isSubmitting}
                                    >
                                        Save Field Names
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>

                    {/* Add New Field Form */}
                    <Formik
                        initialValues={{ newFields: newFields }}
                        validationSchema={addNewFieldsSchema}
                        onSubmit={(values, { setSubmitting }) => {
                            const existingFields = currentChannel.currentChannelFields.map(field => field.toLowerCase());
                            const duplicateFields = values.newFields.filter(field => existingFields.includes(field.toLowerCase()));

                            if (duplicateFields.length > 0) {
                                setShowAlert(true); // Show warning if duplicates exist
                            } else {
                                setShowAlert(false); // Hide warning if no duplicates
                                handleAddMultipleFields(id, values.newFields, token, setChannelData, setIsEditing);
                            }
                            setSubmitting(false);
                        }}
                    >
                        {({ values, setFieldValue, isSubmitting }) => (
                            <Form>
                                <div className="edit-section">
                                    <h5>Add New Field</h5>

                                    {showAlert && (
                                        <div className="alert alert-warning mt-2" role="alert">
                                            Field name already exist in this channel. Please use unique names.
                                        </div>
                                    )}

                                    {values.newFields.map((field, index) => (
                                        <div key={index} className="field-input mb-2">
                                            <Field
                                                name={`newFields[${index}]`}
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter new field name"
                                            />
                                            <ErrorMessage name={`newFields[${index}]`} component="div" className="error-message" />
                                        </div>
                                    ))}

                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={() => {
                                            const totalFields = currentChannel.currentChannelFields.length + values.newFields.length;
                                            if (totalFields < 5) {
                                                setFieldValue('newFields', [...values.newFields, '']);
                                                setShowAlert(false);
                                            } else {
                                                setShowAlert(true);
                                            }
                                        }}
                                    >
                                        Add Another Field
                                    </button>

                                    <button type="submit" className="btn btn-primary ms-3" disabled={isSubmitting}>
                                        Submit
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>

                    {/* Remove Field Form */}
                    <Formik
                        initialValues={{ fieldToRemove: '' }}
                        validationSchema={removeFieldSchema}
                        onSubmit={(values, { setSubmitting }) => {
                            handleRemoveField(id, values.fieldToRemove, token, setChannelData, setFieldData, setHistoricalData);
                            setSubmitting(false);
                        }}
                    >
                        {({ isSubmitting }) => (
                            <Form>
                                <div className="edit-section">
                                    <h5>Remove Field</h5>
                                    <Field name="fieldToRemove" type="text" className="form-control" placeholder="Enter field name to remove" />
                                    <ErrorMessage name="fieldToRemove" component="div" className="error-message" />
                                    <button type="submit" className="btn btn-danger mt-2" disabled={isSubmitting}>
                                        Remove Field
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            )}
        </div>
    );
};

export default ChannelDashboard;