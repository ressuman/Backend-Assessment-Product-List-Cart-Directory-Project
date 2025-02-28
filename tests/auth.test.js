// import request from "supertest";
// import server from "../server.js";
// //import { connectDB, closeDB, clearDB } from "./setup.js";
// import User from "../models/userModel.js";

// // beforeAll(async () => await connectDB());
// // afterEach(async () => await clearDB());
// // afterAll(async () => await closeDB());

// describe("Auth Endpoints", () => {
//   it("should sign up a user", async () => {
//     const res = await request(server).post("/api/v1/auth/signup").send({
//       username: "Test User 2",
//       email: "testuser@example.com",
//       password: "password123",
//     });

//     // Check response
//     expect(res.statusCode).toBe(201);
//     expect(res.body).toHaveProperty("message", "User created successfully.");
//     expect(res.body.user).toMatchObject({
//       username: "TestUser",
//       email: "testuser@example.com",
//       isAdmin: false,
//     });

//     // Verify user in the database
//     const user = await User.findOne({ email: "testuser@example.com" });
//     expect(user).not.toBeNull();
//     expect(user.username).toBe("TestUser");
//   });
// });

// auth.test.js
import request from "supertest";
import mongoose from "mongoose";
import server from "../server.js";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

// Test database connection
beforeAll(async () => {
  await mongoose.connect(
    "mongodb+srv://ressuman001:yt3c28PlCN4t5jF8@backendassessment0.sve5r.mongodb.net/testdb"
  );
});

// Clean up database between tests
beforeEach(async () => {
  await User.deleteMany({});
});

// Close database connection after all tests
afterAll(async () => {
  await mongoose.connection.close();
});

describe("Auth Endpoints", () => {
  let authToken;

  // Signup Test
  it("should sign up a new user", async () => {
    const res = await request(server).post("/api/v1/auth/signup").send({
      username: "TestUser",
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

    // Verify user in database
    const user = await User.findOne({ email: "testuser@example.com" });
    expect(user).toBeTruthy();
    expect(user.username).toBe("TestUser");
    expect(user.isAdmin).toBe(false);
  });

  // Login Test
  it("should login an existing user and return token", async () => {
    // First create a test user
    await request(server).post("/api/v1/auth/signup").send({
      username: "TestUser",
      email: "testuser@example.com",
      password: "password123",
    });

    // Attempt login
    const res = await request(server).post("/api/v1/auth/login").send({
      email: "testuser@example.com",
      password: "password123",
    });

    // Store token for logout test
    authToken = res.body.token;

    // Check response
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message", "Login successful.");
    expect(res.body).toHaveProperty("token");
    expect(res.body.user).toMatchObject({
      username: "TestUser",
      email: "testuser@example.com",
      isAdmin: false,
    });

    // Verify token validity
    const decoded = jwt.verify(
      res.body.token,
      process.env.JWT_SECRET_KEY || "test-secret-key"
    );
    expect(decoded).toHaveProperty("userId");
  });

  // Invalid Login Test
  it("should reject login with invalid credentials", async () => {
    const res = await request(server).post("/api/v1/auth/login").send({
      email: "wrong@example.com",
      password: "wrongpassword",
    });

    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty("message", "User not found.");
  });

  // Logout Test
  it("should logout user and clear cookie", async () => {
    // First login to get token
    await request(server).post("/api/v1/auth/signup").send({
      username: "TestUser",
      email: "testuser@example.com",
      password: "password123",
    });

    const loginRes = await request(server).post("/api/v1/auth/login").send({
      email: "testuser@example.com",
      password: "password123",
    });

    // Perform logout
    const res = await request(server)
      .post("/api/v1/auth/logout")
      .set("Authorization", `Bearer ${loginRes.body.token}`)
      .set("Cookie", [`jwt=${loginRes.body.token}`]);

    // Check response
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message", "Logged out successfully.");

    // Check if cookie is cleared
    const cookie = res.headers["set-cookie"][0];
    expect(cookie).toMatch(/jwt=;/);
    expect(cookie).toMatch(/Expires=Thu, 01 Jan 1970 00:00:00 GMT/);
  });

  // Duplicate Signup Test
  it("should prevent duplicate user signup", async () => {
    // First successful signup
    await request(server).post("/api/v1/auth/signup").send({
      username: "TestUser",
      email: "testuser@example.com",
      password: "password123",
    });

    // Attempt duplicate signup
    const res = await request(server).post("/api/v1/auth/signup").send({
      username: "TestUser",
      email: "testuser@example.com",
      password: "password123",
    });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("message", "User already exists.");
  });
});
