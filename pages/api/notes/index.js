import { createNote, handleCookieWithToken } from '../../../lib/api/services/notes.service';
import { apiMiddleware } from '../../../lib/api/middleware';

const postHandler = async (req) => {
	if (req.method === 'POST') {
		const { content } = req.body;
		// validate

		const newNoteData = await createNote(content);
		// const finalCookie = handleCookieWithToken(
		// 	req.cookies.notesTokens,
		// 	newNoteData.id,
		// 	newNoteData.noteToken,
		// );
		// res.setHeader('Set-Cookie', finalCookie);
		// res.json({ id: newNoteData.id });
		return newNoteData
	} else {
		console.log('an error has occurred');
	}
};

export default apiMiddleware({ post: postHandler });
