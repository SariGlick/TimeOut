const kafka = require('kafka-node');
const Producer = kafka.Producer;
const client = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' });
const producer = new Producer(client);
const topic = 'email-topic';

const emailList = [
  { to: 'ruthgoshen6@gmail.com', subject: 'הפרויקט שלנו עובד!!!', text: 'הצלחנו,לא יאומן' },
  { to: 'lielsa1160@gmail.com', subject: 'הפרוייקט עובד!!!', text: 'הצלחנו,לא יאומן!!' },
  { to: 'miryamgabay9@gmail.com', subject: 'הפרוייקט עובד!!!', text: 'הצלחנו,לא יאומן!!' },
  { to: 'rbn9574@gmail.com', subject: '!!אלופות', text: 'אם זה הגיע הפרויקט עובד::אין עלינו!!!!!!!!!!' },
  { to: 'ac8531286@gmail.com', subject: '!!אלופות', text: ' אם זה נשלח הפרויקט עובד::אין עלינו!!!!!!!!!!' },
  { to: 'esn4784@gmail.com', subject: '!!אלופות', text: ' אם זה נשלח הפרויקט עובד::אין עלינו!!!!!!!!!!' },
  { to: 'dvoryG3440@gmail.com', subject: '!!אלופות', text: ' אם זה נשלח הפרויקט עובד::אין עלינו!!!!!!!!!!' },
  { to: 'ruth708094@gmail.com', subject: '!!אלופות', text: ' אם זה נשלח הפרויקט עובד::אין עלינו!!!!!!!!!!' },
  { to: 'batyam5014@gmail.com', subject: '!!אלופות', text: ' אם זה נשלח הפרויקט עובד::אין עלינו!!!!!!!!!!' },
  { to: 'dvoras2000@gmail.com', subject: '!!אלופות', text: ' אם זה נשלח הפרויקט עובד::אין עלינו!!!!!!!!!!' },
  { to: 'aw7658847@gmail.com', subject: '!!אלופות', text: ' אם זה נשלח הפרויקט עובד::אין עלינו!!!!!!!!!!' },
  { to: 'st3196420@gmail.com', subject: '!!אלופות', text: ' אם זה נשלח הפרויקט עובד::אין עלינו!!!!!!!!!!' },
  { to: 'malkysino@gmail.com', subject: '!!אלופות', text: ' אם זה נשלח הפרויקט עובד::אין עלינו!!!!!!!!!!' },
  { to: 'c0556731657@gmail.com', subject: '!!אלופות', text: ' אם זה נשלח הפרויקט עובד::אין עלינו!!!!!!!!!!' },
  { to: 'b0556729929@gmail.com', subject: '!!אלופות', text: ' אם זה נשלח הפרויקט עובד::אין עלינו!!!!!!!!!!' },
  { to: 'batshevatavger@gmail.com', subject: '!!אלופות', text: ' אם זה נשלח הפרויקט עובד::אין עלינו!!!!!!!!!!' },
  { to: 'b3206003@gmail.com', subject: '!!אלופות', text: ' אם זה נשלח הפרויקט עובד::אין עלינו!!!!!!!!!!' },
  { to: 'oritb488@gmail.com', subject: '!!אלופות', text: ' אם זה נשלח הפרויקט עובד::אין עלינו!!!!!!!!!!' },
  { to: 'michal325978@gmail.com', subject: '!!אלופות', text: ' אם זה נשלח הפרויקט עובד::אין עלינו!!!!!!!!!!' },
  { to: 'sh3000444@gmail.com', subject: '!!אלופות', text: ' אם זה נשלח הפרויקט עובד::אין עלינו!!!!!!!!!!' },
  { to: '3244838@gmail.com', subject: '!!אלופות', text: ' אם זה נשלח הפרויקט עובד::אין עלינו!!!!!!!!!!' },
  { to: 'efratha04@gmail.com', subject: '!!אלופות', text: ' אם זה נשלח הפרויקט עובד::אין עלינו!!!!!!!!!!' },
  { to: 'ayeletbinder@gmail.com', subject: '!!אלופות', text: ' אם זה נשלח הפרויקט עובד::אין עלינו!!!!!!!!!!' },
  { to: 'chagit0534159385@gmail.com', subject: '!!אלופות', text: ' אם זה נשלח הפרויקט עובד::אין עלינו!!!!!!!!!!' },
  { to: '4453ruth@gmail.com', subject: '!!אלופות', text: ' אם זה נשלח הפרויקט עובד::אין עלינו!!!!!!!!!!' },
  { to: 'mor012004@gmail.com', subject: '!!אלופות', text: ' אם זה נשלח הפרויקט עובד::אין עלינו!!!!!!!!!!' },
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
