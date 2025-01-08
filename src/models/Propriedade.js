const mongoose = require('mongoose');

// Modelo básico de armamento
const PropriedadeSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  descricao:{ type: String, required: true }
});



module.exports = mongoose.model('Propriedade', PropriedadeSchema);