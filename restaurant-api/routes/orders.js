const { requireAuth } = require("../middleware/auth");
const express = require("express");
const router = express.Router();

const ordersController = require("../controllers/orders");

/*
  #swagger.tags = ['Orders']
  #swagger.summary = 'Get all orders'
  #swagger.responses[200] = {
    description: 'Orders retrieved successfully'
  }
*/
router.get("/", ordersController.getAllOrders);

/*
  #swagger.tags = ['Orders']
  #swagger.summary = 'Get an order by ID'
  #swagger.parameters['id'] = {
    in: 'path',
    description: 'MongoDB order ID',
    required: true,
    type: 'string'
  }
  #swagger.responses[200] = {
    description: 'Order retrieved successfully'
  }
  #swagger.responses[400] = {
    description: 'Invalid order ID'
  }
  #swagger.responses[404] = {
    description: 'Order not found'
  }
*/
router.get("/:id", ordersController.getOrderById);

/*
  #swagger.tags = ['Orders']
  #swagger.summary = 'Create a new order'
  #swagger.parameters['body'] = {
    in: 'body',
    description: 'Order information',
    required: true,
    schema: {
      customerName: 'Nephi Imo',
      customerPhone: '08012345678',
      items: ['Jollof Rice and Chicken', 'Bottled Water'],
      totalAmount: 5000,
      status: 'pending',
      deliveryAddress: 'Ikeja, Lagos',
      orderDate: '2026-07-17'
    }
  }
  #swagger.responses[201] = {
    description: 'Order created successfully'
  }
  #swagger.responses[400] = {
    description: 'Validation failed'
  }
*/
router.post("/", requireAuth, ordersController.createOrder);

/*
  #swagger.tags = ['Orders']
  #swagger.summary = 'Update an order by ID'
  #swagger.parameters['id'] = {
    in: 'path',
    description: 'MongoDB order ID',
    required: true,
    type: 'string'
  }
  #swagger.parameters['body'] = {
    in: 'body',
    description: 'Updated order information',
    required: true,
    schema: {
      customerName: 'Nephi Imo',
      customerPhone: '08012345678',
      items: ['Jollof Rice and Chicken', 'Bottled Water'],
      totalAmount: 5000,
      status: 'confirmed',
      deliveryAddress: 'Ikeja, Lagos',
      orderDate: '2026-07-17'
    }
  }
  #swagger.responses[204] = {
    description: 'Order updated successfully'
  }
  #swagger.responses[400] = {
    description: 'Invalid ID or validation failed'
  }
  #swagger.responses[404] = {
    description: 'Order not found'
  }
*/
router.put("/:id", requireAuth, ordersController.updateOrder);

/*
  #swagger.tags = ['Orders']
  #swagger.summary = 'Delete an order by ID'
  #swagger.parameters['id'] = {
    in: 'path',
    description: 'MongoDB order ID',
    required: true,
    type: 'string'
  }
  #swagger.responses[204] = {
    description: 'Order deleted successfully'
  }
  #swagger.responses[400] = {
    description: 'Invalid order ID'
  }
  #swagger.responses[404] = {
    description: 'Order not found'
  }
*/
router.delete("/:id", requireAuth, ordersController.deleteOrder);

module.exports = router;