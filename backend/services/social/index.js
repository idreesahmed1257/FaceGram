const express = require("express");
const router = express.Router();
const routes = require("./routes/index");
const auth = require("../../middlewares/auth");

router.post("/createFacebookUser", auth, (req, res) =>
    routes["socialRoute"](req, res, "createFacebookUser")
);

router.get("/getFacebookUser", auth, (req, res) =>
    routes["socialRoute"](req, res, "getFacebookUser")
);

router.get("/getAllPages", auth, (req, res) =>
    routes["socialRoute"](req, res, "getAllPages")
)

router.get("/getFacebookPagePosts", auth, (req, res) =>
    routes["socialRoute"](req, res, "getFacebookPagePosts")
)

router.get("/getFacebookPageChats", auth, (req, res) =>
    routes["socialRoute"](req, res, "getFacebookPageChats")
)

// router.get("/getNextFacebookPageChat", auth, (req, res) =>
//     routes["socialRoute"](req, res, "getNextChats")
// )

router.post("/sendMessagePageToClient", auth, (req, res) =>
    routes["socialRoute"](req, res, "sendMessagePageToClient")
)

router.post("/postComment", auth, (req, res) =>
    routes["socialRoute"](req, res, "postComment")
)



module.exports = router;
