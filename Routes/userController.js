const express = require("express");
const router = express.Router();
const userService = require("../service/userService");

router.get("/list", (req, res) => {
	console.log("DLDKLN");
	userService
		.getList()
		.then((resp) => res.status(200).json(resp))
		.catch((err) => res.status(404).json(err));
});

router.get("/:id", (req, res) => {
	userService
		.get(req.params.id)
		.then((resp) => res.status(200).json(resp))
		.catch((err) => res.status(404).json(err));
});

router.post("/", (req, res) => {
	console.log(req.body);
	userService
		.save(req.body)
		.then((resp) => res.status(200).json(resp))
		.catch((err) => res.status(500).json(err));
});

module.exports = router;
