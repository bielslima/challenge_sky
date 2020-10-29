require("dotenv").config({
    path:`${__dirname}'/./../${process.env.NODE_ENV}/.env'`
})
const express = require("express")
const app = express()

app.get('*', function (req, res) {
    res.json(404, {
      "mensagem":`A rota '${req.url}' não existe!`,
  })
})
app.listen(3333, ()=>{
    console.log("server is running");
})