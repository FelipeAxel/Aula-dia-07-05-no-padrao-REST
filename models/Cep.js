const Sequellize = require('sequelize');
const db = require('../db/connections');

const Cep = db.define('cep', {
cep: {type: Sequellize.STRING,},
bairro: {type: Sequellize.STRING,},
logradouro: {type: Sequellize.STRING,}
});
module.exports = Cep;