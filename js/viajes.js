"use strict";

class Viajes{

    constructor(){
        navigator.geolocation.getCurrentPosition(this.getPosicion.bind(this), this.verErrores.bind(this));
        this.addCarruselFunctionality();
    }

    getPosicion(posicion){
        this.longitud         = posicion.coords.longitude; 
        this.latitud          = posicion.coords.latitude;  
        this.precision        = posicion.coords.accuracy;
        this.altitud          = posicion.coords.altitude;
        this.precisionAltitud = posicion.coords.altitudeAccuracy;
        this.rumbo            = posicion.coords.heading;
        this.velocidad        = posicion.coords.speed;       
    }
    
    verErrores(error){
        switch(error.code) {
        case error.PERMISSION_DENIED:
            this.mensaje = "El usuario no permite la petición de geolocalización"
            break;
        case error.POSITION_UNAVAILABLE:
            this.mensaje = "Información de geolocalización no disponible"
            break;
        case error.TIMEOUT:
            this.mensaje = "La petición de geolocalización ha caducado"
            break;
        case error.UNKNOWN_ERROR:
            this.mensaje = "Se ha producido un error desconocido"
            break;
        }
    }

    getStaticMap(){
        const container = $('main');
        var apiKey = "&key=AIzaSyC6j4mF6blrc4kZ54S6vYZ2_FpMY9VzyRU";
        var url = "https://maps.googleapis.com/maps/api/staticmap?";
        //Parámetros
        var centro = "center=" + this.latitud + "," + this.longitud;

        
        var zoom ="&zoom=15";

        var tamaño= "&size=800x600";

        var marcador = "&markers=color:red%7C%7C" + this.latitud + "," + this.longitud;
        console.log(marcador)
        var sensor = "&sensor=false"; 
        
        this.imagenMapa = url + centro + zoom + tamaño + marcador + sensor + apiKey;
        var mapString = `<img src='${this.imagenMapa}' alt='mapa estático google en las coordenadas ${this.latitud}, ${this.longitud}' />`;

        var staticMap = `<article><h3>Mapa estático de Google</h3>${mapString}</article>`;
        
        //coger el primer botón (mapa estático) y deshabilitarlo
        const button = $('button')[0];
        button.disabled = true;
        
        container.append(staticMap); 
    }


    getDynamicMap(){
        const main = document.querySelector('main');
        const container = document.createElement('article');
        container.innerHTML = "<h3>Mapa dinámico de Google</h3>";

        const mapContainer = document.createElement('div');

        var center = {lat: this.latitud, lng: this.longitud};
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

        //coger el segundo botón (mapa dinámico) y deshabilitarlo
        const button = $('button')[1];
        button.disabled = true;

        container.appendChild(mapContainer);

        main.appendChild(container);
    }


    addCarruselFunctionality(){
        //FUNCIONAMIENTO CARRUSEL
        const slides = document.querySelectorAll("img");

        // select next slide button
        const nextSlide = document.querySelector("button[data-action='next']");

        // current slide counter
        let curSlide = 0;
        // maximum number of slides
        let maxSlide = slides.length - 1;

        // add event listener and navigation functionality
        nextSlide.addEventListener("click", function () {
            // check if current slide is the last and reset current slide
            if (curSlide === maxSlide) {
                curSlide = 0;
            } else {
                curSlide++;
            }

            //   move slide by -100%
            slides.forEach((slide, indx) => {
                var trans = 100 * (indx - curSlide);
                $(slide).css('transform', 'translateX(' + trans + '%)')
            });
        });

        // select next slide button
        const prevSlide = document.querySelector("button[data-action='prev']");

        // add event listener and navigation functionality
        prevSlide.addEventListener("click", function () {
            // check if current slide is the first and reset current slide to last
            if (curSlide === 0) {
                curSlide = maxSlide;
            } else {
                curSlide--;
            }

            //   move slide by 100%
            slides.forEach((slide, indx) => {
                var trans = 100 * (indx - curSlide);
                $(slide).css('transform', 'translateX(' + trans + '%)')
            });
        });
    }
}

var viajes = new Viajes();