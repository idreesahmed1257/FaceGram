const hook = require('../../../controllers/hook');

exports.hookRoute = async (req, res, name) => {
    try {
        const resp = await hook[name](req);
        console.log(resp);
        res.status(resp?.code).send(resp?.message);
    } catch (err) {
        // console.log(err);
        res.status(err).json(err);
    }
};
