import { exec } from 'child_process';
import dotenv from 'dotenv';
dotenv.config();
const indexScript = exec('node index.js');
const producerScript = exec('node producer.js');
const consumerScript = exec('node consumer.js');
indexScript.stdout.on('data', (data) => {
});

indexScript.stderr.on('data', (data) => {
  console.error(`Index error: ${data}`);
});

producerScript.stderr.on('data', (data) => {
  console.error(`Producer error: ${data}`);
});

consumerScript.stderr.on('data', (data) => {
  console.error(`Consumer error: ${data}`);
});



process.on('SIGINT', () => {
  producerScript.kill();
  consumerScript.kill();
  process.exit(0);
});
