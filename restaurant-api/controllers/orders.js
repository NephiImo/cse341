const { ObjectId } = require("mongodb");
const mongodb = require("../db/connect");
const { validateOrder } = require("../validation/orderValidation");

const getAllOrders = async (req, res) => {
  try {
    const orders = await mongodb
      .getDb()
      .collection("orders")
      .find()
      .toArray();

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while retrieving orders.",
      error: error.message
    });
  }
};

const getOrderById = async (req, res) => {
  try {
    const orderId = req.params.id;

    if (!ObjectId.isValid(orderId)) {
      return res.status(400).json({
        message: "Invalid order ID."
      });
    }

    const order = await mongodb
      .getDb()
      .collection("orders")
      .findOne({
        _id: new ObjectId(orderId)
      });

    if (!order) {
      return res.status(404).json({
        message: "Order not found."
      });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while retrieving the order.",
      error: error.message
    });
  }
};

const createOrder = async (req, res) => {
  try {
    const order = {
      customerName: req.body.customerName,
      customerPhone: req.body.customerPhone,
      items: req.body.items,
      totalAmount: req.body.totalAmount,
      status: req.body.status,
      deliveryAddress: req.body.deliveryAddress,
      orderDate: req.body.orderDate
    };

    const validation = validateOrder(order);

    if (!validation.isValid) {
      return res.status(400).json({
        message: "Order validation failed.",
        errors: validation.errors
      });
    }

    const result = await mongodb
      .getDb()
      .collection("orders")
      .insertOne(order);

    res.status(201).json({
      id: result.insertedId
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while creating the order.",
      error: error.message
    });
  }
};

const updateOrder = async (req, res) => {
  try {
    const orderId = req.params.id;

    if (!ObjectId.isValid(orderId)) {
      return res.status(400).json({
        message: "Invalid order ID."
      });
    }

    const order = {
      customerName: req.body.customerName,
      customerPhone: req.body.customerPhone,
      items: req.body.items,
      totalAmount: req.body.totalAmount,
      status: req.body.status,
      deliveryAddress: req.body.deliveryAddress,
      orderDate: req.body.orderDate
    };

    const validation = validateOrder(order);

    if (!validation.isValid) {
      return res.status(400).json({
        message: "Order validation failed.",
        errors: validation.errors
      });
    }

    const result = await mongodb
      .getDb()
      .collection("orders")
      .replaceOne(
        {
          _id: new ObjectId(orderId)
        },
        order
      );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        message: "Order not found."
      });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while updating the order.",
      error: error.message
    });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const orderId = req.params.id;

    if (!ObjectId.isValid(orderId)) {
      return res.status(400).json({
        message: "Invalid order ID."
      });
    }

    const result = await mongodb
      .getDb()
      .collection("orders")
      .deleteOne({
        _id: new ObjectId(orderId)
      });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        message: "Order not found."
      });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while deleting the order.",
      error: error.message
    });
  }
};

module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder
};