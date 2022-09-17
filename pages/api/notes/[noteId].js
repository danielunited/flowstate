// import { createNote, handleCookieWithToken } from '../../../lib/api/services/notes.service';
//
// export default function handler(req, res) {
// 	if (req.method === 'PATCH') {
// 		const { content } = req.body;
// 		// validate
//
// 		const newNoteData = createNote(content);
// 		const finalCookie = handleCookieWithToken(
// 			req.cookies.notesTokens,
// 			newNoteData.id,
// 			newNoteData.noteToken,
// 		);
// 		res.setHeader('Set-Cookie', finalCookie);
// 		res.json({ id: newNoteData.id });
// 	} else {
// 		console.log('an error has occurred');
// 	}
// }
