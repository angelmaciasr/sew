"use strict";

class Agenda {

    constructor(){
        this.url = 'https://api.jolpi.ca/ergast/f1/current?format=json';
        this.addButton();
    }

    addButton(){
        var button = document.createElement('button');
        button.innerText = 'Obtener carreras';
        button.addEventListener('click', this.getRaceSchedule);
        document.body.appendChild(button);
    }

    getRaceSchedule(){
        $.ajax({
            url: 'https://api.jolpi.ca/ergast/f1/current?format=json', 
            method: 'GET',
            dataType: 'json', 
            success: function(data) {
                console.log(data);
                var season = data.MRData.RaceTable
                console.log(season)
                var races = season.Races
                console.log(races)
                                
                var title = document.createElement('h2');
                title.innerText = `Season ${season.season}`
                document.body.appendChild(title);

                races.forEach(race => {
                    var article = document.createElement('article');
                    var raceString = `<h4>${race.raceName} ${race.date}</h4><ul>`;
                    raceString += `<li>Nombre del Circuito: ${race.Circuit.circuitName}</li>`
                    raceString += `<li>Ubicación: ${race.Circuit.Location.locality}, ${race.Circuit.Location.country} - Coordenadas: [${race.Circuit.Location.lat}, ${race.Circuit.Location.long}]</li>`
                    raceString += `<li>FP1: ${race.FirstPractice.time} - ${race.FirstPractice.date}</li>`
                    raceString += `<li>Qualifying: ${race.Qualifying.time} - ${race.Qualifying.date}</li>`
                    raceString += `<li>Race: ${race.time}</li></ul>`
                    article.innerHTML = raceString;
                    document.body.appendChild(article);
                });

                const button = document.querySelector('button');
                button.disabled = true;
            },
            error: function (error) {
                console.error('Error al obtener la lista de carreras:', error);
            }
        });
    }
}

const agenda = new Agenda();