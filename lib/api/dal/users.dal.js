const { User } = require('../../mongo/models');

const insert = async userDetails => {
	const user = await User.create(userDetails);
	return user;
};

const getUserById = async id => {
	try {
		return await User.findById(id);
	} catch (e) {}
};

const update = async ({ userDoc, userId, updatedData }) => {
	let user;
	if (userDoc) {
		user = userDoc;
	} else if (userId) {
		user = await getUserById(userId);
	}
	if (!user) throw new Error('User does not exist');
	Object.assign(user, updatedData);
	await user.save();
	return user;
};

const updateUserWithNoteIds = async (user, noteIds) => {
	if (Array.isArray(noteIds)) {
		user.notes.push(...noteIds);
	} else {
		user.notes.push(noteIds);
	}
	await user.save();
	return user;
};

module.exports = {
	insert,
	getUserById,
	updateUserWithNoteIds,
};
