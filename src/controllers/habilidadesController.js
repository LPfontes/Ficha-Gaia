const habilidade = require('../models/Habilidade'); // Caminho para o modelo base
async function getHabilidade (req, res) {
    const { caminho, id } = req.params;
    // Buscando o armamento pelo nome ou ID
    try {
        const habilidadeModel = habilidade.getModelByCaminho(caminho); // Obtém o modelo baseado na categoria
        const habilidade = await habilidadeModel.findById(id); // Busca pelo ID
    
        if (habilidade) {
          res.status(200).json(habilidade);
        } else {
          res.status(404).json({ error: 'habilidade não encontrado' });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar habilidade' });
      }
}
async function getHabilidadesCaminho (req, res) {
    const caminho = req.params.caminho;
    // Buscando o armamento pelo nome ou ID
    try {
        const habilidadeModel = habilidade.getModelByCaminho(caminho); // Obtém o modelo baseado na categoria
        const habilidades = await habilidadeModel.find(); 
    
        if (habilidades) {
          res.status(200).json(habilidades);
        } else {
          res.status(404).json({ error: 'habilidades não encontrado' });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar habilidades' });
      }
}
module.exports = {getHabilidade,getHabilidadesCaminho };