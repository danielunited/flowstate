const { decodeStr, encodeStr, decrypt } = require('./crypto');
const userDb = require('../api/dal/users.dal');
const { serialize } = require('cookie');

const extractCookie = cookieToken => {
	let userData;
	try {
		const decoded = decodeStr(cookieToken);
		userData = JSON.parse(decoded);
	} catch (e) {
		return {};
	}
	return userData;
};

const validateAccessTokenAndGetUser = async (userId, accessToken) => {
	// validates the user access token - if valid returns the user document
	const user = await userDb.getUserById(userId);
	if (!user) return;
	const { encryptedToken, iv } = user;
	const decryptedToken = decrypt(encryptedToken, iv);
	const isValid = decryptedToken === accessToken;
	if (isValid) {
		return user;
	}
};

const ONE_YEAR = 60 * 60 * 24 * 365;
const handleCookieWithToken = (userId, accessToken) => {
	const userData = JSON.stringify({
		userId,
		accessToken,
	});
	const decodedUserData = encodeStr(userData);
	return serialize('token', decodedUserData, {
		path: '/',
		httpOnly: true,
		maxAge: ONE_YEAR,
		sameSite: 'strict',
		secure: process.env.NODE_ENV !== 'development',
	});
};

module.exports = {
	extractCookie,
	validateAccessTokenAndGetUser,
	handleCookieWithToken,
};
