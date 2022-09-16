const crypto = require('crypto');
require('dotenv').config()

const generateId = (bytes = 6) => crypto.randomBytes(bytes).toString('hex');

const generateToken = (bytes = 32) => crypto.randomBytes(bytes).toString('base64');

const algorithm = 'aes-256-ctr';
const secretKey = process.env.SECRET_KEY;

const encrypt = (text) => {
	const iv = crypto.randomBytes(16);
	const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
	const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

	return {
		iv: iv.toString('hex'),
		content: encrypted.toString('hex')
	};
};

const decrypt = (encrypted, iv) => {
	const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(iv, 'hex'));
	const decrpyted = Buffer.concat([decipher.update(Buffer.from(encrypted, 'hex')), decipher.final()]);
	return decrpyted.toString();
};

module.exports = {
	generateId,
	generateToken,
	encrypt,
	decrypt
};
