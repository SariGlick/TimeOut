import { insertEvent } from './producer.js';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();
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

  sendEmailWithAttachment(email, subject, text, attachmentPaths);

process.on('SIGINT', () => {
  process.exit(0);
});
export {sendEmailWithAttachment}