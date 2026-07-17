const { MongoClient } = require("mongodb");
require("dotenv").config();

let database;

const initDb = async () => {
  if (database) {
    return database;
  }

  const connectionString = process.env.MONGODB_URI;
  const databaseName = process.env.MONGODB_DATABASE;

  if (!connectionString) {
    throw new Error("MONGODB_URI is missing from the .env file.");
  }

  if (!databaseName) {
    throw new Error("MONGODB_DATABASE is missing from the .env file.");
  }

  const client = new MongoClient(connectionString);

  await client.connect();

  database = client.db(databaseName);

  console.log(`Connected to MongoDB database: ${databaseName}`);

  return database;
};

const getDb = () => {
  if (!database) {
    throw new Error("Database has not been initialized.");
  }

  return database;
};

module.exports = {
  initDb,
  getDb
};