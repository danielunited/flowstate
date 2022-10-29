const { Note } = require('../../mongo/models');

const notesDb = {
	insert: async noteData => {
		const note = await Note.create(noteData);
		return note;
	},
	getById: async noteId => {
		return Note.findById(noteId);
	},
	update: async (noteId, fieldsToUpdate) => {
		const note = await notesDb.getById(noteId);
		Object.assign(note, fieldsToUpdate);
		await note.save();
		return note;
	},
};

module.exports = { notesDb };
