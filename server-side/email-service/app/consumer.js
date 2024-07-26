import dotenv from 'dotenv';
dotenv.config();
import kafka from 'kafka-node';
import nodemailer from 'nodemailer';
import Bottleneck from 'bottleneck';
import retry from 'async-retry';
import { sendEmail } from './mailer.js';


const Consumer = kafka.Consumer;
const client = new kafka.KafkaClient({ kafkaHost: process.env.KAFKA_BROKER});
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