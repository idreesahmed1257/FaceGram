const jwt = require("jsonwebtoken");

function generateToken(email) {
  const token = jwt.sign({ email }, process.env.JWT_SECRET);
  return token;
}

module.exports = { generateToken };
