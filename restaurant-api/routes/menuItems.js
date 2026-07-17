const express = require("express");
const router = express.Router();

const menuItemsController = require("../controllers/menuItems");

/*
  #swagger.tags = ['Menu Items']
  #swagger.summary = 'Get all menu items'
  #swagger.responses[200] = {
    description: 'Menu items retrieved successfully'
  }
*/
router.get("/", menuItemsController.getAllMenuItems);

/*
  #swagger.tags = ['Menu Items']
  #swagger.summary = 'Get a menu item by ID'
  #swagger.parameters['id'] = {
    in: 'path',
    description: 'MongoDB menu item ID',
    required: true,
    type: 'string'
  }
  #swagger.responses[200] = {
    description: 'Menu item retrieved successfully'
  }
  #swagger.responses[400] = {
    description: 'Invalid menu item ID'
  }
  #swagger.responses[404] = {
    description: 'Menu item not found'
  }
*/
router.get("/:id", menuItemsController.getMenuItemById);

/*
  #swagger.tags = ['Menu Items']
  #swagger.summary = 'Create a menu item'
  #swagger.parameters['body'] = {
    in: 'body',
    description: 'Menu item information',
    required: true,
    schema: {
      name: 'Jollof Rice and Chicken',
      description: 'Smoky Nigerian jollof rice served with grilled chicken',
      category: 'Main Meal',
      price: 4500,
      available: true,
      prepTimeMinutes: 25,
      ingredients: ['rice', 'tomatoes', 'pepper', 'chicken'],
      imageUrl: 'https://example.com/jollof-rice.jpg'
    }
  }
  #swagger.responses[201] = {
    description: 'Menu item created successfully'
  }
  #swagger.responses[400] = {
    description: 'Validation failed'
  }
*/
router.post("/", menuItemsController.createMenuItem);

/*
  #swagger.tags = ['Menu Items']
  #swagger.summary = 'Update a menu item by ID'
  #swagger.parameters['id'] = {
    in: 'path',
    description: 'MongoDB menu item ID',
    required: true,
    type: 'string'
  }
  #swagger.parameters['body'] = {
    in: 'body',
    description: 'Updated menu item information',
    required: true,
    schema: {
      name: 'Jollof Rice and Grilled Chicken',
      description: 'Smoky Nigerian jollof rice served with seasoned grilled chicken',
      category: 'Main Meal',
      price: 5000,
      available: true,
      prepTimeMinutes: 30,
      ingredients: ['rice', 'tomatoes', 'pepper', 'onions', 'chicken'],
      imageUrl: 'https://example.com/jollof-rice-updated.jpg'
    }
  }
  #swagger.responses[204] = {
    description: 'Menu item updated successfully'
  }
  #swagger.responses[400] = {
    description: 'Invalid ID or validation failed'
  }
  #swagger.responses[404] = {
    description: 'Menu item not found'
  }
*/
router.put("/:id", menuItemsController.updateMenuItem);

/*
  #swagger.tags = ['Menu Items']
  #swagger.summary = 'Delete a menu item by ID'
  #swagger.parameters['id'] = {
    in: 'path',
    description: 'MongoDB menu item ID',
    required: true,
    type: 'string'
  }
  #swagger.responses[204] = {
    description: 'Menu item deleted successfully'
  }
  #swagger.responses[400] = {
    description: 'Invalid menu item ID'
  }
  #swagger.responses[404] = {
    description: 'Menu item not found'
  }
*/
router.delete("/:id", menuItemsController.deleteMenuItem);

module.exports = router;