// primeira letra maiúscula
function formatarNome(nome) {
    return nome.charAt(0).toUpperCase() + nome.slice(1).toLowerCase();
}

// ================= CARREGAR PARA EDIÇÃO =================
const indexEditar = localStorage.getItem("editarIndex");

if (indexEditar !== null) {

    const lista = JSON.parse(localStorage.getItem("medicamentos")) || [];
    const remedio = lista[indexEditar];

    document.getElementById("nomeRemedio").value = remedio.nome;
    document.getElementById("dosagemRemedio").value = remedio.dosagem;
    document.getElementById("quantidadeRemedio").value = remedio.quantidade;

    const listaHorarios = document.getElementById("listaHorarios");
    listaHorarios.innerHTML = "";

    remedio.horarios.forEach(h => {
        listaHorarios.innerHTML += `
        <div class="horario_item d-flex gap-2">
            <input type="time" class="form-control" value="${h}">
            <button type="button" class="btn btn-outline-danger btnRemoverHorario">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>`;
    });
}


// ================= ADD HORÁRIO =================
document.getElementById("btnAddHorario").addEventListener("click", () => {

    const lista = document.getElementById("listaHorarios");

    lista.innerHTML += `
    <div class="horario_item d-flex gap-2">
        <input type="time" class="form-control">
        <button type="button" class="btn btn-outline-danger btnRemoverHorario">
            <i class="fa-solid fa-trash"></i>
        </button>
    </div>`;
});


// ================= REMOVER HORÁRIO =================
document.addEventListener("click", function (e) {

    if (e.target.closest(".btnRemoverHorario")) {
        e.target.closest(".horario_item").remove();
    }

});


// ================= SALVAR =================
document.getElementById("form_medicamento").addEventListener("submit", function (e) {
    e.preventDefault();

    let nome = formatarNome(document.getElementById("nomeRemedio").value);
    const dosagem = document.getElementById("dosagemRemedio").value;
    const quantidade = parseInt(document.getElementById("quantidadeRemedio").value);

    const horarios = [];
    document.querySelectorAll("#listaHorarios input[type='time']").forEach(input => {
        if (input.value) horarios.push(input.value);
    });

    const dias = [];
    document.querySelectorAll(".dias:checked").forEach(d => {
        dias.push(d.nextElementSibling.innerText);
    });

    const remedio = {
        nome,
        dosagem,
        quantidade,
        horarios,
        dias
    };

    let lista = JSON.parse(localStorage.getItem("medicamentos")) || [];

    if (indexEditar !== null) {
        lista[indexEditar] = remedio;
        localStorage.removeItem("editarIndex");
    } else {
        lista.push(remedio);
    }

    localStorage.setItem("medicamentos", JSON.stringify(lista));

    window.location.href = "home.html";
});