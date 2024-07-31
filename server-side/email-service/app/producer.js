import dotenv from 'dotenv';
dotenv.config();
import kafka from 'kafka-node';
import { sendEmailWithAttachment } from './index.js';
const Producer = kafka.Producer;
const Admin = kafka.Admin;
const client = new kafka.KafkaClient({ kafkaHost: process.env.KAFKA_BROKER });
const admin = new Admin(client);

const topicToCreate = [
  {
    topic: 'emailTopic',
    partitions: 1,
    replicationFactor: 1
  }
];

admin.createTopics(topicToCreate, async (err, res) => {
  if (err) {
    console.error('Failed to create topics:', err);
  } else {
    console.log('Topics created:', res);
  }
});

const producer = new Producer(client);
const email = 'b0556729929@gmail.com';
const subject = 'אלופות';
const text = '💌💌💌💌💌💌';
producer.on('ready', () => {
  insertEvent('emailTopic', 'sendEmail', {
    to: email,
    subject: subject,
    text: text
  });
});

producer.on('error', (err) => {
  console.error('Producer error:', err);
});

const insertEvent = (topic, eventType, payload) => {
  const event = { type: eventType, payload };
  const payloads = [{ topic, messages: JSON.stringify(event) }];
  producer.send(payloads, (err, data) => {
    if (err) {
      console.error('Failed to send message:', err);
    } else {
      console.log('Message sent:', data);
    }
  });
};

process.on('SIGINT', () => {
  producer.close(() => {
    process.exit(0);
  });
});

export { insertEvent };
