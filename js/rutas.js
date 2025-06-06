"use strict";

class Rutas {

    constructor() {
        this.archivosKML = [];
        this.archivosSVG = [];
    }

    //leer archivo KML
    leerXML(files){
        var file = files[0];

        const self = this;

        const parContainer = document.createElement("article");
        const h2 = document.createElement("h2");
        h2.textContent = "Rutas Turísticas";
        parContainer.appendChild(h2);

        const archivosKMLCopy = [];
        const archivosSVGCopy = [];

        var tipoTexto = /text.*/;
        if (file.type.match(tipoTexto)){
            var lector = new FileReader();
            lector.readAsText(file);
            lector.onload = function (e) {
                let xml = $(lector.result);
                let rutas = xml.find('rutaTuristica');
                
                for(let i=0; i<rutas.length; i++){
                    const ruta = rutas[i];
                    const rutaContainer = document.createElement("section");

                    let nombre = ruta.getAttribute("nombre");
                    let nombreRuta = document.createElement("h3");
                    nombreRuta.textContent = nombre;
                    rutaContainer.appendChild(nombreRuta);

                    let tipo = ruta.getAttribute("tipo");
                    let tipoRuta = document.createElement("p");
                    tipoRuta.textContent = `Tipo de ruta: ${tipo}`;
                    rutaContainer.appendChild(tipoRuta);

                    let medioTransporte = ruta.getAttribute("medioTransporte");
                    let medioTransporteRuta = document.createElement("p");
                    medioTransporteRuta.textContent = `Medio de transporte: ${medioTransporte}`;
                    rutaContainer.appendChild(medioTransporteRuta);


                    let duracion = ruta.getAttribute("duracion");
                    let duracionRuta = document.createElement("p");
                    let strDuracion = duracion.replace("PT","")
                    duracionRuta.textContent = `Duración: ${strDuracion}`;
                    rutaContainer.appendChild(duracionRuta);


                    let agencia = ruta.getAttribute("agencia");
                    let agenciaRuta = document.createElement("p");
                    agenciaRuta.textContent = `Agencia: ${agencia}`;
                    rutaContainer.appendChild(agenciaRuta);


                    let personasAdecuadas = ruta.getAttribute("personasAdecuadas");
                    let personasAdecuadasRuta = document.createElement("p");
                    personasAdecuadasRuta.textContent = `Personas adecuadas: ${personasAdecuadas}`;
                    rutaContainer.appendChild(personasAdecuadasRuta);


                    let lugarInicio = ruta.getAttribute("lugarInicio");
                    let lugarInicioRuta = document.createElement("p");
                    lugarInicioRuta.textContent = `Lugar de inicio: ${lugarInicio}`;
                    rutaContainer.appendChild(lugarInicioRuta);


                    let direccionInicio = ruta.getAttribute("direccionInicio");
                    let direccionInicioRuta = document.createElement("p");
                    direccionInicioRuta.textContent = `Dirección de inicio: ${direccionInicio}`;
                    rutaContainer.appendChild(direccionInicioRuta);

                    // --

                    let descripcion = ruta.getElementsByTagName("descripcion")[0].textContent;
                    let descripcionRuta = document.createElement("p");
                    descripcionRuta.textContent = `Descripción: ${descripcion}`;
                    rutaContainer.appendChild(descripcionRuta);


                    let coordenadasInicio = ruta.getElementsByTagName("coordenadasInicio")[0];
                    let coordenadasInicioRuta = document.createElement("p");
                    coordenadasInicioRuta.textContent = `Coordenadas de inicio: ${coordenadasInicio.attributes[0].textContent}, ${coordenadasInicio.attributes[1].textContent}, ${coordenadasInicio.attributes[2].textContent}`;
                    rutaContainer.appendChild(coordenadasInicioRuta);


                    let referencias = ruta.getElementsByTagName("referencias")[0]; //contiene archivos KML y SVG
                    let referenciasRuta = document.createElement("p");
                    let r = 'Referencias: ';
                    for(let ref = 0; ref < referencias.children.length; ref++){
                        r += `${referencias.children[ref].textContent}, `;
                    }
                    referenciasRuta.textContent = r.slice(0, -2); // Eliminar la última coma y espacio
                    rutaContainer.appendChild(referenciasRuta);
                    //obtener archivos KML y SVG
                    archivosKMLCopy.push(referencias.children[0].textContent)
                    archivosSVGCopy.push(referencias.children[1].textContent);

                    let recomendacion = ruta.getElementsByTagName("recomendacion")[0].textContent;
                    let recomendacionRuta = document.createElement("p");
                    recomendacionRuta.textContent = `Recomendación: ${recomendacion}`;
                    rutaContainer.appendChild(recomendacionRuta);

                    let hitos = ruta.getElementsByTagName("hito");

                    for(let j = 0; j < hitos.length; j++){
                        const hito = hitos[j];

                        let nombreHito = hito.getAttribute("nombre");
                        let nombreHitoElement = document.createElement("h4");
                        nombreHitoElement.textContent = `Hito: ${nombreHito}`;
                        rutaContainer.appendChild(nombreHitoElement);

                        let descripcionHito = hito.getElementsByTagName("descripcionHito")[0].textContent;
                        let descripcionHitoElement = document.createElement("p");
                        descripcionHitoElement.textContent = `Descripción del hito: ${descripcionHito}`;
                        rutaContainer.appendChild(descripcionHitoElement);


                        let coordenadasHito = hito.getElementsByTagName("coordenadasHito")[0];
                        let coordenadasHitoElement = document.createElement("p");
                        coordenadasHitoElement.textContent = `Coordenadas del hito: ${coordenadasHito.attributes[0].textContent}, ${coordenadasHito.attributes[1].textContent}, ${coordenadasHito.attributes[2].textContent}`;
                        rutaContainer.appendChild(coordenadasHitoElement);


                        let distanciaHito = hito.getElementsByTagName("distancia")[0];
                        let distanciaHitoElement = document.createElement("p");
                        distanciaHitoElement.textContent = `Distancia al hito: ${distanciaHito.textContent} ${distanciaHito.getAttribute("unidad")}`;
                        rutaContainer.appendChild(distanciaHitoElement);


                        //let galeriaFotos = hito.getElementsByTagName("galeriaFotos")[0];
                        //galería Videos?
                    }

                    parContainer.appendChild(rutaContainer);
                }

                const title = document.getElementsByTagName("h2")[0];
                const main = document.getElementsByTagName("main")[0];
                main.insertBefore(parContainer, title.nextSibling);


                // this.archivosKML = archivosKMLCopy;
                // this.archivosSVG = archivosSVGCopy;
                self.getKML(archivosKMLCopy, archivosSVGCopy);
            }
        }
        else {
            errorArchivo.innerText = "Error : ¡¡¡ Archivo no válido !!!";
        }
    }

