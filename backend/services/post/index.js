const express = require("express");
const router = express.Router();
const routes = require("./routes/index");
const auth = require("../../middlewares/auth");

router.post("/createPost", auth, async (req, res) =>
  routes["postRoute"](req, res, "createPost")
);

router.get("/getPostById", auth, async (req, res) =>
  routes["postRoute"](req, res, "getPostById")
);

router.get("/getAllPosts", async (req, res) =>
  routes["postRoute"](req, res, "getAllPosts")
);

router.put("/updatePost", auth, async (req, res) =>
  routes["postRoute"](req, res, "updatePost")
);

router.delete("/deletePost", auth, async (req, res) =>
  routes["postRoute"](req, res, "deletePost")
);

//Comments

router.post("/createComment", auth, async (req, res) =>
  routes["postRoute"](req, res, "createComment")
);

//Likes
router.post("/likePost", async (req, res) =>
  routes["postRoute"](req, res, "likePost")
);
module.exports = router;
