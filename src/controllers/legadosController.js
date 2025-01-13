const mongoose = require('mongoose');
const legado = require('../models/legado'); // Caminho para o modelo base

async function getLegado (req, res) {
  try {
    legado.find({ nome: req.params.nome }).then(legado => {
    if (legado[0]) {
      res.status(200).json(legado[0]);
    } else {
      res.status(404).json({ error: 'legado não encontrado' });
    }
  });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar legado' });
  }
}
async function getAllLegado (req, res) {
    try {
      legado.find({}).then(legados => {
        res.status(200).json(legados);
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar legado' });
    }
  }
module.exports = {getLegado,getAllLegado};