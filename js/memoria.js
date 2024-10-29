"use strict";

class Memoria{
    constructor() {
        this.elements = [
          { element: "RedBull", source: "https://upload.wikimedia.org/wikipedia/de/c/c4/Red_Bull_Racing_logo.svg" },
          { element: "McLaren", source: "https://upload.wikimedia.org/wikipedia/en/6/66/McLaren_Racing_logo.svg" },
          { element: "Alpine", source: "https://upload.wikimedia.org/wikipedia/fr/b/b7/Alpine_F1_Team_2021_Logo.svg" },
          { element: "AstonMartin", source: " https://upload.wikimedia.org/wikipedia/fr/7/72/Aston_Martin_Aramco_Cognizant_F1.svg" },
          { element: "Ferrari", source: "https://upload.wikimedia.org/wikipedia/de/c/c0/Scuderia_Ferrari_Logo.svg" },
          { element: "Mercedes", source: " https://upload.wikimedia.org/wikipedia/commons/f/fb/Mercedes_AMG_Petronas_F1_Logo.svg" },
          { element: "RedBull", source: "https://upload.wikimedia.org/wikipedia/de/c/c4/Red_Bull_Racing_logo.svg" },
          { element: "McLaren", source: "https://upload.wikimedia.org/wikipedia/en/6/66/McLaren_Racing_logo.svg" },
          { element: "Alpine", source: "https://upload.wikimedia.org/wikipedia/fr/b/b7/Alpine_F1_Team_2021_Logo.svg" },
          { element: "AstonMartin", source: " https://upload.wikimedia.org/wikipedia/fr/7/72/Aston_Martin_Aramco_Cognizant_F1.svg" },
          { element: "Ferrari", source: "https://upload.wikimedia.org/wikipedia/de/c/c0/Scuderia_Ferrari_Logo.svg" },
          { element: "Mercedes", source: " https://upload.wikimedia.org/wikipedia/commons/f/fb/Mercedes_AMG_Petronas_F1_Logo.svg" },
        ];
    
       
        this.hasFlippedCard = false;
        this.lockBoard = false;
        this.firstCard = null;
        this.secondCard = null;
    
        this.shuffleElements();
        this.createElements();
        this.addEventListeners();
    }

    shuffleElements() {
        for (let i = this.elements.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            [this.elements[i], this.elements[j]] = [this.elements[j], this.elements[i]];
        }
    }

    unflipCards() {
        this.lockBoard = true;

        setTimeout(() => {
            this.firstCard.dataset.state = "unflip";
            this.secondCard.dataset.state = "unflip";
            
            this.resetBoard();
        }, 2000);
    }

    resetBoard() {
        this.firstCard = null;
        this.secondCard = null;
        this.hasFlippedCard = false;
        this.lockBoard = false;
    }

    checkForMatch() {
        var isMatch = this.firstCard.dataset.element === this.secondCard.dataset.element;
    
        isMatch ? this.disableCards() : this.unflipCards();
    }

    disableCards() {
        this.firstCard.dataset.state = "revealed";
        this.secondCard.dataset.state = "revealed";
    
        this.resetBoard();
    }

    createElements() {
        var section = document.querySelector("main")

        var el = this.elements

        el.forEach((element) => {
            var card = document.createElement("article");
            card.dataset.state = "unflip";
            card.classList.add("card")
            card.dataset.element = element.element;

            var heading = document.createElement("h3");
            heading.textContent = "Tarjeta de memoria";

            var image = document.createElement("img");
            image.src = element.source;
            image.alt = element.element;

            card.appendChild(heading);
            card.appendChild(image);
        
            section.appendChild(card);
        });

    }

    flipCard(game) {
    if (game.lockBoard || this === game.firstCard || this.dataset.state === "revealed")
        return;

    this.dataset.state = "flip";

    if (!game.hasFlippedCard) {
        game.hasFlippedCard = true;
        game.firstCard = this;
    } else {
        game.secondCard = this;
        game.checkForMatch();
    }
    }

    addEventListeners(){
    var cards = document.querySelectorAll(".card");
    cards.forEach((card) => {
        card.addEventListener("click", this.flipCard.bind(card, this));
    })
    }
}

var game = new Memoria();
