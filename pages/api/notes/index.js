import { createNote } from '../../../lib/api/notes/service';

export default function handler(req, res) {
	if (req.method === 'POST') {
		const { content } = req.body;
		// validate

		const newNote = createNote(content);

		res.json({ note: newNote });
	} else {
		console.log('an error has occurred');
	}
}
