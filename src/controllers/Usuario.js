const Usuario = require("../models/Usuario");
const Erro = require("../utils/Erros");

class UsuarioController{
    constructor() { }
    static async criarUsuario(usuario = {}, cb) {
        try {
            const usr = new Usuario(usuario);
            usr.token = "123456";
            usr.save((err, doc) => {
                if (err.errors) {
                    let erros = [];
                    Object.keys(err.errors).map((k) => erros.push(err.errors[k].message));
                    cb(erros[0], null);
                    return;
                }
                if (err)
                    cb(Erro.mensagem(err.code), null);
                else
                    cb(null, doc);
            });
        } catch (erro) {
            console.log("deu ruimzao");
            cb(erro, null);
        }
    }
}

module.exports = UsuarioController;