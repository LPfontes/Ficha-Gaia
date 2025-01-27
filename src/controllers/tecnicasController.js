const Tecnica = require('../models/Tecnicas'); // Caminho para o modelo base

async function getTecnicas (req, res) {

    try {
        const nomeTecnicas =req.params.lista.split(',');
        let tecnicas = [];
        const promessas = nomeTecnicas.map(async (nomeTecnica) => {
            return await Tecnica.find({nome :nomeTecnica});
        });
        
        const promises = await Promise.all(promessas);
        promises.forEach(tecnica => {
            if(tecnica[0] != null)
              tecnicas.push(tecnica[0]);

        });
        res.status(200).json(tecnicas);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao buscar armamentos' });
      }
  }
  module.exports = getTecnicas;