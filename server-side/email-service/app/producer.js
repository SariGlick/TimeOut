import kafka from 'kafka-node';
import dotenv from 'dotenv';
dotenv.config();

const {Producer, Admin} = kafka;
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
  }
});

const producer = new Producer(client);

producer.on('error', (err) => {
  console.error('Producer error:', err);
});

const insertEvent = (topic, eventType, payload) => {
  const event = { type: eventType, payload };
  const payloads = [{ topic, messages: JSON.stringify(event) }];
  producer.send(payloads, (err, data) => {
    if (err) {
      console.error('Failed to send message:', err);
    } 
  });
};

process.on('SIGINT', () => {
  producer.close(() => {
    process.exit(0);
  });
});

export { insertEvent };
