
const connectSocket = (io) => {
    return (req, res, next) => {
        console.log("Middleware Called") //1
        try {
            req.var1 = "Data of Middleware1"; //3
            res.locals.var2 = 'Responsive respon'; //4
            // callback('socketing'); //2
            io.on('connection', (socket) => {
                socket.emit('connection', 'connected')
                console.log(`User connected: ${socket.id}`);

                // next();
                // callback(socket);
                req.socket = socket; //5
                next();
                socket.on('disconnect', () => {
                    console.log(`User disconnected: ${socket.id}`);
                });
            });

            console.log("Fisnished:")
        } catch (e) {
            console.log(e);
            res.status(401).send(e);
        }
    };
}

const middle = (req, res, next) => {
    console.log("Middleware Called") //1
    try {
        req.var1 = "Data of Middleware1"; //3
        res.locals.var2 = 'Responsive respon'; //4 
        next();
    } catch (e) {
        console.log(e);
        res.status(401).send(e);
    }
};



module.exports = connectSocket;