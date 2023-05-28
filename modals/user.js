const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	name: String,
	createdAt: {
		type: Date,
		immutable: true,
		default: () => Date.now(),
	},
	updatedAt: {
		type: Date,
		default: () => Date.now(),
	},
	images: [String],
});

const User = mongoose.model("user", userSchema);

module.exports = User;
