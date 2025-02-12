import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Button, Card, Spinner } from "react-bootstrap";
import GaugeChart from "react-gauge-chart";
import LineChart from "../LineChart/LineChart"; // Import your existing LineChart component
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap is imported

const server = "http://162.255.85.191:8000/";

const Dashboard = () => {
    const [channels, setChannels] = useState([]);
    const [fieldData, setFieldData] = useState({});
    const [historicalData, setHistoricalData] = useState({});
    const [selectedField, setSelectedField] = useState(null);
    const [selectedChannel, setSelectedChannel] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem("token"); // Retrieve token from localStorage

    useEffect(() => {
        fetchAllChannels();
    }, []);

    const fetchAllChannels = async () => {
        try {
            const response = await axios.get(`${server}api/auth/channels`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setChannels(response.data.channels);
            response.data.channels.forEach(channel => fetchChannelData(channel._id));
        } catch (error) {
            console.error("Error fetching channels:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchChannelData = async (channelId) => {
        try {
            const response = await axios.get(`${server}api/channels/${channelId}/entries/read`);
            const entries = response.data.entries;
            const channelFields = {};

            const fieldHistory = {};
            entries.forEach(entry => {
                entry.fieldData.forEach(field => {
                    channelFields[field.name] = field.value;

                    if (!fieldHistory[field.name]) {
                        fieldHistory[field.name] = [];
                    }
                    fieldHistory[field.name].push({ timestamp: entry.timestamp, value: field.value });
                });
            });

            setFieldData(prevData => ({ ...prevData, [channelId]: channelFields }));
            setHistoricalData(prevData => ({ ...prevData, [channelId]: fieldHistory }));
        } catch (error) {
            console.error(`Error fetching data for channel ${channelId}:`, error);
        }
    };

    const handleFieldClick = (channel, fieldName) => {
        setSelectedChannel(channel);
        setSelectedField(fieldName);
        setShowModal(true);
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Dashboard</h2>

            {loading ? (
                <div className="text-center">
                    <Spinner animation="border" variant="primary" />
                </div>
            ) : (
                <div className="row">
                    {channels.map((channel) => (
                        <div key={channel._id} className="col-md-6">
                            <Card className="mb-4">
                                <Card.Body>
                                    <Card.Title className="text-center">{channel.name}</Card.Title>
                                    <Card.Text className="text-muted">{channel.description}</Card.Text>

                                    <div className="row">
                                        {channel.fields.map((fieldName) => (
                                            <div key={fieldName} className="col-md-6">
                                                <Card
                                                    className="mb-2 p-2 text-center border"
                                                    style={{ cursor: "pointer" }}
                                                    onClick={() => handleFieldClick(channel, fieldName)}
                                                >
                                                    <Card.Body>
                                                        <Card.Title className="h6 mb-1">{fieldName}</Card.Title>
                                                        <Card.Text className="text-primary">
                                                            {fieldData[channel._id]?.[fieldName] || "N/A"}
                                                        </Card.Text>
                                                    </Card.Body>
                                                </Card>
                                            </div>
                                        ))}
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal for Field Data Visualization */}
            <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>
                        {selectedChannel?.name} - {selectedField}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedField && (
                        <>
                            <h5 className="text-center">Gauge Chart</h5>
                            <GaugeChart
                                id="gauge-chart"
                                nrOfLevels={20}
                                percent={
                                    fieldData[selectedChannel._id]?.[selectedField]
                                        ? fieldData[selectedChannel._id][selectedField] / 100
                                        : 0
                                }
                                textColor="black"
                            />

                            <h5 className="text-center mt-4">Line Chart</h5>
                            <LineChart
                                data={{
                                    series1: historicalData[selectedChannel._id]?.[selectedField]?.map(d => d.value) || []
                                }}
                                timeLabels={historicalData[selectedChannel._id]?.[selectedField]?.map(d => new Date(d.timestamp).toLocaleTimeString()) || []}
                            />
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Dashboard;
