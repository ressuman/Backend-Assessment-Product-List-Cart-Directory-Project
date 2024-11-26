import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const generateToken = (res, userId) => {
  const secretKey = process.env.JWT_SECRET_KEY || "product-cart-shop";

  if (!secretKey) {
    throw new Error("JWT_SECRET_KEY is not defined");
  }

  const token = jwt.sign({ userId }, secretKey, {
    expiresIn: "30d",
  });

  // Set JWT as an HTTP-Only Cookie
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });

  return token;
};

export default generateToken;
