import { dbClient } from "../db";

export default async function note(req, res) {
	switch (req.method) {
		case "GET": {
			const { id } = req.query;

			if (id == null) {
				res.status(400).send();
				return;
			}

			const db = new dbClient();
			const note = await db.getNote(id);
			db.close();

			if (note == null) {
				res.status(400).send();
				return;
			}

			res.json({ id, text: note.text }).send();
			break;
		}
		case "POST": {
			const { id } = req.query;
			const { editKey, text } = req.body;

			const db = new dbClient();

			const note = await db.getNote(id);

			if (note == null || note.editKey !== editKey) {
				res.status(400).send();
				return;
			}

			await db.updateNote(id, text);
			db.close();

			res.status(200).send();
			break;
		}
		default:
			res.status(400).send();
	}
}
