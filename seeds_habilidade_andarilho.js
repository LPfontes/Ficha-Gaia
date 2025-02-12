const mongoose = require('mongoose');

const habilidade = require('./src/models/Habilidade');
const connectDB = require('./src/config/dbConfig');
const dotenv = require('dotenv');
dotenv.config();
// Dados para os armamentos

// Conectar ao banco de dados
connectDB().then(async () => {
    console.log('Conectado ao MongoDB');
    const habilidades = [
      {
        nome: 'COMPANHEIRO FERAL',
        caminho:'Andarilho',
        custoPE: 0,
        tipoAcao: 'Ativa',
        categorias: ['Habilidade de Conexão', 'Habilidade de Criatura'],
        descricaoFlavor: 'Você desperta o potencial de se conectar com criaturas de Auroria. Ao adquirir esta habilidade, você aprende a domar criaturas, podendo possuir uma Criatura Aliada, um Alvo Aliado que irá lutar por você, e seus aliados. Você pode possuir apenas uma Criatura Aliada por vez. Caso você já possua uma Criatura Aliada e queira domar outra criatura, a Criatura Aliada atual perderá todos os seus efeitos de Criatura Aliada, não podendo ser domada novamente.',
        efeitoPrincipal: 'Você adquire a capacidade de domar criaturas, podendo ter uma Criatura Aliada. Ela lutará ao seu lado e de seus aliados, e você pode substituir sua Criatura Aliada por outra, se necessário.',
        Tecnicas: ['Domar Criatura', 'Ataque Sincronizado', 'Regra Especial de Criatura Aliada', 'Evoluindo Uma Criatura Aliada'],
        alcance: 'Varia conforme a Criatura Aliada',
        aprimoramentos: [
          {
            tipo: 'Sincronia Selvagem',
            descricao: 'O Ataque Sincronizado passa a ser realizado em um Resultado Natural (Precisão) de 8, ou mais, ao invés de 10.'
          },
          {
            tipo: 'Fortalecer Companheiro',
            descricao: 'Aumente em 1 a Categoria de Dado do dano causado pelo Golpe Brutal e a Evocação Mística da sua Criatura Aliada.'
          }
        ],
        
      },
      {
        nome: 'DESCENDENTE DOS FILHOS DA FLORESTA',
        caminho:'Andarilho',
        custoPE: 0,
        tipoAcao: 'Simples , Iniciativa',
        categorias: ['Transformação', 'Habilidade Primitiva'],
        descricaoFlavor: 'Você se entrega ao mundo primitivo, se transformando em uma criatura de Auroria.',
        efeitoPrincipal: 'Permite se transformar em um Animal Selvagem ou adquirir características de uma Criatura do Homuncularium.',
        Tecnicas: [
          'Animal Selvagem',
          'Criatura Do Homuncularium',
          'Desfazer Transformação'
        ],
        alcance: 'Pessoal',
        aprimoramentos: [
          {
            tipo: 'Aprimorar Transformação',
            descricao: 'Recebe 1 Característica adicional ao usar qualquer Transformação desta habilidade.'
          },
          {
            tipo: 'Maestria Primitiva',
            descricao: 'Recebe 1 Característica adicional ao usar qualquer Transformação desta habilidade.'
          }
        ],
        },
        {
            nome: 'PERTURBAÇÃO LÚGUBRE',
            caminho:'Andarilho',
            custoPE: 2,
            tipoAcao: 'Ativa',
            categorias: ['Conjuração','Condição Mágica'],
            duracao:'1 Minuto( 10 Rodadas)',
            descricaoFlavor: 'Você cria um símbolo em um alvo que lentamente começa a ruir este alvo de dentro para fora.',
            efeitoPrincipal: 'Permite se transformar em um Animal Selvagem ou adquirir características de uma Criatura do Homuncularium.',
            Tecnicas: [
              'Animal Selvagem',
              'Criatura Do Homuncularium',
              'Desfazer Transformação'
            ],
            alcance: '6 Metros',
            aprimoramentos: [
              {
                tipo: 'Forças Malditas',
                descricao: 'A dificuldade (Dif.) do teste de Espírito desta habilidade é aumentada em 2.'
              },
              {
                tipo: 'Conectar o Fim',
                descricao: 'Aumenta em 1 o número de Alvos desta habilidade. Este valor é aumentado em +1 para cada 3 pontos de Canalização que você possua.'
              }
            ],
            },
          {
        nome: 'FORÇAS DO CICLO',
        caminho:'Andarilho',
        custoPE: 1,
        tipoAcao: 'Ativa',
        categorias: ['Ataque Mágico', 'Conjuração', 'Condição Mágica'],
        duracao:'1 Minuto( 10 Rodadas)',
        descricaoFlavor: 'Você canaliza as energias do Ciclo criando uma esfera de energia.',
        efeitoPrincipal: 'Realiza um Ataque Mágico contra um alvo até 6 metros. Se acertar, causa Dano Mágico de Natureza ou Profano igual ao seu total máximo de Pontos de Energia. O alvo afetado também recebe a Condição Mágica "Tributo" por 1 minuto.',
        alcance: '6 metros',
        efeitosAdicionais: [
          {
            nome: 'Dano de Energia',
            custoPE: 0,
            descricao: 'Causa Dano Mágico de Natureza ou Profano igual ao total máximo de Pontos de Energia.',
            restricao: 'Aplica-se somente se o Ataque Mágico acertar.'
          },
          {
            nome: 'Tributo',
            custoPE: 0,
            descricao: 'Enquanto afetado por "Tributo", sempre que o alvo gastar Pontos de Energia, o conjurador pode fazer um teste de Canalização (Dif. 10) para regenerar 1 Ponto de Energia de um aliado até 6 metros.',
            restricao: 'Esse efeito ocorre apenas uma vez por turno.'
          }
        ],
        aprimoramentos: [
          {
            tipo: 'Dominação das Forças do Ciclo',
            descricao: 'Aumenta em 2 a dificuldade do teste de Espírito para remover a Condição Mágica.'
          },
          {
            tipo: 'Sinergia Natural',
            descricao: 'Reduz em 2 a dificuldade do teste de Canalização para regenerar Pontos de Energia.'
          }
        ],
        teste: 'Espírito (Dif. 8) para remoção da Condição. Canalização (Dif. 10) para regeneração de Pontos de Energia.'
      },
      {
        nome: 'ENFEITIÇAR',
        caminho:'Andarilho',
        custoPE: 2,
        tipoAcao: 'Ativa',
        categorias: ['Conjuração', 'Condição Mágica', 'Foco'],
        duracao:'1 Minuto( 10 Rodadas)',
        descricaoFlavor: 'Os seus olhos mudam de cor e fazem com que a mente de um ser desprevenido possa ser moldada à sua vontade.',
        efeitoPrincipal: 'Aplica uma Condição Mágica a um alvo até 6 metros, fazendo com que ele o considere um aliado e não possa realizar ações ofensivas, causar Efeitos Negativos ou aplicar Condições Mágicas contra você. Você também ganha Aptidão em testes de Conhecimentos contra esse alvo. Se você ou suas habilidades causarem dano, Condição Mágica, Condição Física ou Efeito Negativo ao alvo, o efeito é encerrado.',
        Tecnicas: [
          'Manipulação Mental',
          'Aptidão Em Conhecimentos',
          'Bloqueio De Ações Ofensivas'
        ],
        alcance: '6 metros',
        aprimoramentos: [
          {
            tipo: 'Poder da Mente',
            descricao: 'Aumenta em 2 a dificuldade do teste de Espírito para remover a Condição Mágica.'
          },
          {
            tipo: 'Mestre Enfeitiçador',
            descricao: 'Esta habilidade não é mais considerada de Foco e seu custo de PE é reduzido em 1.'
          }
        ],
        teste: 'Espírito (Dif. 8) para remoção da Condição.'
      },
       {
        nome: 'EXPLORADOR DE AURORIA',
        caminho:'Andarilho',
        custoPE: 0,
        tipoAcao: 'Passiva',
        categorias: [],
        descricaoFlavor: 'Você aprendeu os segredos de certos tipos de criaturas de Auroria, tornando-se o seu maior predador.',
        efeitoPrincipal: 'Você consegue identificar os Livros, Parâmetros Ofensivos, Parâmetros Defensivos e Poder de toda criatura do Homuncularium até 8 metros, recebendo também a seguinte técnica:',
        Tecnicas: ['Adaptação selvagem','Técnicas de Sobrevivência'],
        aprimoramentos: [
          {
            tipo: 'Conhecimento Selvagem',
            descricao: 'Os Golpes Brutais e Evocações Místicas de criaturas do Homuncularium afetadas pela sua Adaptação Selvagem têm a sua Categoria de Dado reduzida em 1 contra você.'
          },
          {
            tipo: 'Sobrevivencialista:',
            descricao: 'Adquiria duas novas Técnica de Sobrevivência desta habilidade que você ainda não possua.'
          }
        ],
        
      },
      {
        nome: 'GRILHÕES PRIMAIS',
        caminho:'Andarilho',
        custoPE: 1,
        tipoAcao: 'Rápida',
        categorias: ['Conjuração'],
        descricaoFlavor: 'Você toca o chão e clama pelas forças primitivas da natureza, que em seguida respondem com poderosas vinhas que tentam prender o seu alvo temporariamente.',
        efeitoPrincipal: 'Cria vinhas que forçam um alvo até 6 metros a realizar um teste de Vigor (Dif. 8). Se falhar, o alvo fica Imóvel até o final do turno e sofre -1 em todos os testes de Defesa.',
        aprimoramentos: [
          {
            tipo: 'Grilhões Ancestrais',
            descricao: 'Aumenta em 2 a dificuldade do teste de Vigor para resistir à habilidade.'
          },
          {
            tipo: 'Controle Primal',
            descricao: 'O teste de Vigor para resistir à habilidade passa a ter Inaptidão.'
          }
        ],
        teste: 'Vigor (Dif. 8) para resistir à Imobilização.'
      },
      {
        nome: 'INVÓLUCRO CINZENTO',
        caminho:'Andarilho',
        custoPE: 1,
        tipoAcao: 'Rápida',
        categorias: ['Conjuração'],
        descricaoFlavor: 'Você drena as forças ao seu redor, redirecionando um poder corrompido ao inimigo.',
        efeitoPrincipal: 'Ao receber um Efeito Negativo ou Condição Mágica de um Alvo, você pode forçar esse mesmo Alvo a um teste de Espírito Dif. 8. Em caso de falha, o Alvo recebe o mesmo Efeito Negativo ou Condição Mágica.',
        Tecnicas: [],
        alcance: 'Mesmo Alvo que aplicou o efeito',
        efeitosAdicionais: [
          {
            nome: 'Reflexo Corrompido',
            custoPE: 0,
            descricao: 'Reflete um Efeito Negativo ou Condição Mágica de volta ao Alvo que o aplicou em você.',
            restricao: 'Requer falha no teste de Espírito Dif. 8 do Alvo.'
          }
        ],
        aprimoramentos: [
          {
            tipo: 'Sussurros da Floresta',
            descricao: 'Aumenta a dificuldade do teste de Espírito desta habilidade em +2.'
          },
          {
            tipo: 'Prática Maldita',
            descricao: 'Permite usar esta habilidade uma vez adicional na mesma rodada caso já tenha sido utilizada.'
          }
        ],
        teste: 'Espírito (Dif. 8)'
      },
       {
        nome: 'DECRETO LUNAR',
        caminho:'Andarilho',
        custoPE: 2,
        tipoAcao: 'Simples',
        categorias: ['Conjuração', 'Efeito Positivo', 'Condição Mágica', 'Foco'],
        duracao:'1 Minuto( 10 Rodadas)',
        descricaoFlavor: 'Você reveste o corpo de um alvo com uma energia prateada, canalizando o poder das luas para fortalecer ou enfraquecer.',
        efeitoPrincipal: 'Você aplica um dos seguintes efeitos em um Alvo até 6 metros:',
        alcance: '6 metros',
        efeitosAdicionais: [
          {
            nome: 'Lua Crescente',
            custoPE: 0,
            descricao: 'Permite aplicar Aptidão em um teste de Parâmetro ou Bloqueio uma vez por rodada.',
            restricao: 'Limitado a uma vez por rodada.'
          },
          {
            nome: 'Lua Minguante',
            custoPE: 0,
            descricao: 'Permite aplicar Inaptidão em um teste de Parâmetro ou Bloqueio do Alvo uma vez por rodada.',
            restricao: 'O Alvo pode remover esta Condição com um teste de Espírito Dif. 8.'
          }
        ],
        aprimoramentos: [
          {
            tipo: 'Presente das Três Guardiãs',
            descricao: 'Esta habilidade não é mais considerada de Foco. Além disso, reduz o custo de PE em 1.'
          },
          {
            tipo: 'Augúrio Lunar',
            descricao: 'Aumenta em +2 a dificuldade do teste de Espírito da Lua Minguante.'
          }
        ],
        teste: 'Espírito (Dif. 8) para remover a Lua Minguante'
      },
      {
        nome: 'TÉCNICA MUSICAL',
        caminho:'Andarilho',
        custoPE: 1,
        tipoAcao: 'Simples',
        categorias: ['Conjuração'],
        descricaoFlavor: 'Seja com um instrumento ou com um canto, você começa a realizar uma melodia que auxilia os seus aliados.',
        efeitoPrincipal: 'Você emite uma melodia que afeta você e todos os Alvos Aliados até 4 metros, aplicando um dos seguintes efeitos:',
        alcance: '4 metros',
        Tecnicas: ['Verso','Refrão','Ponte'],
        aprimoramentos: [
          {
            tipo: 'Técnica Mística',
            descricao: 'Enquanto em combate, ao utilizar esta habilidade, você pode realizar um teste de Destino Dif. 10. Se tiver sucesso, regenera 1 Ponto de Energia.'
          },
          {
            tipo: 'Execução Rápida',
            descricao: 'A Ação Simples desta habilidade é transformada em uma Ação Acelerada.'
          }
        ]
      } 
    ]
    // Inserir os dados
    await habilidade.criarModeloPorCaminho(habilidades);
    console.log('Dados inseridos com sucesso!');

  });
