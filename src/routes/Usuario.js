const express = require("express");
const UsuarioController = require("../controllers/Usuario");
const rota = express.Router();

rota.post("/", (req, res, next) => UsuarioController.criarUsuario(req.body, (err, dados) => {
    console.log(req.body);
    if (err)
        return res.status(400).json({
            "mensagem": err,
        });
    else
        return res.json(dados);
}));

module.exports = app => app.use("/sign-up", rota);