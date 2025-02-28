import request from "supertest";
import mongoose from "mongoose";
import server from "../server.js";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

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

afterAll(async () => {
  await mongoose.connection.close();
});

describe("User Endpoints", () => {
  let adminToken, regularToken;

  // Create test users before each test
  beforeEach(async () => {
    // Create admin user
    const adminUser = await User.create({
      username: `AdminUser-${Date.now()}`,
      email: `admin-${Date.now()}@example.com`,
      password: "password123",
      isAdmin: true,
    });

    // Create regular user
    const regularUser = await User.create({
      username: `RegularUser-${Date.now()}`,
      email: `regular-${Date.now()}@example.com`,
      password: "password123",
      isAdmin: false,
    });

    // Generate tokens
    adminToken = jwt.sign(
      { userId: adminUser._id },
      process.env.JWT_SECRET_KEY || "product-cart-shop"
    );
    regularToken = jwt.sign(
      { userId: regularUser._id },
      process.env.JWT_SECRET_KEY || "product-cart-shop"
    );
  });

  // getAllUsers Test
  it("should fetch all users (admin only)", async () => {
    const res = await request(server)
      .get("/api/v1/user/get-all-users")
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.data.length).toBe(1); // Should exclude admin user
  });

  // getCurrentUserProfile Test
  it("should fetch current user profile", async () => {
    const res = await request(server)
      .get("/api/v1/user/get-logged-user")
      .set("Authorization", `Bearer ${regularToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.user).toHaveProperty("username");
    expect(res.body.user).toHaveProperty("email");
  });

  // updateCurrentUserProfile Test
  it("should update current user profile", async () => {
    const newPassword = "newpassword123";
    const res = await request(server)
      .put("/api/v1/user/update-logged-user")
      .set("Authorization", `Bearer ${regularToken}`)
      .send({
        username: "UpdatedUser",
        email: "updated@example.com",
        password: newPassword,
      });

    expect(res.statusCode).toBe(200);

    // Verify password update
    const user = await User.findOne({ email: "updated@example.com" });
    const isMatch = await bcrypt.compare(newPassword, user.password);
    expect(isMatch).toBe(true);
  });

  // getUserById Test
  it("should get user by ID (admin only)", async () => {
    const users = await User.find({ isAdmin: false });
    const res = await request(server)
      .get(`/api/v1/user/get-user/${users[0]._id}`)
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.user).toHaveProperty("email");
  });

  // deleteUserById Test
  it("should delete user by ID (admin only)", async () => {
    const users = await User.find({ isAdmin: false });
    const res = await request(server)
      .delete(`/api/v1/user/delete-user/${users[0]._id}`)
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message", "User deleted successfully.");
  });

  // Prevent admin deletion Test
  it("should prevent admin user deletion", async () => {
    const admin = await User.findOne({ isAdmin: true });
    const res = await request(server)
      .delete(`/api/v1/user/delete-user/${admin._id}`)
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("message", "Cannot delete an admin user.");
  });
});