    getKML(archivosKML, archivosSVG) {
        const main = document.getElementsByTagName("main")[0];
        main.appendChild(document.createElement("h2")).textContent = "Mapa de rutas";

        for(let i = 0; i < archivosKML.length; i++) {
            let rutaNombre = archivosKML[i];
            fetch(`xml/${rutaNombre}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    
                    return response.text();
            }).then(kmlText => {
                const parser = new DOMParser();
                const xml = parser.parseFromString(kmlText, "application/xml");
                const placemarks = xml.getElementsByTagName("Placemark");

                const lastPlacemark = placemarks[placemarks.length - 1];
                const coordinates = lastPlacemark.getElementsByTagName("coordinates")[0];
                const coords = coordinates.textContent.trim().split("\n"); //array of long,lat,alt


                this.initMap(coords, rutaNombre);
            }).catch(error => {
                console.error("Error al obtener el KML: ", error);
            });
        }   

        //get SVG
        this.getSVG(archivosSVG);
        

    }

    // mapa dinámico de Google
    initMap(coords, mapName) {

      const centro = { lat: parseFloat(coords[0].split(",")[1]), lng: parseFloat(coords[0].split(",")[0]) }; // Ejemplo: Madrid
      const mapContainer = document.createElement("div");

      const map = new google.maps.Map(mapContainer, {
        zoom: 12,
        center: centro,
      });

      for(let i = 0; i < coords.length; i++) {
        const coord = coords[i].split(",");

        new google.maps.Marker({
          position: { lat: parseFloat(coord[1]), lng: parseFloat(coord[0]) },
          map: map,
          title: `Punto ${i + 1}`
        });
      }

      const main = document.getElementsByTagName("main")[0];
      const mapSection = document.createElement("section");
      mapSection.appendChild(document.createElement("h3")).textContent = `Ruta: ${mapName}`;
      mapSection.appendChild(mapContainer);
      main.appendChild(mapSection);

    }

    getSVG(archivosSVG) {
        for(let i=0; i < archivosSVG.length; i++) {
            let archivoSVG = archivosSVG[i];

            fetch(`xml/${archivoSVG}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.text();
                })
                .then(svgText => {
                    const main = document.getElementsByTagName("main")[0];
                    if(i == 0){
                        main.appendChild(document.createElement("h2")).textContent = "SVG de rutas";
                    }

                    const container = document.createElement("section");
                    container.appendChild(document.createElement("h3")).textContent = `Ruta SVG: ${archivoSVG}`;

                    container.innerHTML += svgText; // Añadir el SVG al contenedor correspondiente
                    main.appendChild(container);
                })
                .catch(error => {
                    console.error("Error al obtener el SVG: ", error);
                });
        }
    }
}

var rutas = new Rutas();