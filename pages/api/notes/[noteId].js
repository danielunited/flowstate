import { updateNote } from '../../../lib/api/services/notes.service';
import { apiMiddleware } from '../../../lib/api/middleware';
import { extractCookie, handleCookieWithToken } from '../../../lib/utils/auth';

const patchHandler = async (req, res) => {
	const { noteId, inProgress } = req.query;
	const { content } = req.body;
	const { token } = req.cookies;
	if (!noteId) {
		throw new Error('Invalid data');
	}
	const userData = extractCookie(token);
	if (!userData.userId) throw new Error('Unauthenticated');
	const fieldsToUpdate = {};
	if (inProgress) {
		fieldsToUpdate.inProgress = true;
	} else {
		fieldsToUpdate.content = content;
		fieldsToUpdate.inProgress = false;
	}
	const updatedNote = await updateNote(noteId, fieldsToUpdate, userData);
	const finalCookie = handleCookieWithToken(userData.userId, userData.accessToken);
	res.setHeader('Set-Cookie', finalCookie);
	return updatedNote;
};

export default apiMiddleware({ patch: patchHandler });
