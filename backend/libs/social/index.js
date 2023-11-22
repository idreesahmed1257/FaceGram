const Social = require("../../models/social.model");

const createSocialUser = async (userId, faceBookData, platform) => {
    try {
        let user = await Social.create({
            user_id: userId,
            social_id: faceBookData?.id,
            name: faceBookData?.name,
            picture_url: faceBookData?.picture?.data?.url,
            token: faceBookData?.accessToken,
            platform: platform

        });
        return user;
    } catch (err) {
        throw err;
    }
};

const findSocialUser = async obj => {
    try {
        let user = await Social.find(obj);
        if (user?.length)
            return user[0];
        else {
            return false;
        }
    } catch (err) {
        return false;
    }
}



module.exports = {
    createSocialUser,
    findSocialUser
};