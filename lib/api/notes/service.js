const { saveNote_db } = require('./dal');
const { encrypt } = require('../../utils/crypto');
const { generateId, generateToken } = require('../../utils/crypto');

const createNote = noteContent => {
	// after validation
	if (!noteContent) {
		// throw 400
	}
	// generate id
	const noteId = generateId();
	// generate token
	const token = generateToken();
	// encrypt token
	const encryption = encrypt(token);
	// create note with all parameters
	const timestamp = Date.now();
	const note = {
		id: noteId,
		timestamp,
		content: noteContent,
		iv: encryption.iv,
		encryptedToken: encryption.content,
	};
	// save note in DB
	const didSave = saveNote_db(note);
	if (didSave) {
		return note;
	}
};

module.exports = {
	createNote,
};
