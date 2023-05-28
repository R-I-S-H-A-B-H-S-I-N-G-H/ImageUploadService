const express = require("express");
const router = express.Router();
const imageService = require("../service/imageService");

const multer = require("multer");
const fs = require("fs");
const upload = multer({ dest: "uploads/" });

const Image = require("../modals/image");

router.get("/list", (req, res) => {
	console.log();
	imageService
		.getList(new Set(req.query?.expandable?.split(",")))
		.then((resp) => res.status(200).json(resp))
		.catch((err) => res.status(404).json(err));
});

router.post("/upload", upload.single("image"), async (req, res, next) => {
	// Access the uploaded file
	const imageFile = req.file;

	if (!req.query.id)
		return res.status(403).json({ error: "user id not present" });
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
		user: req.query.id,
	});

	try {
		const resp = await imageService.save({
			name: imageFile.originalname,
			data: imageBuffer,
			contentType: imageFile.mimetype,
			user: req.query.id,
		});
		fs.promises.unlink(imageFile.path);
		res.status(201).json(resp);
	} catch (error) {
		fs.promises.unlink(imageFile.path);
		res.status(400).json(error);
	}
});

router.get("/:id", async (req, res) => {
	const result = await imageService.get(req.params.id);
	if (result.error) res.status(404).json(result.error);
	res.status(200).json(result.data);
});

router.get("/view/:id", async (req, res) => {
	const response = await imageService.get(req.params.id);
	if (response.error || !response.data) return res.status(500).json(response);
	const image = response.data;

	res.set({
		"Content-Type": image.contentType,
		"Content-Disposition": `inline; filename="${image.filename}"`,
	});

	// Send the image data as the response
	res.send(image.data);
});

module.exports = router;
