import nodemailer from 'nodemailer';
import Bottleneck from 'bottleneck';
import retry from 'async-retry';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: process.env.EMAIL_USER,
		pass: process.env.EMAIL_PASS,
	},
	tls: {
		rejectUnauthorized: false
	}
});

const limiter = new Bottleneck({
	maxConcurrent: 1,
	minTime: 2000
});

const validateEmail = (email) => {
	if (!email.to || !email.subject || !email.text) {
		throw new Error('Invalid email data: "to", "subject", and "text" must not be empty');
	}
};

const sendEmail = async (email) => {
	validateEmail(email);
	try {
		await retry(async () => {
			await transporter.sendMail({
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
	} catch (error) {
		console.error(`Failed to send email to ${email.to}:`, error);
		throw error;  // Re-throw the error to be caught by the test
	}
};

const scheduleEmail = (email) => {
	return limiter.schedule(() => sendEmail(email));
};

export { scheduleEmail as sendEmail };
