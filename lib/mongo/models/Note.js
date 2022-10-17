const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
	content: {
		type: String,
		required: true,
	},
	iv: {
		type: String,
		required: true,
	},
	encryptedToken: {
		type: String,
		required: true,
	},
	mostRecent: Boolean, // TODO choose mostRecent vs inProgress (probably inProgress)
	inProgress: {
		type: Boolean,
		default: false
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

noteSchema.pre('save', function (next) {
	this.updatedAt = Date.now();
	next();
});

module.exports = mongoose.models.Note || mongoose.model('Note', noteSchema);
