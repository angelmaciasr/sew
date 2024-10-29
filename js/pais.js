"use strict";

class Pais{
    constructor(npais, ncapital, cpoblacion){
        this.nombrePais = npais
        this.nombreCapital = ncapital
        this.nPoblacion = cpoblacion

        this.fillAttr()
    }

    fillAttr(){
        this.nombreCircuito = 'Circuito de las Américas'
        this.coordenadasMeta = {latitud: 30.1328, longitud: -97.6412}
        this.formaGobierno = "Republica"
        this.religion = "Cristianismo"
    }

    getNombrePais(){
        return this.nombrePais
    }

    getNombreCapital(){
        return this.nombreCapital
    }

    getSecInfo(){
        return '<h2>Informacion Secundaria</h2>'
                + '<p>Nombre del Circuito: ' + this.nombreCircuito + '</p>'
                + '<p>Poblacion: ' + this.nPoblacion + '</p>'
                + '<p>Forma de Gobierno: ' + this.formaGobierno + '</p>'
                + '<p>Religion: ' + this.religion + '</p>'
    }

    writeCoords(){
        document.write('<p>Coordenadas línea de meta: [' + this.coordenadasMeta.longitud
                        + ', ' + this.coordenadasMeta.latitud + ']</p>')
    }
}

