const express = require("express");
const app = express();
const port = 5000;
const cors = require("cors");
const bodyParser = require("body-parser");
const { connectMongoDB } = require("./config/config");
const { SERVER_ERROR } = require("./constants/constants");
require("dotenv").config();

//Web Socket Logic
const http = require('http').Server(app);
const io = require('socket.io')(http, {
  cors: {
    origin: "https://localhost:3000"
  }
});

connectMongoDB(http, port);

app.use(cors());
app.get("/", (req, res) => {
  res.send("Hello World!");
}
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/uploads", express.static("uploads"));
app.use("/api", require("./router/router"));

// connectWebSocket(io, (socket) => {
//   // console.log("socket in callback::", socket);
//   userSocket = socket; // Assign the socket to the userSocket variable
// });


io.sockets.on("connection", function (socket) {
  // Everytime a client logs in, display a connected message
  console.log("Server-Client Connected!", socket.id);
  socket.emit('connection', 'connected')
  module.exports.userSocket = socket;
});


// module.exports.ioObject = io;

// const getSocket = (socket) => {
//   console.log("socket:", socket);
//   userSocket = socket; // Assign the socket to the userSocket variable
// }


// app.get('/', connectSocket(io), (req, res) => {
//   console.log("res1:", req.dataFromMiddleware1);
//   console.log("res2:", req.socketFromMiddleware);
//   console.log("res3:", res.locals.someVar)
//   res.send(req.dataFromMiddleware1);
// })





