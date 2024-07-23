const kafka = require('kafka-node');
const Producer = kafka.Producer;
const Consumer = kafka.Consumer;
const Admin = kafka.Admin;
 const nodemailer = require('nodemailer');
 const Bottleneck = require('bottleneck');
 const retry = require('async-retry');
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
      console.log('Topics created:', res);
    }
  });

// Producer
const producer = new Producer(client);
const emailList = [
    { to: 'malkysino@gmail.com', subject: 'אלופות', text: 'אם זה הגיע הפרויקט עובד🤣😘😂😊😍😁אין עלינו!!!!!!!!!!' },
    //{ to: 'a0583231634@gmail.com', subject: 'אלופות', text: ' אם זה נשלח הפרויקט עובד🤣😘😂😊😍😁אין עלינו!!!!!!!!!!' },
];

producer.on('ready', () => {
  emailList.forEach(email => {
    const payloads = [{ topic: 'emailTopic', messages: JSON.stringify(email) }];
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

// Consumer
const consumer = new Consumer(client, [{ topic: 'emailTopic', partition: 0 }], { autoCommit: true });

consumer.on('message', (message) => {
  const email = JSON.parse(message.value);
  limiter.schedule(() => sendEmail(email));
});

consumer.on('error', (err) => {
  console.error('Consumer error:', err);
});

// Nodemailer transporter
let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'prwyyqtsly@gmail.com',
    pass: 'z k w x m l w a m j e n i j q p'
  }
});

// Bottleneck limiter
const limiter = new Bottleneck({
  maxConcurrent: 1,
  minTime: 2000
});

// Function to send email with retry
const sendEmail = async (email) => {
  try {
    await retry(async () => {
      await transporter.sendMail({
        from: 'בתי & מלכי',
        to: email.to,
        subject: email.subject,
        text: email.text
      });
    }, {
      retries: 3,
      factor: 2,
      minTimeout: 1000,
      maxTimeout: 10000
    });
    console.log(`Email sent to ${email.to}`);
  } catch (error) {
    console.error(`Failed to send email to ${email.to}:`, error);
  }
};

// Handle shutdown gracefully
process.on('SIGINT', () => {
  consumer.close(true, () => {
    producer.close(() => {
      console.log('Producer closed.');
      process.exit(0);
    });
  });
});