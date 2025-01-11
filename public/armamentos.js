const stateArmamentos = {
    parametroArmamento1: "",
    parametroArmamento2: "",
    danoBase1:0,
    danoBase2:0
};
function calcularDano(baseDano, multiplicador) {
    return baseDano + baseDano * multiplicador;
}
function exibirDanoBase(elementId, danoBase) {
    const dano = document.getElementById(elementId);
    if (Array.isArray(danoBase)) {
        dano.innerHTML = `
            <h2>Base</h2>
            <div style="display:flex;">
                <div>
                    <h3>1 Ms</h3>
                    <p>${danoBase[0]}</p>
                </div>
                <div>
                    <h3>2 Ms</h3>
                    <p>${danoBase[1]}</p>
                </div>   
            </div>
        `;
    } else {
        dano.innerHTML = `<h2>Base</h2><p>${danoBase}</p>`;
    }
}
function exibirDanoTotal(elementId, danoBase, valorParametro) {
    const dano = document.getElementById(elementId);
    if (Array.isArray(danoBase)) {
        dano.innerHTML = `
            <h2>Total</h2>
            <div style="display:flex;">
                <div>
                    <h3>1 Ms</h3>
                    <p>${calcularDano(parseInt(danoBase[0]), valorParametro)}</p>
                </div>
                <div>
                    <h3>2 Ms</h3>
                    <p>${calcularDano(parseInt(danoBase[1]), valorParametro)}</p>
                </div>
            </div>
        `;
    } else {
        dano.innerHTML = `<h2>Total</h2><p>${calcularDano(parseInt(danoBase), valorParametro)}</p>`;
    }
}
function obterMaiorParametro(parametro) {
    const partes = parametro.split(" ou ");
    const valor1 = parseInt(document.getElementById(partes[0]).value);
    const valor2 = parseInt(document.getElementById(partes[1]).value);
    return Math.max(valor1, valor2);
}
function processarArmamento(armamento, index) {
    const danoBaseId = `damagebase${index + 1}`;
    const danoTotalId = `damage${index + 1}`;
    const parametro = armamento.parametro.toLowerCase();
    let valorParametro;

    // Exibir dano base
    if(typeof armamento.danoBase === "string"){
        exibirDanoBase(danoBaseId, armamento.danoBase.split("-"));
    }else{
        exibirDanoBase(danoBaseId, armamento.danoBase);
    }
    // Calcular valor do parâmetro
    if (parametro.includes("ou")) {
        valorParametro = obterMaiorParametro(parametro);
    } else {
        valorParametro = parseInt(document.getElementById(parametro).value);
    }

    // Exibir dano total
    if(typeof armamento.danoBase === "string"){
        exibirDanoTotal(danoTotalId, armamento.danoBase.split("-"), valorParametro);
    }else{
        exibirDanoTotal(danoTotalId, armamento.danoBase, valorParametro);
    }

    // Atualizar estado
    if (!index) {
        stateArmamentos.parametroArmamento1 = parametro;
        stateArmamentos.danoBase1 = armamento.danoBase;
    } else {
        stateArmamentos.parametroArmamento2 = parametro;
        stateArmamentos.danoBase2 = armamento.danoBase;
    }
}
document.querySelectorAll('select[id^="armamento"]').forEach((selectElement,index) => {
    selectElement.addEventListener('change', function() {
        const selectedOption = this.options[this.selectedIndex];
        const optGroup = selectedOption.parentElement;
        const categoria = optGroup.getAttribute('label');
        const armamentoId = this.value;
        if(this.value !== ""){
            fetch(`/armamento/${categoria}/${armamentoId}`)
            .then(response => response.json())
            .then(armamento => {
                let propriedades = armamento.propriedade;
                var propArmamento = document.getElementById(`propArmamento${index+1}`);
                // Limpa as propriedades anteriores
                propArmamento.innerHTML = '';
                // Adiciona as novas propriedades
                propriedades.forEach((propriedade) => {
                    propArmamento.innerHTML += `<a href="#" data-propriedade-id="${propriedade}" class="prop-link">${propriedade}</a>`;
                    descricao(propriedade);
                });
                processarArmamento(armamento, index);
            });
        }else{
            var propArmamento = document.getElementById(`propArmamento${index+1}`);
            propArmamento.innerHTML = '';
            var dano = document.getElementById(`damagebase${index+1}`);
            dano.innerHTML = '';
            dano = document.getElementById(`damage${index+1}`);
            dano.innerHTML = '';
            if(!index){
                stateArmamentos.parametroArmamento1 = '';
                stateArmamentos.danoBase1 = 0;
            }else{
                stateArmamentos.parametroArmamento2 = '';
                stateArmamentos.danoBase2 = 0;
            }
            
        }
    });
});
document.querySelectorAll('.propArmamento').forEach((propArmamento) => {
    propArmamento.addEventListener('click', function(event) {
        // Verifica se o alvo do evento é um link com a classe 'prop-link'
        if (event.target && event.target.classList.contains('prop-link')) {
            const propriedadeId = event.target.getAttribute('data-propriedade-id');
            var modal = document.getElementById(`modal${propriedadeId}`);
            modal.style.display = "block";
        }
    });
});
function atualizarDano(index, valorAtual, outroValor, parametro, baseDano) {
    let danoTotalId = `damage${index + 1}`;
    let multiplicador;
    if (parametro === "brutalidade ou destreza") {
        multiplicador = Math.max(valorAtual, outroValor);
    } else {
        multiplicador = valorAtual;
    }
    if(typeof baseDano === "string"){
        exibirDanoTotal(danoTotalId, baseDano.split("-"), multiplicador);
        
    }else{
        exibirDanoTotal(danoTotalId, baseDano, multiplicador);
    }
    
    
}
function gerenciarMudanca(parametro, outroParametro) {
    var valorAtual = parseInt(document.getElementById(parametro).value);
    var outroValor = parseInt(document.getElementById(outroParametro)?.value || 0);
    [stateArmamentos.parametroArmamento1, stateArmamentos.parametroArmamento2].forEach((parametroArmamento, index) => {
        let baseDano = index === 0 ? stateArmamentos.danoBase1 : stateArmamentos.danoBase2;
        if (parametroArmamento === parametro ) {
                atualizarDano(index, valorAtual, outroValor, parametroArmamento, baseDano);
         }else if(parametroArmamento === "brutalidade ou destreza" && parametro !== "arcanismo" ){
                atualizarDano(index, valorAtual, outroValor, parametroArmamento, baseDano);
        }
    });
}

