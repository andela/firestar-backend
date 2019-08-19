import {verifyEmail} from './mail/template/verifyEmail'
import { emailVerifyToken} from '../utils/index'
import { Mail } from './mail/Mail';

const SendEmail = async (id)=>{
    const token = await emailVerifyToken(id);
		const email_details = {
			Subject: 'Email Verification',
			Recipient: 'akp.ani@yahoo.com',
		};
		const link = process.env.NODE_ENV === 'development' ? `http://localhost:3000/api/v1/auth/verify?id=${token}`
			: `http://localhost:3000/api/v1/auth/verify?id=${token}`;
		const data = {
			email:'akp.ani@yahoo.com',
			first_name:'Aniefiok',
			last_name:'Akpan',
			link,
		};
		const send = new Mail(email_details, verifyEmail(data));
		send.main();
};

const id = 'ahjdjfh68jjjjhjfh';
SendEmail(id);

