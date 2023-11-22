const social = require("../../../controllers/social");

exports.socialRoute = async (req, res, name) => {
    try {
        const resp = await social[name](req);
        // console.log(resp);
        res.status(resp?.code || 200).json(resp);
    } catch (err) {
        // console.log(err);
        res.status(err).json(err);
    }
};
