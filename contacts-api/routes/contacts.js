const express = require("express");
const { ObjectId } = require("mongodb");
const mongodb = require("../db/connect");

const router = express.Router();

// GET all contacts
router.get("/", async (req, res) => {
  try {
    const db = mongodb.getDb();

    const contacts = await db
      .collection("contacts")
      .find()
      .toArray();

    res.setHeader("Content-Type", "application/json");
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving contacts",
      error: error.message
    });
  }
});

// GET one contact by ID
router.get("/:id", async (req, res) => {
  try {
    const contactId = req.params.id;

    if (!ObjectId.isValid(contactId)) {
      return res.status(400).json({
        message: "Invalid contact ID"
      });
    }

    const db = mongodb.getDb();

    const contact = await db
      .collection("contacts")
      .findOne({ _id: new ObjectId(contactId) });

    if (!contact) {
      return res.status(404).json({
        message: "Contact not found"
      });
    }

    res.setHeader("Content-Type", "application/json");
    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving contact",
      error: error.message
    });
  }
});

module.exports = router;