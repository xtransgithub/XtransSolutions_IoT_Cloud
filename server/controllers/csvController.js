// const csvRouter = express.Router();
const Channel = require('../models/channelModel');
const { Parser } = require('json2csv');

exports.getCSV = async (req, res) => {
    console.log("hello")
    const { channelId } = req.params;
    
    try {
        const channel = await Channel.findById(channelId);
        if (!channel) {
            return res.status(404).json({ message: 'Channel not found' });
        }

        const entries = channel.entries; 
        
        // if (!entries.length) {

        //     return res.status(404).json({ message: 'No entries found in this channel' });
        // }
        if (!entries.length) {
            return res.status(200).json({ message: 'No entries yet', data: [] });
        }
        const formattedEntries = entries.map(entry => {
            const entryObj = { timestamp: entry.timestamp };
            entry.fieldData.forEach(field => {
                entryObj[field.name] = field.value;
            });
            return entryObj;
        });

        const fields = ['timestamp', ...channel.fields]; 
        const json2csvParser = new Parser({ fields });
        const csv = json2csvParser.parse(formattedEntries); 

        res.header('Content-Type', 'text/csv');
        res.header('Content-Disposition', `attachment; filename="channel_${channelId}_fields.csv"`);
        
        res.status(200).send(csv);

    } catch (error) {
        console.error('Error retrieving CSV data:', error);
        res.status(500).json({ message: 'Failed to retrieve CSV data', error: error.message });
    }
}