import fs from "fs/promises";
import swaggerUi from "swagger-ui-express";
import dotenv from "dotenv";
dotenv.config();

import dbconfig from "./config/dBConfig.js";

import server from "./server.js";

const swaggerDocs = JSON.parse(
  await fs.readFile("./docs/openapi.json", "utf-8")
);

const PORT = process.env.PORT_NUMBER || 3320;
const HOST = process.env.PORT_HOST || "localhost";

server.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

server.listen(PORT, HOST, () => {
  console.log(
    `Server is running: Listening to requests at http://${HOST}:${PORT}`
  );
});
