"use strict";

class Meteorologia{
    constructor(){
        // 43.410648, -7.143003
        this.latitud = 43.410648
        this.longitud = -7.143003

        this.ciudad = "San Tirso de Abres"

        this.apikey = "29798e1d1ac54de694e5d655d7d4753d"
        this.tipo = "&mode=xml";
        this.unidades = "&units=metric";
        this.idioma = "&lang=es";
    }

    getCurrentWeather(){
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${this.latitud}&lon=${this.longitud}&appid=${this.apikey}${this.tipo}${this.unidades}${this.idioma}`;
        

        $.ajax({
            dataType: "xml",
            url: url,
            method: 'GET',
            success: function(datos){
                //Extracción de los datos contenidos en el XML
                // var icon                  = $('symbol', datos).attr("var");
                var name                  = $('city', datos).attr("name");
                var temperatura           = $("temperature", datos).attr("value");
                var temperaturaMin        = $("temperature", datos).attr("min");
                var temperaturaMax        = $('temperature', datos).attr("max");
                var temperaturaUnit       = $('temperature',datos).attr("unit");
                var humedad               = $('humidity',datos).attr("value");
                var humedadUnit           = $('humidity',datos).attr("unit");
                var precipitacionValue    = $('precipitation',datos).attr("value");

                if(precipitacionValue === undefined)
                    precipitacionValue = "N/A"

                //<img src="${"https://openweathermap.org/img/w/" + icon + ".png"}" alt="Icono del Tiempo">
                var stringDatos = `<h4>${name}</h4> 
                                    <ul>
                                    <li>Temperatura actual: ${temperatura} ${temperaturaUnit}  </li>
                                    <li>Temperatura mínima: ${temperaturaMin} ${temperaturaUnit}  </li>
                                    <li>Temperatura máxima: ${temperaturaMax} ${temperaturaUnit}  </li>
                                    <li>Humedad: ${humedad} ${humedadUnit}  </li>
                                    <li>Precipitación: ${precipitacionValue}  </li></ul>`;
                
                
                const datosWeather = document.createElement('section');
                datosWeather.innerHTML = `<h2>Meteorología Actual</h2>${stringDatos}`;
                document.body.appendChild(datosWeather); 
            },
            error:function(){
                $("h3").html("¡Tenemos problemas! No puedo obtener XML de <a href='https://openweathermap.org'>OpenWeatherMap</a>"); 
                $("h4").remove();
                $("h5").remove();
                $("p").remove();
            }
        });
    }

    // Previsión para los próximos 7 días
    getWeather(){
        const params = "temperature_2m_max,temperature_2m_min,precipitation_sum,sunrise,sunset";
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${this.latitud}&longitude=${this.longitud}&daily=${params}&timezone=Europe%2FMadrid`;

        $.ajax({
            dataType: "json",
            url: url,
            method: 'GET',
            success: function(datos){
                console.log(datos)
                document.body.appendChild(document.createElement('h2')).innerHTML = "Previsión Meteorológica para los próximos 7 días"
                //Extracción de los datos contenidos en el JSON
                
                for(let i=0; i<datos.daily.time.length; i++){
                    var date = datos.daily.time[i];
                    var sunrise = datos.daily.sunrise[i].split('T')[1];
                    var sunset = datos.daily.sunset[i].split('T')[1];
                    var temperaturaMin = datos.daily.temperature_2m_min[i];
                    var temperaturaMax = datos.daily.temperature_2m_max[i];
                    var precipitacion = datos.daily.precipitation_sum[i];
                    var units = datos.daily_units.temperature_2m_max;


                    var stringDatos = `<h4>${date}</h4>
                                        <ul>
                                        <li>Temperatura mínima: ${temperaturaMin} ${units}</li>
                                        <li>Temperatura máxima: ${temperaturaMax} ${units}</li>
                                        <li>Precipitación: ${precipitacion} mm</li>
                                        <li>Amanecer: ${sunrise} h</li>
                                        <li>Anochecer: ${sunset} h</li></ul>`;

                    const datosWeather = document.createElement('section');
                    datosWeather.innerHTML = stringDatos;
                    document.body.appendChild(datosWeather); 
                }
            },
            error:function(){
                $("h3").html("¡Tenemos problemas! No puedo obtener XML de <a href='https://openweathermap.org'>OpenWeatherMap</a>"); 
                $("h4").remove();
                $("h5").remove();
                $("p").remove();
                }
        });
    }

}

var meteorologia = new Meteorologia();
