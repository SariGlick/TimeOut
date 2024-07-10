const kafka = require('kafka-node');
const fs = require('fs');
const Consumer = kafka.Consumer;
const client = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' });
const consumer = new Consumer(
  client,
  [{ topic: 'names-topic', partition: 0 }],
  { autoCommit: true }
);

const names = [];
const filePath = 'names.txt';

consumer.on('message', (message) => {
  console.log(`Received name: ${message.value}`);
  names.push(message.value);

  // כתיבת השמות לקובץ לאחר קבלת כולם
  if (names.length === 4) { // assuming we expect 4 names
    const data = names.join('\n');
    fs.writeFile(filePath, data, (err) => {
      if (err) {
        console.error('Error writing to file', err);
      } else {
        console.log('File written successfully');
      }
    });
  }
});

consumer.on('error', (err) => {
  console.error('Error with consumer:', err);
});