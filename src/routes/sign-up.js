const express = require("express");
const UsuarioController = require("../controllers/Usuario");
const Usuario = require("../models/Usuario");
const rota = express.Router();

//Rota SIGN-UP
rota.post("/", (req, res, next) => UsuarioController.criarUsuario(req.body, (err, dados) => {
    if (err)
        return res.status(400).json({
            "mensagem": err,
        });
    else
        return res.status(201).json(dados);
}));
module.exports = app => app.use("/sign-up", rota);