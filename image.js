const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
	imageData: { type: Buffer, required: true },
	name: String,
	path: String,
});

const Image = mongoose.model("Image", imageSchema);

module.exports = Image;
