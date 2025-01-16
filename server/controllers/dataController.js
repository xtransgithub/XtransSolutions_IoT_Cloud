const Channel = require('../models/channelModel');
const jwt = require('jsonwebtoken');


const retrieveEntriesFromChannel = async (channelId, fields, res) => {
    try {
        const channel = await Channel.findById(channelId);
        if (!channel) {
            return res.status(400).json({ message: 'Channel not found' });
        }

        let entries = channel.entries; 

        if (fields) {
            const requestedFields = fields.split(',');
            entries = entries.map(entry => {
                const filteredFieldData = entry.fieldData.filter(field =>
                    requestedFields.includes(field.name)
                );
                return {
                    ...entry.toObject(), 
                    fieldData: filteredFieldData 
                };
            });
        }

        res.status(200).json({
            message: 'Entries retrieved successfully',
            channelName: channel.name, // Add channel name
            channelDescription: channel.description, // Add channel description
            entries: entries
        });
    } catch (error) {
        console.error('Error retrieving entries:', error);
        res.status(500).json({ message: 'Failed to retrieve entries', error: error.message });
    }
};

exports.readValues = async (req, res) => {
    const { channelId } = req.params;
    const { fields } = req.query; 
    await retrieveEntriesFromChannel(channelId, fields, res);
} 




const updateFieldNamesInChannel = async (channelId, userId, updatedFields, res) => {
    try {
        // Find the channel by its ID
        const channel = await Channel.findById(channelId);
        if (!channel) {
            return res.status(404).json({ message: 'Channel not found' });
        }
        // console.log(channel.userId)
        // console.log(userId)
        // if(channel.userId !== userId){
        //     return res.status(404).json({ message: 'Invalid channelId' });
        // }

        const fieldDataMap = {};
        updatedFields.forEach(({ oldName, newName }) => {
            fieldDataMap[oldName] = newName;
        });

        // Update field names within the entries
        channel.entries = channel.entries.map(entry => {
            entry.fieldData = entry.fieldData.map(field => {
                if (fieldDataMap[field.name]) {
                    field.name = fieldDataMap[field.name]; // Update the field name
                }
                return field;
            });
            return entry;
        });

        // Update field names in the channel's main fields array (if applicable)
        channel.fields = channel.fields.map(field => {
            return fieldDataMap[field] ? fieldDataMap[field] : field;
        });

        // Save the updated channel
        await channel.save();

        res.status(200).json({
            message: 'Field names updated successfully',
            channel: channel
        });
    } catch (error) {
        console.error('Error updating field names:', error);
        res.status(500).json({ message: 'Failed to update field names', error: error.message });
    }
};

exports.changeFieldName = async (req, res) => {
    // console.log(authenticateJWT)
    // const user id 
    var userId = 0;
    const token = req.header('Authorization');
        
        if (!token) {
            return res.status(403).json({ message: 'Token required' });
        }
      jwt.verify(token.slice(7), 'secretkey123', (err, user) => {  
        //
        // jwt.verify(token, 'secretkey123', (err, user) => {
            //
            if (err) {
            return res.status(403).json({ message: 'Invalid token' });
            }
            userId = user._id
        })
    const { channelId } = req.params;
    const updatedFields = req.body.fields; // Expecting [{oldName, newName}] format
    // const user = authenticate
    // console.log(user)
    if (!updatedFields || !Array.isArray(updatedFields)) {
        return res.status(400).json({ message: 'Invalid fields data provided' });
    }

    await updateFieldNamesInChannel(channelId, userId, updatedFields, res);
}




const addFieldsToChannel = async (channelId, newFields, res) => {
    try {
        // Find the channel by its ID
        const channel = await Channel.findById(channelId);
        if (!channel) {
            return res.status(400).json({ message: 'Channel not found' });
        }

        // Ensure newFields is an array and contains valid field names
        if (!newFields || !Array.isArray(newFields) || newFields.length === 0) {
            return res.status(400).json({ message: 'Invalid or empty fields provided' });
        }

        // Add the new fields to the channel's fields array, avoiding duplicates
        newFields.forEach(field => {
            if (!channel.fields.includes(field)) {
                channel.fields.push(field);
            }
        });

        // Save the updated channel with new fields
        await channel.save();

        res.status(200).json({
            message: 'Fields added successfully',
            channel: channel
        });
    } catch (error) {
        console.error('Error adding fields:', error);
        res.status(500).json({ message: 'Failed to add fields', error: error.message });
    }
};

exports.addFields = async (req, res) => {
    const { channelId } = req.params;
    const { fields } = req.body; // Expecting an array of field names to be added

    if (!fields || !Array.isArray(fields)) {
        return res.status(400).json({ message: 'Fields must be provided as an array' });
    }

    await addFieldsToChannel(channelId, fields, res);
}


exports.removeField = async (req, res) => {
    const { channelId, fieldName } = req.params;

    try {
        const channel = await Channel.findOne({ _id: channelId, userId: req.user._id });
        if (!channel) {
            return res.status(404).json({ message: 'Channel not found or unauthorized access' });
        }

        if (!channel.fields.includes(fieldName)) {
            return res.status(404).json({ message: `Field '${fieldName}' not found in the channel` });
        }

        channel.fields = channel.fields.filter(field => field !== fieldName);

        channel.entries = channel.entries.map(entry => {
            entry.fieldData = entry.fieldData.filter(field => field.name !== fieldName);
            return entry;
        });

        await channel.save();

        res.status(200).json({ message: `Field '${fieldName}' deleted successfully from channel` });
    } catch (error) {
        console.error('Error deleting field:', error);
        res.status(500).json({ message: 'Failed to delete field', error: error.message });
    }
}