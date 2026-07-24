const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger.json");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const mongodb = require("./db/connect");
const menuItemsRoutes = require("./routes/menuItems");
const ordersRoutes = require("./routes/orders");
const session = require("express-session");
const { MongoStore } = require("connect-mongo");
const passport = require("./config/passport");
const authRoutes = require("./routes/auth");

const app = express();
const port = process.env.PORT || 8082;

app.use(cors());
app.use(express.json());

const isProduction = process.env.BASE_URL?.startsWith("https://");

if (isProduction) {
  app.set("trust proxy", 1);
}

app.use(
  session({
    name: "restaurant.sid",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,

    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
      dbName: process.env.MONGODB_DATABASE,
      collectionName: "sessions"
    }),

    cookie: {
      httpOnly: true,
      secure: isProduction,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000
    }
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Restaurant API is running"
    });
});

app.use("/auth", authRoutes);
app.use("/menu-items", menuItemsRoutes);
app.use("/orders", ordersRoutes);

app.use(
  "/api-docs", 
  swaggerUi.serve,
  swaggerUi.setup(swaggerFile, {
    swaggerOptions: {
      withCredentials: true
    }
  })
  );

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