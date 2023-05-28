const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const fs = require("fs");
require("dotenv").config();

const app = express();
const upload = multer({ dest: "uploads/" });

// Error handling middleware
app.use((err, req, res, next) => {
	console.error(err);
	res.status(500).json({ error: "Internal Server Error" });
});

// Start the server
app.listen(3001, () => {
	console.log("Server started on port 3001");
});

// Connect to MongoDB
mongoose.connect(
	`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.vpid4.mongodb.net/?retryWrites=true&w=majority`,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	},
);

// Define the Image schema
const imageSchema = new mongoose.Schema({
	name: String,
	data: Buffer,
	contentType: String,
});

// Create the Image model
const Image = mongoose.model("Image", imageSchema);

// Define a route for image upload
app.post("/upload", upload.single("image"), async (req, res, next) => {
	try {
		// Access the uploaded file
		const imageFile = req.file;

		if (!imageFile) {
			return res.status(400).json({ error: "No file uploaded" });
		}

		// Read the image file
		const imageBuffer = await fs.promises.readFile(imageFile.path);

		// Create a new Image document
		const image = new Image({
			name: imageFile.originalname,
			data: imageBuffer,
			contentType: imageFile.mimetype,
		});

		// Save the image document to MongoDB
		await image.save();

		// Remove the temporary file
		await fs.promises.unlink(imageFile.path);

		res.json({
			message: "Image uploaded successfully",
			image: image,
		});
	} catch (error) {
		next(error);
	}
});

// Define a route for image download
app.get("/download/:id", async (req, res, next) => {
	try {
		// Get the image ID from the request parameters
		const imageId = req.params.id;

		// Find the image document by ID in MongoDB
		const image = await Image.findById(imageId);

		if (!image) {
			return res.status(404).json({ error: "Image not found" });
		}

		// Set the appropriate headers for the download
		res.set({
			"Content-Type": image.contentType,
			"Content-Disposition": `attachment; filename=${image.name}`,
		});

		// Send the image data as the response
		res.send(image.data);
	} catch (error) {
		next(error);
	}
});

app.get("/:id", async (req, res) => {
	try {
		const imageId = req.params.id;

		// Find the image by ID in MongoDB
		const image = await Image.findById(imageId);

		if (!image) {
			return res.status(404).json({ error: "Image not found" });
		}

		res.status(200).json(image);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal Server Error" });
	}
});

// Define a route to get an image by ID
app.get("/image/:id", async (req, res) => {
	try {
		const imageId = req.params.id;

		// Find the image by ID in MongoDB
		const image = await Image.findById(imageId);

		if (!image) {
			return res.status(404).json({ error: "Image not found" });
		}

		// Set the appropriate headers for the image
		res.set({
			"Content-Type": image.mimetype,
			"Content-Disposition": `inline; filename="${image.filename}"`,
		});

		// Send the image data as the response
		res.send(image.data);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal Server Error" });
	}
});
