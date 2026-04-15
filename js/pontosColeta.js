document.addEventListener("DOMContentLoaded", function () {
    // Seleção de elementos
    const btnUBS = document.getElementById("btnUBS");
    const btnColeta = document.getElementById("btnColeta");
    const lista = document.getElementById("listaUBS");
    const infoColeta = document.getElementById("infoColeta");
    const texto = document.getElementById("textoInfo");
    const body = document.body;
    const filtroRaio = document.getElementById("filtroRaio");
    const cards = document.querySelectorAll(".card-item");

    // Coordenadas Residência (R. Saigiro Nakamura, 400)
    const HOME_LAT = -23.1802;
    const HOME_LON = -45.8596;

    // Função para resetar a tela para o estado inicial
    function exibirTelaInicial() {
        lista.classList.remove("mostrar");
        infoColeta.classList.remove("mostrar");
        texto.classList.remove("d-none");
        body.classList.remove("bg-ubs", "bg-coleta");
        // Reset do filtro ao fechar
        if(filtroRaio) filtroRaio.checked = false;
        cards.forEach(card => card.classList.remove("d-none"));
    }

    // Evento Botão UBS
    btnUBS.addEventListener("click", () => {
        const jaEstaAberto = lista.classList.contains("mostrar");
        
        if (jaEstaAberto) {
            exibirTelaInicial();
        } else {
            exibirTelaInicial(); // Limpa outros estados antes de abrir
            lista.classList.add("mostrar");
            texto.classList.add("d-none");
            body.classList.add("bg-ubs");
        }
    });

    // Evento Botão Coleta
    btnColeta.addEventListener("click", () => {
        const jaEstaAberto = infoColeta.classList.contains("mostrar");

        if (jaEstaAberto) {
            exibirTelaInicial();
        } else {
            exibirTelaInicial(); // Limpa outros estados antes de abrir
            infoColeta.classList.add("mostrar");
            texto.classList.add("d-none");
            body.classList.add("bg-coleta");
        }
    });

    // --- LÓGICA DO FILTRO DE 5KM (MANTIDA) ---
    if (filtroRaio) {
        filtroRaio.addEventListener("change", function () {
            if (this.checked) {
                if ("geolocation" in navigator) {
                    navigator.geolocation.getCurrentPosition(
                        (pos) => {
                            filtrarPorDistancia(pos.coords.latitude, pos.coords.longitude);
                        },
                        (err) => {
                            // Plano B silencioso: usa casa se GPS falhar
                            filtrarPorDistancia(HOME_LAT, HOME_LON);
                        },
                        { timeout: 5000 }
                    );
                } else {
                    filtrarPorDistancia(HOME_LAT, HOME_LON);
                }
            } else {
                cards.forEach(card => card.classList.remove("d-none"));
            }
        });
    }

    function filtrarPorDistancia(latUsu, lonUsu) {
        cards.forEach(card => {
            const latCard = parseFloat(card.getAttribute("data-lat"));
            const lonCard = parseFloat(card.getAttribute("data-lon"));
            const distancia = calcularHaversine(latUsu, lonUsu, latCard, lonCard);

            if (distancia > 5) {
                card.classList.add("d-none");
            } else {
                card.classList.remove("d-none");
            }
        });
    }

    function calcularHaversine(lat1, lon1, lat2, lon2) {
        const R = 6371; 
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                  Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
                  Math.sin(dLon/2) * Math.sin(dLon/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return R * c;
    }
});