const kafka = require('kafka-node');
const nodemailer = require('nodemailer');
const Bottleneck = require('bottleneck');
const retry = require('async-retry');
const Consumer = kafka.Consumer;
const client = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' });
const consumer = new Consumer(client, [{ topic: 'email-topic', partition: 0 }], { autoCommit: true });

let transporter = nodemailer.createTransport({
  service: 'hotmail',
  auth: {
    user: 'mbkamatech@hotmail.com',
    pass: 'm&b123789'
  }
});

const limiter = new Bottleneck({
  maxConcurrent: 1, // הגבלת מספר חיבורים בו זמנית ל-1
  minTime: 2000     // הגבלת קצב שליחה, שליחה כל 2 שניות (2000 מילישניות)
});

const sendEmail = async (email) => {
  try {
    await retry(async () => {
      await transporter.sendMail({
        from: '"Malki & Bati" <mbkamatech@hotmail.com>',
        to: email.to,
        subject: email.subject,
        text: email.text
      });
    }, {
      retries: 5, // מספר ניסיונות חוזרים
      factor: 2,  // הכפלת זמן ההמתנה בכל ניסיון כושל
      minTimeout: 1000, // זמן המתנה מינימלי בין ניסיונות
      maxTimeout: 10000 // זמן המתנה מקסימלי בין ניסיונות
    });
    console.log(`Email sent to ${email.to}`);
  } catch (error) {
    console.error(`Failed to send email to ${email.to}:`, error);
  }
};

consumer.on('message', (message) => {
  const email = JSON.parse(message.value);
  limiter.schedule(() => sendEmail(email));
});

consumer.on('error', (err) => {
  console.error('Consumer error:', err);
});
