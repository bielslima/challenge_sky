require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const rotas = require("./routes/index");
const express = require("express");
const app = express();
const porta = process.env.PORT || 3555;

rotas.configurarRotas(app);

// app.use(cors());

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

app.listen(porta, () => {
    console.log(`Serviço rodando na url: http://localhost:${porta}`);
});
