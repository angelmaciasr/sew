"use strict";

class Noticias{
   
  constructor(){
    this.city = "San Tirso de Abres";

    // API key and URL for eventregistry API
    this.apikey = "17be1601-c1e0-4d17-83d7-0fcfe784011f";
    this.url = `https://eventregistry.org/api/v1/article/getArticles`

    // API key and URL for GNews API
    // this.apikey = "bf32d4ef0ad5f65e25c28a585195bb1f";
    // this.url = `https://gnews.io/api/v4/search?q=${this.city}&lang=es&country=es&max=5&token=${this.apikey}`;
  }

  getNoticias(){
    const city = this.city;

    $.ajax({
      url: this.url,
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({
        action: "getArticles",
        keyword: city,
        lang: "spa",
        articlesPage: 1,
        articlesCount: 5,
        sortBy: "date",
        resultType: "articles",
        apiKey: this.apikey
      }),
      success: function (response) {
        const title = document.createElement('h3');
        title.innerHTML = `Noticias de ${city}`;
        document.body.appendChild(title);

        const noticias = response.articles.results;
        if (noticias.length === 0) {
          alert(`No hay noticias disponibles para esta ciudad: ${city}.`);
          return;
        }

        console.log(noticias);

        noticias.forEach(noticia => {
          const noti = document.createElement('section');

          const titulo = noticia.title;
          const fuente = noticia.source.title;
          const contenido = noticia.body;
          const fecha = noticia.date;
          const url = noticia.url;

          //autor?
          let autor = '';
          if(noticia.authors.length > 0) {
            autor = noticia.authors[0].name;
          }

          noti.innerHTML = `<h4>${titulo}  [${fecha}]</h4>
                          <p>Contenido: ${contenido}</p>
                          <p>Fuente: ${fuente}</p>
                          <p>Autor: ${autor}</p>
                          <a href="${url}" target="_blank">Leer más</a>`; 
        
          document.body.appendChild(noti);
        });
        
      },
      error: function (error) {
        console.error("Error al obtener noticias:", error);
      }
    });
  }

}