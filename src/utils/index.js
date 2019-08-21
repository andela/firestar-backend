import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const emailVerifyToken = id => new Promise((resolve, reject) => {
	const token = jwt.sign({ id: id }, process.env.SECRET_KEY, { expiresIn: '1h' });
	if (token) resolve(token);
	if (!token) reject({ err: 'could not assign a token, make sure you provide a secret key' });
});

const arrayTest = (array, index) => array.indexOf(index);



export { emailVerifyToken, arrayTest };

