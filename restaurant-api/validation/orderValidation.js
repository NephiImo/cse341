const allowedStatuses = [
  "pending",
  "confirmed",
  "preparing",
  "ready",
  "delivered",
  "cancelled"
];

const validateOrder = (order) => {
  const errors = [];

  if (!order.customerName || typeof order.customerName !== "string") {
    errors.push("Customer name is required and must be a string.");
  }

  if (!order.customerPhone || typeof order.customerPhone !== "string") {
    errors.push("Customer phone is required and must be a string.");
  }

  if (!Array.isArray(order.items) || order.items.length === 0) {
    errors.push("Items must be a non-empty array.");
  }

  if (
    typeof order.totalAmount !== "number" ||
    Number.isNaN(order.totalAmount) ||
    order.totalAmount <= 0
  ) {
    errors.push("Total amount must be a positive number.");
  }

  if (
    !order.status ||
    typeof order.status !== "string" ||
    !allowedStatuses.includes(order.status)
  ) {
    errors.push(
      `Status must be one of: ${allowedStatuses.join(", ")}.`
    );
  }

  if (
    !order.deliveryAddress ||
    typeof order.deliveryAddress !== "string"
  ) {
    errors.push("Delivery address is required and must be a string.");
  }

  if (!order.orderDate || typeof order.orderDate !== "string") {
    errors.push("Order date is required and must be a string.");
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

module.exports = {
  validateOrder
};