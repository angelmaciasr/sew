"use strict";

class Juego{

    constructor(){
        this.preguntas = [
            {
              "pregunta": "¿En qué comunidad autónoma se encuentra San Tirso de Abres?",
              "opciones": ["Galicia", "Castilla y León", "Asturias", "Cantabria"],
              "respuesta": "Asturias"
            },
            {
              "pregunta": "¿Cuál es el río más importante que atraviesa San Tirso de Abres?",
              "opciones": ["Río Sella", "Río Eo", "Río Nalón", "Río Navia"],
              "respuesta": "Río Eo"
            },
            {
              "pregunta": "¿Qué idioma, además del español, es tradicionalmente hablado en esta zona?",
              "opciones": ["Euskera", "Gallego-asturiano (eonaviego)", "Catalán", "Leonés"],
              "respuesta": "Gallego-asturiano (eonaviego)"
            },
            {
              "pregunta": "¿Qué tipo de actividad turística destaca en San Tirso de Abres?",
              "opciones": ["Turismo de playa", "Pesca en el río y senderismo", "Esquí de montaña", "Turismo de compras"],
              "respuesta": "Pesca en el río y senderismo"
            },
            {
              "pregunta": "¿Cuál es una de las rutas más conocidas en San Tirso de Abres?",
              "opciones": ["Ruta de la Reconquista", "Ruta del Cares", "Senda del Ferrocarril", "Ruta del Alba"],
              "respuesta": "Senda del Ferrocarril"
            },
            {
              "pregunta": "¿Qué es típico en la gastronomía local de San Tirso de Abres?",
              "opciones": ["Trucha del Eo", "Marisco", "Paella", "Gazpacho"],
              "respuesta": "Trucha del Eo"
            },
            {
              "pregunta": "¿Qué tipo de paisaje predomina en el concejo?",
              "opciones": ["Urbano e industrial", "Rural con bosques y ríos", "Desértico", "Costero con acantilados"],
              "respuesta": "Rural con bosques y ríos"
            },
            {
              "pregunta": "¿Cuál es una festividad local destacada?",
              "opciones": ["Semana Grande", "Fiestas del Pilar", "Fiesta de San Tirso (patrón del concejo)", "Carnaval de Verano"],
              "respuesta": "Fiesta de San Tirso (patrón del concejo)"
            },
            {
              "pregunta": "¿Qué infraestructura abandonada se ha reconvertido en ruta peatonal?",
              "opciones": ["Una autopista", "Una vía de tren", "Un aeropuerto", "Un canal de riego"],
              "respuesta": "Una vía de tren"
            },
            {
              "pregunta": "¿Qué comarca asturiana incluye a San Tirso de Abres?",
              "opciones": ["Oriente", "Nalón", "Eo-Navia", "Avilés"],
              "respuesta": "Eo-Navia"
            }
          ];
          

        this.npreguntas = this.preguntas.length;
        this.preguntaActual = 0;
        this.score = 0;

        this.paintQuestion();
    }
    

    paintQuestion(){
        const p = this.getNextQuestion();
        const container = document.querySelectorAll('article')[0];

        let pregunta = document.createElement('div');
        pregunta.innerHTML = `<h3>${this.preguntas[p].pregunta}</h3>`;
        
        this.preguntas[p].opciones.forEach((opcion, index) => {
            const button = document.createElement('button');
            button.innerHTML = opcion;
            
            button.setAttribute("onclick", `juego.checkAnswer('${opcion}', '${this.preguntas[p].respuesta}')`);
            pregunta.appendChild(button);
        });

        container.innerHTML = pregunta.outerHTML;
    }

    checkAnswer(opcion, respuestaCorrecta){       
        if(opcion === respuestaCorrecta){
            this.score++;
        }
        this.preguntaActual++;
        if(this.preguntaActual < this.npreguntas){
            this.paintQuestion();
        }else{
            this.paintFinalScore();
        }
    }

    paintFinalScore(){
        const container = document.getElementsByTagName("article")[0];
        container.innerHTML = `<h2>Juego terminado</h2><p>Tu puntuación es: ${this.score}/${this.npreguntas}</p>`;
    }
    
    getNextQuestion(){
        // const preguntaActual = this.preguntas[Math.floor(Math.random() * this.npreguntas)];
        // return preguntaActual;
        return this.preguntaActual;
    }
}

const juego = new Juego();