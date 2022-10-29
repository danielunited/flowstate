const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	iv: {
		type: String,
		required: true,
	},
	encryptedToken: {
		type: String,
		required: true,
	},
	notes: {
		type: [mongoose.SchemaTypes.ObjectId],
		default: [],
	},
	createdAt: {
		type: Date,
		default: () => Date.now(),
		immutable: true,
	},
	updatedAt: {
		type: Date,
		default: () => Date.now(),
	},
});

userSchema.pre('save', function (next) {
	this.updatedAt = Date.now();
	next();
});

module.exports = mongoose.models.User || mongoose.model('User', userSchema);
