const Usuario = require("../models/Usuario");
const Erro = require("../utils/Erros");
const gerarToken = require("../utils/GerarToken");
const crypt = require("../utils/Crypt");

class UsuarioController{
    constructor() { }
    static async criarUsuario(usuario = {}, cb) {
        try {
            usuario.senha = crypt(usuario.senha);
            const usr = new Usuario(usuario);
            usr.token = gerarToken({ user_id: usr.id });
            usr.save((err, doc) => {
                //Verifica se o banco retornou o map `errors` de verificaçaõ de campos na gravação do registro.
                if (err && err.errors) {
                    let erros = [];
                    Object.keys(err.errors).map((k) => erros.push(err.errors[k].message));
                    cb(erros[0], null);
                    return;
                }
                //Verifica se o banco retornou algum erro com código pré definido, por exemplo `duplicate key` para a unique key (email).
                if (err) {
                    cb(Erro.mensagem(err.code), null);
                    return;
                } else {
                    cb(null, doc);
                    return;
                }
            });
        } catch (erro) {
            console.log(erro);
            cb(erro, null);
            return;
        }
    }

    static async buscarUsuario(token, user_id, cb) {
        /*
            Nem todas as verificações da sessão 'Buscar usuário' estão nessa função, algumas estão no prórío middleware de Auth.
            (../middlewares/Auth.js)
        */
        try {
            Usuario.findById(user_id, (err, doc) => {
                if (err && err.errors) {
                    let erros = [];
                    Object.keys(err.errors).map((k) => erros.push(err.errors[k].message));
                    cb(erros[0], null);
                    return;
                }
                if (err) {
                    cb(Erro.mensagem(err.code), null);
                    return;
                } else {
                    if (!doc) {
                        cb("Não autorizado", null);
                        return;
                    } else {
                        if (doc.token == token) {
                            /*
                                ● Caso seja o mesmo token, verificar se o último login foi a MENOS que 30
                                  minutos atrás.
                            */
                            var dtLimite = new Date(Date.now() - 1000 * (60 * 30));
                            if (doc.ultimo_login < dtLimite) {
                                /*
                                  ● Caso não seja a MENOS que 30 minutos atrás, retornar erro com status
                                    apropriado com mensagem "Sessão inválida".
                                */
                                cb('Sessão inválida', null);
                                return;
                            } else {
                                /*
                                     ● Caso tudo esteja ok, retornar o usuário.
                                */
                                cb(null, doc);
                                return;
                            }
                        } else {
                            /*
                                ● Caso não seja o mesmo token, retornar erro com status apropriado e mensagem
                                  "Não autorizado"
                            */
                            cb("Não autorizado", null);
                            return;
                        }
                    }
                        
                }
            });
        } catch (erro) {
            console.log(erro);
            cb(erro, null);
            return;
        }
    }

    static async loginUsuario(usuario = {}, cb) {
        try {
            Usuario.findOne({
                email: usuario.email,
                senha: crypt(usuario.senha),
            }, (err, doc) => {
                if (err && err.errors) {
                    let erros = [];
                    Object.keys(err.errors).map((k) => erros.push(err.errors[k].message));
                    cb(erros[0], null);
                    return;
                }
                if (err) {
                    cb(Erro.mensagem(err.code), null);
                    return;
                } else {
                    doc.token = gerarToken({ user_id: doc.id }); //atualizando token por cada login
                    doc.ultimo_login = Date.now(); // e atualizando a ultima atividade de login;
                    doc.save((err, docSaved) => {
                        if (err && err.errors) {
                            let erros = [];
                            Object.keys(err.errors).map((k) => erros.push(err.errors[k].message));
                            cb(erros[0], null);
                            return;
                        }
                        if (err) {
                            cb(Erro.mensagem(err.code), null);
                            return;
                        } else {
                            cb(null, docSaved);
                            return;
                        }
                    });
                        
                }
            });
        } catch (erro) {
            console.log(erro);
            cb(erro, null);
        }
    }
}

module.exports = UsuarioController;