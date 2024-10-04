const User = require("../models/user.model");

findLastInsertedUser = async () => {
  console.log("find last inserted user");

  try {
    const res = await User.find({}).sort({ _id: -1 }).limit(1);
    return res[0];
  } catch (err) {
    console.log("could not return last inserted user");
  }
};
module.exports = { findLastInsertedUser };
