// import request from "supertest";
// import server from "../server.js"; // Import Express server
// import Product from "../models/productModel.js";
// import mongoose from "mongoose";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import dotenv from "dotenv";
// import User from "../models/userModel.js";
// import createToken from "../utils/createToken.js";
// dotenv.config(); // Load environment variables
// //import { connectDB, closeDB, clearDB } from "./setup.js";

// // beforeAll(async () => await connectDB());
// // afterEach(async () => await clearDB());
// // afterAll(async () => await closeDB());

// describe("Product Endpoints", () => {
//   it("should fetch all products", async () => {
//     // Arrange
//     await Product.create({
//       name: "Test Product",
//       price: 100,
//       category: "Electronics",
//       brand: "Test Brand",
//       quantity: 10,
//       description: "Test description",
//     });

//     // Act
//     const res = await request(server).get("/api/v1/products/all-products");

//     // Assert
//     expect(res.status).toBe(200);
//     expect(res.body.products).toHaveLength(1);
//     expect(res.body.products[0].name).toBe("Test Product");
//     // expect(res.statusCode).toBe(200);
//     // expect(res.body).toHaveProperty("products");
//     // expect(res.body.products.length).toBeGreaterThan(0);
//     // expect(res.body.products[0].name).toBe("Test Product");
//   });

//   it("should add a new product", async (req, res) => {
//     // Mock Admin Authorization
//     // const mockAdminUser = {
//     //   _id: new mongoose.Types.ObjectId(),
//     //   isAdmin: true,
//     // };
//     // const token = jwt.sign(
//     //   { userId: mockAdminUser._id, isAdmin: true },
//     //   process.env.JWT_SECRET_KEY || "default-secret-key"
//     // );

//     // Check if user exists
//     const existingUser = await User.findOne({ email: "mark@email.com" });
//     if (!existingUser) {
//       res.status(404).json({ message: "User not found." });
//       return;
//     }

//     // Validate password
//     const isPasswordValid = await bcrypt.compare(
//       "0123456",
//       existingUser.password
//     );
//     if (!isPasswordValid) {
//       res.status(401).json({ message: "Invalid email or password." });
//       return;
//     }

//     // Generate token
//     const token = createToken(res, existingUser._id);

//     // Arrange
//     const newProduct = {
//       name: "New Product",
//       description: "A great product",
//       price: 200,
//       category: "Accessories",
//       quantity: 5,
//       brand: "Top Brand",
//     };

//     // Act
//     const response = await request(server)
//       .post("/api/v1/products/add-new-product")
//       .set("Authorization", `Bearer ${token}`)
//       .set("Cookie", `jwt=${token}`)
//       .send(newProduct);

//     // Assert
//     expect(response.statusCode).toBe(201);
//     expect(res.body).toHaveProperty("product._id");
//     // expect(response.body).toHaveProperty("success", true);
//     expect(response.body.product).toMatchObject(newProduct);
//   });
// });
