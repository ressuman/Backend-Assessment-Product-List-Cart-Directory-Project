import express from "express";

import {
  deleteUserById,
  getAllUsers,
  getCurrentUserProfile,
  getUserById,
  updateCurrentUserProfile,
  updateUserById,
} from "../controllers/userControllers.js";

import {
  authenticate,
  authorizeAdmin,
} from "../middlewares/authMiddlewares.js";

const router = express.Router();

// Route to get all users (Admin Only)
router.get("/get-all-users", authenticate, authorizeAdmin, getAllUsers);

// Route to get the current logged-in user's profile
router.get("/get-logged-user", authenticate, getCurrentUserProfile);

// Route to update the current logged-in user's profile
router.put("/update-logged-user", authenticate, updateCurrentUserProfile);

// Route to get a user by ID (Admin Only)
router.get("/get-user/:id", authenticate, authorizeAdmin, getUserById);

// Route to update a user by ID (Admin Only)
router.put("/update-user/:id", authenticate, authorizeAdmin, updateUserById);

// Route to delete a user by ID (Admin Only)
router.delete("/delete-user/:id", authenticate, authorizeAdmin, deleteUserById);

export default router;
