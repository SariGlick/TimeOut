const kafka = require('kafka-node');
const Producer = kafka.Producer;
const client = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' });
const producer = new Producer(client);

const names = ['Alice', 'Bob', 'Charlie', 'David'];

const sendNamesToKafka = (names) => {
  producer.on('ready', () => {
    names.forEach(name => {
      const payloads = [
        { topic: 'names-topic', messages: name }
      ];
      producer.send(payloads, (err, data) => {
        if (err) {
          console.error('Error sending message:', err);
        } else {
          console.log(`Sent name: ${name}`);
        }
      });
    });
  });

  producer.on('error', (err) => {
    console.error('Error with producer:', err);
  });
};

sendNamesToKafka(names);