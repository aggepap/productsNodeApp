const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = 3000;
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger");
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", express.static("files"));
app.use(
  cors({
    // origin: "*",
    origin: ["http://localhost:8000", "http://www.aueb.gr"],
  })
);

mongoose.connect(process.env.MONGODB_URI).then(
  () => {
    console.log("Connection to database established");
  },
  (err) => {
    console.log("Connection to database failed");
  }
);
const userRouter = require("./routes/user.routes");
const productRouter = require("./routes/product.routes");
const userProductRouter = require("./routes/users.product.routes");

app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/user-product", userProductRouter);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument.options));

module.exports = app;
