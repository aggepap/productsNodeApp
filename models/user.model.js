const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;
const addressSchema = new Schema(
  {
    area: { type: String },
    road: { type: String },
  },
  { _id: false }
);
const phoneSchema = new Schema(
  {
    type: { type: String },
    number: { type: String },
  },
  { _id: false }
);
const productsSchema = new Schema({
  product: { type: String },
  quantity: { type: Number, required: true },
  cost: { type: Number },
  date: { type: Date, default: Date.now },
});

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required field"],
      max: 100,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required field"],
      max: 100,
    },
    name: {
      type: String,
      required: [true, "name is required field"],
      max: 100,
    },
    lastname: {
      type: String,
      required: [true, "lastname is required field"],
      max: 100,
    },
    email: {
      type: String,
      required: [true, "email is required field"],
      max: 100,
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Email address is not valid",
      ],
    },
    adress: addressSchema,
    phone: { type: [phoneSchema] },
    products: { type: [productsSchema], null: true },
  },
  {
    collection: "users",
    timestamps: true,
  }
);

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model("User", userSchema);
