const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product");
const { popularProducts } = require("./data");

dotenv.config();

const MONGO_URL = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/ecom";

// Connect to MongoDB
mongoose
	.connect(MONGO_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log("✅ MongoDB Connected");
	})
	.catch((err) => {
		console.error("❌ MongoDB Connection Error:", err);
	});

// Seed Function
const seedProducts = async () => {
	try {
		await Product.deleteMany(); // optional: clear previous data
		await Product.insertMany(popularProducts);
		console.log("✅ Data seeded successfully!");
		process.exit(); // exit after completion
	} catch (error) {
		console.error("❌ Error seeding data:", error);
		process.exit(1);
	}
};

seedProducts();
