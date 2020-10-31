const express = require("express");
const UsuarioController = require("../controllers/Usuario");
const Usuario = require("../models/Usuario");
const rota = express.Router();

//Rota SIGN-IN
rota.post("/", (req, res, next) => UsuarioController.loginUsuario(req.body, (err, dados) => {
    if (err)
        return res.status(400).json({
            "mensagem": err,
        });
    if (!dados)
        return res.status(401).json({
            "mensagem": "Usuário e/ou senha inválidos",
        });
    else
        return res.status(200).json(dados);
}));
module.exports = app => app.use("/sign-in", rota);