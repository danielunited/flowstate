/*
  Updated db.js to use Cloudflare KV instead of MongoDB
*/

// Export functions for note operations using Cloudflare KV
module.exports = {
	getNotes,
	getNote,
	saveNote,
	deleteNote,
};

// Retrieve all notes from Cloudflare KV
async function getNotes() {
	if (typeof NOTES_KV === 'undefined') {
		throw new Error('Cloudflare KV binding (NOTES_KV) is not configured.');
	}
	const { keys } = await NOTES_KV.list({ prefix: 'note:' });
	const notes = await Promise.all(
		keys.map(async key => {
			const value = await NOTES_KV.get(key.name);
			return JSON.parse(value);
		}),
	);
	return notes;
}

// Retrieve a single note by id
async function getNote(id) {
	if (typeof NOTES_KV === 'undefined') {
		throw new Error('Cloudflare KV binding (NOTES_KV) is not configured.');
	}
	const value = await NOTES_KV.get(`note:${id}`);
	if (!value) return null;
	return JSON.parse(value);
}

// Save a note. Generates a new id using Date.now() if not provided.
async function saveNote(note) {
	if (typeof NOTES_KV === 'undefined') {
		throw new Error('Cloudflare KV binding (NOTES_KV) is not configured.');
	}
	if (!note.id) {
		note.id = Date.now().toString();
	}
	await NOTES_KV.put(`note:${note.id}`, JSON.stringify(note));
	return note;
}

// Delete a note by id
async function deleteNote(id) {
	if (typeof NOTES_KV === 'undefined') {
		throw new Error('Cloudflare KV binding (NOTES_KV) is not configured.');
	}
	await NOTES_KV.delete(`note:${id}`);
	return true;
}
