const apiKey = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NGYxZjEwZjc3MTE2ZGE0ZGQ3MGM0Y2VhMGM3NThiZSIsIm5iZiI6MTc1NzkwMjExNy42OTYsInN1YiI6IjY4Yzc3NTI1MWQ3YTU1Y2RlMGYyMWVjNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4Rddy-xaxc1mJBQQJ61FS_Lu5TrDrkjJMfPFO9qAtL8";   // tu token de acceso de TMDb
const apiUrl = "https://api.themoviedb.org/3";

// Botón de búsqueda
const buttonSearch = document.getElementById('buttonSearch');
// Asociamos un event listener con el botón busqueda para ejecutar la función que traerá los resultados de la API
buttonSearch.addEventListener('click', searchMovies);

// Buscar películas
async function searchMovies() {
    //Obtener el término de buscada mediante input
    const searchTerm = document.getElementById('inputSearch').value;
    //Obtener la lista de películas.
    const movieList = document.getElementById('movieList');
    movieList.innerHTML = ''; // limpiar resultados previos

    if (!searchTerm.trim()) {
        movieList.innerHTML = "<p class='movies-app__alert'>⚠️ Ingresa un título para buscar</p>";
        return;
    }

    try {
        // Petición a TMDb con Bearer Token
        const response = await fetch(`${apiUrl}/search/movie?query=${encodeURIComponent(searchTerm)}`, {
            headers: {
                Authorization: `Bearer ${apiKey}`,
                accept: "application/json"
            }
        });

        const data = await response.json();

        if (data.results && data.results.length > 0) {
            data.results.forEach(movie => {
                const article = document.createElement('article');
                article.classList.add('movie-list__card');

                const cardImg = document.createElement('div');
                cardImg.classList.add('card__img');

                const moviePoster = document.createElement('img');
                moviePoster.src = movie.poster_path 
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : "https://via.placeholder.com/300x450?text=Sin+Imagen";
                moviePoster.alt = `${movie.title} Poster`;

                const cardMovieTitleBox = document.createElement('div');
                cardMovieTitleBox.classList.add('card__title-box');

                const movieTitle = document.createElement('h4');
                movieTitle.classList.add('card__movie-title');
                movieTitle.textContent = `${movie.title} (${movie.release_date ? movie.release_date.slice(0, 4) : "N/A"})`;

                // Estructura DOM
                movieList.appendChild(article);
                article.appendChild(cardImg);
                cardImg.appendChild(moviePoster);
                cardImg.appendChild(cardMovieTitleBox);
                cardMovieTitleBox.appendChild(movieTitle);
            });
        } else {
            const p = document.createElement('p');
            p.innerHTML = '<i class="bx bx-info-circle"></i> No se encontraron películas';
            p.classList.add('movies-app__alert');
            movieList.appendChild(p);
        }

    } catch (error) {
        console.error('Error al buscar películas: ', error);
        movieList.innerHTML = "<p class='movies-app__alert'>❌ Error en la conexión con la API</p>";
    }
}