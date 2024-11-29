import request from "supertest";
import server from "../server.js";
//import { connectDB, closeDB, clearDB } from "./setup.js";
import User from "../models/userModel.js";
import generateToken from "../utils/createToken.js";

// beforeAll(async () => await connectDB());
// afterEach(async () => await clearDB());
// afterAll(async () => await closeDB());

describe("User Endpoints", () => {
  it("should fetch the current user profile", async () => {
    const user = await User.create({
      username: "Test User",
      email: "testuser@example.com",
      password: "password123",
      isAdmin: false,
    });

    const token = generateToken({ userId: user._id });

    const res = await request(server)
      .get("/api/v1/user/get-logged-user")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("email", "testuser@example.com");
  });
});
