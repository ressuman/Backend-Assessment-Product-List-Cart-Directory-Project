import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
//import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";
import hpp from "hpp";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
// import postmanToOpenApi from "postman-to-openapi";
import swaggerDocument from "./docs/openapi.json" assert { type: "json" };

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

// Data sanitization against NoSQL query injection
//app.use(mongoSanitize());

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
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/cart", cartRoutes);

// Swagger Documentation
// const swaggerSpec = swaggerJsdoc({
//   definition: {
//     openapi: "3.0.0",
//     info: {
//       title: "Product List and Shopping Cart API's",
//       description:
//         "An backend API design that supports CRUD operations of product lists and shopping cart functionalities.",
//     },
//     servers: [
//       {
//         url: "http://localhost:3050/api/v1",
//       },
//     ],
//   },
//   apis: ["./routes/*.js"], // Specify the paths to your route files
// });

//app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// app.get("/swagger-json", (req, res) => {
//   res.setHeader("Content-Type", "application/json");
//   res.send(swaggerJson);
// });

// // Generate OpenAPI YAML from Postman Collection
// app.get("/generate-yml", async (req, res) => {
//   const postmanCollection =
//     "./Product List and Shopping Cart API's.postman_collection.json"; // Path to your Postman collection file
//   const outputFile = "collection.yml"; // Desired YAML output path

//   try {
//     const result = await postmanToOpenApi(postmanCollection, outputFile, {
//       defaultTag: "General",
//     });
//     console.log(`OpenAPI specs generated at: ${result}`);
//     res.status(200).send(`OpenAPI specs generated at: ${result}`);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Failed to generate OpenAPI YAML");
//   }
// });

// // Default Route
// app.get("/", (req, res) => {
//   res.status(200).send("API is running...");
// });

// Error handler for unsupported routes
app.use((req, res, next) => {
  res.status(404).json({ message: "API route not found" });
});

export default app;
