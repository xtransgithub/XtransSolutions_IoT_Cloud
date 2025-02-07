import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Table, Dropdown } from "react-bootstrap";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import axios from "axios";

const Dashboard = () => {
  const [channels, setChannels] = useState([]);
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [chartType, setChartType] = useState("line");
  const [alerts, setAlerts] = useState([]);

  // Fetch channels from API
  useEffect(() => {
    axios.get("/api/channels").then((response) => {
      setChannels(response.data);
      if (response.data.length > 0) setSelectedChannel(response.data[0]);
    });
  }, []);

  // Dummy data for visualization
  const data = [
    { time: "10:00", value: 24 },
    { time: "10:05", value: 26 },
    { time: "10:10", value: 25 },
  ];

  return (
    <Container fluid className="mt-4">
      <Row>
        {/* Left Panel - Channels & Actions */}
        <Col md={4}>
          <Card className="p-3">
            <h5>📡 Channels</h5>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>ID</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {channels.map((ch) => (
                  <tr key={ch.id}>
                    <td>{ch.name}</td>
                    <td>{ch.id}</td>
                    <td>
                      <Button
                        size="sm"
                        variant="primary"
                        onClick={() => setSelectedChannel(ch)}
                      >
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Button variant="success">➕ Create Channel</Button>
          </Card>
        </Col>

        {/* Right Panel - Data & Visualization */}
        <Col md={8}>
          <Card className="p-3">
            {selectedChannel && (
              <>
                <h5>📊 {selectedChannel.name} - Data Visualization</h5>
                <Dropdown className="mb-3">
                  <Dropdown.Toggle variant="info">Chart Type: {chartType}</Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => setChartType("line")}>📈 Line Chart</Dropdown.Item>
                    <Dropdown.Item onClick={() => setChartType("gauge")}>🎯 Gauge Chart</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>

                {/* Chart Display */}
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={data}>
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="value" stroke="#007bff" />
                  </LineChart>
                </ResponsiveContainer>
              </>
            )}
          </Card>

          {/* Alerts Section */}
          <Card className="mt-3 p-3">
            <h5>🚨 Event Alerts</h5>
            <ul>
              {alerts.length === 0 ? <li>No active alerts</li> : alerts.map((alert, i) => <li key={i}>{alert}</li>)}
            </ul>
            <Button variant="warning">⚙️ Manage Alerts</Button>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
