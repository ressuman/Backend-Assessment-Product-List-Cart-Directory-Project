import bcrypt from "bcryptjs";
import asyncHandler from "../middlewares/errorHandler.js";
import User from "../models/userModel.js";
import createToken from "../utils/createToken.js";

export const signup = asyncHandler(async (req, res) => {
  const { username, email, password, isAdmin } = req.body;

  try {
    // Validate input
    if (!username || !email || !password) {
      res.status(400).json({ message: "Please fill all the inputs." });
      return;
    }

    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).json({ message: "User already exists." });
      return;
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      isAdmin: isAdmin || false, // Default to false if isAdmin is not provided
    });

    // Save the user and generate a token
    await newUser.save();
    const token = createToken(res, newUser._id);

    // Respond with user details and token
    res.status(201).json({
      message: "User created successfully.",
      success: true,
      //token, // Include the token in the response
      user: {
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        isAdmin: newUser.isAdmin,
      },
    });
  } catch (error) {
    console.error("Signup error:", error.message);
    res.status(500).json({
      message: "An error occurred during signup.",
      error: error.message,
    });
  }
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //console.log(email);
  //console.log(password);

  try {
    // Validate input
    if (!email || !password) {
      res.status(400).json({ message: "Email and password are required." });
      return;
    }

    //console.log(`Login attempt with email: ${email}`);

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      res.status(404).json({ message: "User not found." });
      return;
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordValid) {
      res.status(401).json({ message: "Invalid email or password." });
      return;
    }

    // Generate token
    const token = createToken(res, existingUser._id);

    // Respond with user info and token
    res.status(200).json({
      message: "Login successful.",
      success: true,
      token,
      user: {
        _id: existingUser._id,
        username: existingUser.username,
        email: existingUser.email,
        isAdmin: existingUser.isAdmin,
      },
    });
  } catch (error) {
    // Handle unexpected errors
    console.error("Login error:", error.message);
    res.status(500).json({
      message: "An error occurred during login.",
      error: error.message,
    });
  }
});

export const logout = asyncHandler(async (req, res) => {
  try {
    // Clear the JWT cookie
    res.cookie("jwt", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Ensures cookies are secure in production
      sameSite: "strict", // Prevents CSRF attacks
      expires: new Date(0), // Immediately expires the cookie
    });

    // Send a success response
    res
      .status(200)
      .json({ message: "Logged out successfully.", success: true });
  } catch (error) {
    console.error("Logout error:", error.message);
    res.status(500).json({
      message: "An error occurred during logout.",
      error: error.message,
    });
  }
});
