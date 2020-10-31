const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGOURL, {
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
