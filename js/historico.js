document.addEventListener('DOMContentLoaded', () => {
    const style = document.createElement('style');
    style.innerHTML = `
        .flip-container { perspective: 1000px; height: 300px; }
        .flip-card {
            width: 100%; height: 100%; position: relative;
            transition: transform 0.6s; transform-style: preserve-3d; cursor: pointer;
        }
        .flip-card.flipped { transform: rotateY(180deg); }
        .face {
            position: absolute; width: 100%; height: 100%;
            backface-visibility: hidden; border-radius: 12px;
        }
        .face.back { transform: rotateY(180deg); }
       
        /* Cria o círculo vermelho em volta do dia */
        .dia-marcado {
            border: 2px solid red !important;
            border-radius: 50%;
            width: 25px;
            height: 25px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: auto;
        }
    `;
    document.head.appendChild(style);
 
    const mesesNomes = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    const diasSemana = ["D", "S", "T", "Q", "Q", "S", "S"];
    const grade = document.getElementById('gradeCalendario');
    const secaoResumo = document.getElementById('secaoResumo');
    const btnAlternar = document.getElementById('btnAlternar');
 
    function gerarCalendario() {
        const ano = 2026;
        mesesNomes.forEach((nome, mesIndice) => {
            const primeiroDia = new Date(ano, mesIndice, 1).getDay();
            const diasNoMes = new Date(ano, mesIndice + 1, 0).getDate();
           
            let diasHTML = diasSemana.map(d => `<div class="fw-bold text-info small">${d}</div>`).join('');
            for (let i = 0; i < primeiroDia; i++) diasHTML += `<div></div>`;
           
            for (let dia = 1; dia <= diasNoMes; dia++) {
                // Verifica se o dia deve receber o círculo vermelho (Ex: 10, 21 e 22)
                const marcado = (dia === 10 || dia === 21 || dia === 22 || dia === 5 || dia === 8) ? 'dia-marcado' : '';
               
                // Aplica a classe 'marcado' se a condição for verdadeira
                diasHTML += `<div class="py-1 border rounded-1 bg-white small"><span class="${marcado}">${dia}</span></div>`;
            }
 
            const col = document.createElement('div');
            col.className = 'col-lg-3 col-md-4 col-sm-6 mb-4';
            col.innerHTML = `
                <div class="flip-container">
                    <div class="flip-card" onclick="this.classList.toggle('flipped')">
                        <div class="face front shadow-sm border bg-white">
                            <div class="p-2 text-center text-white fw-bold" style="background:#81d4fa">${nome}</div>
                            <div class="p-2 text-center" style="display:grid; grid-template-columns:repeat(7, 1fr); gap:3px; font-size:11px;">
                                ${diasHTML}
                            </div>
                        </div>
                        <div class="face back shadow-sm border bg-white d-flex align-items-center justify-content-center p-3 text-center">
                            <div>
                                <p class="small text-muted">aqui vai ficar os remedios quantidade e dias tomados.</p>
                            </div>
                        </div>
                    </div>
                </div>`;
            grade.appendChild(col);
        });
    }
 
    btnAlternar.addEventListener('click', () => {
        const estaNoResumo = !secaoResumo.classList.contains('d-none');
        if (estaNoResumo) {
            secaoResumo.classList.add('d-none');
            grade.classList.remove('d-none');
            btnAlternar.textContent = 'Ver Anual';
        } else {
            secaoResumo.classList.remove('d-none');
            grade.classList.add('d-none');
            btnAlternar.textContent = 'Voltar aos Meses';
        }
    });
 
    gerarCalendario();
});