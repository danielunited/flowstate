const { Note } = require('../../mongo/models');

const fs = require('fs');
import path from 'path';

const notesDb = {
	insert: async noteData => {
		const note = await Note.create(noteData);
		return note;
	},
	getById: async noteId => {
		console.log(noteId);
		return Note.findById(noteId);
	},
	update: async (noteId, noteContent) => {
		const note = await notesDb.getById(noteId);
		note.content = noteContent;
		await note.save();
		return note;
	},
};

module.exports = { notesDb };

const jsonDirectory = path.join(process.cwd(), 'lib', 'dummyData');
const notesFilePath = jsonDirectory + '/data.json';

const getAllNotes_db = () => {
	return JSON.parse(fs.readFileSync(notesFilePath, 'utf-8'));
};

const getNoteById_db = (noteId, notes) => {
	if (notes) {
		return notes[noteId];
	} else {
		notes = getAllNotes_db();
		return notes[noteId];
	}
};

const saveNote_db = note => {
	if (!note.id) return;
	const notes = getAllNotes_db();
	notes[note.id] = note;
	fs.writeFileSync(notesFilePath, JSON.stringify(notes, null, 4));
	return true;
};

const updateNoteContentById_db = (noteId, noteContent) => {
	const notes = getAllNotes_db();
	const desiredNote = notes[noteId];
	desiredNote.content = noteContent;
	desiredNote.mostRecent = true;
	fs.writeFileSync(notesFilePath, JSON.stringify(notes, null, 4));
	return desiredNote;
};

// const updateNote_db = (updatedNote) => {
// 	const notes = getAllNotes_db();
// 	const desiredNote = notes[updatedNote.id];
// 	if (!desiredNote) return;
// 	Object.assign(desiredNote, updatedNote);
// 	fs.writeFileSync(notesFilePath, JSON.stringify(notes, null, 4));
// 	return desiredNote;
// }

const updateNoteStatus_db = noteId => {
	const notes = getAllNotes_db();
	const desiredNote = notes[noteId];
	desiredNote.mostRecent = false;
	fs.writeFileSync(notesFilePath, JSON.stringify(notes, null, 4));
	return desiredNote;
};

// module.exports = {
// 	saveNote_db,
// 	getNoteById_db,
// 	updateNoteContentById_db,
// 	updateNoteStatus_db,
// };
