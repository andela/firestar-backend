import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';

dotenv.config();

const { env } = process;
const apiKey = env.SENDGRID_API_KEY;
const CLIENT_URL = env.NODE_ENV === 'test' || 'development' ? `http://localhost:${env.PORT}/api/v1` : env.CLIENT_URL;

sgMail.setApiKey(apiKey);

const expiry = parseInt(process.env.TOKENEXPIRY / 60 / 60) || 3;

const sendResetMail = async (user, resetToken) => {
  try {
    const msg = {
      to: user.email,
      from: 'firestarbackend@gmail.com',
      subject: 'Reset Password',
      html: `
        <p>To reset your password, click link to complete this form:</p>
        <a href='${CLIENT_URL}/users/passwords/reset/${
        user.id
      }?token=${resetToken}'>${CLIENT_URL}/users/passwords/reset/${
        user.id
      }?token=${resetToken}</a>
        <p>This link expires in ${expiry} hours<p>
        <br><br>
        <p>--Firestar Team</p>`
    };
    const message = await sgMail.send(msg);
    if (message[0] && message[0].request) {
      return true;
    }
  } catch (error) {
    return false;
  }
};

const sendSignupMail = async (email) => {
  try {
    const msg = {
      to: email,
      from: 'firestar@digitalnomad.com',
      subject: 'Sign up on Barefoot Nomad',
      html: `
        <p>You recently requested to change your password but we realized you don't have an account yet with this email</p>
        <a href='${process.env.CLIENT_URL}/'>Click this link now to Signup</a>
        <br><br>
        <p>--Firestar Team</p>`
    };
    const message = await sgMail.send(msg);
    if (message[0] && message[0].request) {
      return true;
    }
  } catch (error) {
    return false;
  }  
};

export { sendResetMail, sendSignupMail };
