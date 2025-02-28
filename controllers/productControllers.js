import asyncHandler from "../middlewares/errorHandler.js";
import Product from "../models/productModel.js";

// Add Product (Admin Only)
export const addProduct = asyncHandler(async (req, res) => {
  try {
    const { name, description, price, category, quantity, brand } = req.body;

    // // Validation
    // if (!name)
    //   return res
    //     .status(400)
    //     .json({ error: "Name is required", success: false });
    // if (!brand)
    //   return res
    //     .status(400)
    //     .json({ error: "Brand is required", success: false });
    // if (!description)
    //   return res
    //     .status(400)
    //     .json({ error: "Description is required", success: false });
    // if (!price)
    //   return res
    //     .status(400)
    //     .json({ error: "Price is required", success: false });
    // if (!category)
    //   return res
    //     .status(400)
    //     .json({ error: "Category is required", success: false });
    // if (!quantity)
    //   return res
    //     .status(400)
    //     .json({ error: "Quantity is required", success: false });

    const errors = [];
    const requiredFields = [
      "name",
      "description",
      "price",
      "category",
      "quantity",
      "brand",
    ];

    requiredFields.forEach((field) => {
      if (!req.body[field]) {
        errors.push(
          `${field.charAt(0).toUpperCase() + field.slice(1)} is required`
        );
      }
    });

    if (req.body.price <= 0) {
      errors.push("Price must be greater than 0");
    }

    if (errors.length > 0) {
      return res.status(400).json({
        error: errors,
        success: false,
      });
    }

    const product = new Product({ ...req.body, createdBy: req.user._id });
    await product.save();
    res
      .status(201)
      .json({ message: "Product added successfully", success: true, product });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Server error, unable to add product", success: false });
  }
});

// Update Product Details (Admin Only)
export const updateProductDetails = asyncHandler(async (req, res) => {
  try {
    const { name, description, price, category, quantity, brand } = req.body;

    // Validation
    if (!name)
      return res
        .status(400)
        .json({ error: "Name is required", success: false });
    if (!brand)
      return res
        .status(400)
        .json({ error: "Brand is required", success: false });
    if (!description)
      return res
        .status(400)
        .json({ error: "Description is required", success: false });
    if (!price)
      return res
        .status(400)
        .json({ error: "Price is required", success: false });
    if (!category)
      return res
        .status(400)
        .json({ error: "Category is required", success: false });
    if (!quantity)
      return res
        .status(400)
        .json({ error: "Quantity is required", success: false });

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true, runValidators: true }
    );

    if (!product) return res.status(404).json({ error: "Product not found" });

    res.status(200).json({
      message: "Product updated successfully",
      success: true,
      product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Server error, unable to update product",
      success: false,
    });
  }
});

// Remove Product (Admin Only)
export const removeProduct = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product)
      return res
        .status(404)
        .json({ error: "Product not found", success: false });

    res.status(200).json({
      message: "Product removed successfully",
      success: true,
      product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Server error, unable to remove product",
      success: false,
    });
  }
});

// Fetch Product By ID (Public)
export const fetchProductById = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res
        .status(404)
        .json({ error: "Product not found", success: false });
    }

    res.status(200).json({
      message: "Product fetched successfully",
      success: true,
      product,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Server error, unable to fetch product", success: false });
  }
});

// Fetch Some Products (Public)
export const fetchSomeProducts = asyncHandler(async (req, res) => {
  try {
    const pageSize = 6;
    const page = Number(req.query.page) || 1;

    const keyword = req.query.keyword
      ? {
          name: { $regex: req.query.keyword, $options: "i" },
        }
      : {};

    const count = await Product.countDocuments({ ...keyword });
    const products = await Product.find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    res.status(200).json({
      message: "Products fetched successfully",
      success: true,
      count,
      products,
      page,
      pages: Math.ceil(count / pageSize),
      hasMore: page * pageSize < count,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Server error, unable to fetch products",
      success: false,
    });
  }
});

// Fetch All Products ( Public )
export const fetchAllProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({}).limit(12).sort({ createdAt: -1 });

    const count = await Product.countDocuments();

    res.status(200).json({
      message: "All products fetched successfully",
      success: true,
      count,
      products,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Server error, unable to fetch products",
      success: false,
    });
  }
});

// Fetch Top Products (Public)
export const fetchTopProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({})
      .sort({ createdAt: -1 }) // Sorting by newest products for "top" products
      .limit(4);

    const count = products.length;

    res.status(200).json({
      message: "Top products fetched successfully",
      success: true,
      count,
      products,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Server error, unable to fetch top products",
      success: false,
    });
  }
});

// Fetch New Products (Public)
export const fetchNewProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({})
      .sort({ createdAt: -1 }) // Sorting by newest first
      .limit(5);

    const count = products.length;

    res.status(200).json({
      message: "New products fetched successfully",
      success: true,
      count,
      products,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Server error, unable to fetch new products",
      success: false,
    });
  }
});

// Filter Products (Public)
export const filterProducts = asyncHandler(async (req, res) => {
  try {
    const { checked, radio } = req.body;

    let args = {};
    if (checked.length > 0) args.category = { $in: checked };
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };

    const products = await Product.find(args);

    const count = products.length;

    res.status(200).json({
      message: "Products filtered successfully",
      success: true,
      count,
      products,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Server error, unable to filter products",
      success: false,
    });
  }
});
