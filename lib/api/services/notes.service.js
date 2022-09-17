const { getNoteById_db } = require('../dal/notes.dal');
const { serialize } = require('cookie');
const { saveNote_db } = require('../dal/notes.dal');
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
	const noteToken = generateToken();
	// encrypt token
	const encryption = encrypt(noteToken);
	// create note with all parameters
	const timestamp = Date.now();
	const note = {
		id: noteId,
		timestamp,
		content: noteContent,
		iv: encryption.iv,
		encryptedToken: encryption.content,
		mostRecent: true,
	};
	// save note in DB
	const didSave = saveNote_db(note);
	// return token and id
	if (didSave) {
		return { noteToken, id: noteId };
	}
};

const ONE_YEAR = 60 * 60 * 24 * 365;
const handleCookieWithToken = (cookieVal, noteId, noteToken) => {
	let notesTokens;
	try {
		const decoded = decodeCookieVal(cookieVal);
		notesTokens = JSON.parse(decoded);
	} catch (e) {
		// if cookieVal is undefined or invalid json
		notesTokens = {};
	}
	notesTokens[noteId] = noteToken;
	const encodedCookieVal = encodeCookieVal(JSON.stringify(notesTokens));

	const finalCookie = serialize('notesTokens', encodedCookieVal, {
		path: '/',
		httpOnly: true,
		maxAge: ONE_YEAR,
		sameSite: 'strict',
		secure: process.env.NODE_ENV !== 'development',
	});
	return finalCookie;
};

const encodeCookieVal = cookieVal => Buffer.from(cookieVal).toString('base64');
const decodeCookieVal = cookieVal => Buffer.from(cookieVal, 'base64').toString('ascii');

const getNoteContent = noteId => {
	// returns relevant (not hidden) data of the note
	const note = getNoteById_db(noteId);
	if (!note) {
		return;
	}
	const { content, mostRecent } = note;
	return { content, mostRecent };
};

module.exports = {
	createNote,
	handleCookieWithToken,
	getNoteContent,
};
