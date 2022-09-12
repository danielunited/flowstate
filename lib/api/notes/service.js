const { generateId, generateToken } = require('../../utils/crypto');

const createNote = note => {
	// after validation
	if (!note) {
		// throw 400
	}
	// generate id
	const noteId = generateId();

	// generate token
	const token = generateToken()

	// encrypt token

	// create note with all parameters
	const timestamp = Date.now();
};

module.exports = {
	createNote,
};
