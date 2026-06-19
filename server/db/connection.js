import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI;

if (!uri) {
  throw new Error("MONGO_URI is missing");
}

const client = new MongoClient(uri);

await client.connect();

console.log("MongoDB connected successfully");

const db = client.db("mern_db");

export default db;
