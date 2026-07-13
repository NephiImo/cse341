const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Contacts API",
    description: "API documentation for CSE341 Contacts Project",
  },

  host: "cse341-ujj4.onrender.com",
  basePath: "/contacts",
  schemes: ["https"],
  
  tags: [
    {
      name: "Contacts",
      description: "Contact management endpoints",
    },
  ],

  definitions: {
    Contact: {
      firstName: "Nephi",
      lastName: "Imo",
      email: "nephi@example.com",
      favoriteColor: "Blue",
      birthday: "2003-01-01",
    },
  },
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/contacts.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);