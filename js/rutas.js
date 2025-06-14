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
                    strDuracion = strDuracion.replace("H", " horas ").replace("M", " minutos ");
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
                    coordenadasInicioRuta.textContent = `Coordenadas de inicio (longitud, latitud, altitud): (${coordenadasInicio.attributes[0].textContent}, ${coordenadasInicio.attributes[1].textContent}, ${coordenadasInicio.attributes[2].textContent})`;
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
                    archivosKMLCopy.push(referencias.children[0].textContent);
                    archivosSVGCopy.push(referencias.children[1].textContent);

                    let recomendacion = ruta.getElementsByTagName("recomendacion")[0].textContent;
                    let recomendacionRuta = document.createElement("p");
                    recomendacionRuta.textContent = `Recomendación: ${recomendacion}`;
                    rutaContainer.appendChild(recomendacionRuta);

                    let hitos = ruta.getElementsByTagName("hito");
                    let hitosElement = document.createElement("h4");
                    hitosElement.textContent = `Hitos de la ruta:`;
                    rutaContainer.appendChild(hitosElement);

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
                        coordenadasHitoElement.textContent = `Coordenadas del hito (longitud, latitud, altitud): (${coordenadasHito.attributes[0].textContent}, ${coordenadasHito.attributes[1].textContent}, ${coordenadasHito.attributes[2].textContent})`;
                        rutaContainer.appendChild(coordenadasHitoElement);


                        let distanciaHito = hito.getElementsByTagName("distancia")[0];
                        let distanciaHitoElement = document.createElement("p");
                        distanciaHitoElement.textContent = `Distancia desde hito anterior: ${distanciaHito.textContent} ${distanciaHito.getAttribute("unidad")}`;
                        rutaContainer.appendChild(distanciaHitoElement);


                        let galeriaFotos = hito.getElementsByTagName("galeriaFotos")[0];
                        let galeriaFotosElement = document.createElement("h5");
                        galeriaFotosElement.textContent = "Galería de fotos:";
                        rutaContainer.appendChild(galeriaFotosElement);
                        for(let k = 0; k < galeriaFotos.children.length; k++){
                            const foto = galeriaFotos.children[k];
                            let pictureElement = document.createElement("picture");
                            //smaller img
                            let sourceElement = document.createElement("source");
                            sourceElement.srcset = `multimedia/150px-${foto.textContent}`;
                            sourceElement.media = "(max-width: 465px)";
                            pictureElement.appendChild(sourceElement);

                            //medium img
                            let sourceElementMedium = document.createElement("source");
                            sourceElementMedium.srcset = `multimedia/350px-${foto.textContent}`;
                            sourceElementMedium.media = "(max-width: 799px)";
                            pictureElement.appendChild(sourceElementMedium);

                            //default img
                            let sourceElementDefault = document.createElement("source");
                            sourceElementDefault.srcset = `multimedia/${foto.textContent}`;
                            pictureElement.appendChild(sourceElementDefault);

                            let fotoElement = document.createElement("img");
                            fotoElement.src = `multimedia/${foto.textContent}`;
                            fotoElement.alt = `Foto ${k + 1} de ${nombreHito}`;
                            pictureElement.appendChild(fotoElement);
                            
                            
                            rutaContainer.appendChild(pictureElement);
                        }
                        
                        let galeriaVideos = hito.getElementsByTagName("galeriaVideos")[0];
                        if(galeriaVideos != null) {
                            let galeriaVideosElement = document.createElement("h5");
                            galeriaVideosElement.textContent = "Galería de videos:";
                            rutaContainer.appendChild(galeriaVideosElement);
                            for(let k = 0; k < galeriaVideos.children.length; k++){
                                const video = galeriaVideos.children[k];
                                let videoElement = document.createElement("video");
                                videoElement.controls = true;
                                videoElement.preload = "auto";
                                let sourceMP4 = document.createElement("source");
                                sourceMP4.src = `multimedia/${video.textContent}`;
                                sourceMP4.type = "video/mp4";

                                videoElement.appendChild(sourceMP4);
                                rutaContainer.appendChild(videoElement);
                            }
                        }
                    }

                    parContainer.appendChild(rutaContainer);
                }

                const title = document.getElementsByTagName("p")[0];
                const main = document.getElementsByTagName("main")[0];
                main.insertBefore(parContainer, title.nextSibling);

                main.removeChild(title);
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

        // Obtener SVGs
        this.getSVG(archivosSVG);
    }

    // mapa dinámico de Google
    initMap(coords, mapName) {

      const centro = { lat: parseFloat(coords[0].split(",")[1]), lng: parseFloat(coords[0].split(",")[0]) }; // Ejemplo: Madrid
      const mapContainer = document.createElement("div");

      //mapa
      const map = new google.maps.Map(mapContainer, {
        zoom: 12,
        center: centro,
      });

      //puntos
      for(let i = 0; i < coords.length; i++) {
        const coord = coords[i].split(",");

        new google.maps.Marker({
          position: { lat: parseFloat(coord[1]), lng: parseFloat(coord[0]) },
          map: map,
          title: `Punto ${i + 1}`
        });
      }

      //linea
      const polyline = new google.maps.Polyline({
        path: coords.map(coord => {
          const parts = coord.split(",");
          return { lat: parseFloat(parts[1]), lng: parseFloat(parts[0]) };
        }),
        geodesic: true,
        strokeColor: "#FF0000",
        strokeOpacity: 1.0,
        strokeWeight: 2
      });
      polyline.setMap(map);

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