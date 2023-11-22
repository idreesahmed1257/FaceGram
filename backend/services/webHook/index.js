const express = require("express");
const router = express.Router();
const routes = require("./routes/index");
router.get("/webhook", (req, res) =>
    routes["hookRoute"](req, res, "getWebhook")
);

router.post("/webhook", (req, res) =>
    routes["hookRoute"](req, res, "postWebhook")
);

router.get("/dook", (req, res) =>
    routes["hookRoute"](req, res, "testSocket")
);

module.exports = router;
