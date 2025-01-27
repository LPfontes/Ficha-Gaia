// Define valores iniciais para alguns campos do formulário
document.getElementById('pv_max').value = 30;
document.getElementById('velocidade').value = 6;
document.getElementById('pe_max').value = 5;
document.getElementById('desvio').value = 0;
document.getElementById('bloqueio').value = 0;

// Objeto para armazenar os valores anteriores de atributos
const stateAtributos = {
    valorAnteriorPv: 0,
    valorAnteriorVelocidade: 0,
    valorAnteriorBloqueio: 0,
    valorAnteriorArmadura: 0,
    valorExaustao: 0
};

// Função para adicionar opções (0 a 6) a um elemento `<select>` pelo seu ID
function adicionarOpcoes(selectId) {
    var select = document.getElementById(selectId);
    if (!select) return; // Verifica se o elemento existe
    var fragment = document.createDocumentFragment(); // Usado para otimizar inserção no DOM
    for (var i = 0; i <= 6; i++) { // Cria as opções de 0 a 6
        var option = document.createElement("option");
        option.value = i;
        option.textContent = i;
        fragment.appendChild(option); // Adiciona as opções ao fragmento
    }
    select.appendChild(fragment); // Adiciona o fragmento ao elemento `<select>`
}

// Adiciona opções para cada `<select>` dentro da div com a classe `selects`
var selects = document.querySelectorAll(".selects select");
selects.forEach(function(select) {
    adicionarOpcoes(select.id);
});
function AtualizarTeste(id, valor,reducao) {
    var span = document.getElementById(`teste-${id}`);
        span.textContent = parseInt(valor) - reducao;
        if(id === 'agilidade'){
            document.getElementById('desvio').value = span.textContent;
        }
}
selects.forEach(elemento => {
    elemento.addEventListener('change', function() {
        if(this.id === 'exaustao'){}else{AtualizarTeste(this.id, this.value,stateAtributos.valorExaustao);}
        
    });
});
document.getElementById('exaustao').addEventListener('change', function() {
    stateAtributos.valorExaustao = parseInt(this.value);
    selects.forEach(elemento => {
        if(elemento.id === 'exaustao'){}else{AtualizarTeste(elemento.id, elemento.value,stateAtributos.valorExaustao);}
    });
});
// Atualiza `pv_max` e opções de `armadura` ao mudar o valor do campo `vigor`
document.getElementById('vigor').addEventListener('change', function() {
    // Obtém os valores atual e selecionado
    value = parseInt(document.getElementById('pv_max').value);
    selectValor = parseInt(this.value);

    // Atualiza `pv_max` com base no valor selecionado e no valor anterior
    if (stateAtributos.valorAnteriorPv > selectValor) {
        document.getElementById('pv_max').value = value - (stateAtributos.valorAnteriorPv - selectValor);
    } else {
        document.getElementById('pv_max').value = value + (selectValor - stateAtributos.valorAnteriorPv);
    }

    

    // Atualiza o valor anterior de `pv`
    stateAtributos.valorAnteriorPv = selectValor;
});

// Atualiza `desvio` e `velocidade` ao mudar o valor do campo `agilidade`
document.getElementById('agilidade').addEventListener('change', function() {
    selectValor = parseInt(this.value);
    

    // Ajusta `velocidade` com base na diferença entre o valor atual e o valor anterior
    if (stateAtributos.valorAnteriorVelocidade > selectValor) {
        if (parseFloat(stateAtributos.valorAnteriorVelocidade - selectValor) / 2 === 0.5) {
            document.getElementById('velocidade').value = stateAtributos.valorAnteriorVelocidade % 2 === 0
                ? parseInt(document.getElementById('velocidade').value) - 1
                : document.getElementById('velocidade').value;
        } else {
            let valor = parseInt(document.getElementById('velocidade').value) - Math.ceil((stateAtributos.valorAnteriorVelocidade - selectValor) / 2);
            document.getElementById('velocidade').value = valor < 6 ? 6 : valor;
        }
    } else if (selectValor > 0) {
        if (parseFloat(selectValor - stateAtributos.valorAnteriorVelocidade) / 2 === 0.5) {
            document.getElementById('velocidade').value = selectValor % 2 === 0
                ? parseInt(document.getElementById('velocidade').value) + 1
                : document.getElementById('velocidade').value;
        } else {
            let valor = parseFloat(selectValor - stateAtributos.valorAnteriorVelocidade) / 2;
            valor = valor === 1.5 ? 1 : valor;
            document.getElementById('velocidade').value = parseInt(document.getElementById('velocidade').value) + Math.ceil(valor);
        }
    }

    // Atualiza o valor anterior de `velocidade`
    stateAtributos.valorAnteriorVelocidade = selectValor;
});

// Atualiza `bloqueio` ao mudar o valor do campo `escudo`
document.getElementById('escudo').addEventListener('change', function() {
    bloqueio = document.getElementById('bloqueio');
    selectValor = parseInt(this.value);
    if (selectValor) {
        bloqueio.value = parseInt(bloqueio.value) + 1;
    } else {
        bloqueio.value = parseInt(bloqueio.value) - 1;
    }

    // Atualiza o valor anterior de `bloqueio`
    stateAtributos.valorAnteriorBloqueio = selectValor;
});

// Função para calcular o valor de `bloqueio`
function calcularBloqueio(bloqueio, valor, valorArmadura) {
    return bloqueio + valor - valorArmadura;
}

// Atualiza `bloqueio` ao mudar o valor do campo `armadura`
document.getElementById('armadura').addEventListener('change', function() {
    selectValor = parseInt(this.value);
    if (stateAtributos.valorAnteriorArmadura > selectValor) {
        bloqueio.value = calcularBloqueio(parseInt(bloqueio.value), 0, stateAtributos.valorAnteriorArmadura - selectValor);
    } else {
        bloqueio.value = calcularBloqueio(parseInt(bloqueio.value), parseInt(selectValor), stateAtributos.valorAnteriorArmadura);
    }
    
    // Atualiza o valor anterior de `armadura`
    stateAtributos.valorAnteriorArmadura = selectValor;
});
