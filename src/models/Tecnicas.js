const mongoose = require('mongoose');

const TecnicaSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    custoPE: { type: Number, required: true },
    tipoAcao: { type: String, required: true },
    descricao: { type: String, required: true },
    restricao: { type: String },
    teste: { type: String },
  });
  module.exports = mongoose.model('Tecnica', TecnicaSchema);