const express = require('express');
const router = express.Router();
const Cep = require('../models/Cep');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

router.get('/', (req, res) => {
    res.status(200).send("Teste do metodo get");
});

//Recurso para incluir

router.post('/add', (req, res) => {
    /*  res.status(201).send("Cep criado com sucesso");
      console.log(req.body);
      */
    let { cep, logradouro, bairro } = req.body;

    //inclusão
    Cep.create({
        cep,
        logradouro,
        bairro
    })
        .then(() => res.status(201).send("Cep cadastrado com sucesso"))
        .catch(err => console.log(err));
});
//pesquisar por ID
router.get('/selId/:id', (req, res) => {
    let v_id = req.params.id;

    Cep.findByPk(v_id)
        .then(data => {
            if (data == null) {
                res.status(204).send({});
            } else {
                res.status(200).send(data);
            }
        })
        .catch(err => {
            res.status(500).send({ message: 'Erro ao pesquisar o cep' });
        })
});
//pesquisar por cep
router.get('/selAA', (req, res) => {
    let { cep, logradouro, bairro } = req.body;
    Cep.findAll({
        where: {
            cep : {
                [Op.like] : `%${cep}%`
            }
        }
    })
    .then(data =>{
        res.status(200).send(data);
    })
    .catch(err =>{
        res.status(500).send({message: "erro na pesquisa"})
    })
});
//recurso para excluir o registro
router.delete('/delId/:id', (req, res) => {
    let v_id = req.params.id;
    Cep.destroy({
        where: { id: v_id }
    })
        .then(result => {
            if (result == 1) {
                res.status(200).send({ message: "Cep excluido com sucesso" })
            } else {
                res.status(204).send({});
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Nao foi possivel excluir, ta com raiva morde as costas" });
        })

});
//recurso para alterar os valores no banco de dados
router.put('/updId/:id', (req, res) => {
    let v_id = req.params.id;
    Cep.update(req.body, {
        where: { id: v_id }
    })
        .then(result => {
            if (result == 1) {
                res.status(200).send({ message: "cep alterado com suuuuuucesssuuuuu" })
            } else {
                res.status(204).send({})
            }
        })
        .catch(err => {
            res.status(500).send({ message: "erro na alteração" });
        });
});

module.exports = router;