const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger.json");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const mongodb = require("./db/connect");
const menuItemsRoutes = require("./routes/menuItems");
const ordersRoutes = require("./routes/orders");

const app = express();
const port = process.env.PORT || 8082;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Restaurant API is running"
    });
});

app.use("/menu-items", menuItemsRoutes);
app.use("/orders", ordersRoutes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

const startServer = async () => {
  try {
    await mongodb.initDb();

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start the server:", error.message);
    process.exit(1);
  }
};

startServer();