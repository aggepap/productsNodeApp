const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;
const productsSchema = new Schema(
  {
    product: { type: String, required: true, unique: true, trim: true },
    cost: { type: Number, required: true },
    description: { type: String, required: true, trim: true },
    quantity: { type: Number, required: true },
  },
  {
    collection: "products",
    timestamps: true,
  }
);

productsSchema.plugin(uniqueValidator);
module.exports = mongoose.model("Products", productsSchema);
