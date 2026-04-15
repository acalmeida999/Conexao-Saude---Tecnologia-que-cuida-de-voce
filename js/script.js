// CARREGAR FOTO SALVA
window.addEventListener("load", function(){

    let fotoSalva = localStorage.getItem("fotoUsuario");

    if(fotoSalva){

        let fotos = document.querySelectorAll(".foto_usuario, .foto_mobile");

        fotos.forEach(function(img){
            img.src = fotoSalva;
        });

    }

});


// ESCOLHER NOVA FOTO
let inputFoto = document.getElementById("input_foto");

if(inputFoto){

    inputFoto.addEventListener("change", function(event){

        let arquivo = event.target.files[0];

        if(arquivo){

            let reader = new FileReader();

            reader.onload = function(e){

                let imagem = e.target.result;

                localStorage.setItem("fotoUsuario", imagem);

                let fotos = document.querySelectorAll(".foto_usuario, .foto_mobile");

                fotos.forEach(function(img){
                    img.src = imagem;
                });

            }

            reader.readAsDataURL(arquivo);
        }

    });

}