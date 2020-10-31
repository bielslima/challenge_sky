module.exports = {
    configurarRotas: (app) => {
        //Rota 'default' para reponder todas as solicitações inexistentes;
        require("./sign-in")(app); //[POST] /sign-in/ 
        require("./sign-up")(app); //[POST] /sign-up/ 
        require("./search")(app);  //[GET]  /user/ 
        
        app.get('*', (req, res) => {
            res.status(404).json({
                "mensagem": `A rota '${req.url}' não existe!`,
            });
        });
    }
};