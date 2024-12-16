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

    getWeather(){
        const tipo = "&mode=xml";
        const unidades = "&units=metric";
        const idioma = "&lang=es";
        const apikey = "29798e1d1ac54de694e5d655d7d4753d";
        const url = "https://api.openweathermap.org/data/2.5/forecast?lat=" + this.coordenadasMeta.latitud +"&lon="+ this.coordenadasMeta.longitud + tipo + unidades + idioma+"&appid=" + apikey;

        $.ajax({
            dataType: "xml",
            url: url,
            method: 'GET',
            success: function(datos){
                console.log(datos)
                //Extracción de los datos contenidos en el XML
                const times = $('time', datos)
                times.each(function(){
                    var date = $(this).attr("to").split('T')
                    var acceptable = date[1].split(':')
                    if(acceptable[0] === "12"){
                        var icon                  = $('symbol', this).attr("var");
                        var temperaturaMin        = $("temperature", this).attr("min");
                        var temperaturaMax        = $('temperature',this).attr("max");
                        var temperaturaUnit       = $('temperature',this).attr("unit");
                        var humedad               = $('humidity',this).attr("value");
                        var humedadUnit           = $('humidity',this).attr("unit");
                        var precipitacionValue    = $('precipitation',this).attr("probability");
                        if(precipitacionValue === undefined)
                            precipitacionValue = "N/A"

                        var stringDatos = `<h4> <img src="${"https://openweathermap.org/img/w/" + icon + ".png"}" alt="Icono del Tiempo"> ${date[0]}</h4>
                                            <ul>
                                            <li>Temperatura mínima: ${temperaturaMin} ${temperaturaUnit}  </li>
                                            <li>Temperatura máxima: ${temperaturaMax} ${temperaturaUnit}  </li>
                                            <li>Humedad: ${humedad} ${humedadUnit}  </li>
                                            <li>Precipitación: ${precipitacionValue}  </li></ul>`;
                        
                        
                        const datosWeather = document.createElement('article');
                        datosWeather.innerHTML = stringDatos;
                        document.body.appendChild(datosWeather); 
                    }
                })



                
            },
            error:function(){
                $("h3").html("¡Tenemos problemas! No puedo obtener XML de <a href='http://openweathermap.org'>OpenWeatherMap</a>"); 
                $("h4").remove();
                $("h5").remove();
                $("p").remove();
                }
        });
    }
}

