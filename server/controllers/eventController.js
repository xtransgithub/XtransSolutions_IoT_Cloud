const Channel = require('../models/channelModel');
const User = require('../models/userModel');
const createTransporter = require('../utils/nodeMailer');
require('dotenv').config();

const MAX_ALERT_COUNT = 5;  // Maximum number of alerts to send
const ALERT_INTERVAL = 1 * 60 * 1000;  // 10 minutes in milliseconds

const alertTracker = {};  // Temporary object to store alert counts and timeouts

const evaluateCondition = (curVal, operator, triggerValue) => {
    switch (operator) {
        case 'less than':
            return curVal < triggerValue;
        case 'greater than':
            return curVal > triggerValue;
        case 'equal to':
            return curVal === triggerValue;
        case 'less than equal to':
            return curVal <= triggerValue;
        case 'greater than equal to':
            return curVal >= triggerValue;
        case 'not equal to':
            return curVal !== triggerValue;
        default:
            throw new Error('Invalid operator');
    }
};

exports.setEvents = async (req, res) => {
    try {
        console.log("we are in events");
        const userId = req.user._id;
        const { email, operator, ch_id, fieldName, triggerValue } = req.body;

        const user = await User.findOne({ _id: userId });
        const channel = await Channel.findById({_id: ch_id});
        if (!channel) {
            return res.status(404).json({ message: 'Channel not found' });
        }

        if (channel.fields.indexOf(fieldName) < 0) {
            return res.status(400).json({
                status: "failure",
                message: "field does not exist in the channel"
            });
        }
        const lastEntry = channel.entries[channel.entries.length - 1];
        const fieldData = lastEntry ? lastEntry.fieldData.find(field => field.name === fieldName) : null;
        console.log(fieldData)
        const curVal = fieldData ? parseFloat(fieldData.value) : null;
        console.log(`This is the current value ${curVal}`);

        if (curVal === null || isNaN(curVal)) {
            return res.status(400).json({
                status: "failure",
                message: "fieldName does not exist in the entries"
            });
        }

        if (evaluateCondition(curVal, operator, triggerValue)) {
            const to = user.email;
            const subject = 'Email Alert';
            const text = `Alert! The field value is ${curVal}, which meets the condition '${operator}' with the threshold ${triggerValue}.`;
            // const email = process.env.EMAIL_ADDRESS;

            const userAlertKey = `${userId}_${ch_id}_${fieldName}`;

            if (!alertTracker[userAlertKey]) {
                alertTracker[userAlertKey] = { count: 0, timer: null };
            }

            const alertData = alertTracker[userAlertKey];

            const sendEmailAlert = () => {
                if (alertData.count < MAX_ALERT_COUNT) {
                    createTransporter(email, to, subject, text)
                        .then(() => {
                            console.log('Email sent successfully!');
                            alertData.count++;
                            if (alertData.count >= MAX_ALERT_COUNT) {
                                clearInterval(alertData.timer);
                                alertTracker[userAlertKey] = null;  // Reset for future requests
                            }
                        })
                        .catch(error => {
                            console.error('Error sending email:', error);
                        });
                }
            };

            if (!alertData.timer) {
                sendEmailAlert();  // Immediate send on first request
                alertData.timer = setInterval(sendEmailAlert, ALERT_INTERVAL);
            }

            return res.status(200).json({
                status: 'success',
                message: 'Alert message will be sent at intervals' 
            });
        } else {
            return res.status(200).json({
                status: 'success',
                message: 'Condition not met, no alert sent.'
            });
        }

    } catch (error) {
        console.error('Error setting event:', error);
        res.status(500).json({ message: 'Error setting event', error: error.message });
    }
};

