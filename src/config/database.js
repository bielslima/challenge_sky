const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/sky", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Banco conectado!");
  });
mongoose.Promise = global.Promise;
module.exports = mongoose;
