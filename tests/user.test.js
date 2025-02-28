// import request from "supertest";
// import server from "../server.js";
// //import { connectDB, closeDB, clearDB } from "./setup.js";
// import User from "../models/userModel.js";
// import generateToken from "../utils/createToken.js";

// // beforeAll(async () => await connectDB());
// // afterEach(async () => await clearDB());
// // afterAll(async () => await closeDB());

// describe("User Endpoints", () => {
//   it("should fetch the current user profile", async () => {
//     const user = await User.create({
//       username: "Test User",
//       email: "testuser@example.com",
//       password: "password123",
//       isAdmin: false,
//     });

//     const token = generateToken({ userId: user._id });

//     const res = await request(server)
//       .get("/api/v1/user/get-logged-user")
//       .set("Authorization", `Bearer ${token}`);

//     expect(res.statusCode).toEqual(200);
//     expect(res.body).toHaveProperty("email", "testuser@example.com");
//   });
// });

// // user.test.js
// import request from "supertest";
// import mongoose from "mongoose";
// import server from "../server.js";
// import User from "../models/userModel.js";
// import jwt from "jsonwebtoken";

// // Test database connection
// beforeAll(async () => {
//   await mongoose.connect(
//     "mongodb+srv://ressuman001:yt3c28PlCN4t5jF8@backendassessment0.sve5r.mongodb.net/testdb",
//     {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     }
//   );
// });

// // Clean up database between tests
// beforeEach(async () => {
//   await User.deleteMany({});
// });

// // Close database connection after all tests
// afterAll(async () => {
//   await mongoose.connection.close();
// });

// describe("User Endpoints", () => {
//   let adminToken, regularToken, adminUser, regularUser;

//   // Create test users before all tests
//   beforeAll(async () => {
//     // Create admin user
//     adminUser = await User.create({
//       username: "AdminUser",
//       email: "admin@example.com",
//       password: "password123",
//       isAdmin: true,
//     });

//     // Create regular user
//     regularUser = await User.create({
//       username: "RegularUser",
//       email: "regular@example.com",
//       password: "password123",
//       isAdmin: false,
//     });

//     // Generate tokens
//     adminToken = jwt.sign(
//       { userId: adminUser._id },
//       process.env.JWT_SECRET_KEY || "product-cart-shop"
//     );
//     regularToken = jwt.sign(
//       { userId: regularUser._id },
//       process.env.JWT_SECRET_KEY || "product-cart-shop"
//     );
//   });

//   // getAllUsers Test
//   it("should fetch all users (admin only)", async () => {
//     // Admin request
//     const adminRes = await request(server)
//       .get("/api/v1/user/get-all-users")
//       .set("Authorization", `Bearer ${adminToken}`);

//     expect(adminRes.statusCode).toBe(200);
//     expect(adminRes.body.data.length).toBe(1); // Should exclude admin user
//     expect(adminRes.body.data[0].email).toBe("regular@example.com");

//     // Regular user request
//     const regularRes = await request(server)
//       .get("/api/v1/user/get-all-users")
//       .set("Authorization", `Bearer ${regularToken}`);

//     expect(regularRes.statusCode).toBe(403);
//   });

//   // getCurrentUserProfile Test
//   it("should fetch current user profile", async () => {
//     const res = await request(server)
//       .get("/api/v1/user/get-logged-user")
//       .set("Authorization", `Bearer ${regularToken}`);

//     expect(res.statusCode).toBe(200);
//     expect(res.body.user).toMatchObject({
//       username: "RegularUser",
//       email: "regular@example.com",
//       isAdmin: false,
//     });
//   });

//   // updateCurrentUserProfile Test
//   it("should update current user profile", async () => {
//     const res = await request(server)
//       .put("/api/v1/user/update-logged-user")
//       .set("Authorization", `Bearer ${regularToken}`)
//       .send({
//         username: "UpdatedUser",
//         email: "updated@example.com",
//         password: "newpassword123",
//       });

//     expect(res.statusCode).toBe(200);
//     expect(res.body.user).toMatchObject({
//       username: "UpdatedUser",
//       email: "updated@example.com",
//     });

//     // Verify password update
//     const updatedUser = await User.findById(regularUser._id);
//     const isMatch = await bcrypt.compare(
//       "newpassword123",
//       updatedUser.password
//     );
//     expect(isMatch).toBe(true);
//   });

//   // getUserById Test
//   it("should get user by ID (admin only)", async () => {
//     const res = await request(server)
//       .get(`/api/v1/user/get-user/${regularUser._id}`)
//       .set("Authorization", `Bearer ${adminToken}`);

