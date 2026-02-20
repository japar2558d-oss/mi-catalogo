/* =========================
   CONFIGURACIÓN SUPABASE
========================= */

const SUPABASE_URL = "https://gnfefbauiuowzthrdghb.supabase.co"; 
const SUPABASE_KEY = "sb_publishable_3_VKI1uwVaWfzp7OCVyitQ_f-p6Q9Ez";

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);


/* =========================
   TMDB API
========================= */

const apiKey = "9b8867a200003113b17926f0ff2cdb43"; // deja tu key de TMDB aquí


/* =========================
   ELEMENTOS HTML
========================= */

const moviesDiv = document.getElementById("movies");
const searchInput = document.getElementById("search");


/* =========================
   BUSCAR PELÍCULAS
========================= */

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


/* =========================
   MOSTRAR PELÍCULAS
========================= */

function showMovies(movies) {
  moviesDiv.innerHTML = "";

  movies.forEach((movie) => {
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");

    const poster = movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : "https://via.placeholder.com/300x450?text=Sin+Imagen";

    movieEl.innerHTML = `
      <img src="${poster}" />
      <h3>${movie.title}</h3>
      <p>⭐ ${movie.vote_average}</p>
      <p>${movie.release_date || "Sin fecha"}</p>
      <button onclick="guardarPelicula(${movie.id}, '${movie.title.replace(/'/g, "")}', '${movie.poster_path}', ${movie.vote_average}, '${movie.release_date}')">
        Agregar a mi colección
      </button>
    `;

    moviesDiv.appendChild(movieEl);
  });
}


/* =========================
   GUARDAR EN SUPABASE
========================= */

async function guardarPelicula(id, title, poster_path, rating, release_date) {

  const { data, error } = await supabase
    .from("mi catalogo")
    .insert([
      {
        tmdb_id: id,
        title: title,
        poster_path: poster_path,
        rating: rating,
        release_date: release_date,
      },
    ]);

  if (error) {
    alert("Error al guardar");
    console.log(error);
  } else {
    alert("Película agregada 🔥");
    cargarColeccion();
  }
}


/* =========================
   CARGAR COLECCIÓN
========================= */

async function cargarColeccion() {

  const { data, error } = await supabase
    .from("mi catalogo")
    .select("*");

  if (error) {
    console.log(error);
    return;
  }

  moviesDiv.innerHTML = "";

  data.forEach((movie) => {
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");

    const poster = movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : "https://via.placeholder.com/300x450?text=Sin+Imagen";

    movieEl.innerHTML = `
      <img src="${poster}" />
      <h3>${movie.title}</h3>
      <p>⭐ ${movie.rating}</p>
      <p>${movie.release_date || "Sin fecha"}</p>
    `;

    moviesDiv.appendChild(movieEl);
  });
}


/* =========================
   CARGAR AL INICIAR
========================= */

window.onload = function () {
  cargarColeccion();
};
