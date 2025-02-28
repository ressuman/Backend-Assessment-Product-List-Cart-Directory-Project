import request from "supertest";
import mongoose from "mongoose";
import server from "../server.js";
import User from "../models/userModel.js";
import Product from "../models/productModel.js";
import Cart from "../models/cartModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

beforeAll(async () => {
  await mongoose.connect(
    "mongodb+srv://ressuman001:yt3c28PlCN4t5jF8@backendassessment0.sve5r.mongodb.net/testdb"
  );
});

beforeEach(async () => {
  await User.deleteMany({});
  await Product.deleteMany({});
  await Cart.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Cart Endpoints", () => {
  let userToken, productId, userId;

  beforeEach(async () => {
    const user = await User.create({
      username: `User-${Date.now()}`,
      email: `user-${Date.now()}@test.com`,
      password: await bcrypt.hash("password123", 10),
    });
    userId = user._id;

    const product = await Product.create({
      name: "Test Product",
      description: "Test Description",
      price: 100,
      category: "Electronics",
      quantity: 10,
      brand: "Test Brand",
    });
    productId = product._id.toString();

    userToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET_KEY || "product-cart-shop"
    );
  });

  it("should add item to cart", async () => {
    const res = await request(server)
      .post("/api/v1/cart/add-items-to-cart")
      .set("Authorization", `Bearer ${userToken}`)
      .send({ productId, quantity: 2 });

    expect(res.statusCode).toBe(201);
    expect(res.body.cart.items).toHaveLength(1);
    expect(res.body.cart.items[0].quantity).toBe(2);
  });

  it("should get cart items", async () => {
    const cart = await Cart.create({
      userId,
      items: [{ productId, quantity: 3 }],
    });

    const res = await request(server)
      .get("/api/v1/cart/get-cart-items")
      .set("Authorization", `Bearer ${userToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.cart.items).toHaveLength(1);
    expect(res.body.count).toBe(3);
  });

  it("should update cart item quantity", async () => {
    const cart = await Cart.create({
      userId,
      items: [{ productId, quantity: 2 }],
    });
    const itemId = cart.items[0]._id.toString();

    const res = await request(server)
      .put(`/api/v1/cart/cart-items/${itemId}`)
      .set("Authorization", `Bearer ${userToken}`)
      .send({ quantity: 5 });

    expect(res.statusCode).toBe(200);
    expect(res.body.cart.items[0].quantity).toBe(5);
  });

  it("should remove item from cart", async () => {
    const cart = await Cart.create({
      userId,
      items: [{ productId, quantity: 1 }],
    });

    // Get the item ID as a string
    const itemId = cart.items[0]._id.toString();

    const res = await request(server)
      .delete(`/api/v1/cart/cart-item/${itemId}`)
      .set("Authorization", `Bearer ${userToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.cart.items).toHaveLength(0);
  });

  it("should validate cart operations", async () => {
    // Test invalid product ID
    const invalidRes = await request(server)
      .post("/api/v1/cart/add-items-to-cart")
      .set("Authorization", `Bearer ${userToken}`)
      .send({ productId: "invalidid", quantity: 1 });

    expect(invalidRes.statusCode).toBe(404);

    // Test negative quantity
    const negativeRes = await request(server)
      .post("/api/v1/cart/add-items-to-cart")
      .set("Authorization", `Bearer ${userToken}`)
      .send({ productId, quantity: -1 });

    expect(negativeRes.statusCode).toBe(400);
  });
});