//     expect(res.statusCode).toBe(200);
//     expect(res.body.user.email).toBe("regular@example.com");
//   });

//   // updateUserById Test
//   it("should update user by ID (admin only)", async () => {
//     const res = await request(server)
//       .put(`/api/v1/user/update-user/${regularUser._id}`)
//       .set("Authorization", `Bearer ${adminToken}`)
//       .send({
//         username: "AdminUpdated",
//         email: "adminupdated@example.com",
//         isAdmin: true,
//       });

//     expect(res.statusCode).toBe(200);
//     expect(res.body.user).toMatchObject({
//       username: "AdminUpdated",
//       email: "adminupdated@example.com",
//       isAdmin: true,
//     });
//   });

//   // deleteUserById Test
//   it("should delete user by ID (admin only)", async () => {
//     // Create temporary user to delete
//     const tempUser = await User.create({
//       username: "TempUser",
//       email: "temp@example.com",
//       password: "password123",
//     });

//     const res = await request(server)
//       .delete(`/api/v1/user/delete-user/${tempUser._id}`)
//       .set("Authorization", `Bearer ${adminToken}`);

//     expect(res.statusCode).toBe(200);
//     expect(res.body).toHaveProperty("message", "User deleted successfully.");

//     // Verify deletion
//     const deletedUser = await User.findById(tempUser._id);
//     expect(deletedUser).toBeNull();
//   });

//   // Prevent admin deletion Test
//   it("should prevent admin user deletion", async () => {
//     const res = await request(server)
//       .delete(`/api/v1/user/delete-user/${adminUser._id}`)
//       .set("Authorization", `Bearer ${adminToken}`);

//     expect(res.statusCode).toBe(400);
//     expect(res.body).toHaveProperty("message", "Cannot delete an admin user.");
//   });
// });

// import request from "supertest";
// import server from "../server.js";
// import User from "../models/userModel.js";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import mongoose from "mongoose";

// // Helper function to generate a JWT token (mimics createToken without setting cookies)
// const generateToken = (userId) => {
//   const secretKey = process.env.JWT_SECRET_KEY || "test-secret-key";
//   return jwt.sign({ userId }, secretKey, { expiresIn: "30d" });
// };

// describe("User Endpoints", () => {
//   let adminUser;
//   let nonAdminUser;
//   let adminToken;
//   let nonAdminToken;

//   // Setup: Connect to the database and create initial users
//   beforeAll(async () => {
//     await mongoose.connect(
//       "mongodb+srv://ressuman001:yt3c28PlCN4t5jF8@backendassessment0.sve5r.mongodb.net/testdb",
//       { useNewUrlParser: true, useUnifiedTopology: true }
//     );

//     // Create an admin user
//     const adminPassword = await bcrypt.hash("adminpass", 10);
//     adminUser = await User.create({
//       username: "Admin User",
//       email: "admin@example.com",
//       password: adminPassword,
//       isAdmin: true,
//     });
//     adminToken = generateToken(adminUser._id);

//     // Create a non-admin user
//     const userPassword = await bcrypt.hash("userpass", 10);
//     nonAdminUser = await User.create({
//       username: "Regular User",
//       email: "user@example.com",
//       password: userPassword,
//       isAdmin: false,
//     });
//     nonAdminToken = generateToken(nonAdminUser._id);
//   });

//   // Cleanup: Remove test-specific users after each test, keep admin and non-admin
//   afterEach(async () => {
//     await User.deleteMany({ _id: { $nin: [adminUser._id, nonAdminUser._id] } });
//   });

//   // Teardown: Close the database connection
//   afterAll(async () => {
//     await User.deleteMany({});
//     await mongoose.connection.close();
//   });

//   // **GET /api/v1/user/get-all-users**
//   describe("GET /api/v1/user/get-all-users", () => {
//     it("should fetch all users except the current admin user", async () => {
//       const otherUser = await User.create({
//         username: "Other User",
//         email: "other@example.com",
//         password: await bcrypt.hash("otherpass", 10),
//         isAdmin: false,
//       });

//       const res = await request(server)
//         .get("/api/v1/user/get-all-users")
//         .set("Authorization", `Bearer ${adminToken}`);

//       expect(res.statusCode).toBe(200);
//       expect(res.body).toMatchObject({
//         message: "All users fetched successfully",
//         success: true,
//         count: 2, // nonAdminUser and otherUser
//       });
//       expect(res.body.data).toEqual(
//         expect.arrayContaining([
//           expect.objectContaining({ email: "user@example.com" }),
//           expect.objectContaining({ email: "other@example.com" }),
//         ])
//       );
//       expect(res.body.data.some((u) => u.email === "admin@example.com")).toBe(
//         false
//       );
//     });

