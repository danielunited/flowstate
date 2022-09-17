const fs = require('fs');
import path from 'path';

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

module.exports = {
	saveNote_db,
	getNoteById_db
};
