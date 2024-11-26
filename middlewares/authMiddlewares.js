import jwt from "jsonwebtoken";
import asyncHandler from "./errorHandler.js";
import User from "../models/userModel.js";
import dotenv from "dotenv";
dotenv.config();

const authenticate = asyncHandler(async (req, res, next) => {
  console.log("Headers:", req.headers);
  console.log("Cookies:", req.cookies);

  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (token) {
    console.log("Token:", token);
    const secretKey = process.env.JWT_SECRET_KEY || "product-cart-shop";

    try {
      const decoded = jwt.verify(token, secretKey);
      req.user = await User.findById(decoded.userId).select("-password");

      next();
    } catch (error) {
      res.status(401).send("Not authorized, token failed.");
    }
  } else {
    console.error("No token provided");
    res.status(401).send("Not authorized, no token.");
  }
});

const authorizeAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send("Not authorized as an admin.");
  }
};

export { authenticate, authorizeAdmin };
