const kafka = require('kafka-node');
const Producer = kafka.Producer;
const client = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' });
const producer = new Producer(client);
const topic = 'email-topic'; // ודאי שהשם תואם

const emailList = [
  { to: 'b0556729929@gmail.com', subject: 'Subject 1', text: 'Email body text 1' },
  { to: 'b0556729929@gmail.com', subject: 'Subject 2', text: 'Email body text 2' },
];

producer.on('ready', () => {
  emailList.forEach(email => {
    const payloads = [{ topic: topic, messages: JSON.stringify(email) }];
    producer.send(payloads, (err, data) => {
      if (err) {
        console.error('Failed to send message:', err);
      } else {
        console.log('Message sent:', data);
      }
    });
  });
});

producer.on('error', (err) => {
  console.error('Producer error:', err);
});
