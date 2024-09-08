import { sendEmail } from '../mailer.js';

jest.mock('nodemailer', () => ({
  createTransport: jest.fn().mockReturnValue({
    sendMail: jest.fn().mockImplementation(() => Promise.resolve(true))
  })
}));

jest.mock('bottleneck', () => {
  const scheduleMock = jest.fn((fn) => fn());
  return jest.fn().mockImplementation(() => ({
    schedule: scheduleMock
  }));
});

describe('sendEmail', () => {
  let sendMailMock;
  let scheduleMock;

  beforeEach(() => {
    sendMailMock = require('nodemailer').createTransport().sendMail;
    scheduleMock = require('bottleneck')().schedule;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should validate email data and send email with correct options', async () => {

    await sendEmail(email);

    expect(sendMailMock).toHaveBeenCalledWith({
      to: email.to,
      subject: email.subject,
      text: email.text,
    });
  });

  it('should handle validation errors', async () => {
    const invalidEmail = {};

    await expect(sendEmail(invalidEmail)).rejects.toThrow('Invalid email data: "to", "subject", and "text" must not be empty');
  });

  it('should retry sending email on failure', async () => {
    sendMailMock.mockImplementationOnce(() => Promise.reject(new Error('Send failed')));

    await sendEmail(email);

    expect(sendMailMock).toHaveBeenCalledTimes(2);
  });

  it('should schedule email sending using Bottleneck', async () => {

    await sendEmail(email);

    expect(scheduleMock).toHaveBeenCalled();
  });
});