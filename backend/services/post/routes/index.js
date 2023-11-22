const post = require("../../../controllers/post");

exports.postRoute = async (req, res, name) => {
  try {
    const resp = await post[name](req);
    res.status(resp?.code || 200).json(resp);
  } catch (err) {
    res.status(err).json(err);
  }
};
