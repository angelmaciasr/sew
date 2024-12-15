"use strict";

class Fondo{

    constructor(nombrePais, nombreCapital, nombreCircuito){
        this.nombrePais = nombrePais;
        this.nombreCapital = nombreCapital;
        this.nombreCircuito = nombreCircuito;

        this.getCircuitImg();
    }

    getCircuitImg(){
        var flickrAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
        $.getJSON(flickrAPI, 
                {
                    tags: `${this.nombrePais}, ${this.nombreCapital}, ${this.nombreCircuito}, F1`,
                    tagmode: "any",
                    format: "json"
                })
            .done(function(data) {
            var photo = data.items[0];
            var imageUrl = photo.media.m.replace("_m", "_b");
            var i = document.createElement("img");
            i.src = imageUrl;
            i.alt = "Circuito de las Americas";
            document.body.appendChild(i);

            $('body img').css({
                'width': '100%',  
                'height': '100%', 
                'position': 'fixed',
                'top': 0,
                'left': 0,
                'z-index': -1  
            });
        });
    }
}


var fondo = new Fondo("Estados Unidos", "Austin", "Circuito de las Americas");
