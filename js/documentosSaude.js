const btn = document.getElementById("btnAlternarVacinas");
const aplicadas = document.getElementById("vacinasAplicadas");
const proximas = document.getElementById("vacinasProximas");
 
let mostrandoAplicadas = true;
 
/* estado inicial */
btn.textContent = "Aplicadas";
 
btn.addEventListener("click", () => {
 
  mostrandoAplicadas = !mostrandoAplicadas;
 
  aplicadas.classList.toggle("hidden");
  proximas.classList.toggle("hidden");
 
  /* texto mostra a ABA ATUAL */
  btn.textContent = mostrandoAplicadas
    ? "Aplicadas"
    : "Próximas";
});