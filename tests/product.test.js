import request from "supertest";
import mongoose from "mongoose";
import server from "../server.js";
import Product from "../models/productModel.js";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

beforeAll(async () => {
  await mongoose.connect(
    "mongodb+srv://ressuman001:yt3c28PlCN4t5jF8@backendassessment0.sve5r.mongodb.net/testdb"
  );
});

beforeEach(async () => {
  await Product.deleteMany({});
  await User.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Product Endpoints", () => {
  let adminToken, regularToken, productId, adminUser;

  beforeEach(async () => {
    adminUser = await User.create({
      username: `Admin-${Date.now()}`,
      email: `admin-${Date.now()}@test.com`,
      password: await bcrypt.hash("password123", 10),
      isAdmin: true,
    });

    const regularUser = await User.create({
      username: `User-${Date.now()}`,
      email: `user-${Date.now()}@test.com`,
      password: await bcrypt.hash("password123", 10),
    });

    adminToken = jwt.sign(
      { userId: adminUser._id, isAdmin: true },
      process.env.JWT_SECRET_KEY || "product-cart-shop"
    );
    regularToken = jwt.sign(
      { userId: regularUser._id, isAdmin: false },
      process.env.JWT_SECRET_KEY || "product-cart-shop"
    );

    const product = await Product.create({
      name: "Test Product",
      description: "Test Description",
      price: 100,
      category: "Electronics",
      quantity: 10,
      brand: "Test Brand",
      createdBy: adminUser._id,
    });
    productId = product._id.toString();
  });

  it("should add a new product (admin only)", async () => {
    const newProduct = {
      name: "New Product",
      description: "New Description",
      price: 200,
      category: "Accessories",
      quantity: 5,
      brand: "New Brand",
    };

    const adminRes = await request(server)
      .post("/api/v1/products/add-new-product")
      .set("Authorization", `Bearer ${adminToken}`)
      .send(newProduct);

    expect(adminRes.statusCode).toBe(201);
    expect(adminRes.body.product.name).toBe("New Product");

    const regularRes = await request(server)
      .post("/api/v1/products/add-new-product")
      .set("Authorization", `Bearer ${regularToken}`)
      .send(newProduct);

    expect(regularRes.statusCode).toBe(403);
  });

  it("should update product details (admin only)", async () => {
    const updates = {
      name: "Updated Product",
      description: "New description",
      price: 150,
      category: "Electronics",
      quantity: 15,
      brand: "Updated Brand",
    };

    const adminRes = await request(server)
      .put(`/api/v1/products/update-product/${productId}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send(updates);

    expect(adminRes.statusCode).toBe(200);
    expect(adminRes.body.product.price).toBe(150);

    const regularRes = await request(server)
      .put(`/api/v1/products/update-product/${productId}`)
      .set("Authorization", `Bearer ${regularToken}`)
      .send(updates);

    expect(regularRes.statusCode).toBe(403);
  });

  it("should fetch products with pagination", async () => {
    const products = Array.from({ length: 15 }, (_, i) => ({
      name: `Product ${i + 1}`,
      description: `Description ${i + 1}`,
      price: 100 + i,
      category: "Electronics",
      quantity: 10,
      brand: "Brand",
    }));

    await Product.insertMany(products);

    const res = await request(server).get(
      "/api/v1/products/some-products?page=2&limit=6"
    );

    expect(res.statusCode).toBe(200);
    expect(res.body.products.length).toBe(6);
    expect(res.body.hasMore).toBe(true);
  });

  it("should validate product fields", async () => {
    const invalidProduct = {
      name: "",
      price: -100,
      quantity: 0,
      category: "",
      brand: "",
      description: "",
    };

    const res = await request(server)
      .post("/api/v1/products/add-new-product")
      .set("Authorization", `Bearer ${adminToken}`)
      .send(invalidProduct);

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toEqual(
      expect.arrayContaining([
        "Name is required",
        "Brand is required",
        "Description is required",
        "Price must be greater than 0",
        "Category is required",
        "Quantity is required",
      ])
    );
  });
});
