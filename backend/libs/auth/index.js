const Users = require("../../models/user.model");


const findUser = async obj => {
  try {
    let user = await Users.find(obj);
    if (user?.length)
      return user[0];
    else {
      return false;
    }
  } catch (err) {
    return false;
  }
};

const createUser = async (userName, body, hashedPassword, token) => {
  try {
    let user = await Users.create({
      userName: userName,
      email: body.email,
      password: hashedPassword,
      token: token,
      createdAt: Date.now()
    });
    return user;
  } catch (err) {
    throw err;
  }
};

const updateUserData = async (userId, obj) => {
  try {
    let updatedUser = await Users.findByIdAndUpdate(userId, obj, { new: true });
    return updatedUser;
  } catch (err) {
    throw err;
  }
};



const getUsers = async (obj = {}) => {
  try {
    let users = await Users.find({});
    return users;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  findUser,
  createUser,
  updateUserData,
  getUsers,
};
