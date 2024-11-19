# E-Commerce API

This is an **E-Commerce API** built with **Node.js**, **Express**, and **MongoDB**. It provides functionality for user authentication, product management, and cart operations.

---

## **Folder Structure**

### Root Directory

- **`.env`**
  Configuration file for environment variables (e.g., `PORT`, `MONGO_URI`, `JWT_SECRET`).
- **`index.js`**
  Entry point for the application, bootstraps the server.

- **`server.js`**
  Main server file, contains middleware and routes setup.

---

### 📁 `config`

- **`dBConfig.js`**
  Handles MongoDB connection logic.

---

### 📁 `controllers`

Handles business logic for API endpoints.

- **`authControllers.js`**
  Handles user registration, login, and token generation.

- **`cartControllers.js`**
  Manages cart-related functionality, including adding, updating, fetching, and removing items.

- **`productControllers.js`**
  Handles CRUD operations for products.

- **`userControllers.js`**
  Handles user-related operations such as fetching user details.

---

### 📁 `middlewares`

Middleware functions for handling authentication and errors.

- **`authMiddlewares.js`**
  Middleware to verify JWT tokens and handle access control.

- **`errorHandler.js`**
  Middleware for centralizing error handling.

---

### 📁 `models`

Defines the Mongoose schemas and models for MongoDB.

- **`cartModel.js`**
  Schema for the shopping cart, includes items and quantities.

- **`productModel.js`**
  Schema for product details such as name, price, and quantity.

- **`userModel.js`**
  Schema for user details including email, password, and role.

---

### 📁 `routes`

Defines the endpoints for the API.

- **`authRoutes.js`**
  Routes for user authentication (`/register`, `/login`).

- **`cartRoutes.js`**
  Routes for managing the shopping cart (`/get-cart-items`, `/add-items-to-cart`, etc.).

- **`productRoutes.js`**
  Routes for product management (`/fetch-products`, `/add-product`, etc.).

- **`userRoutes.js`**
  Routes for managing user profiles and admin functionality.

---

### 📁 `utils`

Helper functions for the API.

- **`createToken.js`**
  Utility for creating JWT tokens.

---

## **Setup Instructions**

### Prerequisites

- Node.js (v14 or above)
- MongoDB (local or cloud, e.g., MongoDB Atlas)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd e-commerce-api
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file in the root directory:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/e-commerce
   JWT_SECRET=your_jwt_secret
   ```
5. Start the server:
   ```bash
   npm start
   ```

---

## **Available Endpoints**

### Authentication (`/api/auth`)

- `POST /register` - Register a new user.
- `POST /login` - Log in and get a token.

### Users (`/api/users`)

- `GET /profile` - Fetch user profile (requires authentication).

### Products (`/api/products`)

- `GET /fetch-products` - Fetch all products.
- `POST /add-product` - Add a product (admin only).
- `PUT /update-product/:id` - Update product details (admin only).
- `DELETE /remove-product/:id` - Delete a product (admin only).

### Cart (`/api/cart`)

- `GET /get-cart-items` - Get all cart items for a user.
- `POST /add-items-to-cart` - Add items to the cart.
- `PUT /cart-items/:id` - Update quantity for a specific item.
- `DELETE /cart-item/:id` - Remove an item from the cart.

---

## **Error Handling**

Errors are handled using the custom middleware `errorHandler.js`, which ensures consistent responses for all error scenarios.

---

## **License**

This project is licensed under the MIT License.
