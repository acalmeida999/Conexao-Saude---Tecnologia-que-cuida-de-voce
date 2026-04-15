const bloodBtns = document.querySelectorAll(".blood-btn");
const tipoSanguineo = document.getElementById("tipoSanguineo");

// ===============================
// 🩸 TIPO SANGUÍNEO
// ===============================
bloodBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        bloodBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        tipoSanguineo.value = btn.textContent.trim();
    });
});

// ===============================
// 🏷️ CHIPS INICIAIS
// ===============================
document.querySelectorAll(".chip").forEach((chip) => {
    chip.addEventListener("click", () => {
        chip.classList.toggle("active");
    });
});

// ===============================
// ➕ ADICIONAR NOVOS CHIPS
// ===============================
document.querySelectorAll(".add-chip-btn").forEach((button) => {
    button.addEventListener("click", () => {
        const input = document.getElementById(button.dataset.input);
        const target = document.getElementById(button.dataset.target);

        if (!input || !target) return;

        const value = input.value.trim();
        if (!value) return;

        const chip = document.createElement("span");
        chip.className = "chip active custom-chip";
        chip.innerHTML = `
      <span>${value}</span>
      <button type="button" class="remove-chip">
        <i class="fa-solid fa-xmark"></i>
      </button>
    `;

        chip.addEventListener("click", (e) => {
            if (e.target.closest(".remove-chip")) return;
            chip.classList.toggle("active");
        });

        chip.querySelector(".remove-chip").addEventListener("click", () => {
            chip.remove();
        });

        target.appendChild(chip);
        input.value = "";
    });
});

// ===============================
// 📞 CONTATO DE EMERGÊNCIA
// ===============================
const contatosContainer = document.getElementById("contatosContainer");
const addContatoBtn = document.getElementById("addContatoBtn");

function criarContatoCard() {
    const card = document.createElement("div");
    card.className = "contato-card";

    card.innerHTML = `
    <button type="button" class="remove-contact-btn">
      <i class="fa-solid fa-xmark"></i>
    </button>

    <div class="row g-3">
      <div class="col-md-4">
        <input class="form-control nomeContato" placeholder="Nome">
      </div>

      <div class="col-md-4">
        <input class="form-control telefoneContato" placeholder="Telefone">
      </div>

      <div class="col-md-4">
        <select class="form-control parentescoContato">
          <option>Pai</option>
          <option>Mãe</option>
          <option>Esposa</option>
          <option>Marido</option>
          <option>Namorado(a)</option>
          <option>Amigo(a)</option>
          <option>Tio(a)</option>
          <option>Primo(a)</option>
        </select>
      </div>
    </div>
  `;

    card.querySelector(".remove-contact-btn").addEventListener("click", () => {
        const total = document.querySelectorAll(".contato-card").length;

        // mantém pelo menos 1
        if (total > 1) {
            card.remove();
        }
    });

    return card;
}

if (addContatoBtn && contatosContainer) {
    addContatoBtn.addEventListener("click", () => {
        const total = document.querySelectorAll(".contato-card").length;

        if (total >= 3) return;

        contatosContainer.appendChild(criarContatoCard());
    });

    // começa com 1 contato inicial
    if (document.querySelectorAll(".contato-card").length === 0) {
        contatosContainer.appendChild(criarContatoCard());
    }
}

// ===============================
// 📦 PEGAR CHIPS SELECIONADOS
// ===============================
function getSelected(id) {
    const container = document.getElementById(id);
    if (!container) return [];

    return [...container.querySelectorAll(".chip.active")].map((chip) => {
        return chip.querySelector("span")?.textContent.trim() || chip.textContent.trim();
    });
}

// ===============================
// 💾 SALVAR FORMULÁRIO
// ===============================
document.getElementById("formMedico").addEventListener("submit", (e) => {
    e.preventDefault();

    const altura = parseFloat(document.getElementById("altura").value);
    const peso = parseFloat(document.getElementById("peso").value);

    const imc =
        altura && peso ? (peso / (altura * altura)).toFixed(1) : "";

    const contatos = [...document.querySelectorAll(".contato-card")].map((card) => ({
        nome: card.querySelector(".nomeContato")?.value || "",
        telefone: card.querySelector(".telefoneContato")?.value || "",
        parentesco: card.querySelector(".parentescoContato")?.value || "",
    }));

    const dadosMedicos = {
        tipoSanguineo: tipoSanguineo.value,
        altura,
        peso,
        imc,

        alergias: {
            alimentar: getSelected("alergiaAlimentarBox"),
            medicamentos: getSelected("alergiaMedicamentosBox"),
            outros: getSelected("alergiaOutrosBox"),
        },

        restricoes: {
            alimentar: getSelected("restricaoAlimentarBox"),
            medicas: getSelected("restricaoMedicaBox"),
        },

        condicoesMedicas: {
            cronicas: getSelected("condicoesCronicasBox"),
            mental: getSelected("condicoesMentalBox"),
            outras: getSelected("condicoesOutrasBox"),
        },

        contatos,
    };

    localStorage.setItem("dadosMedicos", JSON.stringify(dadosMedicos));

    window.location.href = "perfil.html";
});