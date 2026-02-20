/* ========================= */
/* 🔐 CONFIGURACIÓN */
/* ========================= */

const apiKey = "9b8867a200003113b17926f0ff2cdb43";

// 🔑 Activa esto SOLO cuando tú quieras agregar películas
const ADMIN_MODE = true;

/* ========================= */
/* 🛒 CARRITO */
/* ========================= */

let cart = [];

/* ========================= */

const moviesDiv = document.getElementById("movies");
const searchInput = document.getElementById("search");

/* ========================= */
/* 🔎 BUSCADOR */
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
      ${
        ADMIN_MODE
          ? `<button onclick="addToCart('${movie.title}')">Agregar</button>`
          : ""
      }
      <button onclick="addToCart('${movie.title}')">🛒 Carrito</button>
    `;

    moviesDiv.appendChild(movieEl);
  });
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
/* 🛒 AGREGAR AL CARRITO */
/* ========================= */

function addToCart(title) {
  cart.push(title);
  alert("Agregado al carrito");
}

/* ========================= */
/* 📲 ENVIAR A WHATSAPP */
/* ========================= */

function sendWhatsApp() {
  if (cart.length === 0) {
    alert("El carrito está vacío");
    return;
  }

  let message = "Hola, quiero estas películas:%0A%0A";

  cart.forEach((movie) => {
    message += "- " + movie + "%0A";
  });

  window.open(
    `https://wa.me/573112333010?text=${message}`,
    "_blank"
  );
}

/* ========================= */
/* 🚀 BOTÓN WHATSAPP */
/* ========================= */

const whatsappBtn = document.createElement("button");
whatsappBtn.innerText = "📲 Enviar carrito por WhatsApp";
whatsappBtn.style.position = "fixed";
whatsappBtn.style.bottom = "20px";
whatsappBtn.style.right = "20px";
whatsappBtn.style.padding = "15px";
whatsappBtn.style.background = "#25D366";
whatsappBtn.style.color = "white";
whatsappBtn.style.border = "none";
whatsappBtn.style.borderRadius = "10px";
whatsappBtn.style.cursor = "pointer";

whatsappBtn.onclick = sendWhatsApp;

document.body.appendChild(whatsappBtn);
