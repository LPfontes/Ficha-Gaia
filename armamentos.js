const armamentosmagicos = [
  {
    nome: "Berloques de Energia",
    categoria: "Armamentos Mágicos",
    preco: 10,
    unidade: 5,
    danoBase: 2,
    parametro: "Arcanismo",
    alcance: "6 metros",
    propriedade: ["Ambidestria", "Rasga-Véu"]
  },
  {
    nome: "Catalisadores Místicos",
    categoria: "Armamentos Mágicos",
    preco: 20,
    unidade: 16,
    danoBase: 4,
    parametro: "Arcanismo",
    alcance: "6 metros",
    propriedade: ["Abalo Místico"]
  }
];
const armamentosleves = [
  {
    nome: "Adagas",
    categoria: "Armamentos Leves",
    preco: 6,
    unidade: 8,
    danoBase: 2,
    parametro: "Destreza",
    alcance: "1 metro",
    propriedade: ["Ambidestria", "Perfurar"]
  },
  {
    nome: "Maças",
    categoria: "Armamentos Leves",
    preco: 10,
    unidade: 13,
    danoBase: 2,
    parametro: "Brutalidade",
    alcance: "1 metro",
    propriedade: ["Impacto"]
  },
  {
    nome: "Machados Leves",
    categoria: "Armamentos Leves",
    preco: 10,
    unidade: 13,
    danoBase: 3,
    parametro: "Brutalidade",
    alcance: "1 metro",
    propriedade: ["Afiado"]
  },
  {
    nome: "Espadas Curtas",
    categoria: "Armamentos Leves",
    preco: 12,
    unidade: 14,
    danoBase: 3,
    parametro: "Brutalidade ou Destreza",
    alcance: "1 metro",
    propriedade: ["Prioridade"]
}];
const armamentospesados = [
  {
    nome: "Lanças",
    categoria: "Armamentos Pesados",
    preco: 18,
    unidade: 20,
    danoBase: "3-4",
    parametro: "Brutalidade ou Destreza",
    alcance: "1 metro",
    propriedade: ["Extensão", "Versatilidade"]
  },
  {
    nome: "Martelos de Guerra",
    categoria: "Armamentos Pesados",
    preco: 20,
    unidade: 15,
    danoBase: 4,
    parametro: "Brutalidade",
    alcance: "1 metro",
    propriedade: ["Contundente"]
  },
  {
    nome: "Machados Pesados",
    categoria: "Armamentos Pesados",
    preco: 20,
    unidade: 17,
    danoBase: 5,
    parametro: "Brutalidade",
    alcance: "1 metro",
    propriedade: ["Traspassar"]
  },
  {
    nome: "Espadas Longas",
    categoria: "Armamentos Pesados",
    preco: 24,
    unidade: 20,
    danoBase: 5,
    parametro: "Brutalidade ou Destreza",
    alcance: "1 metro",
    propriedade: ["Prioridade"]
  }];
const armamentosadistacia= [
  {
    nome: "Bestas Pequenas",
    categoria: "Armamentos à Distância",
    preco: 12,
    unidade: 10,
    danoBase: 2,
    parametro: "Destreza",
    alcance: "6 metros",
    propriedade: ["Ambidestria", "Virotes"]
  },
  {
    nome: "Revólveres",
    categoria: "Armamentos à Distância",
    preco: 24,
    unidade: 12,
    danoBase: 3,
    parametro: "Destreza",
    alcance: "8 metros",
    propriedade: ["Tambor"]
  },
  {
    nome: "Arcos",
    categoria: "Armamentos à Distância",
    preco: 10,
    unidade: 10,
    danoBase: 3,
    parametro: "Destreza",
    alcance: "10 metros",
    propriedade: ["Perfurar", "Flechas"]
  },
  {
    nome: "Bestas Grandes",
    categoria: "Armamentos à Distância",
    preco: 20,
    unidade: 12,
    danoBase: 4,
    parametro: "Destreza",
    alcance: "10 metros",
    propriedade: ["Traspassar", "Virotes"]
  },
  {
    nome: "Mosquetes",
    categoria: "Armamentos à Distância",
    preco: 48,
    unidade: 19,
    danoBase: 5,
    parametro: "Destreza",
    alcance: "12 metros",
    propriedade: ["Tambor"]
  }];  
const armamentosEspecial= [
        {
          nome: "Armas de Punho",
          categoria: "Armamentos Especiais",
          preco: 6,
          unidade: 5,
          danoBase: 0,
          parametro: 0,
          alcance: "1 metro",
          propriedade: ["Ambidestria", "Marcialidade"]
}];
module.exports = armamentos;
