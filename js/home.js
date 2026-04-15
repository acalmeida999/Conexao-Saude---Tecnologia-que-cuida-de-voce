function atualizarCard(card) {

    const qtd = parseInt(card.querySelector(".qtd").innerText);
    const alerta = card.querySelector(".alerta");
    const barra = card.querySelector(".progress-bar");

    // remove classes antigas (ESSENCIAL)
    card.classList.remove("card_ok", "card_alerta", "card_critico");

    let porcentagem = (qtd / 30) * 100;
    barra.style.width = porcentagem + "%";

    if (qtd > 10) {
        card.classList.add("card_ok");
        alerta.innerHTML = "✔ Medicação suficiente";
        alerta.className = "alerta fw-semibold text-success";

    } else if (qtd > 5) {
        card.classList.add("card_alerta");
        alerta.innerHTML = "⚠ Atenção: medicação acabando";
        alerta.className = "alerta fw-semibold text-warning";

    } else if (qtd > 0) {
        card.classList.add("card_critico");
        alerta.innerHTML = "🚨 Medicação no final";
        alerta.className = "alerta fw-semibold text-danger";

    } else {
        card.classList.add("card_critico");
        alerta.innerHTML = "❌ Medicação acabou";
        alerta.className = "alerta fw-bold text-danger";
    }
}


// ================= BOTÃO TOMEI =================
function configurarBotaoTomar() {

    document.querySelectorAll(".btn_tomar").forEach(btn => {

        btn.addEventListener("click", function () {

            const card = this.closest(".card_medicamento");
            const qtdEl = card.querySelector(".qtd");

            let atual = parseInt(qtdEl.innerText);

            if (isNaN(atual) || atual <= 0) return;

            atual--;
            qtdEl.innerText = atual;

            atualizarCard(card);
        });

    });
}


// ================= BOTÃO REPOR =================
function configurarBotaoRepor() {

    document.querySelectorAll(".btn_repor").forEach(btn => {

        btn.addEventListener("click", function () {

            const card = this.closest(".card_medicamento");
            const qtdEl = card.querySelector(".qtd");

            let atual = parseInt(qtdEl.innerText);

            let adicionar = prompt("Quantos comprimidos deseja adicionar?");
            if (!adicionar) return;

            adicionar = parseInt(adicionar);
            if (isNaN(adicionar)) return;

            qtdEl.innerText = atual + adicionar;

            atualizarCard(card);
        });

    });
}


// ================= INICIAR =================
document.addEventListener("DOMContentLoaded", () => {

    document.querySelectorAll(".card_medicamento").forEach(card => {
        atualizarCard(card);
    });

    configurarBotaoTomar();
    configurarBotaoRepor();
});








// modol


// BOTÕES
document.querySelectorAll('.selectable').forEach(group => {
  group.addEventListener('click', e => {
    if (e.target.classList.contains('btn-pill')) {
      group.querySelectorAll('.btn-pill').forEach(btn => btn.classList.remove('btn-selected'));
      e.target.classList.add('btn-selected');
    }
  });
});

// ELEMENTOS
const sentimentoBtns = document.getElementById('sentimentoBtns');
const blocoDor = document.getElementById('blocoDor');
const medicamentoBox = document.getElementById('medicamentoBox');

// SENTIMENTO
sentimentoBtns.addEventListener('click', e => {
  if (!e.target.classList.contains('btn-pill')) return;

  if (e.target.dataset.value === 'bem') {
    blocoDor.classList.add('hidden');
    medicamentoBox.classList.add('hidden');
  } else {
    blocoDor.classList.remove('hidden');
  }
});

// DOR
const dorRange = document.getElementById('dorRange');
const valorDor = document.getElementById('valorDor');
const textoDor = document.getElementById('textoDor');

dorRange.addEventListener('input', () => {
  const v = parseInt(dorRange.value);

  valorDor.textContent = v;
  valorDor.classList.remove('dor-baixa','dor-media','dor-alta');

  if (v === 0) {
    textoDor.textContent = "Sem dor";
    valorDor.classList.add('dor-baixa');
    medicamentoBox.classList.add('hidden');
  } 
  else if (v <= 3) {
    textoDor.textContent = "Dor leve";
    valorDor.classList.add('dor-baixa');
    medicamentoBox.classList.remove('hidden');
  } 
  else if (v <= 7) {
    textoDor.textContent = "Dor moderada";
    valorDor.classList.add('dor-media');
    medicamentoBox.classList.remove('hidden');
  } 
  else {
    textoDor.textContent = "Dor forte";
    valorDor.classList.add('dor-alta');
    medicamentoBox.classList.remove('hidden');
  }
});

// REMÉDIO
remedioBtns.addEventListener('click', e => {
  formRemedio.classList.toggle('hidden', e.target.dataset.value !== 'sim');
});

// SEGUNDO REMÉDIO
outroBtns.addEventListener('click', e => {
  segundoRemedio.classList.toggle('hidden', e.target.dataset.value !== 'sim');
});

// SALVAR
document.getElementById('btnSalvar').addEventListener('click', () => {

  const sentimento = document.querySelector('#sentimentoBtns .btn-selected')?.innerText || '';
  const dor = dorRange.value;
  const sono = document.querySelector('#sonoBtns .btn-selected')?.innerText || '';
  const energia = document.querySelector('#energiaBtns .btn-selected')?.innerText || '';

  let classificacao = '';
  if (dor == 0) classificacao = 'Sem dor';
  else if (dor <= 3) classificacao = 'Dor leve';
  else if (dor <= 7) classificacao = 'Dor moderada';
  else classificacao = 'Dor forte';

  const registro = {
    data: new Date().toLocaleDateString(),
    sentimento,
    dor,
    classificacao,
    sono,
    energia
  };

  let historico = JSON.parse(localStorage.getItem('historicoSaude')) || [];
  historico.push(registro);

  localStorage.setItem('historicoSaude', JSON.stringify(historico));

  alert("Salvo!");
});