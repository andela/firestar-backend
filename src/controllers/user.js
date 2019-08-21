import {verifyEmail} from './template/verifyEmail'
import { emailVerifyToken} from '../../utils/index'
import { Mail } from './Mail';

const SendEmail = async (req,res)=>{
    let { email, first_name, last_name} = req.body;
    email = email.trim();
    first_name = first_name.trim();
    last_name = last_name.trim();
    const id = 'some_encoded_identiity';
    const token = await emailVerifyToken(id);
		const email_details = {
			Subject: 'Email Verification',
			Recipient: 'akp.ani@yahoo.com',
		};
		const link = `http://localhost:3000/api/v1/auth/verify?id=${token}`;
		const data = {
			email,
			first_name,
			last_name,
			link,
		};
        
    try{
        const send = new Mail(email_details, verifyEmail(data));
        await send.main();
        return res.status(200).json({status:200,data:{message:'Message successfully sent, please check your email'}})
        	
    } catch(err){
        res.status(400).json({status:400,error:'An Error occured during the process.'})
    }
	
};


export { SendEmail }

