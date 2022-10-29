const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
	content: {
		type: String,
		required: true,
	},
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
