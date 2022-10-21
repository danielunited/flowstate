import { createNote, handleCookieWithToken } from '../../../lib/api/services/notes.service';
import { apiMiddleware } from '../../../lib/api/middleware';
import { extractCookie, validateAccessTokenAndGetUser } from '../../../lib/utils/auth';

const postHandler = async req => {
	if (req.method === 'POST') {
		const { content } = req.body;
		const { token } = req.cookies;
		const userData = extractCookie(token);
		const newNote = await createNote(userData, content);

		// const finalCookie = handleCookieWithToken(
		// 	req.cookies.notesTokens,
		// 	newNoteData.id,
		// 	newNoteData.noteToken,
		// );
		// res.setHeader('Set-Cookie', finalCookie);
		// res.json({ id: newNoteData.id });
		return newNote;
	} else {
		console.log('an error has occurred');
	}
};

export default apiMiddleware({ post: postHandler });
