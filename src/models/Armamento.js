const mongoose = require('mongoose');

// Modelo básico de armamento
const ArmamentoBaseSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  categoria: { type: String, required: true },
  preco: { type: Number, required: true },
  unidade: { type: Number, required: true },
  danoBase: { type: mongoose.Schema.Types.Mixed, required: true }, // Pode ser número ou string
  parametro: { type: String },
  alcance: { type: String },
  propriedade: { type: [String] },
});

// Função para criar um modelo dinâmico baseado na categoria
const getModelByCategoria = (categoria) => {
  return mongoose.model(categoria, ArmamentoBaseSchema, categoria);
};

module.exports = getModelByCategoria;
