import express from "express";
import cors from "cors";

import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import xss from "xss-clean";
import hpp from "hpp";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
//import swaggerDocs from "./docs/openapi.json";
//assert { type: "json" };
//import fs from "fs";
//const swaggerDocs = JSON.parse(fs.readFileSync("./docs/openapi.json", "utf8"));
// import fs from "fs/promises";
// const swaggerDocs = JSON.parse(
//   await fs.readFile("./docs/openapi.json", "utf-8")
// );
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Product List and Shopping Cart API",
      version: "1.0.0",
      description:
        "The Product List and Shopping Cart API is a comprehensive RESTful service designed to power eCommerce platforms. Built with Express.js and MongoDB, this API provides secure and efficient management of user accounts, product catalogs, and shopping cart operations.",
      contact: {
        name: "Richard Essuman",
        email: "ressuman001@gmail.com",
        url: "https://github.com/ressuman/Backend-Assessment-Product-List-Cart-Directory-Project.git",
      },
    },
    termsOfService: "http://swagger.io/terms/",
    license: {
      name: "Apache 2.0",
      url: "http://www.apache.org/licenses/LICENSE-2.0.html",
    },
    externalDocs: {
      description: "Find out more about Swagger",
      url: "http://swagger.io",
    },
    servers: [
      {
        url: "http://localhost:5030",
        description: "Local development server (HTTP)",
      },
      {
        url: "https://backend-assessment-gamma.vercel.app",
        description: "Production server (HTTPS)",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

dotenv.config();

const app = express();

// Middleware configuration
// Security HTTP headers
app.use(helmet());

// Logger for development environment
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// CORS configuration
app.use(cors());

// Body parser
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// Cookie parser
app.use(cookieParser());

// Data sanitization against XSS
app.use(xss());

// Prevent HTTP parameter pollution
app.use(hpp());

// Rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
});
app.use("/api", limiter);

// Importing routes
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";

// Mounting routes
app.get("/", (request, response) => {
  response.json({
    success: true,
    message: "Welcome to the Product List and Shopping Cart API",
    description:
      "Explore a range of products and manage your shopping cart with ease. This API is designed to provide robust features for seamless eCommerce integration.",
    status: "Server is operational and running smoothly.",
    documentation:
      "Visit /api-docs for API usage guidelines and documentation.",
  });
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/cart", cartRoutes);

// Error handler for unsupported routes
app.use((req, res, next) => {
  res.status(404).json({ message: "API route not found" });
});

// Centralized error-handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.stack);
  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

export default app;
