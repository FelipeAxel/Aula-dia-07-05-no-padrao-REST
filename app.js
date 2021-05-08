const express = require('express');
const db = require('./db/connections');
const cep = require('./routes/cep');
const app = express();
const PORT = 3000;

app.use(express.urlencoded({extended:false}));


//Liberação da porta
app.listen(PORT,()=>{
    console.log(`site executando na porta ${PORT}`);
});

//conexão com o banco
db
    .authenticate()
    .then(()=>{
        console.log("conexão com banco de dados ok!");
    })
    .catch(err =>{
        console.log("Erro: ", err);
    });
    //Rota
    app.use('/ceps', cep);