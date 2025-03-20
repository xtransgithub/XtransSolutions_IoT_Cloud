import React, { useState, useEffect } from 'react';
import GaugeChartComponent from '../GuageChart/GuageChart';
import LineChartComponent from '../LineChart/LineChart';
import './NewDashboard.css';
import FieldDisplay from './FieldDisplay';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import { fetchChannelData } from './FetchChannel';
import { getCSV } from './CsvUtils';
import Loading from '../loading';
import { server } from '../../config';

import EditModal from './EditModal'; 
import {handleRemoveField} from './EditUtils';
import no_data from "../../assets/empty.webp";

const ChannelDashboard = () => {
    const [channelData, setChannelData] = useState({});
    const [currentChannel, setCurrentChannel] = useState({});
    const [fieldData, setFieldData] = useState({});
    const [fieldCounts, setFieldCounts] = useState({});
    const [historicalData, setHistoricalData] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [chartTypes, setChartTypes] = useState({});
    const [allChannels, setAllChannels] = useState([]);    
    const [toggleStates, setToggleStates] = useState({});

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

            const initialToggles = channelData.fields.reduce((acc, field) => {
                acc[field] = false;
                return acc;
            }, {});
            setToggleStates(initialToggles);
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

    const handleToggle = async (field) => {
        const newValue = toggleStates[field] ? 0 : 1;
        setToggleStates(prev => ({ ...prev, [field]: !prev[field] }));
    
        try {
            const uri = `http://cloud.xtranssolutions.com/node/api/channels/${id}/entries?${field}=${newValue}`;
            // console.log("Sending Request:", uri, { field, value: newValue });
    
            await axios.get(
                uri,
                { field, value: newValue },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            // fetchChannelData(id, token, setFieldData, setHistoricalData, setFieldCounts, setChannelData, setCurrentChannel);
        } catch (error) {
            console.error(`Error updating field ${field}:`, error);
        }
    };
    
    if(isLoading){
        return <Loading message={"Loading Channel..."} />
    }

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
                        <div className='card-footer d-flex justify-content-center'>
                            <button className="btn btn-secondary w-75" onClick={() => getCSV(id, token)}>
                                Export Data
                            </button>
                        </div>
                        <div className='card-footer d-flex justify-content-center'>
                            <button className="btn btn-secondary w-75" onClick={toggleEdit}>
                                Edit
                            </button>
                        </div>
                    </div>
                </div>

                <div className="col-md-9">
                    {(!channelData.fields || Object.keys(fieldData).length === 0) ? (
                        <div className="empty-state-message">
                            <img src={no_data} alt="No Data Available" className="img-fluid mb-3" style={{ maxWidth: '800px' }} />
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
                                    <option value="all">All Widgets</option>
                                    <option value="gauge">Gauge</option>
                                    <option value="line">Chart</option>
                                    <option value="toggle">Toggle</option>
                                </select>

                                {(chartTypes[field] === 'all') && (
                                    <div className="d-flex justify-content-center align-items-center gap-3 mt-3">
                                        <span className="fw-bold">Toggle:</span>
                                        <button 
                                            className={`btn btn-${toggleStates[field] ? 'success' : 'danger'}`}
                                            onClick={() => handleToggle(field)}
                                        >
                                            {toggleStates[field] ? "On" : "Off"}
                                        </button>
                                    </div>
                                )}

                                {(chartTypes[field] === 'toggle') && (
                                    <div className="d-flex justify-content-center align-items-center mt-2">
                                        <button 
                                            className={`btn btn-lg d-flex justify-content-center align-items-center rounded-circle btn-${toggleStates[field] ? 'success' : 'danger'}`}                                            onClick={() => handleToggle(field)}
                                            style={{ width: '200px', height: '200px', fontSize: '1.2rem', padding: '0' }}
                                        >
                                            {toggleStates[field] ? "On" : "Off"}
                                        </button>
                                    </div>
                                )}

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
                <EditModal
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                    currentChannel={currentChannel}
                    allChannels={allChannels}
                    id={id}
                    token={token}
                    setChannelData={setChannelData}
                    setFieldData={setFieldData}
                    setHistoricalData={setHistoricalData}
                />
            )}
        </div>
    );
};

export default ChannelDashboard;