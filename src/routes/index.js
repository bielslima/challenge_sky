module.exports = {
    configurarRotas: (app) => {
        //Rota 'default' para reponder todas as solicitações inexistentes;
        app.get('*', (req, res) => {
            res.status(404).json({
                "mensagem": `A rota '${req.url}' não existe!`,
            });
        });

        require("./Usuario")(app);
    }
};