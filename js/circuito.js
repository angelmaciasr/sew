"use strict";

class Circuito{

    constructor(){
        if(!(window.File && window.FileReader && window.FileList && window.Blob)) {
            alert("The navigator DOES NOT support api file")
        }
    }

    leerXML(files){
        var file = files[0];

        const parContainer = document.createElement("section");
        const contentContainer = document.createElement("pre");


        var tipoTexto = /text.*/;
        if (file.type.match(tipoTexto)){
            var lector = new FileReader();
            lector.onload = function (e) {
                contentContainer.innerText = lector.result;
                parContainer.appendChild(contentContainer);

                // insertar justo después del botón
                var after = $('p');

                after[1].insertAdjacentElement("afterend", parContainer);
            }      
            lector.readAsText(file);
        }
        else {
            errorArchivo.innerText = "Error : ¡¡¡ Archivo no válido !!!";
        } 
    }

    getDynamicMap(){
        const main = document.querySelector('main');
        const container = document.createElement('article');
        container.innerHTML = "<h3>Mapa dinámico de Google</h3>";

        const mapContainer = document.createElement('div');

        var center = {lat: -97.636650, lng: 30.137211};
        var dinMap = new google.maps.Map(mapContainer,{
            zoom: 8,
            center:center,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });
        
        var infoWindow = new google.maps.InfoWindow;
        infoWindow.setPosition(center);
        infoWindow.setContent('Localización encontrada');
        infoWindow.open(dinMap);
        dinMap.setCenter(center);

        

        container.appendChild(mapContainer);

        main.appendChild(container);
    }


    leerKML(files){
        var file = files[0];


        //crear el mapa
        const container = document.createElement("section");
        const mapContainer = document.createElement('div');

        var center = {lat: -97.636650, lng: 30.137211};
        var dinMap = new google.maps.Map(mapContainer,{
            zoom: 8,
            center:center,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });
        
        // // crear el kmlLayer
        // var kmlLayer = new google.maps.KmlLayer(file, {
        //     suppressInfoWindows: true,
        //     preserveViewport: false,
        //     map: dinMap
        // });
        
        // //asociar el kml?
        // var capture = document.createElement('div');
        // kmlLayer.addListener('click', function(event) {
        //     var content = event.featureData.infoWindowHtml;
        //     var testimonial = capture;
        //     testimonial.innerHTML = content;
        //   });

        container.appendChild(mapContainer);
        // container.appendChild(capture);
        document.body.appendChild(container);

        var p = document.createElement("p");
        p.innerText = "KML cargado correctamente";
        document.body.appendChild(p);
    }
}

var circuito = new Circuito();