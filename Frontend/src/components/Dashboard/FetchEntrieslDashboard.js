import axios from 'axios';
import { server } from '../../config';

export const fetchDataEntries = async (id, setFieldData, setHistoricalData, setFieldCounts, setChannelData, setFieldStats) => {
    try {
        const fieldResponse = await axios.get(`${server}api/channels/${id}/entries/read`);

        const allFields = new Set();
        fieldResponse.data.entries.forEach(entry => {
            entry.fieldData.forEach(field => allFields.add(field.name));
        });

        const createdFields = Array.from(allFields);
        const latestEntry = {};
        const fieldEntryCount = {};
        const historicalDataResponse = {};
        const fieldStats = {};

        createdFields.forEach(fieldName => {
            latestEntry[fieldName] = null;
            fieldEntryCount[fieldName] = 0;
            historicalDataResponse[fieldName] = [];
            fieldStats[fieldName] = { min: Infinity, max: -Infinity, trend: 'Stable' };
        });

        fieldResponse.data.entries.forEach(entry => {
            entry.fieldData.forEach(field => {
                latestEntry[field.name] = field.value;
                fieldEntryCount[field.name] += 1;
                historicalDataResponse[field.name].push({ 
                    value: field.value, 
                    timestamp: entry.timestamp 
                });

                fieldStats[field.name].min = Math.min(fieldStats[field.name].min, field.value);
                fieldStats[field.name].max = Math.max(fieldStats[field.name].max, field.value);
            });
        });

        // Compute Trend (Increase, Decrease, Stable)
        createdFields.forEach(fieldName => {
            const values = historicalDataResponse[fieldName].map(entry => entry.value);
            if (values.length >= 3) {
                const [v1, v2, v3] = values.slice(-3);
                if (v3 > v2 && v2 > v1) fieldStats[fieldName].trend = "Increasing 🔼";
                else if (v3 < v2 && v2 < v1) fieldStats[fieldName].trend = "Decreasing 🔽";
            }
        });

        setFieldData(latestEntry);
        setHistoricalData(historicalDataResponse);
        setFieldCounts(fieldEntryCount);
        setFieldStats(fieldStats);

        setChannelData({
            name: fieldResponse.data.channelName || 'Unnamed Channel',
            description: fieldResponse.data.channelDescription || 'No description provided',
            fields: createdFields,
        });
    } catch (error) {
        console.error('Error fetching data entries:', error);
    }
};
