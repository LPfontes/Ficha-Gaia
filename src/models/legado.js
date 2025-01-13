const mongoose = require('mongoose');

const habilidadeSchema = new mongoose.Schema({
  nome: String,
  descricao: String
});

const LegadoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  habilidades: [habilidadeSchema]
});

module.exports = mongoose.model('Legado', LegadoSchema);