const mongoose = require('mongoose');
const getModelByCategoria = require('../models/Armamento'); // Caminho para o modelo base

async function getAll (req, res) {
    const categorias = [
        "",
        "Armamentos Leves",
        "Armamentos Pesados",
        "Armamentos à Distância",
        "Armamentos Mágicos",
        "Armamentos Especiais"
      ];
      try {
        const promessas = categorias.map(async (categoria) => {
            if(categoria === ""){
              return {categoria,armamentos:["Armamento"]}
            }else{
              const Model = getModelByCategoria(categoria); // Cria o modelo correspondente
              return { categoria, armamentos: await Model.find() }; // Busca os dados da coleção
            }

          
        });
        
        const armamentosPorCategoria = await Promise.all(promessas);
        return armamentosPorCategoria;
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao buscar armamentos' });
      }
   
    
}
async function getArmamento (req, res) {
    const { categoria, id } = req.params;
    // Buscando o armamento pelo nome ou ID
    try {
        const ArmamentoModel = getModelByCategoria(categoria); // Obtém o modelo baseado na categoria
        const armamento = await ArmamentoModel.findById(id); // Busca pelo ID
    
        if (armamento) {
          res.status(200).json(armamento);
        } else {
          res.status(404).json({ error: 'Armamento não encontrado' });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar armamento' });
      }
}
module.exports = {getArmamento,getAll };