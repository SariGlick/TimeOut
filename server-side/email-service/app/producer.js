const kafka = require('kafka-node');
const Producer = kafka.Producer;
const Admin = kafka.Admin;
const client = new kafka.KafkaClient({ kafkaHost: 'kafka:9092' });
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
producer.on('ready', () => {
  insertEvent('emailTopic', 'sendEmail', {
    to: 'malkysino@gmail.com',
    subject: 'אלופות',
    text: 'אם זה הגיע הפרויקט עובד🤣😘😂😊😍😁אין עלינו!!!!!!!!!!'
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

module.exports = {
  insertEvent
};