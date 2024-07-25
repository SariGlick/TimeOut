const { exec } = require('child_process');
const producerScript = exec('node producer.js');
const consumerScript = exec('node consumer.js');

producerScript.stdout.on('data', (data) => {
});

producerScript.stderr.on('data', (data) => {
  console.error(`Producer error: ${data}`);
});

consumerScript.stdout.on('data', (data) => {
});

consumerScript.stderr.on('data', (data) => {
  console.error(`Consumer error: ${data}`);
});

process.on('SIGINT', () => {
  producerScript.kill();
  consumerScript.kill();
  process.exit(0);
});