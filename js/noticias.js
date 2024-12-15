"use strict";

class Noticias{
    constructor(){
        if(!(window.File && window.FileReader && window.FileList && window.Blob)){
            alert("The navigator DOES NOT support api file")
        }
    }

    readInputFile(files){
        var archivo = files[0]
        var tipoTexto = /text.*/;
        if (archivo.type.match(tipoTexto)) 
        {
            var lector = new FileReader();
            lector.onload = function (evento) {
                //El evento "onload" se lleva a cabo cada vez que se completa con éxito una operación de lectura
                //La propiedad "result" es donde se almacena el contenido del archivo
                //Esta propiedad solamente es válida cuando se termina la operación de lectura
                var texts = lector.result.split("\n");
                const noticiasContainer = $('main');

                texts.forEach(function (text) {
                    text = text.split("_")
                    var noticia = `<section><h3>${text[0]}</h3>
                                    <p>${text[1]}</p>
                                    <p>- ${text[2]}</p></section>`;
                    noticiasContainer.append(noticia);
                });

                document.body.appendChild(noticiasContainer);
            }      
            lector.readAsText(archivo);
        }
        else {
          errorArchivo.innerText = "Error : ¡¡¡ Archivo no válido !!!";
          }     
    }

    addNew(){
        var titular = document.getElementById('titular').value
        var texto = document.getElementById('texto').value
        var autor = document.getElementById('autor').value

        const container = $('main');

        var noticia = `<section><h3>${titular}</h3>
                        <p>${texto}</p>
                        <p>- ${autor}</p></section>`;
        
        container.append(noticia);
    }
}

var noti = new Noticias()