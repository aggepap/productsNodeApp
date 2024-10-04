const User = require("../models/user.model");
// const logger = require("../logger/logger");

exports.findAll = async (req, res) => {
  console.log("Find All Users");

  try {
    const result = await User.find();
    // logger.info("success in reading all users");
    // logger.error("error in reading all users");
    res.json({ status: true, data: result });
  } catch (err) {
    res.json({ status: false, data: err });
  }
};

exports.findOne = async (req, res) => {
  const username = req.params.username;
  console.log(`Find a user ${username}`);

  try {
    console.log(username);

    const result = await User.findOne({ username });
    res.json({ status: true, data: result });
  } catch (err) {
    res.json({ status: false, data: err });
  }
};
exports.create = async (req, res) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
    name: req.body.name,
    lastname: req.body.lastname,
    email: req.body.email,
    address: {
      area: req.body.area,
      road: req.body.road,
    },
  });
  console.log("Insert user with username", req.body.username);

  try {
    const result = await user.save();
    res.json({ status: true, data: result });
  } catch (err) {
    res.json({ status: false, data: err });
  }
};

exports.update = async (req, res) => {
  const username = req.params.username;
  console.log(`update user with username ${username}`);
  const updatedUser = {
    name: req.body.name,
    lastname: req.body.lastname,
    email: req.body.email,
    address: {
      area: req.body.address.area,
      road: req.body.address.road,
    },
  };

  try {
    const result = await User.findOneAndUpdate(
      { username: username },
      updatedUser,
      { returnDocument: "after" }
    );
    res.json({ status: true, data: result });
  } catch (err) {
    res.json({ status: false, data: err });
  }
};

exports.delete = async (req, res) => {
  const username = req.params.username;
  console.log(`Delete user ${username}`);

  try {
    const result = await User.findOneAndDelete({ username: username });
    res.json({ status: true, data: result });
  } catch (error) {
    res.json({ status: false, data: err });
  }
};
