import dotenv from 'dotenv';
dotenv.config();
import kafka from 'kafka-node';

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
  }
});

const producer = new Producer(client);
const email='malkysino@gmail.com'
const subject='אלופות'
const text='אם זה הגיע הפרויקט עובד🤣😘😂😊😍😁אין עלינו!!!!!!!!!!'
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
    }
  });
};

process.on('SIGINT', () => {
  producer.close(() => {
    process.exit(0);
  });
});

export { insertEvent };