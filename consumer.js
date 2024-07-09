const kafka = require('kafka-node');
const nodemailer = require('nodemailer');
const Consumer = kafka.Consumer;
const client = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' });
const consumer = new Consumer(client, [{ topic: 'email-topic', partition: 0 }], { autoCommit: true }); // ודאי שהשם תואם

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'b0556729929@gmail.com',
    pass: '325959989'
  }
});

consumer.on('message', async (message) => {
  const email = JSON.parse(message.value);
  try {
    await transporter.sendMail({
      from: 'b0556729929@gmail.com',
      to: email.to,
      subject: email.subject,
      text: email.text
    });
    console.log(`Email sent to ${email.to}`);
  } catch (error) {
    console.error(`Failed to send email to ${email.to}:`, error);
  }
});

consumer.on('error', (err) => {
  console.error('Consumer error:', err);
});
