const axios = require('axios');
const getFBPages = async token => {
    try {
        const data = await axios.get(`${process.env.FACEBOOK_API_URL_USER}/accounts`, {
            params: {
                fields: "id,name,picture,about,access_token,cover"
            },
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        return data?.data?.data;
    } catch (err) {
        console.log("Err", err?.response?.data?.error?.message)
        throw err;
    }
};

module.exports = {
    getFBPages
};
