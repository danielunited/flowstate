const crypto = require("crypto")

const createNote = (note) => {
	// after validation
	if (!note) {
		throw error("xxxx")
	}
	// generate hash + salt + unique id
	const uuid = crypto.randomUUID()
	console.log("-> uuid", uuid);

	// create note
	const timestamp = Date.now();
	console.log("-> timestamp", timestamp);


};

module.exports = {
	createNote,
};
