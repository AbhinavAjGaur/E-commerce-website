const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product");
const User = require("./models/User");
const products = require("./data/product");

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI);

// Function to seed the data
const seedData = async () => {
  try {
    // Clear previous data
    await Product.deleteMany();
    await User.deleteMany();

    // Create admin user
    const createdUser = await User.create({
      name: "Admin User",
      email: "Admin@example.com",
      password: "123456",
      role: "admin",
    });

    // Assign the default user id to each product
    const userID = createdUser._id;

    const sampleProducts = products.map((product) => {
      return { ...product, user: userID };
    });

    // Insert sample products into the database
    await Product.insertMany(sampleProducts);

    console.log("Data seeded sucessfully!");
    process.exit();
  } catch (error) {
    console.error("Error seeding the data", error);
    process.exit(1);
  }
};

seedData();