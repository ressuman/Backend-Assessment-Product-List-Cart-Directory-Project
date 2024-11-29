import request from "supertest";
import server from "../server.js";
//import { connectDB, closeDB, clearDB } from "./setup.js";
import User from "../models/userModel.js";
import Cart from "../models/cartModel.js";
import generateToken from "../utils/createToken.js";

// beforeAll(async () => await connectDB());
// afterEach(async () => await clearDB());
// afterAll(async () => await closeDB());

describe("Cart Endpoints", () => {
  it("should fetch all items in the cart", async () => {
    const user = await User.create({
      username: "Test User",
      email: "testuser@example.com",
      password: "password123",
    });

    const token = generateToken({ userId: user._id });

    // Mock cart item
    await Cart.create({
      userId: user._id,
      items: [{ productId: "123", quantity: 2 }],
    });

    const res = await request(server)
      .get("/api/v1/cart/get-cart-items")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("items");
    expect(res.body.items[0].productId).toBe("123");
  });
});
