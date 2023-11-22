const connectWebSocket = (io, callback) => {
    io.on('connection', (socket) => {
        socket.emit('connection', 'connected')
        // When a user connects, store their socket with a user identifier (e.g., user ID)
        // console.log(`User connected: ${socket.id}`);
        callback(socket); // Invoke the callback with the socket object'

        socket.on('disconnect', () => {
            // Remove the user from the connected users map when they disconnect
            // console.log(`User disconnected: ${socket.id}`);
        });
    });
    // console.log("Finished");
}


module.exports = {
    connectWebSocket,
}