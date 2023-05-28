const mongoose = require("mongoose");

const MONGODB_URI =
	"mongodb+srv://imagetest:imagetest@cluster0.vpid4.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(MONGODB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	serverSelectionTimeoutMS: 30000,
});

// mongoose.connection.on("connected", () => {
// 	console.log("Connected to MongoDB");
// });

// mongoose.connection.on("error", (err) => {
// 	console.error("Failed to connect to MongoDB", err);
// });
