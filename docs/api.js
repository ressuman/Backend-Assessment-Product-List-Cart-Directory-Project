export const apiDocumentation = {
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
      url: "https://api.yourdomain.com",
      description: "Production server (HTTPS)",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
  paths: {
    "/api/v1/auth/signup": {
      post: {
        tags: ["Authentication"],
        summary: "Sign up a new user",
        description:
          "Allows new users to create an account. Admin role is optional during signup.",
        security: [],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  username: {
                    type: "string",
                    example: "JohnDoe",
                  },
                  email: {
                    type: "string",
                    example: "johndoe@example.com",
                  },
                  password: {
                    type: "string",
                    example: "Password123!",
                  },
                  isAdmin: {
                    type: "boolean",
                    example: false,
                  },
                },
                required: ["username", "email", "password"],
              },
            },
          },
        },
        responses: {
          201: {
            description: "User created successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                      example: "User created successfully.",
                    },
                    success: {
                      type: "boolean",
                      example: true,
                    },
                    user: {
                      type: "object",
                      properties: {
                        _id: {
                          type: "string",
                          example: "64b7c2e9c8b6c",
                        },
                        username: {
                          type: "string",
                          example: "JohnDoe",
                        },
                        email: {
                          type: "string",
                          example: "johndoe@example.com",
                        },
                        isAdmin: {
                          type: "boolean",
                          example: false,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          400: {
            description: "Validation error or user already exists",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                      example: "Please fill all the inputs.",
                    },
                  },
                },
              },
            },
          },
          500: {
            description: "Internal server error",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                      example: "An error occurred during signup.",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/api/v1/auth/login": {
      post: {
        tags: ["Authentication"],
        summary: "Log in an existing user",
        description: "Authenticate a user and generate a JWT token.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  email: {
                    type: "string",
                    example: "johndoe@example.com",
                  },
                  password: {
                    type: "string",
                    example: "Password123!",
                  },
                },
                required: ["email", "password"],
              },
            },
          },
        },
        responses: {
          200: {
            description: "Login successful",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                      example: "Login successful.",
                    },
                    success: {
                      type: "boolean",
                      example: true,
                    },
                    token: {
                      type: "string",
                      example: "Bearer eyJhbGciOiJIUz...",
                    },
                    user: {
                      type: "object",
                      properties: {
                        _id: {
                          type: "string",
                          example: "64b7c2e9c8b6c",
                        },
                        username: {
                          type: "string",
                          example: "JohnDoe",
                        },
                        email: {
                          type: "string",
                          example: "johndoe@example.com",
                        },
                        isAdmin: {
                          type: "boolean",
                          example: false,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          401: {
            description: "Invalid credentials",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                      example: "Invalid email or password.",
                    },
                  },
                },
              },
            },
          },
          404: {
            description: "User not found",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                      example: "User not found.",
                    },
                  },
                },
              },
            },
          },
          500: {
            description: "Internal server error",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                      example: "An error occurred during login.",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/api/v1/auth/logout": {
      post: {
        tags: ["Authentication"],
        summary: "Log out the current user",
        description: "Clears the JWT cookie and logs out the user.",
        responses: {
          200: {
            description: "Logout successful",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                      example: "Logged out successfully.",
                    },
                    success: {
                      type: "boolean",
                      example: true,
                    },
                  },
                },
              },
            },
          },
          500: {
            description: "Internal server error",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                      example: "An error occurred during logout.",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/api/v1/user/get-all-users": {
      get: {
        tags: ["User Management"],
        summary: "Get all users (Admins only)",
        description:
          "Fetch all users excluding the logged-in user, only accessible to admin users.",
        responses: {
          200: {
            description: "Users fetched successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                      example: "All users fetched successfully",
                    },
                    success: {
                      type: "boolean",
                      example: true,
                    },
                    count: {
                      type: "integer",
                      example: 5,
                    },
                    data: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          _id: {
                            type: "string",
                            example: "64b7c2e9c8b6c",
                          },
                          username: {
                            type: "string",
                            example: "JohnDoe",
                          },
                          email: {
                            type: "string",
                            example: "johndoe@example.com",
                          },
                          isAdmin: {
                            type: "boolean",
                            example: false,
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          403: {
            description: "Access denied, admin only",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                      example: "Access denied. Admins only.",
                    },
                    success: {
                      type: "boolean",
                      example: false,
                    },
                  },
                },
              },
            },
          },
          404: {
            description: "No users found",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                      example: "No other users found",
                    },
                  },
                },
              },
            },
          },
          500: {
            description: "Internal server error",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                      example: "Error fetching users: An error occurred.",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/api/v1/user/get-logged-user": {
      get: {
        tags: ["User Management"],
        summary: "Get the logged-in user's profile",
        description:
          "Retrieve the profile information of the currently logged-in user.",
        responses: {
          200: {
            description: "User profile retrieved successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                      example: "User profile retrieved successfully.",
                    },
                    success: {
                      type: "boolean",
                      example: true,
                    },
                    user: {
                      type: "object",
                      properties: {
                        _id: {
                          type: "string",
                          example: "64b7c2e9c8b6c",
                        },
                        username: {
                          type: "string",
                          example: "JohnDoe",
                        },
                        email: {
                          type: "string",
                          example: "johndoe@example.com",
                        },
                        isAdmin: {
                          type: "boolean",
                          example: false,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          404: {
            description: "User not found",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                      example: "User not found.",
                    },
                  },
                },
              },
            },
          },
          500: {
            description: "Internal server error",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                      example: "Failed to fetch user profile.",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/api/v1/user/update-logged-user": {
      put: {
        tags: ["User Management"],
        summary: "Update the current logged-in user's profile",
        description:
          "Allows the currently authenticated user to update their profile information, such as username, email, and password.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  username: {
                    type: "string",
                    example: "new_username",
                  },
                  email: {
                    type: "string",
                    example: "new_email@example.com",
                  },
                  password: {
                    type: "string",
                    example: "newpassword123",
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "Profile updated successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                      example: "Profile updated successfully.",
                    },
                    success: {
                      type: "boolean",
                      example: true,
                    },
                    user: {
                      type: "object",
                      properties: {
                        _id: {
                          type: "string",
                          example: "64b7c2e9c8b6c",
                        },
                        username: {
                          type: "string",
                          example: "JaneDoe",
                        },
                        email: {
                          type: "string",
                          example: "janedoe@example.com",
                        },
                        isAdmin: {
                          type: "boolean",
                          example: false,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          400: {
            description: "Bad request or validation errors",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                      example: "Please provide valid input.",
                    },
                  },
                },
              },
            },
          },
          404: {
            description: "User not found",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                      example: "User not found.",
                    },
                  },
                },
              },
            },
          },
          500: {
            description: "Internal server error",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                      example: "Failed to update profile.",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/api/v1/user/get-user/{id}": {
      get: {
        tags: ["User Management"],
        summary: "Get user details by ID (Admins Only)",
        description:
          "Allows an admin to retrieve a user's details by their ID. Passwords are excluded from the response.",
        parameters: [
          {
            name: "id",
            in: "path",
            description: "The unique ID of the user to retrieve.",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "User details retrieved successfully.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                      example: "User retrieved successfully.",
                    },
                    success: {
                      type: "boolean",
                      example: true,
                    },
                    user: {
                      type: "object",
                      properties: {
                        _id: {
                          type: "string",
                          example: "64b7c2e9c8b6c",
                        },
                        username: {
                          type: "string",
                          example: "JaneDoe",
                        },
                        email: {
                          type: "string",
                          example: "janedoe@example.com",
                        },
                        isAdmin: {
                          type: "boolean",
                          example: false,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          404: {
            description: "User not found.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                      example: "User not found.",
                    },
                  },
                },
              },
            },
          },
          500: {
            description: "Internal server error.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                      example: "Failed to fetch user.",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/api/v1/user/update-user/{id}": {
      put: {
        tags: ["User Management"],
        summary: "Update a user by ID (Admins Only)",
        description:
          "Allows an admin to update a user's details by their ID. Passwords can be updated but are securely hashed.",
        parameters: [
          {
            name: "id",
            in: "path",
            description: "The unique ID of the user to update.",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  username: {
                    type: "string",
                    example: "updated_user",
                  },
                  email: {
                    type: "string",
                    example: "updated_user@example.com",
                  },
                  isAdmin: {
                    type: "boolean",
                    example: true,
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "User updated successfully.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                      example: "User updated successfully.",
                    },
                    success: {
                      type: "boolean",
                      example: true,
                    },
                    user: {
                      type: "object",
                      properties: {
                        _id: {
                          type: "string",
                          example: "64b7c2e9c8b6c",
                        },
                        username: {
                          type: "string",
                          example: "updated_user",
                        },
                        email: {
                          type: "string",
                          example: "updated_user@example.com",
                        },
                        isAdmin: {
                          type: "boolean",
                          example: true,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          404: {
            description: "User not found.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                      example: "User not found.",
                    },
                  },
                },
              },
            },
          },
          500: {
            description: "Failed to update user.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                      example: "Failed to update user.",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/api/v1/user/delete-user/{id}": {
      delete: {
        tags: ["User Management"],
        summary: "Delete a user by ID (Admins Only)",
        description:
          "Allows an admin to delete a user by their ID. Admin users cannot be deleted.",
        parameters: [
          {
            name: "id",
            in: "path",
            description: "The unique ID of the user to delete.",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "User deleted successfully.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                      example: "User deleted successfully.",
                    },
                    success: {
                      type: "boolean",
                      example: true,
                    },
                  },
                },
              },
            },
          },
          400: {
            description: "Cannot delete admin user.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                      example: "Cannot delete an admin user.",
                    },
                  },
                },
              },
            },
          },
          404: {
            description: "User not found.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                      example: "User not found.",
                    },
                  },
                },
              },
            },
          },
          500: {
            description: "Internal server error.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                      example: "Failed to delete user.",
                    },
                    error: {
                      type: "string",
                      example: "Detailed error message.",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/api/v1/products/add-new-product": {
      post: {
        tags: ["Product Management"],
        summary: "Add a new product (Admins Only)",
        description: "Allows an admin to add a new product to the store.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: {
                    type: "string",
                    example: "Product Name",
                  },
                  brand: {
                    type: "string",
                    example: "Brand Name",
                  },
                  description: {
                    type: "string",
                    example: "Product description",
                  },
                  price: {
                    type: "number",
                    example: 199.99,
                  },
                  category: {
                    type: "string",
                    example: "Electronics",
                  },
                  quantity: {
                    type: "number",
                    example: 50,
                  },
                },
                required: [
                  "name",
                  "brand",
                  "description",
                  "price",
                  "category",
                  "quantity",
                ],
              },
            },
          },
        },
        responses: {
          201: {
            description: "Product added successfully.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                      example: "Product added successfully",
                    },
                    success: {
                      type: "boolean",
                      example: true,
                    },
                    product: {
                      type: "object",
                      properties: {
                        _id: {
                          type: "string",
                          example: "64b7c2e9c8b6c",
                        },
                        name: {
                          type: "string",
                          example: "Product Name",
                        },
                        brand: {
                          type: "string",
                          example: "Brand Name",
                        },
                        price: {
                          type: "number",
                          example: 199.99,
                        },
                        quantity: {
                          type: "number",
                          example: 50,
                        },
                        createdAt: {
                          type: "string",
                          format: "date-time",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          400: {
            description: "Validation error.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: {
                      type: "string",
                      example: "Name is required",
                    },
                    success: {
                      type: "boolean",
                      example: false,
                    },
                  },
                },
              },
            },
          },
          500: {
            description: "Internal server error.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: {
                      type: "string",
                      example: "Server error, unable to add product",
                    },
                    success: {
                      type: "boolean",
                      example: false,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/api/v1/products/some-products": {
      get: {
        tags: ["Product Management"],
        summary: "Fetch a paginated list of products",
        description:
          "Fetches a limited number of products per page with optional search by keyword.",
        security: [],
        parameters: [
          {
            name: "page",
            in: "query",
            description: "Page number for pagination (default is 1).",
            required: false,
            schema: {
              type: "integer",
              example: 1,
            },
          },
          {
            name: "keyword",
            in: "query",
            description: "Search keyword for product names.",
            required: false,
            schema: {
              type: "string",
              example: "laptop",
            },
          },
        ],
        responses: {
          200: {
            description: "Products fetched successfully.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                      example: "Products fetched successfully",
                    },
                    success: {
                      type: "boolean",
                      example: true,
                    },
                    count: {
                      type: "integer",
                      example: 100,
                    },
                    products: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          _id: {
                            type: "string",
                            example: "64b7c2e9c8b6c",
                          },
                          name: {
                            type: "string",
                            example: "Product Name",
                          },
                          price: {
                            type: "number",
                            example: 199.99,
                          },
                        },
                      },
                    },
                    page: {
                      type: "integer",
                      example: 1,
                    },
                    pages: {
                      type: "integer",
                      example: 10,
                    },
                    hasMore: {
                      type: "boolean",
                      example: true,
                    },
                  },
                },
              },
            },
          },
          500: {
            description: "Server error.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: {
                      type: "string",
                      example: "Server error, unable to fetch products",
                    },
                    success: {
                      type: "boolean",
                      example: false,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/api/v1/products/all-products": {
      get: {
        tags: ["Product Management"],
        summary: "Fetch all products",
        description:
          "Fetches all products with a default limit of 12 and sorted by creation date.",
        security: [],
        responses: {
          200: {
            description: "Products fetched successfully.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                      example: "All products fetched successfully",
                    },
                    success: {
                      type: "boolean",
                      example: true,
                    },
                    count: {
                      type: "integer",
                      example: 100,
                    },
                    products: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          _id: {
                            type: "string",
                            example: "64b7c2e9c8b6c",
                          },
                          name: {
                            type: "string",
                            example: "Product Name",
                          },
                          price: {
                            type: "number",
                            example: 199.99,
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          500: {
            description: "Server error.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: {
                      type: "string",
                      example: "Server error, unable to fetch products",
                    },
                    success: {
                      type: "boolean",
                      example: false,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/api/v1/products/top-products": {
      get: {
        tags: ["Product Management"],
        summary: "Fetch top products",
        description:
          "Fetches the top 4 newest products sorted by creation date.",
        security: [],
        responses: {
          200: {
            description: "Top products fetched successfully.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                      example: "Top products fetched successfully",
                    },
                    success: {
                      type: "boolean",
                      example: true,
                    },
                    count: {
                      type: "integer",
                      example: 4,
                    },
                    products: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          _id: {
                            type: "string",
                            example: "64b7c2e9c8b6c",
                          },
                          name: {
                            type: "string",
                            example: "Product Name",
                          },
                          price: {
                            type: "number",
                            example: 199.99,
                          },
                          createdAt: {
                            type: "string",
                            format: "date-time",
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          500: {
            description: "Server error.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: {
                      type: "string",
                      example: "Server error, unable to fetch top products",
                    },
                    success: {
                      type: "boolean",
                      example: false,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/api/v1/products/new-products": {
      get: {
        tags: ["Product Management"],
        summary: "Fetch new products",
        description: "Fetches the 5 newest products sorted by creation date.",
        security: [],
        responses: {
          200: {
            description: "New products fetched successfully.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                      example: "New products fetched successfully",
                    },
                    success: {
                      type: "boolean",
                      example: true,
                    },
                    count: {
                      type: "integer",
                      example: 5,
                    },
                    products: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          _id: {
                            type: "string",
                            example: "64b7c2e9c8b6c",
                          },
                          name: {
                            type: "string",
                            example: "Product Name",
                          },
                          price: {
                            type: "number",
                            example: 199.99,
                          },
                          createdAt: {
                            type: "string",
                            format: "date-time",
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          500: {
            description: "Server error.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: {
                      type: "string",
                      example: "Server error, unable to fetch new products",
                    },
                    success: {
                      type: "boolean",
                      example: false,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/api/v1/products/product-details/{id}": {
      get: {
        tags: ["Product Management"],
        summary: "Fetch product by ID",
        description: "Fetches the details of a product by its ID.",
        security: [],
        parameters: [
          {
            name: "id",
            in: "path",
            description: "The unique ID of the product.",
            required: true,
            schema: {
              type: "string",
              example: "64b7c2e9c8b6c",
            },
          },
        ],
        responses: {
          200: {
            description: "Product fetched successfully.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                      example: "Product fetched successfully",
                    },
                    success: {
                      type: "boolean",
                      example: true,
                    },
                    product: {
                      type: "object",
                      properties: {
                        _id: {
                          type: "string",
                          example: "64b7c2e9c8b6c",
                        },
                        name: {
                          type: "string",
                          example: "Product Name",
                        },
                        price: {
                          type: "number",
                          example: 199.99,
                        },
                        description: {
                          type: "string",
                          example: "Product description",
                        },
                        category: {
                          type: "string",
                          example: "Electronics",
                        },
                        brand: {
                          type: "string",
                          example: "Brand Name",
                        },
                        quantity: {
                          type: "integer",
                          example: 50,
                        },
                        createdAt: {
                          type: "string",
                          format: "date-time",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          404: {
            description: "Product not found.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: {
                      type: "string",
                      example: "Product not found",
                    },
                    success: {
                      type: "boolean",
                      example: false,
                    },
                  },
                },
              },
            },
          },
          500: {
            description: "Server error.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: {
                      type: "string",
                      example: "Server error, unable to fetch product",
                    },
                    success: {
                      type: "boolean",
                      example: false,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/api/v1/products/update-product/{id}": {
      put: {
        tags: ["Product Management"],
        summary: "Update product details",
        description:
          "Allows an admin to update the details of a product by its ID.",
        parameters: [
          {
            name: "id",
            in: "path",
            description: "The unique ID of the product.",
            required: true,
            schema: {
              type: "string",
              example: "64b7c2e9c8b6c",
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: {
                    type: "string",
                    example: "Updated Product Name",
                  },
                  description: {
                    type: "string",
                    example: "Updated description",
                  },
                  price: {
                    type: "number",
                    example: 249.99,
                  },
                  category: {
                    type: "string",
                    example: "Updated Category",
                  },
                  quantity: {
                    type: "integer",
                    example: 30,
                  },
                  brand: {
                    type: "string",
                    example: "Updated Brand",
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "Product updated successfully.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                      example: "Product updated successfully",
                    },
                    success: {
                      type: "boolean",
                      example: true,
                    },
                    product: {
                      type: "object",
                      properties: {
                        _id: {
                          type: "string",
                          example: "64b7c2e9c8b6c",
                        },
                        name: {
                          type: "string",
                          example: "Updated Product Name",
                        },
                        price: {
                          type: "number",
                          example: 249.99,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          404: {
            description: "Product not found.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: {
                      type: "string",
                      example: "Product not found",
                    },
                    success: {
                      type: "boolean",
                      example: false,
                    },
                  },
                },
              },
            },
          },
          500: {
            description: "Server error.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: {
                      type: "string",
                      example: "Server error, unable to update product",
                    },
                    success: {
                      type: "boolean",
                      example: false,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/api/v1/products/remove-product/{id}": {
      delete: {
        tags: ["Product Management"],
        summary: "Remove a product",
        description: "Allows an admin to remove a product by its ID.",
        parameters: [
          {
            name: "id",
            in: "path",
            description: "The unique ID of the product.",
            required: true,
            schema: {
              type: "string",
              example: "64b7c2e9c8b6c",
            },
          },
        ],
        responses: {
          200: {
            description: "Product removed successfully.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                      example: "Product removed successfully",
                    },
                    success: {
                      type: "boolean",
                      example: true,
                    },
                    product: {
                      type: "object",
                      properties: {
                        _id: {
                          type: "string",
                          example: "64b7c2e9c8b6c",
                        },
                        name: {
                          type: "string",
                          example: "Product Name",
                        },
                        price: {
                          type: "number",
                          example: 199.99,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          404: {
            description: "Product not found.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: {
                      type: "string",
                      example: "Product not found",
                    },
                    success: {
                      type: "boolean",
                      example: false,
                    },
                  },
                },
              },
            },
          },
          500: {
            description: "Server error.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: {
                      type: "string",
                      example: "Server error, unable to remove product",
                    },
                    success: {
                      type: "boolean",
                      example: false,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/api/v1/products/filtered-products": {
      post: {
        tags: ["Product Management"],
        summary: "Filter products",
        description:
          "Filters products based on selected categories and price range.",
        security: [],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  checked: {
                    type: "array",
                    items: {
                      type: "string",
                      example: "Electronics",
                    },
                  },
                  radio: {
                    type: "array",
                    items: {
                      type: "number",
                    },
                    example: [100, 500],
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "Products filtered successfully.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                      example: "Products filtered successfully",
                    },
                    success: {
                      type: "boolean",
                      example: true,
                    },
                    count: {
                      type: "integer",
                      example: 10,
                    },
                    products: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          _id: {
                            type: "string",
                            example: "64b7c2e9c8b6c",
                          },
                          name: {
                            type: "string",
                            example: "Filtered Product Name",
                          },
                          price: {
                            type: "number",
                            example: 350.99,
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          500: {
            description: "Server error.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: {
                      type: "string",
                      example: "Server error, unable to filter products",
                    },
                    success: {
                      type: "boolean",
                      example: false,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/api/v1/cart/get-cart-items": {
      get: {
        tags: ["Cart Management"],
        summary: "Get cart items",
        description: "Fetch the cart items for the authenticated user.",
        responses: {
          200: {
            description: "Cart fetched successfully.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                      example: "Cart fetched successfully",
                    },
                    success: {
                      type: "boolean",
                      example: true,
                    },
                    count: {
                      type: "integer",
                      example: 3,
                    },
                    cart: {
                      type: "object",
                      properties: {
                        userId: {
                          type: "string",
                          example: "64b7c2e9c8b6c",
                        },
                        items: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              productId: {
                                type: "string",
                                example: "64b7c2e9c8b6d",
                              },
                              quantity: {
                                type: "integer",
                                example: 2,
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          404: {
            description: "Cart not found for this user.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: {
                      type: "string",
                      example: "Cart not found for this user",
                    },
                    success: {
                      type: "boolean",
                      example: false,
                    },
                  },
                },
              },
            },
          },
          500: {
            description: "Server error.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: {
                      type: "string",
                      example: "Server error, unable to fetch cart",
                    },
                    success: {
                      type: "boolean",
                      example: false,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/api/v1/cart/add-items-to-cart": {
      post: {
        tags: ["Cart Management"],
        summary: "Add items to cart",
        description: "Adds a product to the authenticated user's cart.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  productId: {
                    type: "string",
                    example: "64b7c2e9c8b6d",
                  },
                  quantity: {
                    type: "integer",
                    example: 2,
                  },
                },
                required: ["productId", "quantity"],
              },
            },
          },
        },
        responses: {
          201: {
            description: "Product added to cart successfully.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                      example: "Product added to cart successfully",
                    },
                    success: {
                      type: "boolean",
                      example: true,
                    },
                    cart: {
                      type: "object",
                    },
                  },
                },
              },
            },
          },
          400: {
            description: "Validation error.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: {
                      type: "string",
                      example: "Product ID is required",
                    },
                    success: {
                      type: "boolean",
                      example: false,
                    },
                  },
                },
              },
            },
          },
          404: {
            description: "Product not found.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: {
                      type: "string",
                      example: "Product not found",
                    },
                    success: {
                      type: "boolean",
                      example: false,
                    },
                  },
                },
              },
            },
          },
          500: {
            description: "Server error.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: {
                      type: "string",
                      example: "Server error, unable to add product to cart",
                    },
                    success: {
                      type: "boolean",
                      example: false,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/api/v1/cart/cart-items/{id}": {
      put: {
        tags: ["Cart Management"],
        summary: "Update cart item quantity",
        description:
          "Updates the quantity of a product in the cart for the authenticated user.",
        parameters: [
          {
            name: "id",
            in: "path",
            description: "Product ID to update in the cart.",
            required: true,
            schema: {
              type: "string",
              example: "64b7c2e9c8b6d",
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  quantity: {
                    type: "integer",
                    example: 5,
                  },
                },
                required: ["quantity"],
              },
            },
          },
        },
        responses: {
          200: {
            description: "Cart updated successfully.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                      example: "Cart updated successfully",
                    },
                    success: {
                      type: "boolean",
                      example: true,
                    },
                    cart: {
                      type: "object",
                    },
                  },
                },
              },
            },
          },
          400: {
            description: "Validation error.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: {
                      type: "string",
                      example: "Quantity must be greater than zero",
                    },
                    success: {
                      type: "boolean",
                      example: false,
                    },
                  },
                },
              },
            },
          },
          404: {
            description: "Cart or item not found.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: {
                      type: "string",
                      example: "Item not found in cart",
                    },
                    success: {
                      type: "boolean",
                      example: false,
                    },
                  },
                },
              },
            },
          },
          500: {
            description: "Server error.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: {
                      type: "string",
                      example: "Server error, unable to update cart",
                    },
                    success: {
                      type: "boolean",
                      example: false,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/api/v1/cart/cart-item/{id}": {
      delete: {
        tags: ["Cart Management"],
        summary: "Remove product from cart",
        description:
          "Removes a product from the cart for the authenticated user.",
        parameters: [
          {
            name: "id",
            in: "path",
            description: "The ID of the product to remove from the cart.",
            required: true,
            schema: {
              type: "string",
              example: "64b7c2e9c8b6d",
            },
          },
        ],
        responses: {
          200: {
            description: "Item removed from cart successfully.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                      example: "Item removed from cart successfully",
                    },
                    success: {
                      type: "boolean",
                      example: true,
                    },
                    cart: {
                      type: "object",
                    },
                  },
                },
              },
            },
          },
          404: {
            description: "Cart or item not found.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: {
                      type: "string",
                      example: "Item not found in cart",
                    },
                    success: {
                      type: "boolean",
                      example: false,
                    },
                  },
                },
              },
            },
          },
          500: {
            description: "Server error.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: {
                      type: "string",
                      example: "Server error, unable to remove item from cart",
                    },
                    success: {
                      type: "boolean",
                      example: false,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};