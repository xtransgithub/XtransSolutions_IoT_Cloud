const Channel = require('../models/channelModel')
const User = require('../models/userModel')
const sgMail = require('@sendgrid/mail')
require('dotenv').config();


const sendEmailAlert = (toEmail, subject, message) => {
    const msg = {
        to: toEmail,
        from: process.env.EMAIL_ADDRESS_SG,  // Your email address (configured in environment variables)
        subject: subject,
        text: message,
    };
    return sgMail.send(msg);
};

exports.setEvents = async (req,res) =>{
    try{
        console.log("we are in events")
        const {operator,user_id, ch_id, fieldName, triggerValue, triggerType} = req.body 
        const user = await User.findOne({user_id})
        const channel = await Channel.findOne({ch_id})

        if(!channel.fields.include(fieldName)){
            res.status(400).json({
                status: "failure",
                message: "field does not exists in the channel"
            })
        }

        const curVal = await channel.entries[-1].fieldData.findOne(fieldName)
        console.log(`This is the current value ${curVal}`)

        if(!curVal){
            res.status(400).json({
                status: "failure",
                message: "fieldName does not exists in the entries"
            })
        }
        const message = `Alert! The field value is ${curVal}, which meets the condition '${operator}' with the threshold ${triggerValue}.`

        await sendEmailAlert(email, 'Condition Alert', message);

        return res.status(200).json({
            status: 'success',
            message: 'alert message sent successfully' 
        });

    }
    catch(error){

    }
} 