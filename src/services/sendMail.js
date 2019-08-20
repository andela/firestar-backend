import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const smtpTransport = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    type: 'OAuth2',
    user: process.env.EMAIL,
    clientId: process.env.GMAIL_ID,
    clientSecret: process.env.GMAIL_SECRET,
    refreshToken: process.env.GMAIL_REFRESH,
  },
});

const sendResetMail = (user, resetToken) => {
    const mailOptions = {
      from: process.env.EMAIL,
      to: user.email,
      subject: 'Reset password',
      html: `${'<h4><b>Reset Password</b></h4>'
                      + '<p>To reset your password, click link to complete this form:</p>'
                      + '<a href='}${process.env.CLIENT_URL}/resetpassword/${user.user_id}/${resetToken}">${process.env.CLIENT_URL}/resetpassword/${user.id}/${resetToken}</a>`
                      + '<p>This link expires in 5 hours<p>'
                      + '<br><br>'
                      + '<p>--Team</p>',
    };
    try {
      await smtpTransport.sendMail(mailOptions, (info) => {
        debug('INFO', info);
      });
    } catch (error) {
      debug('ERROR IN SENDING EMAIL', error);
      return 'sent';
    }
}

const sendSignupMail = (user) => {

}

export { sendResetMail, sendSignupMail };