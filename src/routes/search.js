const express = require("express");
const UsuarioController = require("../controllers/Usuario");
const Usuario = require("../models/Usuario");
const rota = express.Router();
const middlewareAuth = require("../middlewares/Auth");

rota.use(middlewareAuth);


rota.get("/", (req, res, next) => UsuarioController.buscarUsuario(req.headers.authorization.replace("Bearer ", ""), req.user_id, (err, dados) => {
    if (err)
        return res.status(401).json({
            "mensagem": err,
        });
    if (!dados)
        return res.status(401).json({
            "mensagem": "Usuário e/ou senha inválidos",
        });
    else
        return res.status(200).json(dados);
}));
module.exports = app => app.use("/user", rota);