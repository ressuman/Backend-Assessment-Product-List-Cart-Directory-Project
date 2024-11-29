import request from "supertest";
import server from "../server.js"; // Import Express server
//import { connectDB, closeDB, clearDB } from "./setup.js";
import Product from "../models/productModel.js";

// beforeAll(async () => await connectDB());
// afterEach(async () => await clearDB());
// afterAll(async () => await closeDB());

describe("Product Endpoints", () => {
  it("should fetch all products", async () => {
    // Arrange
    await Product.create({
      name: "Test Product",
      price: 100,
      category: "Electronics",
      brand: "Test Brand",
      quantity: 10,
    });

    // Act
    const res = await request(server).get("/api/v1/products/all-products");

    // Assert
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("products");
    expect(res.body.products.length).toBeGreaterThan(0);
    expect(res.body.products[0].name).toBe("Test Product");
  });

  it("should add a new product", async () => {
    // Mock Admin Authorization
    const mockAdminUser = {
      _id: new mongoose.Types.ObjectId(),
      isAdmin: true,
    };
    const token = jwt.sign(
      { userId: mockAdminUser._id },
      process.env.JWT_SECRET_KEY || "product-cart-shop"
    );

    // Arrange
    const newProduct = {
      name: "New Product",
      description: "A great product",
      price: 200,
      category: "Accessories",
      quantity: 5,
      brand: "Top Brand",
    };

    // Act
    const res = await request(server)
      .post("/api/v1/products/add-new-product")
      .set("Authorization", `Bearer ${token}`)
      .send(newProduct);

    // Assert
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("success", true);
    expect(res.body.product).toMatchObject(newProduct);
  });
});
