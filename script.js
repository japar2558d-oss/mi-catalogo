const apiKey = "9b8867a200003113b17926f0ff2cdb43";

const moviesDiv = document.getElementById("movies");
const searchInput = document.getElementById("search");

// 🔎 Buscar cuando escribas
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

function showMovies(movies) {
  moviesDiv.innerHTML = "";

  if (movies.length === 0) {
    moviesDiv.innerHTML = "No se encontraron resultados.";
    return;
  }

  movies.forEach((movie) => {
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");

    movieEl.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}">
      <h3>${movie.title}</h3>
      <p>⭐ ${movie.vote_average}</p>
      <p>${movie.release_date || ""}</p>
    `;

    moviesDiv.appendChild(movieEl);
  });
}