//     it("should return 403 if user is not admin", async () => {
//       const res = await request(server)
//         .get("/api/v1/user/get-all-users")
//         .set("Authorization", `Bearer ${nonAdminToken}`);

//       expect(res.statusCode).toBe(403);
//       expect(res.body).toMatchObject({
//         message: "Access denied. Admins only.",
//         success: false,
//       });
//     });

//     it("should return 404 if no other users exist", async () => {
//       const res = await request(server)
//         .get("/api/v1/user/get-all-users")
//         .set("Authorization", `Bearer ${adminToken}`);

//       expect(res.statusCode).toBe(404);
//       expect(res.body).toMatchObject({
//         message: "No other users found",
//         success: false,
//       });
//     });
//   });

//   // **GET /api/v1/user/get-logged-user**
//   describe("GET /api/v1/user/get-logged-user", () => {
//     it("should fetch the current user profile", async () => {
//       const res = await request(server)
//         .get("/api/v1/user/get-logged-user")
//         .set("Authorization", `Bearer ${nonAdminToken}`);

//       expect(res.statusCode).toBe(200);
//       expect(res.body).toMatchObject({
//         message: "User profile retrieved successfully.",
//         success: true,
//         user: {
//           _id: nonAdminUser._id.toString(),
//           username: "Regular User",
//           email: "user@example.com",
//           isAdmin: false,
//         },
//       });
//     });

//     it("should return 404 if user not found", async () => {
//       await User.deleteOne({ _id: nonAdminUser._id });
//       const res = await request(server)
//         .get("/api/v1/user/get-logged-user")
//         .set("Authorization", `Bearer ${nonAdminToken}`);

//       expect(res.statusCode).toBe(404);
//       expect(res.body).toMatchObject({
//         message: "User not found.",
//         success: false,
//       });
//     });
//   });

//   // **PUT /api/v1/user/update-logged-user**
//   describe("PUT /api/v1/user/update-logged-user", () => {
//     it("should update the current user profile", async () => {
//       const res = await request(server)
//         .put("/api/v1/user/update-logged-user")
//         .set("Authorization", `Bearer ${nonAdminToken}`)
//         .send({
//           username: "Updated User",
//           email: "updated@example.com",
//           password: "newpass123",
//         });

//       expect(res.statusCode).toBe(200);
//       expect(res.body).toMatchObject({
//         message: "Profile updated successfully.",
//         success: true,
//         user: {
//           username: "Updated User",
//           email: "updated@example.com",
//           isAdmin: false,
//         },
//       });

//       const updatedUser = await User.findById(nonAdminUser._id);
//       expect(await bcrypt.compare("newpass123", updatedUser.password)).toBe(
//         true
//       );
//     });

//     it("should return 400 if required fields are missing", async () => {
//       const res = await request(server)
//         .put("/api/v1/user/update-logged-user")
//         .set("Authorization", `Bearer ${nonAdminToken}`)
//         .send({ email: "updated@example.com" });

//       expect(res.statusCode).toBe(400);
//       expect(res.body).toMatchObject({
//         message: "Please provide all required fields: username and email.",
//         success: false,
//       });
//     });

//     it("should return 404 if user not found", async () => {
//       await User.deleteOne({ _id: nonAdminUser._id });
//       const res = await request(server)
//         .put("/api/v1/user/update-logged-user")
//         .set("Authorization", `Bearer ${nonAdminToken}`)
//         .send({ username: "Updated User", email: "updated@example.com" });

//       expect(res.statusCode).toBe(404);
//       expect(res.body).toMatchObject({
//         message: "User not found.",
//         success: false,
//       });
//     });
//   });

//   // **GET /api/v1/user/get-user/:id**
//   describe("GET /api/v1/user/get-user/:id", () => {
//     it("should fetch a user by ID", async () => {
//       const res = await request(server)
//         .get(`/api/v1/user/get-user/${nonAdminUser._id}`)
//         .set("Authorization", `Bearer ${adminToken}`);

//       expect(res.statusCode).toBe(200);
//       expect(res.body).toMatchObject({
//         message: "User retrieved successfully.",
//         success: true,
//         user: {
//           _id: nonAdminUser._id.toString(),
//           username: "Regular User",
//           email: "user@example.com",
//           isAdmin: false,
//         },
//       });
//     });

