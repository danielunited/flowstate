const mongoose = require('mongoose');

const MONGODB_URI = process.env.DB_HOST || 'mongodb://localhost';
const connectionOptions = {
	dbName: 'flowstate',
};

if (process.env.NODE_ENV === 'development') {
	connectionOptions.user = 'flowstate-user';
	connectionOptions.pass = process.env.DB_PASSWORD;
}

const handleMongoConnection = async () => {
	try {
		if (!mongoose.connection.readyState) {
			console.log(connectionOptions)
			await mongoose.connect(MONGODB_URI, connectionOptions);
		}
	} catch (e) {
		// TODO throw 500 internal server error
	}
};

module.exports = { handleMongoConnection };
