const mongoose = require('mongoose');

const Tecnica = require('./src/models/Tecnicas');
const connectDB = require('./src/config/dbConfig');
const dotenv = require('dotenv');
dotenv.config();

// Função para deletar uma habilidade pelo nome
async function deletarUmaHabilidadePorNome(nome) {
  try {
    const Tecnicas = await Tecnica.find({ nome });
    if (Tecnicas.length > 1) {
      await Tecnica.deleteOne({ _id: Tecnicas[1]._id });
      console.log(`Uma habilidade com o nome "${nome}" foi deletada.`);
    } else {
      console.log(`Nenhuma habilidade com o nome "${nome}" foi encontrada.`);
    }
  } catch (error) {
    console.error('Erro ao deletar a habilidade:', error);
  }
}
connectDB().then(async () => {
[
  "Animal Selvagem",
  "Criatura do Homuncularium",
  "Domar Criatura",
  "Ataque Sincronizado",
  "Regra Especial de Criatura Aliada",
  "Evoluindo uma Criatura Aliada",
  "Resistência ao Repouso Desconfortável",
  "Imunidade ao Combate Aquático",
  "Estabilização Instintiva",
  "Infravisão",
  "Adaptação Selvagem",
  "Sequência Marcial",
  "Avanço Místico",
  "Energizar",
  "Truque Arcano",
  "Manejo com Armamentos Leves",
  "Manejo com Armamentos Pesados",
  "Ciclone de Aço",
  "Recuperar o Fôlego",
  "Postura Defensiva",
  "Proteger",
  "Catalisador Místico"
  ].forEach(async (nome) => {
deletarUmaHabilidadePorNome(nome);})  
  });