//     it("should return 404 if user not found", async () => {
//       const fakeId = new mongoose.Types.ObjectId();
//       const res = await request(server)
//         .get(`/api/v1/user/get-user/${fakeId}`)
//         .set("Authorization", `Bearer ${adminToken}`);

//       expect(res.statusCode).toBe(404);
//       expect(res.body).toMatchObject({
//         message: "User not found.",
//         success: false,
//       });
//     });

//     it("should return 403 if not admin", async () => {
//       const res = await request(server)
//         .get(`/api/v1/user/get-user/${nonAdminUser._id}`)
//         .set("Authorization", `Bearer ${nonAdminToken}`);

//       expect(res.statusCode).toBe(403);
//       expect(res.body).toMatchObject({
//         message: "Access denied. Admins only.",
//         success: false,
//       });
//     });
//   });

//   // **PUT /api/v1/user/update-user/:id**
//   describe("PUT /api/v1/user/update-user/:id", () => {
//     it("should update a user by ID", async () => {
//       const res = await request(server)
//         .put(`/api/v1/user/update-user/${nonAdminUser._id}`)
//         .set("Authorization", `Bearer ${adminToken}`)
//         .send({
//           username: "Admin Updated User",
//           email: "adminupdated@example.com",
//           isAdmin: true,
//         });

//       expect(res.statusCode).toBe(200);
//       expect(res.body).toMatchObject({
//         message: "User updated successfully.",
//         success: true,
//         user: {
//           username: "Admin Updated User",
//           email: "adminupdated@example.com",
//           isAdmin: true,
//         },
//       });
//     });

//     it("should return 400 if required fields are missing", async () => {
//       const res = await request(server)
//         .put(`/api/v1/user/update-user/${nonAdminUser._id}`)
//         .set("Authorization", `Bearer ${adminToken}`)
//         .send({ email: "adminupdated@example.com" });

//       expect(res.statusCode).toBe(400);
//       expect(res.body).toMatchObject({
//         message:
//           "Please provide all required fields: username, email, and isAdmin.",
//         success: false,
//       });
//     });

//     it("should return 404 if user not found", async () => {
//       const fakeId = new mongoose.Types.ObjectId();
//       const res = await request(server)
//         .put(`/api/v1/user/update-user/${fakeId}`)
//         .set("Authorization", `Bearer ${adminToken}`)
//         .send({
//           username: "Updated User",
//           email: "updated@example.com",
//           isAdmin: false,
//         });

//       expect(res.statusCode).toBe(404);
//       expect(res.body).toMatchObject({
//         message: "User not found.",
//         success: false,
//       });
//     });

//     it("should return 403 if not admin", async () => {
//       const res = await request(server)
//         .put(`/api/v1/user/update-user/${nonAdminUser._id}`)
//         .set("Authorization", `Bearer ${nonAdminToken}`)
//         .send({
//           username: "Updated User",
//           email: "updated@example.com",
//           isAdmin: false,
//         });

//       expect(res.statusCode).toBe(403);
//       expect(res.body).toMatchObject({
//         message: "Access denied. Admins only.",
//         success: false,
//       });
//     });
//   });

//   // **DELETE /api/v1/user/delete-user/:id**
//   describe("DELETE /api/v1/user/delete-user/:id", () => {
//     it("should delete a non-admin user by ID", async () => {
//       const userToDelete = await User.create({
//         username: "Delete Me",
//         email: "delete@example.com",
//         password: await bcrypt.hash("deletepass", 10),
//         isAdmin: false,
//       });

//       const res = await request(server)
//         .delete(`/api/v1/user/delete-user/${userToDelete._id}`)
//         .set("Authorization", `Bearer ${adminToken}`);

//       expect(res.statusCode).toBe(200);
//       expect(res.body).toMatchObject({
//         message: "User deleted successfully.",
//         success: true,
//       });

//       const deletedUser = await User.findById(userToDelete._id);
//       expect(deletedUser).toBeNull();
//     });

//     it("should return 400 if user is an admin", async () => {
//       const res = await request(server)
//         .delete(`/api/v1/user/delete-user/${adminUser._id}`)
//         .set("Authorization", `Bearer ${adminToken}`);

//       expect(res.statusCode).toBe(400);
//       expect(res.body).toMatchObject({
//         message: "Cannot delete an admin user.",
//         success: false,
//       });
//     });

//     it("should return 404 if user not found", async () => {
//       const fakeId = new mongoose.Types.ObjectId();
//       const res = await request(server)
//         .delete(`/api/v1/user/delete-user/${fakeId}`)
//         .set("Authorization", `Bearer ${adminToken}`);