document.getElementById('brutalidade').addEventListener('change', function () {
    gerenciarMudanca('brutalidade', 'destreza');
});

document.getElementById('destreza').addEventListener('change', function () {
    gerenciarMudanca('destreza', 'brutalidade');
});

document.getElementById('arcanismo').addEventListener('change', function () {
    gerenciarMudanca('arcanismo', null);
});
function descricao(propriedadeId) {
    // Verifica se o modal já existe
    let modal = document.getElementById(`modal${propriedadeId}`);
    
    // Se o modal não existir, cria um novo
    if (!modal) {
        modal = document.createElement("div");
        modal.className = "modal";
        modal.id = `modal${propriedadeId}`;
        // Faz uma requisição para obter os dados da propriedade
    fetch(`/propriedade/${propriedadeId}`)
    .then(response => response.json())
    .then(propriedade => {
      // Cria o modal dinamicamente
      modal.innerHTML = `
        <div class="modal-content">
          <h1>${propriedade.nome}</h1>
          <p>${propriedade.descricao}</p>
          <button class="close-button">Fechar</button>
        </div>
      `;
      // Adiciona o modal ao corpo da página
      document.body.appendChild(modal);


      const closeButtons = modal.querySelectorAll(".close, .close-button");
      closeButtons.forEach(button => {
        button.addEventListener("click", () => {
          modal.style.display = "none"; 
        });
      });

      // Fecha o modal ao clicar fora do conteúdo
      modal.addEventListener("click", (event) => {
        if (event.target === modal) {
          modal.style.display = "none"; 
        }
      });
    })
    .catch(error => {
      console.error("Erro ao carregar a propriedade:", error);
    });
    }
    
  }