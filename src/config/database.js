const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGOURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("DATABASE CONNECTED!");
  });
mongoose.Promise = global.Promise;
module.exports = mongoose;
