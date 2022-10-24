import {
	getUserTokenFromCookie,
	setNoteInEditingStatus,
	updateNote,
	updateNoteContentById,
} from '../../../lib/api/services/notes.service';
import { apiMiddleware } from '../../../lib/api/middleware';
import { extractCookie } from '../../../lib/utils/auth';

function handler(req, res) {
	if (req.method === 'PATCH') {
		const { noteId, setInEditMode } = req.query;
		const { content } = req.body;
		const { notesTokens } = req.cookies;
		const token = getUserTokenFromCookie(noteId, notesTokens);
		if (!token) {
			return res.status(401).end();
		}
		if (setInEditMode) {
			setNoteInEditingStatus(noteId, token);
		} else {
			const updated = updateNoteContentById(noteId, content, token);
			res.json({ note: updated });
		}
	} else {
		console.log('an error has occurred');
	}
}

const patchHandler = async (req, res) => {
	const { noteId, setInEditMode } = req.query;
	const { content } = req.body;
	const { token } = req.cookies;
	if (!noteId || !content) {
		throw new Error('Invalid data');
	}
	const userData = extractCookie(token);
	console.log("-> userData", userData);
	const updatedNote = await updateNote(noteId, content, userData);
	return updatedNote;
};

export default apiMiddleware({ patch: patchHandler });
