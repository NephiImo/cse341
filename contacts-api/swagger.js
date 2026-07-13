const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Contacts API",
    description: "API documentation for CSE341 Contacts Project"
  },
  host: "localhost:8080",
  schemes: ["http"]
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/contacts.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);