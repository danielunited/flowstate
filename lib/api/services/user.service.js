const { generateToken, encrypt } = require('../../utils/crypto');
const userDb = require('../dal/users.dal');

const createUser = async notesIdArr => {
	// generate token
	const userAccessToken = generateToken();
	// encrypt token
	const encryption = encrypt(userAccessToken);
	const user = await userDb.insert({
		// iv: encryption.iv,
		encryptedToken: encryption.content,
		notes: notesIdArr || [],
	});
	console.log("-> user", user);
	return user;
};

module.exports = {
	createUser,
};
