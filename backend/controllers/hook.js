const { getSocket } = require("../config/socket");
const { SERVER_ERROR } = require("../constants/constants");
const { messageParser } = require("../helpers/Facebook/FbChatHelper");
const socket = require('../server');

const getWebhook = async (req, res) => {
    return new Promise(async (resolve, reject) => {
        console.log("Verifying First every time")
        try {
            const VERIFY_TOKEN = '12345'; // Replace with your Verify Token
            const { mode, verify_token, challenge } = req.query;
            console.log('Mode', mode);
            console.log('Token', verify_token);
            if (mode === 'subscribe' && verify_token === VERIFY_TOKEN) {
                // Respond with the challenge to verify the webhook
                // return resolve(res.status(200).send(challenge));

                console.log('Challenge', challenge);
                // res.status(200).send(challenge)
                return resolve({
                    code: 200,
                    message: challenge
                });
            } else {
                // Respond with an error if verification fails
                return resolve(res.sendStatus(403));
            }
        }

        catch (err) {
            return resolve({
                code: 403,
                message: SERVER_ERROR
            });
        }
    }
    )
}


const postWebhook = async (req, res) => {
    return new Promise(async (resolve, reject) => {
        try {
            // console.log("calling ym webhook")
            const data = req.body;
            if (data.object === 'page') {
                console.log('Data in Page', data);
                // userSocket = getSocket();
                if (socket.userSocket) {
                    const messageData = await messageParser(data)
                    console.log("Message Data", messageData);
                    // socket.ioObject.sockets.in(socket.socketId).emit("notification", messageData);
                    socket.userSocket.emit('notification', messageData); // Send notification to the user's socket
                    // console.log("socketId:", socket.userSocket.id)
                    // userSocket.emit('notification', messageData); // Send notification to the user's socket
                    return resolve({
                        code: 200,
                        message: "Success"
                    });
                } else {
                    return resolve({
                        code: 403,
                        message: "Error"
                    });
                }
            } else {
                return resolve({
                    code: 403,
                    message: "Error"
                });
            }
        } catch (err) {
            console.log('Error', err);
            return resolve({
                code: 403,
                message: "Error"
            });
        }
    })
}



const testSocket = async (req, res) => {
    socket.ioObject.sockets.in("_room" + req.body.id).emit("connection", "How are You ?");
    // console.log("Socket", socket.ioObject.sockets.in("_room" + req.body.id));
    return {
        code: 200,
        message: "Success"
    }
}





module.exports = {
    getWebhook,
    postWebhook,
    testSocket

}