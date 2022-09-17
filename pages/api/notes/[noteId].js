import {
	getUserTokenFromCookie, setNoteInEditingStatus,
	updateNoteContentById
} from "../../../lib/api/services/notes.service";

export default function handler(req, res) {
	if (req.method === 'PATCH') {
		const { noteId, setInEditMode } = req.query;
		const { content } = req.body;
		const { notesTokens } = req.cookies;
		const token = getUserTokenFromCookie(noteId, notesTokens);
		if (!token) {
			return res.status(401).end();
		}
		if (setInEditMode) {
			setNoteInEditingStatus(noteId, token)
		} else {
			const updated = updateNoteContentById(noteId, content, token);
			res.json({ note: updated });
		}
	} else {
		console.log('an error has occurred');
	}
}
