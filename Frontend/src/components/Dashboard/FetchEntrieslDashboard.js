import axios from 'axios';
import { server } from '../../config';

export const fetchDataEntries = async (id, setFieldData, setHistoricalData, setFieldCounts, setChannelData) => {
    try {
        const fieldResponse = await axios.get(`${server}api/channels/${id}/entries/read`);

        const allFields = new Set();
        fieldResponse.data.entries.forEach(entry => {
            entry.fieldData.forEach(field => allFields.add(field.name));
        });

        const createdFields = Array.from(allFields);

        // Initialize `latestEntry` with default values for each field
        const latestEntry = createdFields.reduce((acc, fieldName) => {
            acc[fieldName] = null;
            return acc;
        }, {});

        const fieldEntryCount = createdFields.reduce((acc, fieldName) => {
            acc[fieldName] = 0;
            return acc;
        }, {});

        fieldResponse.data.entries.forEach(entry => {
            entry.fieldData.forEach(field => {
                latestEntry[field.name] = field.value;
                fieldEntryCount[field.name] += 1;
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
        console.error('Error fetching data entries:', error);
    }
};
