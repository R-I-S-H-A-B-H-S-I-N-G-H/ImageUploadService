const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
	data: { type: Buffer, required: true },
	name: String,
	path: String,
	contentType: String,
	createdAt: {
		type: Date,
		immutable: true,
		default: () => Date.now(),
	},
	updatedAt: {
		type: Date,
		default: () => Date.now(),
	},
	user: {
		type: mongoose.SchemaTypes.ObjectId,
		required: true,
	},
});

const Image = mongoose.model("Image", imageSchema);

module.exports = Image;
