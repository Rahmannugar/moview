//declaring global variables
const main = document.getElementById("main");
const searchBtn = document.getElementById("btn");
const trending = document.querySelector(".trending");

//Api parameters
const APIKEY = "api_key=04c35731a5ee918f014970082a0088b1&page=1";
const APIURL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
  "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

//function to get movies from api
const getMovies = async () => {
  const res = await fetch(APIURL);
  const resData = await res.json();
  //console.log(resData);
  resData.results.forEach((movie) => {
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    movieEl.innerHTML = `
          <img
        src="${IMGPATH + movie.poster_path}"
        alt="${movie.title}"
      />
      <div class="movie-info">
        <h3>${movie.title}</h3>
        <span class="${getClassByRate(movie.vote_average)}">${
      movie.vote_average
    }</span>
      </div>
      <div class="overview">
        <h4>Synopsis</h4>
        <button class="cancel">X</button>
        <br>
      ${movie.overview}
      </div>
      <div class="btn-container"><button id="synopsis" class="synopsis">Synopsis</button>
      <a href="https://tfpdl.se/?s=${
        movie.title
      }"><button class="download">Download Movie</button></a></div>
    `;
    //declaring movie synopsis variable
    const cancel = movieEl.querySelector(".cancel");
    const overviewText = movieEl.querySelector(".overview");
    const synopsis = movieEl.querySelector("#synopsis");

    //when clicking on synopsis button, it should do the following instruction.
    synopsis.addEventListener("click", () => {
      overviewText.style.visibility = "inherit";
      overviewText.style.transform = "translateY(0)";
    });

    //when clicking on cancel button, it should do the following instruction.
    cancel.addEventListener("click", () => {
      overviewText.style.visibility = "hidden";
      overviewText.style.transform = "translateY(100%)";
    });
    main.appendChild(movieEl);
  });
  return resData;
};

//function to get movies from search input
const getMoviesBySearch = async (term) => {
  const res = await fetch(SEARCHAPI + term);
  const resData = await res.json();
  //console.log(resData);
  resData.results.forEach((movie) => {
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    movieEl.innerHTML = `
        <a href="https://tfpdl.se/?s=${movie.title}"><img
        src="${IMGPATH + movie.poster_path}"
        alt="${movie.title}"
      /></a>
      <div class="movie-info">
        <h3>${movie.title}</h3>
        <span class="${getClassByRate(movie.vote_average)}">${
      movie.vote_average
    }</span>
      </div>
     <div class="overview">
        <h4>Synopsis</h4>
        <button class="cancel">X</button>
        <br>
      ${movie.overview}
      </div>
         <div class="btn-container"><button id="synopsis" class="synopsis">Synopsis</button>
      <a href="https://tfpdl.se/?s=${
        movie.title
      }"><button class="download">Download Movie</button></a></div>
    `;
    //declaring movie synopsis variable
    const cancel = movieEl.querySelector(".cancel");
    const overviewText = movieEl.querySelector(".overview");
    const synopsis = movieEl.querySelector("#synopsis");

    //when clicking on synopsis button, it should do the following instruction.
    synopsis.addEventListener("click", () => {
      overviewText.style.visibility = "inherit";
      overviewText.style.transition = "0.3s ease-in";
    });

    //when clicking on cancel button, it should do the following instruction.
    cancel.addEventListener("click", () => {
      overviewText.style.visibility = "hidden";
      overviewText.style.transition = "0.3s ease-in";
    });

    main.appendChild(movieEl);
  });
  return resData;
};

const getClassByRate = (vote) => {
  if (vote >= 7.5) {
    return "green";
  } else if (vote < 5) {
    return "red";
  }
};
getMovies();

searchBtn.addEventListener("click", () => {
  const searchInput = document.getElementById("search").value;
  getMoviesBySearch(searchInput);
  main.innerHTML = "";
  trending.textContent = `Search results for "${searchInput}"`;
});
