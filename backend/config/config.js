require("dotenv").config();
const mongoose = require("mongoose");

const mongoString = `mongodb+srv://admin:${process.env
  .MONGO_PASS}@cluster0.gshhd2o.mongodb.net/node-api?retryWrites=true&w=majority`;

const connectMongoDB = (http, port) => {

  mongoose
    .connect(mongoString)
    .then(() => {
      console.log("MongoDB Connected");
      http.listen(port, () => {
        console.log("Backend is running on port", port);
      });
    })
    .catch(err => console.log("Error:", err));

}
module.exports = {
  mongoString,
  connectMongoDB
};
