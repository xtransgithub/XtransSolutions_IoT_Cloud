import React, { useState, useEffect } from 'react';
import GaugeChartComponent from '../GuageChart/GuageChart';
import LineChartComponent from '../LineChart/LineChart';
import './NewDashboard.css'
import FieldDisplay from './FieldDisplay';
import { useParams } from 'react-router-dom';

import { fetchChannelData } from './FetchChannel';
import { getCSV } from './CsvUtils';
import Loading from '../loading';

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
    const [updatedChannelName, setUpdatedChannelName] = useState('');
    const [updatedFields, setUpdatedFields] = useState([]);
    const [fieldToRemove, setFieldToRemove] = useState('');
    const { id } = useParams();
    const [newFields, setNewFields] = useState([]);
    const [chartTypes, setChartTypes] = useState({});

    const token = localStorage.getItem('token');
    // const fieldPattern = /^[a-z0-9]+$/;

    
    useEffect(() => {
        fetchChannelData(id, token, setFieldData, setHistoricalData, setFieldCounts, setChannelData, setCurrentChannel);
    }, [id, token]);

    useEffect(() => {
        if (channelData.fields) {
            const initialChartTypes = channelData.fields.reduce((acc, field) => {
                acc[field] = 'line'; // Default to line chart for all fields
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
        setUpdatedChannelName(channelData.name);
        setUpdatedFields(channelData.fields.map(field => ({ oldName: field, newName: field })));
    };

    const handleAddFieldArray = () => {
        setNewFields([...newFields, '']);
    }

    const handleChartTypeChange = (field, type) => {
        setChartTypes(prev => ({ ...prev, [field]: type }));
    };

    if(isLoading){
        return <Loading message={"Loading Channel..."} />
    }


    return (
        <div className="container">
            <div className="row">
                {/* Channel Details Section */}
                <div className="col-md-3">
                    <div className="card mb-3">
                        <div className="card-header text-center border-2 border-dark">
                            <h2>{currentChannel.currentChannelname}</h2>
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item"><strong>Description:</strong> {currentChannel.currentChannelDesc}</li>
                            <li className="list-group-item"><strong>Channel ID:</strong> {currentChannel.currentChannelId}</li>
                            <li className="list-group-item"><strong>User ID:</strong> {currentChannel.currentChannelUserId}</li>
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

                {/* Charts Section */}
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
                                    value={chartTypes[field] || 'line'} // Default to line chart
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

            {/* Edit Modal */}
            {isEditing && (
                <>
                    <div className="edit-modal">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h2 className="mb-0">Edit Channel Details</h2>
                            <button className="btn-close" onClick={() => setIsEditing(false)} aria-label="Close"></button>
                        </div>
                        
                        <div className="edit-section">
                            <label>Channel Name:</label>
                            <input
                                type="text"
                                value={updatedChannelName}
                                onChange={(e) => setUpdatedChannelName(e.target.value)}
                                className="form-control"
                            />
                            <button className="btn btn-primary mt-2" onClick={() => handleChannelUpdate(id, updatedChannelName, token, setChannelData, setIsEditing)}>
                                Save Channel Name
                            </button>
                        </div>

                        <div className="edit-section">
                            <h3>Update Field Names</h3>
                            {updatedFields.map((_, index) => (
                                <div className="field-edit-row" key={index}>
                                    <label>Field {index + 1}</label>
                                    <input
                                        type="text"
                                        value={updatedFields[index].newName}
                                        onChange={(e) => {
                                            const newFields = [...updatedFields];
                                            newFields[index].newName = e.target.value;
                                            setUpdatedFields(newFields);
                                        }}
                                        className="form-control"
                                    />
                                </div>
                            ))}
                            <button className="btn btn-primary mt-2" onClick={() => handleFieldUpdate(id, updatedFields, token, setChannelData, setIsEditing)}>
                                Save Field Names
                            </button>
                        </div>

                        <div className="edit-section">
                            <h3>Add New Field</h3>
                            {newFields.map((field, index) => (
                                <div key={index} className="field-input mb-2">
                                    <input
                                        type="text"
                                        value={field}
                                        onChange={(e) => {
                                            const updatedFields = [...newFields];
                                            updatedFields[index] = e.target.value;
                                            setNewFields(updatedFields);
                                        }}
                                        className="form-control"
                                        placeholder="Enter new field name"
                                    />
                                </div>
                            ))}
                            <button className='btn btn-primary' onClick={handleAddFieldArray}>
                                Add Another Field
                            </button>
                            <button className="btn btn-primary ms-3" onClick={() => handleAddMultipleFields(id, newFields, token, setChannelData, setIsEditing)}>
                                Submit
                            </button>
                        </div>

                        <div className="edit-section">
                            <h3>Remove Field</h3>
                            <input
                                type="text"
                                value={fieldToRemove}
                                onChange={(e) => setFieldToRemove(e.target.value)}
                                className="form-control"
                                placeholder="Enter field name to remove"
                            />
                            <button className="btn btn-danger mt-2" onClick={() => handleRemoveField(id, fieldToRemove, token, setChannelData, setFieldData, setHistoricalData)}>
                                Remove Field
                            </button>
                        </div>
                    </div>

                </>
            )}
        </div>
    );
};

export default ChannelDashboard;