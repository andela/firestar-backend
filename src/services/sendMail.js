import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';
import Debug from 'debug';

const debug = new Debug('dev');
dotenv.config();

const apiKey = process.env.SENDGRIP_API_KEY;

sgMail.setApiKey(apiKey);

const expiry = parseInt(process.env.TOKENEXPIRY / 60 / 60) || 3;

const sendResetMail = (user, resetToken) => {
  const message = {
    to: user.email,
    from: 'firestar@digitalnomad.com',
    subject: 'Reset Password',
    html: `
        <p>To reset your password, click link to complete this form:</p>
        <a href='${process.env.CLIENT_URL}/resetpassword/${
      user.user_id
    }?token=${resetToken}'>${process.env.CLIENT_URL}/resetpassword/${
      user.user_id
    }?token=${resetToken}</a>
      <p>This link expires in ${expiry} hours<p>
      <br><br>
      <p>--Firestar Team</p>`
  };
  sgMail.send(message);
};

const sendSignupMail = (user) => {
  const message = {
    to: user.email,
    from: 'firestar@digitalnomad.com',
    subject: 'Sign up on Barefoot Nomad',
    html: `
        <p>You recently requested to change your password but we realized you don't have an account yet with this email</p>
        <a href='${process.env.CLIENT_URL}/'>Click this link now to Signup</a>
        <br><br>
        <p>--Firestar Team</p>`
  };
  sgMail.send(message);
};

export { sendResetMail, sendSignupMail };
