// Importa o módulo Express para criação do servidor
const express = require('express');
const {getArmamento, getAllArmamento} = require('../controllers/armamentosController')
const {getLegado, getAllLegado} = require('../controllers/legadosController')
const getPropiredade = require('../controllers/propriedadesController')
// Função para configurar as rotas da aplicação
const routes = (app) => {
    // Habilita o parsing de JSON no express
    app.use(express.json());
    app.get('/armamento/:categoria/:id', getArmamento);
    app.get("/", async (req,res) => {
        const armamentos = await getAllArmamento(req,res);
        res.render("index",{armamentos});
    });
    app.get('/propriedade/:nome', getPropiredade);
    app.get('/legados', getAllLegado);
    app.get('/legado/:nome', getLegado);
}

// Exporta a configuração de rotas como padrão
module.exports = routes;