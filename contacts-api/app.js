const express = require("express");
const cors = require("cors");
require("dotenv").config();

const mongodb = require("./db/connect");
const contactsRoutes = require("./routes/contacts");

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Contacts API is running");
});

app.use("/contacts", contactsRoutes);

mongodb.initDb((err) => {
  if (err) {
    console.error("Failed to connect to MongoDB:", err);
  } else {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }
});