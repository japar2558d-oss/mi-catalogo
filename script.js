const apiKey = "9b8867a200003113b17926f0ff2cdb43";

/* 🔥 TU COLECCIÓN PÚBLICA (pon aquí los IDs que quieras) */
const myCollection = [
  496243, // Parásitos (ejemplo)
  299534, // Avengers Endgame (ejemplo)
  603     // Matrix (ejemplo)
];

const moviesDiv = document.getElementById("movies");
const searchInput = document.getElementById("search");

/* ========================= */
/* 🔎 BUSCADOR NORMAL */
/* ========================= */

searchInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    searchMovies(searchInput.value);
  }
});

async function searchMovies(query) {
  if (!query) return;

  moviesDiv.innerHTML = "Buscando...";

  const res = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=es-ES&query=${query}`
  );

  const data = await res.json();
  showMovies(data.results);
}

/* ========================= */
/* 🎬 MOSTRAR PELÍCULAS */
/* ========================= */

function showMovies(movies) {
  moviesDiv.innerHTML = "";

  movies.forEach((movie) => {
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");

    movieEl.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" />
      <h3>${movie.title}</h3>
      <p>⭐ ${movie.vote_average}</p>
      <p>${movie.release_date}</p>
    `;

    moviesDiv.appendChild(movieEl);
  });
}

/* ========================= */
/* 🌍 CARGAR TU COLECCIÓN */
/* ========================= */

async function loadCollection() {
  moviesDiv.innerHTML = "Cargando colección...";

  const requests = myCollection.map(id =>
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=es-ES`)
      .then(res => res.json())
  );

  const movies = await Promise.all(requests);

  showMovies(movies);
}

/* ========================= */
/* 🎭 FILTRO POR GÉNERO */
/* ========================= */

async function filterGenre(genreId) {
  moviesDiv.innerHTML = "Cargando...";

  const res = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=es-ES&with_genres=${genreId}`
  );

  const data = await res.json();
  showMovies(data.results);
}

/* ========================= */
/* 🚀 AL ABRIR LA WEB */
/* ========================= */

loadCollection();
