const { ObjectId } = require("mongodb");
const mongodb = require("../db/connect");
const {
  validateMenuItem
} = require("../validation/menuItemValidation");

const getAllMenuItems = async (req, res) => {
  try {
    const menuItems = await mongodb
      .getDb()
      .collection("menuItems")
      .find()
      .toArray();

    res.status(200).json(menuItems);
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while retrieving menu items.",
      error: error.message
    });
  }
};

const getMenuItemById = async (req, res) => {
  try {
    const menuItemId = req.params.id;

    if (!ObjectId.isValid(menuItemId)) {
      return res.status(400).json({
        message: "Invalid menu item ID."
      });
    }

    const menuItem = await mongodb
      .getDb()
      .collection("menuItems")
      .findOne({
        _id: new ObjectId(menuItemId)
      });

    if (!menuItem) {
      return res.status(404).json({
        message: "Menu item not found."
      });
    }

    res.status(200).json(menuItem);
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while retrieving the menu item.",
      error: error.message
    });
  }
};

const createMenuItem = async (req, res) => {
  try {
    const menuItem = {
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      available: req.body.available,
      prepTimeMinutes: req.body.prepTimeMinutes,
      ingredients: req.body.ingredients,
      imageUrl: req.body.imageUrl
    };

    const validation = validateMenuItem(menuItem);

    if (!validation.isValid) {
      return res.status(400).json({
        message: "Menu item validation failed.",
        errors: validation.errors
      });
    }

    const result = await mongodb
      .getDb()
      .collection("menuItems")
      .insertOne(menuItem);

    res.status(201).json({
      id: result.insertedId
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while creating the menu item.",
      error: error.message
    });
  }
};

const updateMenuItem = async (req, res) => {
  try {
    const menuItemId = req.params.id;

    if (!ObjectId.isValid(menuItemId)) {
      return res.status(400).json({
        message: "Invalid menu item ID."
      });
    }

    const menuItem = {
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      available: req.body.available,
      prepTimeMinutes: req.body.prepTimeMinutes,
      ingredients: req.body.ingredients,
      imageUrl: req.body.imageUrl
    };

    const validation = validateMenuItem(menuItem);

    if (!validation.isValid) {
      return res.status(400).json({
        message: "Menu item validation failed.",
        errors: validation.errors
      });
    }

    const result = await mongodb
      .getDb()
      .collection("menuItems")
      .replaceOne(
        {
          _id: new ObjectId(menuItemId)
        },
        menuItem
      );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        message: "Menu item not found."
      });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while updating the menu item.",
      error: error.message
    });
  }
};

const deleteMenuItem = async (req, res) => {
  try {
    const menuItemId = req.params.id;

    if (!ObjectId.isValid(menuItemId)) {
      return res.status(400).json({
        message: "Invalid menu item ID."
      });
    }

    const result = await mongodb
      .getDb()
      .collection("menuItems")
      .deleteOne({
        _id: new ObjectId(menuItemId)
      });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        message: "Menu item not found."
      });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while deleting the menu item.",
      error: error.message
    });
  }
};

module.exports = {
  getAllMenuItems,
  getMenuItemById,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem
};