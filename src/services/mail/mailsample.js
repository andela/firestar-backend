import {verifyEmail} from './template/verifyEmail'
import { emailVerifyToken} from '../../utils/index'
import { Mail } from './Mail';

const SendEmail = async (id)=>{
    const token = await emailVerifyToken(id);
		const email_details = {
			Subject: 'Email Verification',
			Recipient: 'akp.ani@yahoo.com',
		};
		const link = `http://localhost:3000/api/v1/auth/verify?id=${token}`;
		const data = {
			email:'akp.ani@yahoo.com',
			first_name:'Your first name',
			last_name:'Your last name',
			link,
		};
		const send = new Mail(email_details, verifyEmail(data));
	return	await send.main();
};

const id = 'someencodedidentiity';
SendEmail(id);

