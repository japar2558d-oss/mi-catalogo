const apiKey = "9b8867a200003113b17926f0ff2cdb43";

/* 🔥 TU COLECCIÓN PÚBLICA */
const myCollection = [
  496243, // Parásitos
  299534, // Avengers Endgame
  603     // Matrix
];

const moviesDiv = document.getElementById("movies");
const searchInput = document.getElementById("search");

/* ========================= */
/* 🔎 BUSCADOR */
/* ========================= */

searchInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    searchMovies(searchInput.value.trim());
  }
});

async function searchMovies(query) {
  if (!query) {
    loadCollection(); // si está vacío vuelve a tu colección
    return;
  }

  moviesDiv.innerHTML = "Buscando...";

  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=es-ES&query=${encodeURIComponent(query)}`
    );

    const data = await res.json();
    showMovies(data.results);
  } catch (error) {
    moviesDiv.innerHTML = "Error al buscar.";
    console.log(error);
  }
}

/* ========================= */
/* 🎬 MOSTRAR PELÍCULAS */
/* ========================= */

function showMovies(movies) {
  moviesDiv.innerHTML = "";

  if (!movies || movies.length === 0) {
    moviesDiv.innerHTML = "No se encontraron resultados.";
    return;
  }

  movies.forEach((movie) => {
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");

    const poster = movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : "https://via.placeholder.com/300x450?text=Sin+Imagen";

    movieEl.innerHTML = `
      <img src="${poster}" />
      <h3>${movie.title}</h3>
      <p>⭐ ${movie.vote_average ?? "N/A"}</p>
      <p>${movie.release_date ?? "Sin fecha"}</p>
    `;

    moviesDiv.appendChild(movieEl);
  });
}

/* ========================= */
/* 🌍 CARGAR TU COLECCIÓN */
/* ========================= */

async function loadCollection() {
  moviesDiv.innerHTML = "Cargando colección...";

  try {
    const requests = myCollection.map(id =>
      fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=es-ES`)
        .then(res => res.json())
    );

    const movies = await Promise.all(requests);
    showMovies(movies);
  } catch (error) {
    moviesDiv.innerHTML = "Error cargando colección.";
    console.log(error);
  }
}

/* ========================= */
/* 🎭 FILTRO POR GÉNERO */
/* ========================= */

async function filterGenre(genreId) {
  moviesDiv.innerHTML = "Cargando...";

  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=es-ES&with_genres=${genreId}`
    );

    const data = await res.json();
    showMovies(data.results);
  } catch (error) {
    moviesDiv.innerHTML = "Error cargando género.";
    console.log(error);
  }
}

/* ========================= */
/* 🚀 INICIAR */
/* ========================= */

loadCollection();
