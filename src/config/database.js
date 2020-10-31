const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/sky", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    connectTimeoutMS: 5000,
  })
  .then(() => {
    console.log("Banco conectado!");
  })
  .catch((e) => {
    console.log("Falha ao conectar o banco de dados: ", e.message);
  });
mongoose.Promise = global.Promise;
module.exports = mongoose;
