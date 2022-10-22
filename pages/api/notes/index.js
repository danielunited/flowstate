import { createNote } from '../../../lib/api/services/notes.service';
import { apiMiddleware } from '../../../lib/api/middleware';
import {
	extractCookie,
	handleCookieWithToken,
} from '../../../lib/utils/auth';
import { handleUserAfterNoteCreation } from '../../../lib/api/services/user.service';

const postHandler = async (req, res) => {
	if (req.method === 'POST') {
		const { content } = req.body;
		const { token } = req.cookies;
		const newNote = await createNote(content);
		const userData = extractCookie(token);
		const user = await handleUserAfterNoteCreation(newNote._id, userData);
		const { userId, accessToken } = user;
		const finalCookie = handleCookieWithToken(userId, accessToken);
		res.setHeader('Set-Cookie', finalCookie);
		return newNote;
	} else {
		console.log('an error has occurred');
	}
};

export default apiMiddleware({ post: postHandler });
