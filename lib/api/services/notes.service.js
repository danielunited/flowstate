import { validateAccessTokenAndGetUser } from '../../utils/auth';
import { createUser } from './user.service';
import { updateUserWithNoteIds } from '../dal/users.dal';

const { notesDb } = require('../dal/notes.dal');
const { updateNoteStatus_db } = require('../dal/notes.dal');
const { decrypt } = require('../../utils/crypto');
const { saveNote_db, getNoteById_db, updateNoteContentById_db } = require('../dal/notes.dal');

// const createNote = async noteContent => {
// 	const noteData = {
// 		content: noteContent,
// 	};
// 	const note = await notesDb.insert(noteData);
// 	return note;
// };

const getNote = async noteId => await notesDb.getById(noteId);

const createNote = async noteContent => {
	const note = await notesDb.insert({
		content: noteContent,
	});
	return note;
};

const updateNote = async (noteId, noteContent, userData) => {
	const user = await validateAccessTokenAndGetUser(userData.userId, userData.accessToken);
	if (!user.notes.includes(noteId)) throw new Error('Unauthenticated');
	const updatedNote = await notesDb.update(noteId, noteContent);
	return updatedNote;
};

// TODO get note content

// const getNoteContent = (noteId, token) => {
// 	// returns relevant (not hidden) data of the note
// 	// and checks if the token of the caller is valid
// 	const note = getNoteById_db(noteId);
// 	if (!note) {
// 		return;
// 	}
// 	const isAuthenticated = isTokenValid(note, token);
// 	const { content, mostRecent } = note;
// 	return { content, mostRecent, isAuthenticated };
// };

const updateNoteContentById = (noteId, noteContent, token) => {
	if (!noteContent) noteContent = '';
	const desiredNote = getNoteById_db(noteId);
	if (!desiredNote) return;
	const isAuthenticated = isTokenValid(desiredNote, token);
	if (!isAuthenticated) {
		// throw error
		return;
	}
	const updated = updateNoteContentById_db(noteId, noteContent);
	const { content, mostRecent } = updated;
	return { content, mostRecent, isAuthenticated };
};

const isTokenValid = (note, token) => {
	const { encryptedToken, iv } = note;
	const decryptedToken = decrypt(encryptedToken, iv);
	return decryptedToken === token;
};

const getUserTokenFromCookie = (noteId, notesTokensCookie) => {
	try {
		const decodedNotesTokensCookie = decodeCookieVal(notesTokensCookie);
		return JSON.parse(decodedNotesTokensCookie)[noteId];
	} catch (e) {}
};

const setNoteInEditingStatus = (noteId, token) => {
	const desiredNote = getNoteById_db(noteId);
	if (!desiredNote) return;
	const isAuthenticated = isTokenValid(desiredNote, token);
	if (!isAuthenticated) {
		// throw error
		return;
	}
	// set mostRecent to false
	const updated = updateNoteStatus_db(noteId);
	const { content, mostRecent } = updated;
	return { content, mostRecent, isAuthenticated };
};

const encodeCookieVal = cookieVal => Buffer.from(cookieVal).toString('base64');
const decodeCookieVal = cookieVal => Buffer.from(cookieVal, 'base64').toString('ascii');

module.exports = {
	createNote,
	getNote,
	updateNote,
	updateNoteContentById,
	getUserTokenFromCookie,
	setNoteInEditingStatus,
};
