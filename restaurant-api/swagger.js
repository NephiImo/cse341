const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Restaurant Management API",
    description:
      "API documentation for managing restaurant menu items and customer orders"
  },

  host: "localhost:8082",
  schemes: ["http"],

  tags: [
    {
      name: "Menu Items",
      description: "Menu item management"
    },
    {
      name: "Orders",
      description: "Customer order management"
    }
  ]
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./app.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);