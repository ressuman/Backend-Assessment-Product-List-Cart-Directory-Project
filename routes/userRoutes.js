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

router.get("/get-all-users", authenticate, authorizeAdmin, getAllUsers);

router.get("/get-logged-user", authenticate, getCurrentUserProfile);

router.put("/update-logged-user", authenticate, updateCurrentUserProfile);

// ADMIN ROUTES 👇
// router.get("/get-single-user", authenticate, authorizeAdmin, getUserById);

// router.put("/update-single-user", authenticate, authorizeAdmin, updateUserById);

// router.delete(
//   "/delete-single-user",
//   authenticate,
//   authorizeAdmin,
//   deleteUserById
// );

router
  .route("/:id")
  .delete(authenticate, authorizeAdmin, deleteUserById)
  .get(authenticate, authorizeAdmin, getUserById)
  .put(authenticate, authorizeAdmin, updateUserById);

export default router;
