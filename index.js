const express = require("express");
const mongoose = require("mongoose");
const userController = require("./Routes/userController");
const imageController = require("./Routes/imageController");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 3001;

app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true }));

// Start the server
app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
});

// Connect to MongoDB
mongoose.connect(
	`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.vpid4.mongodb.net/?retryWrites=true&w=majority`,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	},
);

app.use("/user", userController);
app.use("/image", imageController);
// Error handling middleware
app.use((err, req, res, next) => {
	console.error(err);
	res.status(500).json({ error: "Internal Server Error" });
});
