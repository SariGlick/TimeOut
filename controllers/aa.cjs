const nodemailer = require('nodemailer');
// קונפיגורציה של Nodemailer
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'mazaltovchagit16@gmail.com',
          pass: 'bysr woai nxmd jtti'
        }
      });
const sendEmail = async (req, res) => {
    const user = "malkysino@gmail.com";
    try {
        await transporter.sendMail({
            from: 'איפוס סיסמא TIMEOUT',
            to: user,
            subject: "succsesssssss",
            text: "this is the kod"
        });
        console.log(`Email sent to `);
    } catch (error) {
      console.error(`Failed to send email to :`, error);
    }
};
module.exports = { sendEmail };
sendEmail({}, {});