const config = require('./config');

const TWILIO_ACCOUNT_SID = config.TWILIO_ACCOUNT_SID;
const TWILIO_AUTH_TOKEN = config.TWILIO_AUTH_TOKEN;
const client = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);


const sms = async (otp) => {
    await client.messages.create({ from: '+13392184291', body: `${otp}`, to: '+919772295894' })
        .then(message => console.log(message.sid)).catch((e) => console.log(e));
}

module.exports = sms;