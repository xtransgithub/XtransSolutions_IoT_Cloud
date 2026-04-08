// const Channel = require('../models/channelModel');
// const User = require('../models/userModel');
// const createTransporter = require('../utils/nodeMailer');
// require('dotenv').config();

// const MAX_ALERT_COUNT = 2;  // Maximum number of alerts to send
// const ALERT_INTERVAL = 1 * 60 * 1000;  // 10 minutes in milliseconds

// const alertTracker = {};  // Temporary object to store alert counts and timeouts

// const evaluateCondition = (curVal, operator, triggerValue) => {
//     switch (operator) {
//         case 'less than':
//             return curVal < triggerValue;
//         case 'greater than':
//             return curVal > triggerValue;
//         case 'equal to':
//             return curVal === triggerValue;
//         case 'less than equal to':
//             return curVal <= triggerValue;
//         case 'greater than equal to':
//             return curVal >= triggerValue;
//         case 'not equal to':
//             return curVal !== triggerValue;
//         default:
//             throw new Error('Invalid operator');
//     }
// };

// exports.setEvents = async (req, res) => {
//     try {
//         console.log("we are in events");
//         const userId = req.user._id;
//         const { reciver_email, operator, ch_id, fieldName, triggerValue, cstMsg } = req.body;

//         const user = await User.findOne({ _id: userId });
//         const channel = await Channel.findById({_id: ch_id});
//         if (!channel) {
//             return res.status(404).json({ message: 'Channel not found' });
//         }

//         if (channel.fields.indexOf(fieldName) < 0) {
//             return res.status(400).json({
//                 status: "failure",
//                 message: "field does not exist in the channel"
//             });
//         }
//         const lastEntry = channel.entries[channel.entries.length - 1];
//         const fieldData = lastEntry ? lastEntry.fieldData.find(field => field.name === fieldName) : null;
//         console.log(fieldData)
//         const curVal = fieldData ? parseFloat(fieldData.value) : null;
//         console.log(`This is the current value ${curVal}`);

//         if (curVal === null || isNaN(curVal)) {
//             return res.status(400).json({
//                 status: "failure",
//                 message: "No data entries exist for this channel yet"
//             });
//         }

//         if (evaluateCondition(curVal, operator, triggerValue)) {
//             const to = reciver_email;
            
//             // console.log(typeof(to))
            
//             const subject = 'Email Alert';
//             let text = ""
//             if(cstMsg!="" || undefined){
//                 text = `${cstMsg}`
//             }
//             else{
//                 text = `Alert! The field value is ${curVal}, which meets the condition '${operator}' with the threshold ${triggerValue}.`;
//             }

//             const email = process.env.EMAIL_ADDRESS;

//             const userAlertKey = `${userId}_${ch_id}_${fieldName}`;

//             if (!alertTracker[userAlertKey]) {
//                 alertTracker[userAlertKey] = { count: 0, timer: null };
//             }

//             const alertData = alertTracker[userAlertKey];

//             const sendEmailAlert = () => {
//                 if (alertData.count < MAX_ALERT_COUNT) {
//                     console.log(to)
//                     createTransporter(email, to, subject, text)
//                         .then(() => {
//                             console.log('Email sent successfully!');
//                             alertData.count++;
//                             if (alertData.count >= MAX_ALERT_COUNT) {
//                                 clearInterval(alertData.timer);
//                                 alertTracker[userAlertKey] = null;  // Reset for future requests
//                             }
//                         })
//                         .catch(error => {
//                             console.error('Error sending email:', error);
//                         });
//                 }
//             };

//             if (!alertData.timer) {
//                 sendEmailAlert();  // Immediate send on first request
//                 alertData.timer = setInterval(sendEmailAlert, ALERT_INTERVAL);
//             }

//             return res.status(200).json({
//                 status: 'success',
//                 message: 'Alert message will be sent at intervals' 
//             });
//         } else {
//             return res.status(200).json({
//                 status: 'success',
//                 message: 'Condition not met, no alert sent.'
//             });
//         }

//     } catch (error) {
//         console.error('Error setting event:', error);
//         res.status(500).json({ message: 'Error setting event', error: error.message });
//     }
// };

const Channel = require('../models/channelModel');
const createTransporter = require('../utils/nodeMailer');
require('dotenv').config();

const MAX_ALERT_COUNT = 2; 
const ALERT_INTERVAL = 1 * 60 * 1000; // 1 minute

const alertTracker = {};

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

        const userId = req.user._id;
        const { reciver_email, operator, ch_id, fieldName, triggerValue, cstMsg } = req.body;

        const channel = await Channel.findById(ch_id);

        if (!channel) {
            return res.status(404).json({
                status: "failure",
                message: "Channel not found"
            });
        }

        // check field exists in channel
        if (!channel.fields.includes(fieldName)) {
            return res.status(400).json({
                status: "failure",
                message: "Field does not exist in the channel"
            });
        }

        // check entries exist
        if (!channel.entries || channel.entries.length === 0) {
            return res.status(200).json({
                status: "success",
                message: "Alert created but no data available yet"
            });
        }

        const lastEntry = channel.entries[channel.entries.length - 1];

        const fieldData = lastEntry.fieldData.find(
            field => field.name === fieldName
        );

        const curVal = fieldData ? parseFloat(fieldData.value) : null;

        if (curVal === null || isNaN(curVal)) {
            return res.status(200).json({
                status: "success",
                message: "Alert created but no data available yet"
            });
        }

        if (evaluateCondition(curVal, operator, triggerValue)) {

            const subject = "Email Alert";

            const text = (cstMsg && cstMsg !== "")
                ? cstMsg
                : `Alert! The field value is ${curVal}, which meets the condition '${operator}' with the threshold ${triggerValue}.`;

            const email = process.env.EMAIL_ADDRESS;
            const to = reciver_email;

            const userAlertKey = `${userId}_${ch_id}_${fieldName}`;

            if (!alertTracker[userAlertKey]) {
                alertTracker[userAlertKey] = { count: 0, timer: null };
            }

            const alertData = alertTracker[userAlertKey];

            const sendEmailAlert = () => {

                if (alertData.count < MAX_ALERT_COUNT) {

                    createTransporter(email, to, subject, text)
                        .then(() => {

                            console.log("Email sent");

                            alertData.count++;

                            if (alertData.count >= MAX_ALERT_COUNT) {
                                clearInterval(alertData.timer);
                                alertTracker[userAlertKey] = null;
                            }

                        })
                        .catch(err => {
                            console.error("Email error:", err);
                        });

                }

            };

            if (!alertData.timer) {

                sendEmailAlert();

                alertData.timer = setInterval(
                    sendEmailAlert,
                    ALERT_INTERVAL
                );

            }

            return res.status(200).json({
                status: "success",
                message: "Alert message will be sent at intervals"
            });

        }

        return res.status(200).json({
            status: "success",
            message: "Condition not met, no alert sent"
        });

    } catch (error) {

        console.error("Error setting event:", error);

        res.status(500).json({
            status: "error",
            message: "Internal server error",
            error: error.message
        });

    }
};