//       expect(res.statusCode).toBe(404);
//       expect(res.body).toMatchObject({
//         message: "User not found.",
//         success: false,
//       });
//     });

//     it("should return 403 if not admin", async () => {
//       const res = await request(server)
//         .delete(`/api/v1/user/delete-user/${nonAdminUser._id}`)
//         .set("Authorization", `Bearer ${nonAdminToken}`);

//       expect(res.statusCode).toBe(403);
//       expect(res.body).toMatchObject({
//         message: "Access denied. Admins only.",
//         success: false,
//       });
//     });
//   });
// });

// user.test.js
import request from "supertest";
import mongoose from "mongoose";
import server from "../server.js";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// Test database connection
beforeAll(async () => {
  await mongoose.connect(
    "mongodb+srv://ressuman001:yt3c28PlCN4t5jF8@backendassessment0.sve5r.mongodb.net/testdb",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
});

// Clean up database and recreate test users before each test
beforeEach(async () => {
  await User.deleteMany({});

  // Create fresh users for each test
  adminUser = await User.create({
    username: "AdminUser",
    email: "admin@example.com",
    password: "password123",
    isAdmin: true,
  });

  regularUser = await User.create({
    username: "RegularUser",
    email: "regular@example.com",
    password: "password123",
    isAdmin: false,
  });

  // Generate fresh tokens for each test
  adminToken = jwt.sign(
    { userId: adminUser._id },
    process.env.JWT_SECRET_KEY || "product-cart-shop"
  );
  regularToken = jwt.sign(
    { userId: regularUser._id },
    process.env.JWT_SECRET_KEY || "product-cart-shop"
  );
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("User Endpoints", () => {
  let adminToken, regularToken, adminUser, regularUser;

  // getAllUsers Test
  it("should fetch all users (admin only)", async () => {
    const adminRes = await request(server)
      .get("/api/v1/user/get-all-users")
      .set("Authorization", `Bearer ${adminToken}`);

    expect(adminRes.statusCode).toBe(200);
    expect(adminRes.body.data.length).toBe(1);
    expect(adminRes.body.data[0].email).toBe("regular@example.com");

    const regularRes = await request(server)
      .get("/api/v1/user/get-all-users")
      .set("Authorization", `Bearer ${regularToken}`);

    expect(regularRes.statusCode).toBe(403);
  });

  // getCurrentUserProfile Test
  it("should fetch current user profile", async () => {
    const res = await request(server)
      .get("/api/v1/user/get-logged-user")
      .set("Authorization", `Bearer ${regularToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.user).toMatchObject({
      username: "RegularUser",
      email: "regular@example.com",
      isAdmin: false,
    });
  });

  // updateCurrentUserProfile Test
  it("should update current user profile", async () => {
    const res = await request(server)
      .put("/api/v1/user/update-logged-user")
      .set("Authorization", `Bearer ${regularToken}`)
      .send({
        username: "UpdatedUser",
        email: "updated@example.com",
        password: "newpassword123",
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.user).toMatchObject({
      username: "UpdatedUser",
      email: "updated@example.com",
    });

    // Verify password update
    const updatedUser = await User.findById(regularUser._id);
    const isMatch = await bcrypt.compare(
      "newpassword123",
      updatedUser.password
    );
    expect(isMatch).toBe(true);
  });

  // getUserById Test
  it("should get user by ID (admin only)", async () => {
    const res = await request(server)
      .get(`/api/v1/user/get-user/${regularUser._id}`)
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.user.email).toBe("regular@example.com");
  });

  // updateUserById Test
  it("should update user by ID (admin only)", async () => {
    const res = await request(server)
      .put(`/api/v1/user/update-user/${regularUser._id}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        username: "AdminUpdated",
        email: "adminupdated@example.com",
        isAdmin: true,
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.user).toMatchObject({
      username: "AdminUpdated",
      email: "adminupdated@example.com",
      isAdmin: true,
    });
  });

  // deleteUserById Test
  it("should delete user by ID (admin only)", async () => {
    const tempUser = await User.create({
      username: "TempUser",
      email: "temp@example.com",
      password: "password123",
    });

    const res = await request(server)
      .delete(`/api/v1/user/delete-user/${tempUser._id}`)
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message", "User deleted successfully.");
  });

  // Prevent admin deletion Test
  it("should prevent admin user deletion", async () => {
    const res = await request(server)
      .delete(`/api/v1/user/delete-user/${adminUser._id}`)
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("message", "Cannot delete an admin user.");
  });
});
