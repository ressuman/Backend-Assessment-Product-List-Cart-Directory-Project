import express from "express";

import {
  addToCart,
  getCart,
  removeFromCart,
  updateCart,
} from "../controllers/cartControllers.js";

import { authenticate } from "../middlewares/authMiddlewares.js";

const router = express.Router();

router.get("/get-cart-items", authenticate, getCart);

router.post("/add-items-to-cart", authenticate, addToCart);

router.put("/cart-items/:id", authenticate, updateCart);

router.delete("/cart-item/:id", authenticate, removeFromCart);

export default router;
