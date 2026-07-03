const { MongoClient } = require("mongodb");
require("dotenv").config();

let database;

const initDb = (callback) => {
  if (database) {
    console.log("Database is already initialized.");
    return callback(null, database);
  }

  const connectionString = process.env.MONGO_URI || process.env.MONGODB_URI;

  if (!connectionString) {
    return callback(
      new Error("Missing MongoDB connection string. Set MONGO_URI in .env.")
    );
  }

  MongoClient.connect(connectionString)
    .then((client) => {
      database = client.db();
      console.log("Connected to MongoDB");
      callback(null, database);
    })
    .catch((err) => {
      callback(err);
    });
};

const getDb = () => {
  if (!database) {
    throw Error("Database not initialized");
  }
  return database;
};

module.exports = {
  initDb,
  getDb
};
