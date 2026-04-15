
function editarDados() {
    document.getElementById("viewDados").style.display = "none";
    document.getElementById("editDados").style.display = "block";

    // preencher campos
    let dados = JSON.parse(localStorage.getItem("dadosMedicos"));

    sangue.value = dados.sangue || "";
    altura.value = dados.altura || "";
    peso.value = dados.peso || "";
}

function salvarDados() {

    let dados = JSON.parse(localStorage.getItem("dadosMedicos")) || {};

    dados.sangue = sangue.value;
    dados.altura = altura.value;
    dados.peso = peso.value;

    localStorage.setItem("dadosMedicos", JSON.stringify(dados));

    location.reload();
}



// informacoes medicas 

let dados = JSON.parse(localStorage.getItem("dadosMedicos")) || {};

// ===================== DADOS =====================
function editarDados() {
    viewDados.style.display = "none";
    editDados.style.display = "block";

    sangue.value = dados.sangue || "";
    altura.value = dados.altura || "";
    peso.value = dados.peso || "";
}

function salvarDados() {
    dados.sangue = sangue.value;
    dados.altura = altura.value;
    dados.peso = peso.value;

    localStorage.setItem("dadosMedicos", JSON.stringify(dados));

    editDados.style.display = "none";
    viewDados.style.display = "block";

    atualizarTela();
}

// ===================== ALERGIAS =====================
function editarAlergias() {
    viewAlergias.style.display = "none";
    editAlergias.style.display = "block";

    alergiaAlimentar.value = dados.alergiaAlimentar || "";
    alergiaMed.value = dados.alergiaMed || "";
}

function salvarAlergias() {
    dados.alergiaAlimentar = alergiaAlimentar.value;
    dados.alergiaMed = alergiaMed.value;

    localStorage.setItem("dadosMedicos", JSON.stringify(dados));

    editAlergias.style.display = "none";
    viewAlergias.style.display = "block";

    atualizarTela();
}

// ===================== DOENÇAS =====================
function editarDoencas() {
    viewDoencas.style.display = "none";
    editDoencas.style.display = "block";

    doencas.value = dados.doencas || "";
}

function salvarDoencas() {
    dados.doencas = doencas.value;

    localStorage.setItem("dadosMedicos", JSON.stringify(dados));

    editDoencas.style.display = "none";
    viewDoencas.style.display = "block";

    atualizarTela();
}

// ===================== CONTATO =====================
function editarContato() {
    viewContato.style.display = "none";
    editContato.style.display = "block";

    contatoNome.value = dados.contatoNome || "";
    contatoTel.value = dados.contatoTel || "";
}

function salvarContato() {
    dados.contatoNome = contatoNome.value;
    dados.contatoTel = contatoTel.value;

    localStorage.setItem("dadosMedicos", JSON.stringify(dados));

    editContato.style.display = "none";
    viewContato.style.display = "block";

    atualizarTela();
}

// ===================== ATUALIZAR TELA =====================
function atualizarTela() {

    v_sangue.innerText = dados.sangue || "-";
    v_altura.innerText = dados.altura || "-";
    v_peso.innerText = dados.peso || "-";

    // IMC
    if (dados.altura && dados.peso) {

        let altura = parseFloat(dados.altura);
        let peso = parseFloat(dados.peso);

        let imc = peso / (altura * altura);

        v_imc.innerText = imc.toFixed(1);

        let texto = "";

        if (imc < 18.5) {
            texto = "Abaixo do peso";
            v_imcTexto.style.color = "orange";
        } else if (imc < 25) {
            texto = "Peso normal";
            v_imcTexto.style.color = "green";
        } else if (imc < 30) {
            texto = "Sobrepeso";
            v_imcTexto.style.color = "orange";
        } else {
            texto = "Obesidade";
            v_imcTexto.style.color = "red";
        }

        v_imcTexto.innerText = texto;

    } else {
        v_imc.innerText = "-";
        v_imcTexto.innerText = "";
    }

    // outros
    v_alergiaAlimentar.innerText = dados.alergiaAlimentar || "-";
    v_alergiaMed.innerText = dados.alergiaMed || "-";

    v_doencas.innerText = dados.doencas || "-";

    v_contatoNome.innerText = dados.contatoNome || "-";
    v_contatoTel.innerText = dados.contatoTel || "-";
}

window.addEventListener("load", atualizarTela);