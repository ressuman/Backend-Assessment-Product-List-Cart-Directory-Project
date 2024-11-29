import request from "supertest";
import server from "../server.js";
//import { connectDB, closeDB, clearDB } from "./setup.js";
import User from "../models/userModel.js";

// beforeAll(async () => await connectDB());
// afterEach(async () => await clearDB());
// afterAll(async () => await closeDB());

describe("Auth Endpoints", () => {
  it("should sign up a user", async () => {
    const res = await request(server).post("/api/v1/auth/signup").send({
      username: "Test User",
      email: "testuser@example.com",
      password: "password123",
    });

    // Check response
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("message", "User created successfully.");
    expect(res.body.user).toMatchObject({
      username: "TestUser",
      email: "testuser@example.com",
      isAdmin: false,
    });

    // Verify user in the database
    const user = await User.findOne({ email: "testuser@example.com" });
    expect(user).not.toBeNull();
    expect(user.username).toBe("TestUser");
  });
});
