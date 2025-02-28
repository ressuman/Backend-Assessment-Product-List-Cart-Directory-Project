// import mongoose from "mongoose";
// import { MongoMemoryServer } from "mongodb-memory-server";
// import server from "../server.js";

// let mongod;

// beforeAll(async () => {
//   mongod = await MongoMemoryServer.create();
//   const uri = mongod.getUri();
//   process.env.MONGO_DB_URI = uri;
// });

// afterAll(async () => {
//   await mongoose.disconnect();
//   await mongod.stop();

//   await server.close();
// });

// afterEach(async () => {
//   const collections = mongoose.connection.collections;
//   for (const key in collections) {
//     const collection = collections[key];
//     await collection.deleteMany();
//   }
// });

const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../server");

beforeAll(async () => {
  await mongoose.connect(
    "mongodb+srv://ressuman001:yt3c28PlCN4t5jF8@backendassessment0.sve5r.mongodb.net/testdb"
  );
});

afterAll(async () => {
  await mongoose.connection.close();
});
