"use strict";

class Semaforo {

    levels = [0.2, 0.5, 0.8]; //dificultad del juego
    lights = 4; //numero de luces del semaforo
    unload_moment = null; //fecha con el momento que se inicia la secuencia de apagado del semaforo
    clic_moment = null; //fecha con el momento que se hace click en el boton
    
    constructor() {
        this.difficulty = this.chooseRandomLevel();
        this.createStructure();
    }

    chooseRandomLevel(){
        return this.levels[Math.floor(Math.random() * this.levels.length)];
    }
    
    createStructure(){
        //selecciona main
        const mainElement = document.querySelector('main');

        const gameTitle = document.createElement('h3');
        gameTitle.textContent = "Juego del Semáforo";
        mainElement.appendChild(gameTitle);
        
        //crea luces
        for (let i = 0; i < this.lights; i++) {
            const lightDiv = document.createElement('div');
            lightDiv.classList.add('light'); 
            mainElement.appendChild(lightDiv);
        }
        
        //crea botones
        const startButton = document.createElement('button');
        startButton.textContent = "Arranque";
        startButton.classList.add("startButton"); 
        startButton.onclick = this.initSequence.bind(this);
        mainElement.appendChild(startButton);
        

        const reactionButton = document.createElement('button');
        reactionButton.textContent = "Reacción";
        reactionButton.classList.add("reactionButton"); 
        reactionButton.disabled = true;
        reactionButton.onclick = this.stopReaction.bind(this);
        mainElement.appendChild(reactionButton);        
    }

    initSequence(){
        const rTimeText = document.querySelector('.reactionTime');
        if (rTimeText) {
            rTimeText.remove();
        }
        const mainElement = document.querySelector('main');

        mainElement.classList.add('load');

        const startButton = document.querySelector('.startButton');
        startButton.disabled = true;

        const lightsON = 3000; //tiempo que las luces estan encendidas (tardan 1.5s en encenderse)
        const timeout = this.difficulty * 100 + lightsON;
        setTimeout(() => {
            this.unload_moment = new Date().getTime();
            this.endSequence()
        }, timeout);
    }

    endSequence(){
        const mainElement = document.querySelector('main');
        mainElement.classList.add('unload');
    
        const reactionButton = document.querySelector('.reactionButton');
        reactionButton.disabled = false;
    }

    stopReaction(){
        this.clic_moment = new Date().getTime();

        const reactionTime = (this.clic_moment - this.unload_moment).toFixed(3);

        const mainElement = document.querySelector('main');
        const rTime = document.createElement('p');
        rTime.classList.add('reactionTime');
        rTime.textContent = "Tiempo de Reacción: " + reactionTime + " ms";
        mainElement.appendChild(rTime);

        mainElement.classList.remove('load');
        mainElement.classList.remove('unload');

        const reactionButton = document.querySelector('.reactionButton');
        reactionButton.disabled = true;
        const startButton = document.querySelector('.startButton');
        startButton.disabled = false;

        this.createRecordForm(reactionTime);

    }

    createRecordForm(reactionTime){
        const mainElement = document.querySelector('main');

        const form = document.createElement('form');
        form.action = '#';
        form.method = 'post';
        form.name = 'recordForm';

        const inName = document.createElement('input');
        inName.type = 'text';
        inName.name = 'name';
        inName.placeholder = 'Nombre';
        inName.required = true;
        form.appendChild(inName);

        const inSurname = document.createElement('input');
        inSurname.type = 'text';
        inSurname.name = 'surname';
        inSurname.placeholder = 'Apellidos';
        inSurname.required = true;
        form.appendChild(inSurname);

        const inLevel = document.createElement('input');
        inLevel.type = 'text';
        inLevel.name = 'level';
        inLevel.value = this.difficulty;
        inLevel.readOnly = true;
        form.appendChild(inLevel);

        const inTime = document.createElement('input');
        inTime.type = 'text';
        inTime.name = 'time';
        inTime.value = reactionTime;
        inTime.readOnly = true;
        form.appendChild(inTime);

        const submit = document.createElement('input');
        submit.type = 'submit';
        submit.value = 'Guardar';

        // form.onsubmit = this.saveRecord.bind(this);

        form.appendChild(submit);
        mainElement.appendChild(form);
    }
}

var sem = new Semaforo(); // Crear un objeto de la clase Semaforo

