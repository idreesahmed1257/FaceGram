const jwt = require("jsonwebtoken");
const { findUser } = require("../libs/auth");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization");

    // Check if the token is missing
    // console.log("Token::", token)
    if (!token) {
      return res.status(401).send("Unauthorized :: Please Provide Token");
    }

    jwt.verify(token.split(" ")[1], process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).send(err);
      }

      req.jwt = decoded;

      // Check if the email already exists
      const isAlreadyExist = findUser({ email: decoded.email });
      if (!isAlreadyExist) {
        return res.status(401).send("Unauthorized");
      }

      // If everything is valid, proceed to the next middleware
      next();
    });
  } catch (e) {
    res.status(401).send(e);
  }
};

module.exports = auth;
