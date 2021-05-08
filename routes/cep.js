const express = require('express');
const router = express.Router();
const Cep = require('../models/Cep');
router.get('/', (req, res) => {
    res.status(200).send("Teste do metodo get");
});

//Recurso para incluir

router.post('/add', (req, res)=>{
  /*  res.status(201).send("Cep criado com sucesso");
    console.log(req.body);
    */
   let {cep, logradouro, bairro} = req.body;

   //inclusão
    Cep.create({
        cep,
        logradouro,
        bairro
    })
        .then(()=>res.status(201).send("Cep cadastrado com sucesso"))
        .catch(err => console.log(err));
});

module.exports = router;