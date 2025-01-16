import axios from 'axios';

import { server } from '../../config';

export const fetchChannelData = async (id, token, setFieldData, setHistoricalData, setFieldCounts, setChannelData, setCurrentChannel) => {
    await getChannelById(id, token, setCurrentChannel); // Make sure to wait for this
    try {
        const fieldResponse = await axios.get(`${server}api/channels/${id}/entries/read`);
        console.log(fieldResponse);

        const allFields = new Set();
        fieldResponse.data.entries.forEach(entry => {
            entry.fieldData.forEach(field => allFields.add(field.name));
        });

        const createdFields = Array.from(allFields);
        console.log(allFields);

        // Initialize `latestEntry` with default values for each field
        const latestEntry = createdFields.reduce((acc, fieldName) => {
            acc[fieldName] = null; // Set to null or any default value you prefer
            return acc;
        }, {});

        const fieldEntryCount = createdFields.reduce((acc, fieldName) => {
            acc[fieldName] = 0;
            return acc;
        }, {});

        fieldResponse.data.entries.forEach(entry => {
            entry.fieldData.forEach(field => {
                latestEntry[field.name] = field.value; // Update to the latest value
                fieldEntryCount[field.name] += 1; // Count occurrences
            });
        });

        setFieldData(latestEntry);

        // Initialize historical data response
        const historicalDataResponse = createdFields.reduce((acc, fieldName) => {
            acc[fieldName] = [];
            return acc;
        }, {});

        fieldResponse.data.entries.forEach(entry => {
            createdFields.forEach(fieldName => {
                const field = entry.fieldData.find(f => f.name === fieldName);
                if (field) {
                    // Add value if it exists
                    historicalDataResponse[fieldName].push({ 
                        value: field.value, 
                        timestamp: entry.timestamp 
                    });
                } 
            });
        });

        setHistoricalData(historicalDataResponse);
        setFieldCounts(fieldEntryCount);

        setChannelData({
            name: fieldResponse.data.channelName || 'Unnamed Channel',
            description: fieldResponse.data.channelDescription || 'No description provided',
            fields: createdFields,
        });
    } catch (error) {
        console.error('Error fetching channel data:', error);
    }
};

const getChannelById = async (id, token, setCurrentChannel) => {
    try {
        const response = await axios.get(`${server}api/auth/channels`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        const allChannels = response.data.channels;
        // Find the specific channel by ID
        const matchedChannel = allChannels.find(channel => channel._id === id);
        
        // Update state with the found channel
        if (matchedChannel) {
            setCurrentChannel({
                currentChannelname: matchedChannel.name,
                currentChannelDesc: matchedChannel.description,
                currentChannelAPI: matchedChannel.apiKey,
                currentChannelFields: matchedChannel.fields,
                currentChannelId: matchedChannel._id,
                currentChannelUserId: matchedChannel.userId,
            });
        } else {
            console.error('Channel not found');
        }
    } catch (error) {
        console.error('Error fetching specific channel:', error);
    }
};
