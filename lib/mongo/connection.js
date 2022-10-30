const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost';

const connectionOptions = {
	dbName: 'flowstate',
};

const handleMongoConnection = async () => {
	try {
		if (!mongoose.connection.readyState) {
			await mongoose.connect(MONGODB_URI, connectionOptions);
		}
	} catch (e) {
		// TODO throw 500 internal server error
	}
};

module.exports = { handleMongoConnection };
