import twilio from 'twilio';

const accountSid = process.env.twilioAccountSid;
const authToken = process.env.twilioAuthToken;

const client = twilio(accountSid, authToken);

client.messages.create({
  to: 'x',
  from: "z",
  body: "hello ola",
});
