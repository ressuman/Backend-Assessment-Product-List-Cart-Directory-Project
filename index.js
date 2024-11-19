import dotenv from "dotenv";
dotenv.config();

import dbconfig from "./config/dBConfig.js";

import server from "./server.js";

const PORT = process.env.PORT_NUMBER || 3320;
const HOST = process.env.PORT_HOST || "localhost";

server.listen(PORT, HOST, () => {
  console.log(
    `Server is running: Listening to requests at http://${HOST}:${PORT}`
  );
});
