import { createNote } from "../../../lib/api/notes/service";

export default function handler(req, res) {
	if (req.method === 'POST') {
		const newNote = req.body;
		console.log("-> newNote", newNote);
		// validate

		createNote(newNote);
		res.json({hello: true})
	} else {
		console.log('an error has occurred')
	}
}
