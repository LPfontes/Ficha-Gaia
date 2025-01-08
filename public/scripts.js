document.getElementById('pv_max').value = 30
document.getElementById('velocidade').value = 6
document.getElementById('pe_max').value = 5
document.getElementById('desvio').value = 0
document.getElementById('bloqueio').value = 0
const state = {
    valorAnteriorPv: 0,
    valorAnteriorVelocidade: 0,
    valorAnteriorBloqueio: 0,
    valorAnteriorArmadura: 0,
    parametroArmamento1: "",
    parametroArmamento2: "",
    danoBase1:0,
    danoBase2:0
};

function adicionarOpcoes(selectId) {
    var select = document.getElementById(selectId);
    if (!select) return;
    var fragment = document.createDocumentFragment();
    for (var i = 0; i <= 6; i++) {
        var option = document.createElement("option");
        option.value = i;
        option.textContent = i;
        fragment.appendChild(option);
    }
    select.appendChild(fragment);
}


// Chama a função para cada select dentro da div atributos
var selects = document.querySelectorAll(".selects select");
selects.forEach(function(select) {
    adicionarOpcoes(select.id);
});

document.getElementById('vigor').addEventListener('change', function() {
    value = parseInt(document.getElementById('pv_max').value);
    selectValor = parseInt(this.value);
    if(state.valorAnteriorPv > selectValor){
        document.getElementById('pv_max').value = value - (state.valorAnteriorPv - selectValor);
    }else{
    document.getElementById('pv_max').value = value + (selectValor - state.valorAnteriorPv);
    }
    let select = document.getElementById("armadura");
    switch(selectValor){
        case 0 :
            select.innerHTML = `
            <option value="0">Nenhuma</option>
            `;
            break
        case 1 :
            select.innerHTML = `
            <option value="0">Nenhuma</option>
            <option value="1">Leve</option>
            `;
            break
        case 2 :
            select.innerHTML = `
            <option value="0">Nenhuma</option>
            <option value="1">Leve</option>
            <option value="2">Média</option>
            `;  
            break 
        case 3 :
            select.innerHTML = `
            <option value="0">Nenhuma</option>
            <option value="1">Leve</option>
            <option value="2">Média</option>
            `;  
            break 
        case 4 :
            select.innerHTML = `
            <option value="0">Nenhuma</option>
            <option value="1">Leve</option>
            <option value="2">Média</option>
            <option value="3">Pesada</option>`;
            break
        case 5 :
            select.innerHTML = `
            <option value="0">Nenhuma</option>
            <option value="1">Leve</option>
            <option value="2">Média</option>
            <option value="3">Pesada</option>`;
            break
        case 6 :
            select.innerHTML = `
            <option value="0">Nenhuma</option>
            <option value="1">Leve</option>
            <option value="2">Média</option>
            <option value="3">Pesada</option>`;
            break     
    }
    state.valorAnteriorPv = selectValor;
});


