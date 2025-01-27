
async function getTecnicas(tecnicas) {
  try {
    const response = await fetch(`/tecnicas/${tecnicas}`);
    if (!response.ok) {
      throw new Error(`Erro: ${response.status}`);
    }
    const data = await response.json();
    return data; 
  } catch (error) {
    console.error('Erro na requisição:', error);
  }
}


function showTecnica(tecnica) {
  const modal = document.getElementById(`modal-${tecnica}`);
  if (modal.style.display === 'block') {
    modal.style.display = 'none';
  } else {
    modal.style.display = 'block';
  }
}
async function showTab(caminho) {
  let modal = document.getElementById(`modal${caminho}`);
  if (modal === null) {
    modal = document.createElement("div");
    modal.className = "modal-content-habilidade";
    modal.id = `modal${caminho}`;

    try {
      const response = await fetch(`/habilidades/${caminho}`);
      const habilidades = await response.json();

      for (const habilidade of habilidades) {
        let habilidadeHTML = `
        <div class="habilidade-container">
            <div class="habilidade-header">
                <h2>${habilidade.nome}</h2>
            </div>
            <div class="habilidade-info">
                <p><strong>PE:</strong> ${habilidade.custoPE} | <strong>Ação:</strong> ${habilidade.tipoAcao} | ${habilidade.alcance ? `<strong>Alcance:</strong> ${habilidade.alcance} | ` : ''} ${habilidade.categorias ? `<strong>Categoria:</strong> ${habilidade.categorias}` : ''}</p>
                ${habilidade.teste ? `<p><strong>Teste:</strong> ${habilidade.teste}</p>` : ''}
              </div>
            <div class="habilidade-descricao">
                <em>${habilidade.descricaoFlavor}</em>
            </div>
            <div class="habilidade-efeito">
                <p>${habilidade.efeitoPrincipal}</p>
            </div>
          `;
          if (habilidade.Tecnicas && habilidade.Tecnicas.length > 0) {
            const tecnicasResponse = await fetch(`/tecnicas/${habilidade.Tecnicas}`);
            const tecnicas = await tecnicasResponse.json();
          
            habilidadeHTML += `
            <div class="habilidade-tecnicas">
              <h3>Técnicas</h3>
              <div class="tecnica-container">
                <div class="menu-item">
                  ${tecnicas.map(tecnica => 
                    ` <div class="dropdown">
                        <button type="button" class="btn btn-secondary dropdown-toggle" id="dropdownMenuOffset" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-offset="50,0">
                          <h4>${tecnica.nome}</h4>
                        </button>
                        <div class="dropdown-menu" style="background-color: #00000000; border: none; max-width800px;" >
                          <div id="modal-${tecnica.nome}" class="modal-tecnica">
                            <div class="modal-content-tecnica">
                              <div class="tecnica-info">
                                <div><h4>${tecnica.nome || ''}</h4></div>
                                <div class="tecnica-header">
                                  <p><strong>PE:</strong> ${tecnica.custoPE} | <strong>Ação:</strong> ${tecnica.tipoAcao} | ${tecnica.alcance ? `<strong>Alcance:</strong> ${tecnica.alcance} | ` : ''} ${tecnica.categorias ? `<strong>Categoria:</strong> ${tecnica.categorias}` : ''}</p>
                                  ${tecnica.teste ? `<p><strong>Teste:</strong> ${tecnica.teste}</p>` : ''}
                                </div>
                                <div>
                                ${tecnica.descricao ? `<div><p><strong>Descrição:</strong> ${tecnica.descricao}</p></div>` : ''}
                                ${tecnica.restricao ? `<div><p><strong>Restrição:</strong> ${tecnica.restricao}</p></div>` : ''}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>  
                      </div>`
                    ).join('')}
                  </div>
                </div>
              `;
          }
          habilidadeHTML += `
            <div class="habilidade-aprimoramentos">
              <h3>Aprimoramentos</h3>
              ${habilidade.aprimoramentos.map(improvement => `
                <div class="habilidade-item">
                  <h4>${improvement.tipo}:</h4>
                  <p>${improvement.descricao}</p>
                </div>`
              ).join('')}
            </div>
        </div>`;

          modal.innerHTML += habilidadeHTML;
      }
    } catch (error) {
      console.error('Erro ao carregar habilidades:', error);
      modal.innerHTML = `<p>Erro ao carregar os dados.</p>`;
    }

    document.querySelector("#modal-habilidades .modal-content").appendChild(modal);
  }

  modal.style.display = 'block';
}

function modalHabilidades() {
    modal = document.getElementById('modal-habilidades');
    modal.style.display = 'block';
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
}
