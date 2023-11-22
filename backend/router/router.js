const express = require("express");
const auth = require("../middlewares/auth");
const router = express.Router();
const { ValidationError } = require("express-validation");



// Auth Routes
router.use("", require("../services/auth/index"));
// socialRoute
router.use("", require("../services/social/index"));
//mixed routes
router.use("", require("../services/post/index"));

router.use("", require("../services/webHook/index"));

router.use(function (err, req, res, next) {
  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json({
      code: err.statusCode,
      message: err.details.body[0].message
    });
  }
  return res.status(500).json(err);
});

// router.get('/apip2', (req, res) => {
//   console.log("userSocket in router:", userSocket);
//   // userSocket.emit('message', 'Hello'); // Send notification to the user's socket
//   res.send("Hello");
// })

module.exports = router;
