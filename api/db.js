const { nanoid } = require('nanoid');
const { MongoClient } = require('mongodb');

const MONGO_CONNECTION_URL = process.env.MONGO_CONNECTION_URL;

const dbName = 'flowstate';

export class dbClient {
	constructor() {
		this.client = new MongoClient(MONGO_CONNECTION_URL);
		this.client.connect();
		this.db = this.client.db(dbName);
		this.notesCollection = this.db.collection('notes');
	}

	createNote = text => {
		const _id = nanoid();
		const editKey = nanoid();

		return this.notesCollection.insertOne({ _id, editKey, text }).then(res => {
			if (res.acknowledged) {
				return { id: _id, editKey };
			}
			throw new Error(`Error inserting note: ${text}`);
		});
	};

	getNote = _id => this.notesCollection.findOne({ _id });

	updateNote = (_id, text) => this.notesCollection.updateOne({ _id }, { $set: { text } });

	close = () => this.client.close();
}