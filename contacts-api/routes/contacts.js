const express = require("express");
const router = express.Router();

const contactsController = require("../controllers/contacts");

/*
  #swagger.tags = ['Contacts']
  #swagger.summary = 'Get all contacts'
*/
router.get("/", contactsController.getAllContacts);

/*
  #swagger.tags = ['Contacts']
  #swagger.summary = 'Get contact by ID'
*/
router.get("/:id", contactsController.getSingleContact);

/*
  #swagger.tags = ['Contacts']
  #swagger.summary = 'Create a new contact'
  #swagger.parameters['body'] = {
    in: 'body',
    description: 'Create a new contact',
    required: true,
    schema: {
      firstName: 'Max',
      lastName: 'Noi',
      email: 'max@example.com',
      favoriteColor: 'Blue',
      birthday: '2003-01-01'
    }
  }
*/
router.post("/", contactsController.createContact);

/*
  #swagger.tags = ['Contacts']
  #swagger.summary = 'Update a contact by ID'
  #swagger.parameters['body'] = {
    in: 'body',
    description: 'Update contact information',
    required: true,
    schema: {
      firstName: 'Max',
      lastName: 'Noi-Updated',
      email: 'max.updated@example.com',
      favoriteColor: 'Green',
      birthday: '2003-01-01'
    }
  }
*/
router.put("/:id", contactsController.updateContact);

/*
  #swagger.tags = ['Contacts']
  #swagger.summary = 'Delete a contact by ID'
*/
router.delete("/:id", contactsController.deleteContact);

module.exports = router;