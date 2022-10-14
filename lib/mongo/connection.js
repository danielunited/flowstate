const mongoose = require('mongoose');

const mongodb_url = process.env.MONGODB_URL || 'mongodb://localhost/flowstate';

const handleMongoConnection = () => {
	if (!mongoose.connections[0].readyState) {
		// if not ready initialize a new mongo connection
		return mongoose.connect(mongodb_url);
	}
};

module.exports = { handleMongoConnection };
