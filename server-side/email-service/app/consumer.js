const kafka = require('kafka-node');
const nodemailer = require('nodemailer');
const Bottleneck = require('bottleneck');
const retry = require('async-retry');
const { sendEmail } = require('./mailer');
const Consumer = kafka.Consumer;
const client = new kafka.KafkaClient({ kafkaHost: 'kafka:9092' });

const consumer = new Consumer(client, [{ topic: 'emailTopic', partition: 0 }], { autoCommit: true });

consumer.on('message', (message) => {
  const event = JSON.parse(message.value);
  handleEvent(event);
});

consumer.on('error', (err) => {
  console.error('Consumer error:', err);
});

const handleEvent = (event) => {
  switch (event.type) {
    case 'sendEmail':
      sendEmail(event.payload);
      break;
    default:
      console.error(`Unknown event type: ${event.type}`);
  }
};

process.on('SIGINT', () => {
  consumer.close(true, () => {
    process.exit(0);
  });
});