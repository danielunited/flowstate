import { validateAccessTokenAndGetUser } from '../../utils/auth';
import { updateUserWithNoteIds } from '../dal/users.dal';

const { generateToken, encrypt } = require('../../utils/crypto');
const userDb = require('../dal/users.dal');

const createUser = async notesIdArr => {
	// generate token
	const userAccessToken = generateToken();
	// encrypt token
	const encryption = encrypt(userAccessToken);
	const user = await userDb.insert({
		iv: encryption.iv,
		encryptedToken: encryption.content,
		notes: notesIdArr || [],
	});
	user.accessToken = userAccessToken
	return user;
};

const handleUserAfterNoteCreation = async (noteId, userData) => {
	let user;
	let accessToken;
	if (userData.userId) {
		user = await validateAccessTokenAndGetUser(userData.userId, userData.accessToken);
		accessToken = userData.accessToken;
	}
	if (user) {
		// update existing user with the noted ID
		await updateUserWithNoteIds(user, noteId);
	} else {
		const notesIds = [noteId];
		user = await createUser(notesIds);
		accessToken = user.accessToken;
	}
	return {
		userId: user._id,
		accessToken,
	};
};

module.exports = {
	createUser,
	handleUserAfterNoteCreation
};
