const validateMenuItem = (menuItem) => {
  const errors = [];

  if (!menuItem.name || typeof menuItem.name !== "string") {
    errors.push("Name is required and must be a string.");
  }

  if (!menuItem.description || typeof menuItem.description !== "string") {
    errors.push("Description is required and must be a string.");
  }

  if (!menuItem.category || typeof menuItem.category !== "string") {
    errors.push("Category is required and must be a string.");
  }

  if (
    typeof menuItem.price !== "number" ||
    Number.isNaN(menuItem.price) ||
    menuItem.price <= 0
  ) {
    errors.push("Price is required and must be a positive number.");
  }

  if (typeof menuItem.available !== "boolean") {
    errors.push("Available is required and must be a boolean.");
  }

  if (
    typeof menuItem.prepTimeMinutes !== "number" ||
    Number.isNaN(menuItem.prepTimeMinutes) ||
    menuItem.prepTimeMinutes <= 0
  ) {
    errors.push(
      "Preparation time is required and must be a positive number."
    );
  }

  if (
    !Array.isArray(menuItem.ingredients) ||
    menuItem.ingredients.length === 0
  ) {
    errors.push("Ingredients must be a non-empty array.");
  }

  if (!menuItem.imageUrl || typeof menuItem.imageUrl !== "string") {
    errors.push("Image URL is required and must be a string.");
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

module.exports = {
  validateMenuItem
};