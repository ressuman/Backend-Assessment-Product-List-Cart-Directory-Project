import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import server from "../server.js";

let mongod;

beforeAll(async () => {
  mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();
  process.env.MONGO_DB_URI = uri;
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongod.stop();

  await server.close();
});

afterEach(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany();
  }
});
