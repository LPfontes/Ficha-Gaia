const mongoose = require('mongoose');

const aprimoramentoSchema = new mongoose.Schema({
  tipo: { type: String, required: true },
  descricao: { type: String, required: true }
});

const efeitoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  custoPE: { type: Number},
  descricao: { type: String, required: true },
  restricao: { type: String}
});

const HabilidadeSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  custoPE: { type: Number },
  tipoAcao: { type: String },
  categorias: { type: [String] },
  descricaoFlavor: { type: String },
  efeitoPrincipal: { type: String },
  Tecnicas: { type: [String]},
  alcance: { type: String },
  duracao:  { type: String },
  efeitosAdicionais: [efeitoSchema],
  aprimoramentos: [aprimoramentoSchema],
  teste: { type: String },
  caminho:{ type: String }
});
async function criarModeloPorCaminho(habilidades) {
  const modelos = {};

  for (const habilidade of habilidades) {
    const { caminho } = habilidade;

    // Cria ou utiliza o modelo já existente
    if (!modelos[caminho]) {
      modelos[caminho] = mongoose.model(
        caminho,
        HabilidadeSchema,
        caminho
      );
    }
    // Insere a habilidade na collection específica
    await modelos[caminho].create(habilidade);
  }
}
const getModelByCaminho = (caminho) => {
  return mongoose.model(caminho, HabilidadeSchema, caminho);
};

module.exports = {getModelByCaminho, criarModeloPorCaminho };
