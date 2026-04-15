const lista = document.getElementById("listaAtestados");
const salvarBtn = document.getElementById("salvarAtestado");

let atestados = JSON.parse(localStorage.getItem("atestados")) || [];
let indexAtual = null;

function renderizarAtestados() {
    lista.innerHTML = "";

    atestados.forEach((atestado, index) => {
        lista.innerHTML += `
        <div class="documento-card">
            <div class="preview">
                <i class="fa-solid fa-file-circle-check"></i>
            </div>

            <div class="documento-info">
                <h3>Atestado Médico</h3>

                <p>Emitido por: ${atestado.medico}</p>

                <p class="especialidade">
                    <i class="fa-solid fa-stethoscope"></i>
                    ${atestado.especialidade}
                </p>

                <p>
                    <i class="fa-solid fa-notes-medical"></i>
                    CID: ${atestado.cid || "Não informado"}
                </p>

                <p>
                    <i class="fa-regular fa-calendar"></i>
                    Afastamento até: ${atestado.afastamento}
                </p>

                ${atestado.entrega
                ? `<p class="entrega-rh">
                                <i class="fa-regular fa-calendar-check"></i>
                                Entregue em: ${atestado.entrega}
                           </p>
                           <p class="rh-destino">
                                <i class="fa-solid fa-user-tie"></i>
                                Recebido por: ${atestado.rh}
                           </p>`
                : ""
            }

                <div class="acoes-card">
                    <button>
                        <i class="fa-solid fa-eye"></i>
                        Ver
                    </button>

                    <button onclick="abrirModal(${index})">
                        <i class="fa-solid fa-building-user"></i>
                        Entregue ao RH
                    </button>

                    <button>
                        <i class="fa-solid fa-share-nodes"></i>
                        Compartilhar
                    </button>

                    <button onclick="excluirAtestado(${index})">
                        <i class="fa-solid fa-trash"></i>
                        Excluir
                    </button>
                </div>
            </div>
        </div>`;
    });

    localStorage.setItem("atestados", JSON.stringify(atestados));
}

salvarBtn.addEventListener("click", () => {
    const medico = document.getElementById("medico").value;
    const especialidade = document.getElementById("especialidade").value;
    const cid = document.getElementById("cid").value;
    const afastamento = document.getElementById("afastamento").value;

    atestados.push({
        medico,
        especialidade,
        cid,
        afastamento
    });

    renderizarAtestados();
});

function abrirModal(index) {
    indexAtual = index;
    const modal = new bootstrap.Modal(document.getElementById("modalRH"));
    modal.show();
}

document.getElementById("confirmarEntrega").addEventListener("click", () => {
    atestados[indexAtual].entrega = document.getElementById("dataEntrega").value;
    atestados[indexAtual].rh = document.getElementById("recebidoPor").value;

    localStorage.setItem("atestados", JSON.stringify(atestados));
    renderizarAtestados();

    bootstrap.Modal.getInstance(document.getElementById("modalRH")).hide();
});

function excluirAtestado(index) {
    atestados.splice(index, 1);
    renderizarAtestados();
}

renderizarAtestados();