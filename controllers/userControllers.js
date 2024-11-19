import bcrypt from "bcryptjs";
import asyncHandler from "../middlewares/errorHandler.js";
import User from "../models/userModel.js";
import createToken from "../utils/createToken.js";

export const getAllUsers = asyncHandler(async (req, res) => {
  try {
    // Ensure the logged-in user is an admin
    if (!req.user.isAdmin) {
      return res.status(403).send({
        message: "Access denied. Admins only.",
        success: false,
      });
    }

    // Get the userId from the authenticated user (req.user)
    const userId = req.user._id;

    // Find all users except the current logged-in user and exclude password field
    const allUsers = await User.find({ _id: { $ne: userId } }).select(
      "-password"
    );

    if (allUsers.length === 0) {
      return res.status(404).send({
        message: "No other users found",
        success: false,
      });
    }

    res.status(200).send({
      message: "All users fetched successfully",
      success: true,
      count: allUsers.length,
      data: allUsers,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error fetching users: " + error.message,
      success: false,
    });
  }
});

export const getCurrentUserProfile = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      res.status(200).json({
        message: "User profile retrieved successfully.",
        success: true,
        user: {
          _id: user._id,
          username: user.username,
          email: user.email,
          isAdmin: user.isAdmin,
        },
      });
    } else {
      res.status(404).json({
        message: "User not found.",
        success: false,
      });
    }
  } catch (error) {
    console.error("Error fetching profile:", error.message);
    res.status(500).json({
      message: "Failed to fetch user profile.",
      error: error.message,
    });
  }
});

export const updateCurrentUserProfile = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found.", success: false });
    }

    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      user.password = hashedPassword;
    }

    const updatedUser = await user.save();

    res.status(200).json({
      message: "Profile updated successfully.",
      success: true,
      user: {
        _id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
      },
    });
  } catch (error) {
    console.error("Error updating profile:", error.message);
    res.status(500).json({
      message: "Failed to update profile.",
      error: error.message,
    });
  }
});

export const deleteUserById = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found.", success: false });
    }

    if (user.isAdmin) {
      return res.status(400).json({
        message: "Cannot delete an admin user.",
        success: false,
      });
    }

    await User.deleteOne({ _id: user._id });

    res.status(200).json({
      message: "User deleted successfully.",
      success: true,
    });
  } catch (error) {
    console.error("Error deleting user:", error.message);
    res.status(500).json({
      message: "Failed to delete user.",
      error: error.message,
    });
  }
});

export const getUserById = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found.", success: false });
    }

    res.status(200).json({
      message: "User retrieved successfully.",
      success: true,
      user,
    });
  } catch (error) {
    console.error("Error fetching user:", error.message);
    res.status(500).json({
      message: "Failed to fetch user.",
      error: error.message,
    });
  }
});

export const updateUserById = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found.", success: false });
    }

    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    user.isAdmin = Boolean(req.body.isAdmin);

    const updatedUser = await user.save();

    res.status(200).json({
      message: "User updated successfully.",
      success: true,
      user: {
        _id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
      },
    });
  } catch (error) {
    console.error("Error updating user:", error.message);
    res.status(500).json({
      message: "Failed to update user.",
      error: error.message,
    });
  }
});
