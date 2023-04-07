import { MongoClient } from "mongodb";

// Replace the placeholder with your Atlas connection string
export async function connectToDatabase() {
  const client = await MongoClient.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  return client;
}