

async function legados(select) {
    var fragment = document.createDocumentFragment(); 
    var option = document.createElement("option");
    option.value = "";
    option.textContent = "Legado";
    fragment.appendChild(option);
    try {
        // Faz a requisição para o endpoint /legados
        const response = await fetch('/legados');
        const legados = await response.json(); // Espera o retorno da resposta

        // Supondo que o retorno seja um array de legados
        legados.forEach(legado => {
            var option = document.createElement("option");
            option.value = legado.nome;
            option.textContent = legado.nome;
            fragment.appendChild(option); // Adiciona a opção ao fragmento
        });

        // Adiciona o fragmento ao select
        select.appendChild(fragment);
    } catch (error) {
        console.error('Erro ao buscar os legados:', error);
    }
}
var select = document.getElementById("legado");
// Chama a função para adicionar os legados ao select
legados(select);

document.getElementById('legado').addEventListener('change', function () {
    // Obtém o valor selecionado
    var selectValor = this.value;
    // Faz a requisição para o endpoint /legado/:nome
    fetch(`/legado/${selectValor}`)
        .then(response => response.json())
        .then(legado => {
            var habilidadesContainer = document.getElementById('habilidades-legado');
            // Limpa as habilidades anteriores
            habilidadesContainer.innerHTML = '';
            // Adiciona as novas habilidades
            legado.habilidades.forEach((habilidade,index) => {
                habilidadesContainer.innerHTML += `
                    <div class="habilidade-legado-${index + 1}">
                        <label for="habilidade-legado-${index + 1}">${habilidade.nome}</label>
                        <p>${habilidade.descricao}</p> 
                    </div>`;
                });
            })
        .catch(error => {
            console.error('Erro ao carregar as habilidades do legado:', error);
        });
});

