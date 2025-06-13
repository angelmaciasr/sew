"use strict";

class Juego{

    constructor(){
        this.preguntas = [
            {
              "pregunta": "¿En qué comunidad autónoma se encuentra San Tirso de Abres?",
              "opciones": ["Galicia", "Castilla y León", "Asturias", "Cantabria", "País Vasco"],
              "respuesta": "Asturias" // se puede encontrar la respuesta en el apartado de 'Gastronomía'
            },
            {
              "pregunta": "¿Cuál es el río más importante que atraviesa San Tirso de Abres?",
              "opciones": ["Río Sella", "Río Eo", "Río Nalón", "Río Navia", "Río Cares"],
              "respuesta": "Río Eo" // se puede encontrar la respuesta en el apartado de 'Gastronomía'
            },
            {
              "pregunta": "¿Qué idioma, además del español, es tradicionalmente hablado en esta zona?",
              "opciones": ["Euskera", "Gallego-asturiano (eonaviego)", "Catalán", "Leonés", "Aragonés"],
              "respuesta": "Gallego-asturiano (eonaviego)" // se puede encontrar la respuesta en el apartado de 'Gastronomía'
            },
            {
              "pregunta": "¿Qué tipo de actividad turística destaca en San Tirso de Abres?",
              "opciones": ["Turismo de playa", "Senderismo", "Esquí de montaña", "Turismo de compras", "Turismo cultural"],
              "respuesta": "Senderismo" // se puede encontrar la respuesta en el apartado de 'Rutas'
            },
            {
              "pregunta": "¿Cuál es una de las rutas más conocidas en San Tirso de Abres?",
              "opciones": ["Ruta de la Reconquista", "Ruta del Cares", "Senda del Ferrocarril", "Ruta del Alba", "Camino de Santiago"],
              "respuesta": "Senda del Ferrocarril" // se puede encontrar la respuesta en el apartado de 'Rutas'
            },
            {
              "pregunta": "¿Qué es típico en la gastronomía local de San Tirso de Abres?",
              "opciones": ["Trucha del Eo", "Marisco", "Paella", "Gazpacho", "Tortilla de patatas"],
              "respuesta": "Trucha del Eo" // se puede encontrar la respuesta en el apartado de 'Gastronomía'
            },
            {
              "pregunta": "¿Qué tipo de paisaje predomina en el concejo?",
              "opciones": ["Urbano e industrial", "Rural con bosques y ríos", "Desértico", "Costero con acantilados", "Montañoso y nevado"],
              "respuesta": "Rural con bosques y ríos" // se puede encontrar la respuesta en el apartado de 'Gastronomía'
            },
            {
              "pregunta": "¿Cuál es una festividad local destacada?",
              "opciones": ["Semana Grande", "Fiestas del Pilar", "Fiesta de San Tirso", "Carnaval de Verano", "Feria de Abril"],
              "respuesta": "Fiesta de San Tirso" // se puede encontrar la respuesta en el apartado de 'Gastronomía'
            },
            {
              "pregunta": "¿Qué infraestructura abandonada se ha reconvertido en ruta peatonal?",
              "opciones": ["Una autopista", "Una vía de tren", "Un aeropuerto", "Un canal de riego", "Una carretera nacional"],
              "respuesta": "Una vía de tren" // se puede encontrar la respuesta en el apartado de 'Rutas'
            },
            {
              "pregunta": "¿En qué comarca asturiana se encuentra San Tirso de Abres?",
              "opciones": ["Llanes", "Nalón", "Eo-Navia", "Avilés", "Oriente"],
              "respuesta": "Eo-Navia" // se puede encontrar la respuesta en el apartado de 'Gastronomía'
            }
          ];
          

        this.npreguntas = this.preguntas.length;
        this.preguntaActual = 0;
        this.score = 0;
        this.preguntasRealizadas = [];

        this.paintQuestion();
    }
    

    paintQuestion(){
        const p = this.getNextQuestion();
        let container = document.querySelectorAll('article')[0];
        if(!container){
            container = document.createElement('article');
            document.getElementsByTagName("main")[0].appendChild(container);
        }

        //contador
        container.innerHTML = `<p>Score: ${this.score}/${this.npreguntas}</p>`;
        //pregunta actual

        let pregunta = document.createElement('div');
        container.innerHTML += `<h3>Pregunta ${this.preguntaActual+1}: ${this.preguntas[p].pregunta}</h3>`;

        this.preguntas[p].opciones.forEach((opcion, index) => {
            const button = document.createElement('button');
            button.setAttribute("class", "normal");
            button.innerHTML = opcion;
            
            button.setAttribute("onclick", `juego.checkAnswer('${opcion}', '${this.preguntas[p].respuesta}', this)`);
            pregunta.appendChild(button);
        });

        container.innerHTML += pregunta.outerHTML;
    }

    checkAnswer(opcion, respuestaCorrecta, buttonElement){      
        if(opcion === respuestaCorrecta){
            this.score++;
            buttonElement.setAttribute("class", "correcta");
        }else{
            buttonElement.setAttribute("class", "incorrecta");
        }

        this.preguntaActual++;

        setTimeout(() => {
          if(this.preguntaActual < this.npreguntas){
              this.paintQuestion();
          }else{
              this.paintFinalScore();
          }
        }, 2000);
    }

    paintFinalScore(){
        const container = document.getElementsByTagName("article")[0];
        container.innerHTML = `<h2>Juego terminado</h2><p>Tu puntuación es: ${this.score}/${this.npreguntas}</p>
                                <button onclick="juego.restart()">Reiniciar juego</button>`;
    }
    
    getNextQuestion(){
      let preguntaActual = null;
      do{
        preguntaActual = Math.floor(Math.random() * this.npreguntas);
      } while (this.preguntasRealizadas.includes(preguntaActual));

      this.preguntasRealizadas.push(preguntaActual);
      return preguntaActual;
    }

    restart(){
      this.preguntaActual = 0;
      this.score = 0;
      this.preguntasRealizadas = [];
      this.paintQuestion();
    }
}

const juego = new Juego();