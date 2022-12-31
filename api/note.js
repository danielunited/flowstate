import { dbClient } from "./db";

export default async function note(req, res) {
	if (req.method !== "POST" || !req.body.text) {
		res.status(400).send();
		return;
	}

	const { text } = req.body;

	const db = new dbClient();
	const note = await db.createNote(text);
	db.close();

	res.status(200).json(note).send();
}
