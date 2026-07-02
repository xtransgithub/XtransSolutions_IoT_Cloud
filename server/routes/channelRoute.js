const express = require ('express')
const channelController = require('../controllers/channelController')
const authenticateJWT = require('../middleware/authenticateJWT'); 

const router = express.Router();

console.log('we are in router')

// router.post('/channels', authenticateJWT,async (req, res) => {
//     const { name, description, fields } = req.body;
//     const myheader = req.header;

//     console.log(myheader);

//     if (!name || !fields) {
//         return res.status(400).json({ message: 'Channel name and fields are required' });
//     }
    
//     if (!req.user.verified) {
//         return res.status(403).json({ message: 'Account not verified. Please verify your email to create channels.' });
//     }

//     try {
//         const userId = req.user._id;
//         const apiKey = uuidv4(); 

//         let channelCount = await Channel.countDocuments({ userId });
//         console.log(channelCount)
//         if (channelCount >= 4) {
//             return res.status(400).json({ message: 'User cannot have more than 4 channels.' });
//         }

//         // Create the new channel
//         const newChannel = new Channel({
//             name,
//             description,
//             fields,
//             userId, 
//             apiKey
//         });

//         await newChannel.save();

//         res.status(201).json({
//             message: 'Channel created successfully',
//             channel: newChannel
//         });
//     } catch (error) {
//         res.status(500).json({ message: 'Failed to create channel', error: error.message });
//     }
// });

router.post('/channels', authenticateJWT, channelController.setChannel)


// router.get('/channels', authenticateJWT, async (req, res) => {
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
// });

router.get('/channels', authenticateJWT, channelController.getChannel)
  

// router.patch('/channels/:channelId', authenticateJWT, async (req, res) => {
//     const { channelId } = req.params;
//     const { name } = req.body;

//     if (!name) {
//         return res.status(400).json({ message: 'Channel name is required' });
//     }

//     try {
//         const userId = req.user._id;

//         // Find the channel by ID and ensure it belongs to the logged-in user
//         const channel = await Channel.findOne({ _id: channelId, userId });

//         if (!channel) {
//             return res.status(404).json({ message: 'Channel not found or you do not have permission to update this channel' });
//         }

//         // Update the channel name
//         channel.name = name;
//         await channel.save();

//         res.status(200).json({
//             message: 'Channel name updated successfully',
//             channel
//         });
//     } catch (error) {
//         console.error('Error updating channel:', error);
//         res.status(500).json({ message: 'Failed to update channel name', error: error.message });
//     }
// });

router.patch('/channels/:channelId', authenticateJWT, channelController.patchChannelName)

// router.delete('/channels/:channelId', authenticateJWT, async (req, res) => {

//     const { channelId } = req.params;

//     try {
//         // Find the channel by ID and ensure it belongs to the logged-in user
//         const channel = await Channel.findOneAndDelete({ _id: channelId, userId: req.user._id });

//         if (!channel) {
//             return res.status(404).json({ message: 'Channel not found or unauthorized access' });
//         }

//         res.status(200).json({ message: 'Channel deleted successfully' });
//     } catch (error) {
//         console.error('Error deleting channel:', error);
//         res.status(500).json({ message: 'Failed to delete channel', error: error.message });
//     }
// });

router.delete('/channels/:channelId', authenticateJWT, channelController.deleteChannel)
router.get("/channel/:channelId/name", authenticateJWT, channelController.getChannelName);
console.log('this done')

module.exports = router