const { decodeStr, decrypt } = require('./crypto');
const user = require('../api/dal/users.dal');

const extractCookie = cookieToken => {
	let userData;
	try {
		const decoded = decodeStr(cookieToken);
		userData = JSON.parse(decoded);
	} catch (e) {
		userData = {};
	}
	return userData;
};

const validateAccessTokenAndGetUser = async (userId, accessToken) => {
	// validates the user access token - if valid returns the user document
	const user = await user.getUserById(userId);
	const { encryptedToken, iv } = user;
	const decryptedToken = decrypt(encryptedToken, iv);
	const isValid = decryptedToken === accessToken;
	if (isValid) return user;
};

module.exports = {
	extractCookie,
	validateAccessTokenAndGetUser,
};
