const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Temple API",
    description: "Temple API documentation"
  },
  host: "localhost:8081",
  schemes: ["http"]
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/temple.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);