const { v4: uuidv4 } = require('uuid');
const Channel = require('../models/channelModel');

exports.setChannel = async (req, res) => {
    const { name, description, fields } = req.body;
    const myheader = req.header;

    console.log(myheader);
    console.log("Request body:", req.body);  

    if (!name || !fields) {
        return res.status(400).json({ message: 'Channel name and fields are required' });
    }
    
    if (!req.user.verified) {
        return res.status(403).json({ message: 'Account not verified. Please verify your email to create channels.' });
    }

    try {


        const userId = req.user._id;
        const apiKey = uuidv4(); 

        const existingChannel = await Channel.findOne({ userId, name });

        if (existingChannel) {
            return res.status(400).json({
                message: "You already have a channel with this name"
            });
        }

        let channelCount = await Channel.countDocuments({ userId });
        // console.log(channelCount)
        if (channelCount >= 4) {
            return res.status(400).json({ message: 'User cannot have more than 4 channels.' });
        }

        // Create the new channel
        const newChannel = new Channel({
            name,
            description,
            fields,
            userId, 
            apiKey
        });

        await newChannel.save();

        res.status(201).json({
            message: 'Channel created successfully',
            channel: newChannel
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                message: "Channel name already exists"
            });
        }
        console.log(error);
        res.status(500).json({ message: 'Failed to create channel', error: error.message });
    }
}


// exports.getChannel = async (req, res) => {
//     try {
//         // Retrieve the user ID from the JWT token (set by authenticateJWT)
//         const userId = req.user._id;

//         // Find all channels that belong to the logged-in user
//         const userChannels = await Channel.find({ userId });

//         if (!userChannels.length) {
//             return res.status(404).json({ message: 'No channels found for this user' });
//         }

//         res.status(200).json({
//             message: 'Channels retrieved successfully',
//             channels: userChannels
//         });
//     } catch (error) {
//         console.error('Error retrieving channels:', error);
//         res.status(500).json({ message: 'Failed to retrieve channels', error: error.message });
//     }
// }

exports.getChannel = async (req, res) => {
    try {
        const userId = req.user._id;
        const userChannels = await Channel.find({ userId });

        // ALWAYS return 200
        res.status(200).json({
            message: 'Channels retrieved successfully',
            channels: userChannels || []
        });

    } catch (error) {
        console.error('Error retrieving channels:', error);
        res.status(500).json({ message: 'Failed to retrieve channels', error: error.message });
    }
}


exports.patchChannelName = async (req, res) => {
    const { channelId } = req.params;
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ message: 'Channel name is required' });
    }

    try {
        const userId = req.user._id;

        // Find the channel by ID and ensure it belongs to the logged-in user
        const channel = await Channel.findOne({ _id: channelId, userId });

        if (!channel) {
            return res.status(404).json({ message: 'Channel not found or you do not have permission to update this channel' });
        }

        // Update the channel name
        channel.name = name;
        await channel.save();

        res.status(200).json({
            message: 'Channel name updated successfully',
            channel
        });
    } catch (error) {
        console.error('Error updating channel:', error);
        res.status(500).json({ message: 'Failed to update channel name', error: error.message });
    }
}


exports.deleteChannel = async (req, res) => {
    const { channelId } = req.params;

    try {
        // Find the channel by ID and ensure it belongs to the logged-in user
        const channel = await Channel.findOneAndDelete({ _id: channelId, userId: req.user._id });

        if (!channel) {
            return res.status(404).json({ message: 'Channel not found or unauthorized access' });
        }

        res.status(200).json({ message: 'Channel deleted successfully' });
    } catch (error) {
        console.error('Error deleting channel:', error);
        res.status(500).json({ message: 'Failed to delete channel', error: error.message });
    }
}


exports.getChannelName = async (req, res) => {
    try {
        const { channelId } = req.params;
        const userId = req.user._id;

        const channel = await Channel.findOne({
            _id: channelId,
            userId
        });

        if (!channel) {
            return res.status(404).json({
                message: "Channel not found"
            });
        }

        res.status(200).json({
            channelName: channel.name
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to get channel name",
            error: error.message
        });
    }
};