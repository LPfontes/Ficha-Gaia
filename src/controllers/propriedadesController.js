const mongoose = require('mongoose');
const Propriedade = require('../models/Propriedade'); // Caminho para o modelo base

async function getPropiedade (req, res) {
  try {
    propriedade = await Propriedade.find({ nome: req.params.nome });
    if (propriedade[0]) {
      res.status(200).json(propriedade[0]);
    } else {
      res.status(404).json({ error: 'Armamento não encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar armamento' });
  }
}
module.exports = getPropiedade;