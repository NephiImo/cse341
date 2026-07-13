const { ObjectId } = require("mongodb");
const mongodb = require("../db/connect");

const getAllContacts = async (req, res) => {
  try {
    const db = mongodb.getDb();

    const contacts = await db.collection("contacts").find().toArray();

    res.setHeader("Content-Type", "application/json");
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving contacts",
      error: error.message
    });
  }
};

const getSingleContact = async (req, res) => {
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
};

const createContact = async (req, res) => {
  try {
    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };

    if (
      !contact.firstName ||
      !contact.lastName ||
      !contact.email ||
      !contact.favoriteColor ||
      !contact.birthday
    ) {
      return res.status(400).json({
        message: "All fields are required."
      });
    }

    const response = await mongodb
      .getDb()
      .collection("contacts")
      .insertOne(contact);

    if (response.acknowledged) {
      res.status(201).json({ id: response.insertedId });
    } else {
      res.status(500).json({
        message: "Some error occurred while creating the contact."
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateContact = async (req, res) => {
  try {
    const contactId = req.params.id;

    if (!ObjectId.isValid(contactId)) {
      return res.status(400).json({
        message: "Invalid contact ID"
      });
    }

    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };

    if (
      !contact.firstName ||
      !contact.lastName ||
      !contact.email ||
      !contact.favoriteColor ||
      !contact.birthday
    ) {
      return res.status(400).json({
        message: "All fields are required."
      });
    }

    const response = await mongodb
      .getDb()
      .collection("contacts")
      .replaceOne({ _id: new ObjectId(contactId) }, contact);

    if (response.matchedCount === 0) {
      return res.status(404).json({
        message: "Contact not found"
      });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteContact = async (req, res) => {
  try {
    const contactId = req.params.id;

    if (!ObjectId.isValid(contactId)) {
      return res.status(400).json({
        message: "Invalid contact ID"
      });
    }

    const response = await mongodb
      .getDb()
      .collection("contacts")
      .deleteOne({ _id: new ObjectId(contactId) });

    if (response.deletedCount === 0) {
      return res.status(404).json({
        message: "Contact not found"
      });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllContacts,
  getSingleContact,
  createContact,
  updateContact,
  deleteContact
};