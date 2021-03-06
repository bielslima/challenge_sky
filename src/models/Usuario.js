const mongoose = require("../config/database");
const UsuarioSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  token: {
    type: String,
  },
  nome: {
    type: String,
    required: true,
  },
  senha: {
    type: String,
    required: true,
  },
  telefones: [
    {
      numero: String,
      ddd: String,
    }
  ],
  ultimo_login: {
    type: Date,
    default: Date.now(),
  },
  data_criacao: {
    type: Date,
    default: Date.now(),
  },
  data_atualizacao: {
    type: Date,
    default: Date.now(),
  },
});

UsuarioSchema.pre("save", function (next) {
  this.atualizadoEm = Date.now();
  return next();
});

const Usuario = mongoose.model("Usuario", UsuarioSchema);
module.exports = Usuario;
