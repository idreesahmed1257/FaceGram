const {
  findUser,
  createUser,
  updateUserData,
  getUsers,
  updateFacebookData
} = require("../libs/auth");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../helpers/auth/authHelper");
const {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SERVER_ERROR,
  USER_ALREADY_EXIST,
  REGISTER_FAILURE,
  REGISTER_SUCCESS,
  USER_NOT_FOUND,
  USER_UPDATE_SUCCESS,
  EMAIL_IS_NOT_REGISTERED
} = require("../constants/constants");

async function register(req) {
  return new Promise(async (resolve, reject) => {
    try {
      const { userName, email, password } = req.body;
      let isDuplicate = await findUser({ email: email });
      if (isDuplicate) {
        return resolve({
          code: 409,
          message: USER_ALREADY_EXIST
        });
      }

      const token = generateToken(email);
      var hashedPassword = await bcrypt.hash(password, 10);
      let user = await createUser(userName, req.body, hashedPassword, token);
      if (user) {
        user.password = "";
        return resolve({
          code: 200,
          message: REGISTER_SUCCESS,
          data: user
        });
      } else {
        return resolve({
          code: 400,
          message: REGISTER_FAILURE
        });
      }
    } catch (err) {
      return resolve({
        code: 500,
        message: SERVER_ERROR
      });
    }
  });
}

const login = req => {
  return new Promise(async (resolve, reject) => {
    try {
      const { email, password } = req.body;
      let user = await findUser({ email: email });
      if (user) {
        let auth = await bcrypt.compare(password, user.password);
        if (auth) {
          user.password = "";
          user.token = generateToken(email);
          return resolve({
            code: 200,
            message: LOGIN_SUCCESS,
            data: user
          });
        }
        else {
          return resolve({
            code: 401,
            message: LOGIN_FAILURE
          });
        }
      }
      else {
        return resolve({
          code: 401,
          message: EMAIL_IS_NOT_REGISTERED
        });
      }
    } catch (err) {
      return resolve({
        code: 500,
        message: SERVER_ERROR
      });
    }
  });
};


async function updateUser(req) {
  return new Promise(async (resolve, reject) => {
    try {
      const { userName, userId } = req.body;
      let obj = {
        userName
      };
      if (req.file) {
        obj.userProfile = req.file.path;
      }
      const updatedUser = await updateUserData(userId, obj);
      if (!updatedUser) {
        return resolve({
          code: 401,
          message: USER_NOT_FOUND
        });
      } else {
        updateUser.password = "";
        return resolve({
          code: 200,
          message: USER_UPDATE_SUCCESS,
          data: updatedUser
        });
      }
    } catch (err) {
      return resolve({
        code: 500,
        message: SERVER_ERROR
      });
    }
  });
}




async function getAllUsers() {
  return new Promise(async (resolve, reject) => {
    try {
      let allUsers = await getUsers();
      return resolve({
        code: 200,
        message: USER_UPDATE_SUCCESS,
        data: allUsers
      });
    } catch (err) {
      return resolve({
        code: 500,
        message: SERVER_ERROR
      });
    }

  })
}



module.exports = {
  register,
  getAllUsers,
  login,
  updateUser,
};
