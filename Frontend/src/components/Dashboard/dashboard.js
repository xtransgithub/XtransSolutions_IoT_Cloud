import React, { useState, useEffect } from 'react';
import GaugeChartComponent from '../GuageChart/GuageChart';
import LineChartComponent from '../LineChart/LineChart';
import FieldDisplay from '../NewDashboard/FieldDisplay';
import axios from 'axios';
import Loading from '../loading';
import { server } from '../../config';


const GlobalDashboard = () => {
    const [allChannels, setAllChannels] = useState([]);
    const [fieldData] = useState({});
    const [historicalData] = useState({});
    const [chartTypes, setChartTypes] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const token = localStorage.getItem('token');

    useEffect(() => {
        fetchAllChannels();
    }, []);

    const fetchAllChannels = async () => {
        try {
            const response = await axios.get(`${server}api/auth/channels`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setAllChannels(response.data.channels);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching channels:', error);
        }
    };

    const handleChartTypeChange = (channelId, field, type) => {
        setChartTypes(prev => ({
            ...prev,
            [channelId]: { ...(prev[channelId] || {}), [field]: type }
        }));
    };

    if (isLoading) {
        return <Loading message="Loading Channels..." />;
    }

    return (
        <div className="container">
            <h2 className="text-center my-3">Global Channel Dashboard</h2>
            {allChannels.length === 0 ? (
                <div className="empty-state-message">
                    <h2>No Channels Available</h2>
                    <p>Please add channels to view data.</p>
                </div>
            ) : (
                allChannels.map(channel => (
                    <div key={channel.channelId} className="channel-card mb-4 p-3 border rounded">
                        <h3>{channel.name}</h3>

                        <div className="charts-container">
                        {channel.fields.map((field) => (
                          <div className="chart mb-4" key={`${channel.channelId}-${field}`}>
                                    <FieldDisplay name={field} value={fieldData[field]} />

                                    <select
                                        className="form-select mb-2"
                                        value={chartTypes[channel.channelId]?.[field] || 'line'}
                                        onChange={(e) => handleChartTypeChange(channel.channelId, field, e.target.value)}
                                    >
                                        <option value="all">All Charts</option>
                                        <option value="gauge">Gauge Chart</option>
                                        <option value="line">Line Chart</option>
                                    </select>

                                    {(chartTypes[channel.channelId]?.[field] === 'all' || chartTypes[channel.channelId]?.[field] === 'gauge') && (
                                        <GaugeChartComponent value={fieldData[field]} />
                                    )}

                                    {(chartTypes[channel.channelId]?.[field] === 'all' || chartTypes[channel.channelId]?.[field] === 'line') && (
                                        <LineChartComponent
                                            data={{
                                                series1: historicalData[field]?.map(entry => entry.value) || [],
                                            }}
                                            timeLabels={historicalData[field]?.map(entry => {
                                                const date = new Date(entry.timestamp);
                                                return date.toLocaleTimeString([], { day: 'numeric', month: 'numeric', hour: '2-digit', minute: '2-digit' });
                                            }) || []}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default GlobalDashboard;
