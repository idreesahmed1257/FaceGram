const express = require("express");
const { validate } = require("express-validation");
const validation = require("./validator.js");
const routes = require("./routes/index.js");
const auth = require("../../middlewares/auth.js");
const upload = require("../../middlewares/multer.js");
const router = express.Router();

router.post("/login", validate(validation.loginValidation), (req, res) =>
  routes["authRoute"](req, res, "login")
);

router.post("/register", validate(validation.registerValidation), (req, res) =>
  routes["authRoute"](req, res, "register")
);

router.put(
  "/updateUser",
  [auth, upload.single("userProfile")],
  async (req, res) => routes["authRoute"](req, res, "updateUser")
);

router.get("/getAllUsers", (req, res) =>
  routes["authRoute"](req, res, "getAllUsers")
);

module.exports = router;
