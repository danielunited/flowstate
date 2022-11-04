import { validateAccessTokenAndGetUser } from '../../utils/auth';

const { notesDb } = require('../dal/notes.dal');

const getNote = async noteId => await notesDb.getById(noteId);

const getNoteAndAuthenticateUser = async (noteId, userId, accessToken) => {
	const note = await getNote(noteId);
	const user = await validateAccessTokenAndGetUser(userId, accessToken);
	const isAuthenticated = !!user;
	return { note, isAuthenticated };
};

const createNote = async noteContent => {
	const note = await notesDb.insert({
		content: noteContent,
	});
	return note;
};

const updateNote = async (noteId, fieldsToUpdate, userData) => {
	const user = await validateAccessTokenAndGetUser(userData.userId, userData.accessToken);
	if (!user) throw new Error('Unauthenticated');
	if (!user.notes.includes(noteId)) throw new Error('Unauthenticated');
	const updatedNote = await notesDb.update(noteId, fieldsToUpdate);
	return updatedNote;
};

module.exports = {
	createNote,
	getNote,
	updateNote,
	getNoteAndAuthenticateUser,
};
