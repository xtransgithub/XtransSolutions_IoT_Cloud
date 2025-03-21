import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LineChartComponent from '../LineChart/LineChart';
import FieldDisplay from '../NewDashboard/FieldDisplay';
import Loading from '../loading';
import { server } from '../../config';
import { fetchDataEntries } from './FetchEntrieslDashboard';
import CombinedLineChart from './CombinedLineChart';
import FieldEntryBarChart from './FieldEntryBarChart';
import BubbleChartComponent from './BubbleChartComponent';
import './dashboard.css';
import {AdvancedImage} from '@cloudinary/react';
import images from '../../assets/index'

const GlobalDashboard = () => {
  const [allChannels, setAllChannels] = useState([]);
  const [fieldData, setFieldData] = useState({});
  const [historicalData, setHistoricalData] = useState({});
  const [fieldCounts, setFieldCounts] = useState({});
  const [channelData, setChannelData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(null);

  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchAllChannels();
  }, []);

  useEffect(() => {
    if (activeTab) {
      fetchDataEntries(activeTab, setFieldData, setHistoricalData, setFieldCounts, setChannelData);
    }
  }, [activeTab]);

  const fetchAllChannels = async () => {
    try {
      const response = await axios.get(`${server}api/auth/channels`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const channels = Array.isArray(response.data.channels) ? response.data.channels : [];
      setAllChannels(channels);

      if (channels.length > 0) {
        setActiveTab(channels[0]._id);
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching channels:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loading message="Loading Channels..." />;
  }

  return (
    <div className="container vi mt-4 mx-0">
      <h2 className="text-center mb-4">User Dashboard</h2>

      {allChannels.length === 0 ? (
        <div className="empty-state-message text-center">
          <AdvancedImage cldImg={images.nochannel} alt="No Data Available" className="img-fluid mb-3" style={{ maxwidth: '800px' }} />
          <p>Please add channels to view data.</p>
        </div>
      ) : (
        <>
          {/* Bootstrap Tabs */}
          <ul className="nav nav-pills mb-3" role="tablist">
            {allChannels.map(channel => (
              <li className="nav-item" role="presentation" key={channel._id}>
                <button
                  className={`nav-link ${activeTab === channel._id ? 'active' : ''}`}
                  type="button"
                  role="tab"
                  onClick={() => setActiveTab(channel._id)}
                >
                  {channel.name}
                </button>
              </li>
            ))}
          </ul>

          {/* Tab Content */}
          <div className="tab-content">
            {allChannels.map(channel => (
              activeTab === channel._id && (
                <div key={channel._id} className="tab-pane fade show active">
                  <div className="container p-3 rounded">
                    {/* Combined Charts Row */}
                    
                    {/* Individual Field Charts */}
                    {channelData.fields?.length > 0 ? (
                      <>
                        <div className="combined-charts-row mb-4">
                          <div className="combined-chart-container">
                            <CombinedLineChart historicalData={historicalData} fields={channelData.fields || []} />
                          </div>
                          <div className="combined-chart-container">
                            <FieldEntryBarChart fieldCounts={fieldCounts} fields={channelData.fields || []} />
                          </div>
                          <div className="combined-chart-container">
                            <BubbleChartComponent historicalData={historicalData} fields={channelData.fields || []} />
                          </div>
                        </div>

                        <div className="charts-container dashboardChartContainer">
                          {channelData.fields?.map((field) => (
                            <div className="chart mb-4 dashboardChart" key={`${channel._id}-${field}`}>
                              <center><FieldDisplay name={field} value={fieldData[field]} count={fieldCounts[field] || 0} /></center>
                              <div className="mb-4">
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
                            </div>
                          ))}
                        </div>
                      </>
                    ) : (
                      <div className="empty-state-message text-center">
                        <AdvancedImage cldImg={images.nodata} alt="No Data Available" className="img-fluid mb-3" style={{ maxwidth: '600px' }} />
                        {/* <img src={no_data} alt="No Data Available" className="img-fluid mb-3" style={{ maxWidth: '600px' }} /> */}
                        <p>No data available for this channel.</p>
                      </div>
                    )}
                  </div>
                </div>
              )
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default GlobalDashboard;