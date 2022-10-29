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
		const { noteId, inProgress } = req.query;
		const { content } = req.body;
		const { notesTokens } = req.cookies;
		const token = getUserTokenFromCookie(noteId, notesTokens);
		if (!token) {
			return res.status(401).end();
		}
		if (inProgress) {
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
	const { noteId, inProgress } = req.query;
	const { content } = req.body;
	const { token } = req.cookies;
	if (!noteId) {
		throw new Error('Invalid data');
	}
	const userData = extractCookie(token);
	if (!userData) throw new Error('Unauthenticated');
	const fieldsToUpdate = {};
	if (inProgress) {
		fieldsToUpdate.inProgress = true;
	} else {
		fieldsToUpdate.content = content;
		fieldsToUpdate.inProgress = false;
	}
	const updatedNote = await updateNote(noteId, fieldsToUpdate, userData);
	return updatedNote;
};

export default apiMiddleware({ patch: patchHandler });
