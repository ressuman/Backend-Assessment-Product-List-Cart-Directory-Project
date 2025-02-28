import mongoose from "mongoose";
import asyncHandler from "../middlewares/errorHandler.js";
import Cart from "../models/cartModel.js";
import Product from "../models/productModel.js";

// Get the current cart
export const getCart = asyncHandler(async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id }).populate(
      "items.productId"
    );
    if (!cart)
      return res
        .status(404)
        .json({ error: "Cart not found for this user", success: false });

    const count = cart.items.reduce((total, item) => total + item.quantity, 0);

    res.status(200).json({
      message: "Cart fetched successfully",
      success: true,
      count,
      cart,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Server error, unable to fetch cart", success: false });
  }
});

// Add a product to the cart
export const addToCart = asyncHandler(async (req, res) => {
  const { productId, quantity } = req.body;

  if (!mongoose.Types.ObjectId.isValid(req.body.productId)) {
    return res.status(404).json({
      error: "Invalid product ID",
      success: false,
    });
  }

  // Validation
  if (!productId)
    return res
      .status(400)
      .json({ error: "Product ID is required", success: false });
  if (!quantity || quantity <= 0)
    return res
      .status(400)
      .json({ error: "Quantity must be greater than zero", success: false });

  try {
    const product = await Product.findById(productId);
    if (!product)
      return res
        .status(404)
        .json({ error: "Product not found", success: false });

    let cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) {
      // Create a new cart for the user if it doesn't exist
      cart = new Cart({
        userId: req.user._id,
        items: [{ productId, quantity }],
      });
    } else {
      const itemIndex = cart.items.findIndex(
        (item) => item.productId.toString() === productId
      );

      if (itemIndex >= 0) {
        // Update quantity if product is already in the cart
        cart.items[itemIndex].quantity += quantity;
      } else {
        // Add new product to the cart
        cart.items.push({ productId, quantity });
      }
    }

    await cart.save();
    res.status(201).json({
      message: "Product added to cart successfully",
      success: true,
      cart,
    });
  } catch (err) {
    console.error(err);
    if (err.name === "CastError") {
      return res.status(404).json({
        error: "Invalid product ID",
        success: false,
      });
    }
    res.status(500).json({
      error: "Server error, unable to add product to cart",
      success: false,
    });
  }
});

// Update product quantity in the cart
// export const updateCart = asyncHandler(async (req, res) => {
//   const { quantity } = req.body;

//   // Validation
//   if (!quantity || quantity <= 0)
//     return res
//       .status(400)
//       .json({ error: "Quantity must be greater than zero", success: false });

//   try {
//     const cart = await Cart.findOne({ userId: req.user._id });
//     if (!cart)
//       return res
//         .status(404)
//         .json({ error: "Cart not found for this user", success: false });

//     const itemIndex = cart.items.findIndex(
//       (item) => item.productId.toString() === req.params.id
//     );
//     if (itemIndex < 0)
//       return res
//         .status(404)
//         .json({ error: "Item not found in cart", success: false });

//     const item = cart.items.id(req.params.id); // Use Mongoose's id() method
//     if (!item)
//       return res.status(404).json({ error: "Item not found", success: false });

//     cart.items[item].quantity = quantity;

//     cart.items[itemIndex].quantity = quantity;
//     await cart.save();

//     res
//       .status(200)
//       .json({ message: "Cart updated successfully", success: true, cart });
//   } catch (err) {
//     console.error(err);
//     res
//       .status(500)
//       .json({ error: "Server error, unable to update cart", success: false });
//   }
// });
export const updateCart = asyncHandler(async (req, res) => {
  const { quantity } = req.body;

  // Validation
  if (!quantity || quantity <= 0) {
    return res
      .status(400)
      .json({ error: "Quantity must be greater than zero", success: false });
  }

  try {
    const cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) {
      return res
        .status(404)
        .json({ error: "Cart not found for this user", success: false });
    }

    // Retrieve item using Mongoose's `id()` method
    const item = cart.items.id(req.params.id);
    if (!item) {
      return res
        .status(404)
        .json({ error: "Item not found in cart", success: false });
    }

    // Update quantity
    item.quantity = quantity;
    await cart.save();

    res
      .status(200)
      .json({ message: "Cart updated successfully", success: true, cart });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Server error, unable to update cart", success: false });
  }
});

// Remove product from the cart
// export const removeFromCart = asyncHandler(async (req, res) => {
//   try {
//     const cart = await Cart.findOne({ userId: req.user._id });
//     if (!cart)
//       return res
//         .status(404)
//         .json({ error: "Cart not found for this user", success: false });

//     const itemIndex = cart.items.findIndex(
//       (item) => item.productId.toString() === req.params.id
//     );
//     if (itemIndex < 0)
//       return res
//         .status(404)
//         .json({ error: "Item not found in cart", success: false });

//     cart.items.splice(itemIndex, 1);
//     await cart.save();

//     res.status(200).json({
//       message: "Item removed from cart successfully",
//       success: true,
//       cart,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({
//       error: "Server error, unable to remove item from cart",
//       success: false,
//     });
//   }
// });

export const removeFromCart = asyncHandler(async (req, res) => {
  try {
    const itemId = new mongoose.Types.ObjectId(req.params.itemId);

    const updatedCart = await Cart.findOneAndUpdate(
      { userId: req.user._id },
      { $pull: { items: { _id: itemId } } },
      { new: true }
    );

    if (!updatedCart) {
      return res.status(404).json({
        error: "Cart not found",
        success: false,
      });
    }

    res.status(200).json({
      message: "Item removed successfully",
      success: true,
      cart: updatedCart,
    });
  } catch (err) {
    if (err instanceof mongoose.Error.CastError) {
      return res.status(400).json({
        error: "Invalid item ID format",
        success: false,
      });
    }
    console.error(err);
    res.status(500).json({
      error: "Server error, unable to remove item",
      success: false,
    });
  }
});
