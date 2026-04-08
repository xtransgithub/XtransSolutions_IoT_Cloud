const mongoose = require('mongoose');

const entrySchema = new mongoose.Schema({
    fieldData: [{
        name: String, // Field name like 'temperature'
        value: mongoose.Schema.Types.Mixed, // Field value like 25.3
        // unique:true
    }],
    timestamp: { type: Date, default: Date.now }
});

const channelSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    // unique: true
    },
    description: String,
    apiKey: { 
        type: String, 
        unique: true, 
        required: true 
    },
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    //this is array of objects
    // fields: [{ 
    //     name: String, 
    //     type: String 
    // }],
    fields: {
        type: [{
            name: String, 
            type: String,
            // unique:true
        }],
        validate: {
            validator: function(value) {
                return value.length <= 5;
            },
            message: 'The fields array must contain no more than 5 items.'
        }
    },
    timestamp: { 
        type: Date, 
        default: Date.now 
    },
    entries: [entrySchema],
});
channelSchema.index({ userId: 1, name: 1 }, { unique: true });
module.exports = mongoose.model('Channel', channelSchema);
