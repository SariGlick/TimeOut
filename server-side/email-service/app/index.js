import dotenv from 'dotenv';
dotenv.config();
import { insertEvent } from './producer.js';
import path from 'path';

/**
 * Sends an email with the specified details through Kafka producer.
 * @param {string} email - The recipient's email address.
 * @param {string} subject - The subject of the email.
 * @param {string} text - The text content of the email.
 * @param {Array<string>} attachmentPaths - The file paths of the attachments.
 */
const sendEmailWithAttachment = (email, subject, text, attachmentPaths) => {
  const attachments = attachmentPaths.map(filePath => ({ path: filePath }));
  insertEvent('emailTopic', 'sendEmail', {
    to: email,
    subject: subject,
    text: text,
    attachments: attachments
  });
};

// Example usage
const email = 'b0556729929@gmail.com';
const subject = 'אלופות';
const text = '🤣😘😂😊😍😁we sucess to send email!!!'
const attachmentPaths = [
  path.join('C:', 'Users', '1', 'OneDrive', 'email-service', 'app', 'bati.txt')
];

  sendEmailWithAttachment(email, subject, text, attachmentPaths);



process.on('SIGINT', () => {
  process.exit(0);
});
export {sendEmailWithAttachment}
