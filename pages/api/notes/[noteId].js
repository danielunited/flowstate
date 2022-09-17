import {
	getUserTokenFromCookie,
	updateNoteContentById,
} from '../../../lib/api/services/notes.service';

export default function handler(req, res) {
	if (req.method === 'PATCH') {
		const { noteId } = req.query;
		const { content } = req.body;
		const { notesTokens } = req.cookies;
		const token = getUserTokenFromCookie(noteId, notesTokens);
		if (!token) {
			return res.status(401).end();
		}
		const updated = updateNoteContentById(noteId, content, token);
		res.json({ note: updated });
	} else {
		console.log('an error has occurred');
	}
}