document.getElementById('agilidade').addEventListener('change', function() {
    selectValor = parseInt(this.value);
    document.getElementById('desvio').value = selectValor;
    if(state.valorAnteriorVelocidade > selectValor){
        if(parseFloat(state.valorAnteriorVelocidade - selectValor) / 2 === 0.5){
            document.getElementById('velocidade').value = state.valorAnteriorVelocidade % 2 === 0 ? parseInt(document.getElementById('velocidade').value) - 1 : document.getElementById('velocidade').value;
        }else{
            let valor = parseInt(document.getElementById('velocidade').value) - Math.ceil((state.valorAnteriorVelocidade - selectValor) / 2);
            document.getElementById('velocidade').value = valor  < 6 ? 6 : valor;
        }

    }else if(selectValor > 0){
        if(parseFloat(selectValor - state.valorAnteriorVelocidade) / 2 === 0.5){
            document.getElementById('velocidade').value = selectValor % 2 === 0 ? parseInt(document.getElementById('velocidade').value) + 1 : document.getElementById('velocidade').value;
        }else{
            let valor = parseFloat(selectValor - state.valorAnteriorVelocidade) / 2;
            valor = valor === 1.5 ? 1 : valor;
            document.getElementById('velocidade').value = parseInt(document.getElementById('velocidade').value)+ Math.ceil(valor);
        }
        
    }
    state.valorAnteriorVelocidade = selectValor;
});
document.getElementById('escudo').addEventListener('change', function() {
        bloqueio = document.getElementById('bloqueio')
        selectValor = parseInt(this.value);
        if(selectValor){
           bloqueio.value = parseInt(bloqueio.value) + 1;
        }else{
           bloqueio.value = parseInt(bloqueio.value) - 1; 
        }
        
        state.valorAnteriorBloqueio = selectValor;
});
document.getElementById('armadura').addEventListener('change', function() {
    selectValor = parseInt(this.value);
    if(state.valorAnteriorArmadura > selectValor){
        switch(selectValor){
            case 0 :
                bloqueio.value = parseInt(bloqueio.value) - state.valorAnteriorArmadura
                break
            case 1 :
                bloqueio.value = parseInt(bloqueio.value) - (state.valorAnteriorArmadura - 1)
                break
            case 2 :
                bloqueio.value = parseInt(bloqueio.value)- (state.valorAnteriorArmadura - 2)
                break
        }
    }else{
        switch(selectValor){
            case 1 :
                bloqueio.value = parseInt(bloqueio.value) + 1 - state.valorAnteriorArmadura 
                break
            case 2 :
                bloqueio.value = parseInt(bloqueio.value) + 2 - state.valorAnteriorArmadura 
                break
            case 3 :
                bloqueio.value = parseInt(bloqueio.value) + 3 - state.valorAnteriorArmadura 
                break
            
        }
    }
        
    state.valorAnteriorArmadura = selectValor;
});
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
                propriedades.forEach(propriedade => {
                    propArmamento.innerHTML += `
                    <a href="#" onclick="descricao('${propriedade}')" id="propArmamento" name="propArmamento1">${propriedade}</a> 
                `;
                });
                switch (armamento.nome.toLowerCase()) {
                    case 'lanças':  
                        var dano = document.getElementById(`damagebase${index+1}`);
                        var danoBase = armamento.danoBase.split("-");
                        dano.innerHTML = `<h2>Base</h2>
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
                        dano = document.getElementById(`damage${index+1}`);
                        var parametro = armamento.parametro.toLowerCase();
                        var partes = parametro.split(" ou ");
                        var valorParametro1 = parseInt(document.getElementById(partes[0]).value);
                        var valorParametro2 = parseInt(document.getElementById(partes[1]).value);
                        var valorParametro = valorParametro1 > valorParametro2 ? valorParametro1 : valorParametro2;
                        dano.innerHTML = `<h2>Total</h2>
                        <div style="display:flex;">
                        <div>
                        <h3>1 Ms</h3>
                        <p>${parseInt(danoBase[0]) + parseInt(danoBase[0]) * valorParametro}</p>
                        </div>
                        <div>
                        <h3>2 Ms</h3>
                        <p>${parseInt(danoBase[1])  + parseInt(danoBase[1]) * valorParametro}</p>
                        </div>
                        </div>
                        `;
                        if(!index){
                            state.parametroArmamento1 = parametro;
                            state.danoBase1 = armamento.danoBase;
                        }else{
                            state.parametroArmamento2 = parametro;
                            state.danoBase2 = armamento.danoBase;
                        }
                        break;
                    case 'espadas longas': 
                        var dano = document.getElementById(`damagebase${index+1}`)
                        dano.innerHTML = `<h2>Base</h2><p>${armamento.danoBase}</p>`;
                        dano = document.getElementById(`damage${index+1}`);
                        var parametro = armamento.parametro.toLowerCase();
                        var partes = parametro.split(" ou ");
                        var valorParametro1 = parseInt(document.getElementById(partes[0]).value);
                        var valorParametro2 = parseInt(document.getElementById(partes[1]).value);
                        var valorParametro = valorParametro1 > valorParametro2 ? valorParametro1 : valorParametro2;
                        dano.innerHTML = `<h2>Total</h2>
                        <p>${armamento.danoBase + armamento.danoBase * valorParametro}</p>`;
                        state.danoBase1 = armamento.danoBase;
                        if(!index){
                            state.parametroArmamento1 = parametro; 
                            state.danoBase1 = armamento.danoBase;
                        }else{
                            state.parametroArmamento2 = parametro;
                            state.danoBase2 = armamento.danoBase;
                        }
                        break;
                        case 'espadas curtas': 
                        var dano = document.getElementById(`damagebase${index+1}`)
                        dano.innerHTML = `<h2>Base</h2><p>${armamento.danoBase}</p>`;
                        dano = document.getElementById(`damage${index+1}`);
                        var parametro = armamento.parametro.toLowerCase();
                        var partes = parametro.split(" ou ");
                        var valorParametro1 = parseInt(document.getElementById(partes[0]).value);
                        var valorParametro2 = parseInt(document.getElementById(partes[1]).value);
                        var valorParametro = valorParametro1 > valorParametro2 ? valorParametro1 : valorParametro2;
                        dano.innerHTML = `<h2>Total</h2>
                        <p>${armamento.danoBase + armamento.danoBase * valorParametro}</p>`;
                        state.danoBase1 = armamento.danoBase;
                        if(!index){
                            state.parametroArmamento1 = parametro; 
                            state.danoBase1 = armamento.danoBase;
                        }else{
                            state.parametroArmamento2 = parametro;
                            state.danoBase2 = armamento.danoBase;
                        }
                        break;   
                    default:
                        var dano = document.getElementById(`damagebase${index+1}`)
                        dano.innerHTML = `<h2>Base</h2><p>${armamento.danoBase}</p>`;
                        dano = document.getElementById(`damage${index+1}`)
                        var parametro = armamento.parametro.toLowerCase();
                        var valorParametro = parseInt(document.getElementById(parametro).value);
                        dano.innerHTML = `<h2>Total</h2>
                        <p>${armamento.danoBase + armamento.danoBase * valorParametro}</p>`;
                        if(!index){
                            state.parametroArmamento1 = parametro;
                            state.danoBase1 = armamento.danoBase;
                        }else{
                            state.parametroArmamento2 = parametro;
                            state.danoBase2 = armamento.danoBase;
                        }
                        break;
                        
                }
                

            });
        }else{
            var propArmamento = document.getElementById(`propArmamento${index+1}`);
            propArmamento.innerHTML = '';
            var dano = document.getElementById(`damagebase${index+1}`);
            dano.innerHTML = '';
            dano = document.getElementById(`damage${index+1}`);
            dano.innerHTML = '';
            if(!index){
                state.parametroArmamento1 = '';
                state.danoBase1 = 0;
            }else{
                state.parametroArmamento2 = '';
                state.danoBase2 = 0;
            }
            
        }
    });
});

function descricao(propriedadeId) {
    // Faz uma requisição para obter os dados da propriedade
    fetch(`/propriedade/${propriedadeId}`)
      .then(response => response.json())
      .then(propriedade => {
        // Cria o modal dinamicamente
        const modal = document.createElement("div");
        modal.className = "modal";
  
        modal.innerHTML = `
          <div class="modal-content">
            <h1>${propriedade.nome}</h1>
            <p>${propriedade.descricao}</p>
            <button class="close-button">Fechar</button>
          </div>
        `;
  
        // Adiciona o modal ao corpo da página
        document.body.appendChild(modal);
  
        // Exibe o modal
        modal.style.display = "block";
  
        const closeButtons = modal.querySelectorAll(".close, .close-button");
        closeButtons.forEach(button => {
          button.addEventListener("click", () => {
            modal.remove(); // Remove o modal do DOM
          });
        });
  
        // Fecha o modal ao clicar fora do conteúdo
        modal.addEventListener("click", (event) => {
          if (event.target === modal) {
            modal.remove();
          }
        });
      })
      .catch(error => {
        console.error("Erro ao carregar a propriedade:", error);
      });
  }
  function calcularDano(baseDano, multiplicador) {
    return baseDano + baseDano * multiplicador;
}

function atualizarDano(index, valorAtual, outroValor, parametro, baseDano) {
    let dano = document.getElementById(`damage${index + 1}`);
    let multiplicador;

    if (parametro === "brutalidade ou destreza") {
        multiplicador = Math.max(valorAtual, outroValor);
    } else {
        multiplicador = valorAtual;
    }

    dano.innerHTML = `<h2>Total</h2><p>${calcularDano(baseDano, multiplicador)}</p>`;
}

function gerenciarMudanca(atributo, outroAtributo, parametro) {
    var valorAtual = parseInt(document.getElementById(atributo).value);
    var outroValor = parseInt(document.getElementById(outroAtributo)?.value || 0);

    [state.parametroArmamento1, state.parametroArmamento2].forEach((parametroArmamento, index) => {
        let baseDano = index === 0 ? state.danoBase1 : state.danoBase2;

        if (parametroArmamento === parametro ) {
            atualizarDano(index, valorAtual, outroValor, parametroArmamento, baseDano);
        }else if(parametroArmamento === "brutalidade ou destreza" && parametro !== "arcanismo" ){
            atualizarDano(index, valorAtual, outroValor, parametroArmamento, baseDano);
        }
    });
}

document.getElementById('brutalidade').addEventListener('change', function () {
    gerenciarMudanca('brutalidade', 'destreza', 'brutalidade');
});

document.getElementById('destreza').addEventListener('change', function () {
    gerenciarMudanca('destreza', 'brutalidade', 'destreza');
});

document.getElementById('arcanismo').addEventListener('change', function () {
    gerenciarMudanca('arcanismo', null, 'arcanismo');
});