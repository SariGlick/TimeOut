import dotenv from 'dotenv';
dotenv.config();
import { exec } from 'child_process';
const indexScript = exec('node index.js');
const producerScript = exec('node producer.js');
const consumerScript = exec('node consumer.js');
indexScript.stdout.on('data', (data) => {
  console.log(`Index output: ${data}`);
});

indexScript.stderr.on('data', (data) => {
  console.error(`Index error: ${data}`);
});

producerScript.stdout.on('data', (data) => {
  console.log(`Producer output: ${data}`);
});

producerScript.stderr.on('data', (data) => {
  console.error(`Producer error: ${data}`);
});

consumerScript.stdout.on('data', (data) => {
  console.log(`Consumer output: ${data}`);
});

consumerScript.stderr.on('data', (data) => {
  console.error(`Consumer error: ${data}`);
});



process.on('SIGINT', () => {
  producerScript.kill();
  consumerScript.kill();
  process.exit(0);
});
