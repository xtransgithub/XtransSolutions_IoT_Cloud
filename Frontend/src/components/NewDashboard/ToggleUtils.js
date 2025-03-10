import axios from 'axios';
import { server } from '../../config';

// Function to toggle device with dynamic channelId and device name as query parameters
export const handleDeviceToggle = async (channelId, deviceName, value, token, setDeviceStatus) => {
    try {
        const response = await axios.patch(
            `${server}api/channels/${channelId}/entries`, 
            null, 
            { 
                params: { 
                    [deviceName]: value  // Dynamic query parameter using device name and value
                },
                headers: { Authorization: `Bearer ${token}` }
            }
        );

        // Assuming the response returns the updated device status
        setDeviceStatus(prevData => ({
            ...prevData,
            [deviceName]: response.data.deviceStatus  // Or whatever the response structure is
        }));

        alert(`${deviceName.charAt(0).toUpperCase() + deviceName.slice(1)} status updated to ${value}`);
    } catch (error) {
        console.error('Error toggling device:', error);
        alert('An error occurred while toggling the device. Please try again.');
    }
};

// Function to create a device dynamically
export const handleCreateDevice = async (deviceName, deviceType, token, setDeviceData) => {
    try {
        const response = await axios.post(
            `${server}api/devices`, 
            { type: deviceType, name: deviceName },
            { headers: { Authorization: `Bearer ${token}` } }
        );

        setDeviceData(prevData => [...prevData, response.data.device]);
        alert(`${deviceType.charAt(0).toUpperCase() + deviceType.slice(1)} '${deviceName}' created successfully.`);
    } catch (error) {
        console.error('Error creating device:', error);
        alert('An error occurred while creating the device. Please try again.');
    }
};

// Function to delete a device dynamically
export const handleDeleteDevice = async (deviceId, token, setDeviceData) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this device?');

    if (confirmDelete) {
        try {
            const response = await axios.delete(
                `${server}api/devices/${deviceId}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setDeviceData(prevData => prevData.filter(device => device.id !== deviceId));
            alert('Device deleted successfully.');
        } catch (error) {
            console.error('Error deleting device:', error);
            alert('An error occurred while deleting the device. Please try again.');
        }
    }
};
