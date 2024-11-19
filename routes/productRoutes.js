import express from "express";

import {
  authenticate,
  authorizeAdmin,
} from "../middlewares/authMiddlewares.js";

import {
  addProduct,
  fetchAllProducts,
  fetchNewProducts,
  fetchProductById,
  fetchSomeProducts,
  fetchTopProducts,
  filterProducts,
  removeProduct,
  updateProductDetails,
} from "../controllers/productControllers.js";

const router = express.Router();

router.post("/add-new-product", authenticate, authorizeAdmin, addProduct);

router.get("/all-products", fetchAllProducts);

router.get("/some-products", fetchSomeProducts);

router.get("/top-products", fetchTopProducts);

router.get("/new-products", fetchNewProducts);

router.get("/product-details/:id", fetchProductById);

router.put(
  "/update-product/:id",
  authenticate,
  authorizeAdmin,
  updateProductDetails
);

router.delete(
  "/remove-product/:id",
  authenticate,
  authorizeAdmin,
  removeProduct
);

router.post("/filtered-products", filterProducts);

export default router;
