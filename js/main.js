
//base code
const APIKEY = '09b91e7fac417ab7324bffd4431c5409';
const baseURL = 'https://api.themoviedb.org';
const imgBaseURL= 'https://image.tmdb.org/t/p/w342/';

const movieSearchURL = baseURL + '/3/search/movie?api_key='+APIKEY;
const tvSearchURL = baseURL + '/3/search/tv?api_key='+APIKEY;
const movieCreditsURL = baseURL + '/3/movie/';
const tvCreditsURL = baseURL + '/3/tv/[id]/credits?api_key='+APIKEY;

//search for movies
const input = document.querySelector('.movinput')
const btn = document.querySelector('#mvbtn')
const movie_info = document.querySelector('.movie-cat')
const movie_title = document.querySelector('.movie-title')

async function SearchMovie (searchTerm) {
    const response = await fetch(movieSearchURL+`&query=${searchTerm}`)
    const retRes = await response.json()
    return retRes.results
}

btn.addEventListener('click', GetMovie)

input.addEventListener('keypress', function(data){
    if (data.key === 'Enter' && input.value !== 0){
        btn.addEventListener('click', GetMovie);
    }
    else if (data.key === 'Enter' && input.value == 0){
        movie_title.innerHTML= `No Results Found`;
    }
  });
  
async function GetMovie () {
    const data = await SearchMovie(input.value)

    if(data === 0){
        movie_title.innerHTML= `No Results Found`;
            }else{
        movie_title.innerHTML = `Movie Search Results for `+(input.value);
            }

    movie_info.innerHTML = data.map(e => {
        return `
        <a href="./credits.html#/movie/${e.id}/${e.title}"><div class="card" data-id="${e.id}">
            <div class="card__img">
                <img src=${[imgBaseURL + e.poster_path] ? [imgBaseURL + e.poster_path] : './images/placeholder.png'}  alt="${e.title}">
            </div>
            <div class="card__content">
            <h3 class="card__title">${e.title}</h3>
                <div class="card__text">
                    <span>${e.overview} </span>
                    <p class="date">${e.release_date}</p>
                </div>
            </div>
        </div></a>
    `
    }).join('')
 
};

//search for tv shows
const tvinput = document.querySelector('.tvinput')
const tvbtn = document.querySelector('#tvbtn')
const tv_info = document.querySelector('.tv-cat')
const tv_title = document.querySelector('.tv-title')

async function SearchTV (searchTerm) {
    const reto = await fetch(tvSearchURL+`&query=${searchTerm}`)
    const retoRes = await reto.json()
    return retoRes.results
}

tvbtn.addEventListener('click', GetTV)

tvinput.addEventListener('keypress', function(data){
    if (data.key === 'Enter' && tvinput.value !== 0){
      tvbtn.addEventListener('click',GetTV());
    }
    else if (data.key === 'Enter' && input.value == 0){
        tv_title.innerHTML= `No Results Found`;
    }
  });
  
async function GetTV () {
    const data = await SearchTV(tvinput.value)

     if(data==0){
        tv_title.innerHTML= `No Results Found`;
            }else{
        tv_title.innerHTML = `TV Show Search Results for `+ (tvinput.value);
            }
   
    tv_info.innerHTML = data.map(e => {
        return `
        <a href="./credits.html#/tv/${e.id}/${e.name}"><div class="card" data-id="${e.id}">
            <div class="card__img">
                <img src=${[imgBaseURL + e.poster_path] ? [imgBaseURL + e.poster_path] : './images/placeholder.png'} alt="${e.name}">
            </div>
            <div class="card__content">
            <h3 class="card__title">${e.name}</h3>
                <div class="card__text">
                    <span>${e.overview} </span>
                    <p class="date">${e.first_air_date}</p>
                </div>
            </div>
        </div></a>
    `
    }).join('')
 
}

//history

const APP = {
    init: function () {
      const userSearch = document.getElementById('divmov');
      userSearch.addEventListener('click', SEARCH.searchHandler);
      window.addEventListener('popstate', NAV.popstateHandler);
      const splitArray = location.hash.split('/');
      if (document.body.id === 'index') {
        const [, type, query] = splitArray;
  
        API.fetchIndex(type, decodeURIComponent(query));
      } else {
        const [, type, id, title] = splitArray;
        API.fetchCredits(type, id);
      }
    },
  };

const SEARCH = {
    searchHandler: function (ev) {
      ev.preventDefault();
      const input = document.getElementById('movinput');

      const userInput = input.value.toLowerCase().trim();
  
      if (userInput) {
        NAV.updateURL(`/movie/${userInput}`);
      }
  
      GetMovie(userInput);
    },
  };

const NAV = {
    updateURL: function (path) {
      history.pushState({}, '', '#' + path);
    },
    popstateHandler: function (ev) {
      const splitArray = location.hash.split('/');
      if (document.body.id === 'index') {
        const [, type, query] = splitArray;
  
        GetMovie(type, decodeURIComponent(query));
      } else {
        const [, type, id, title] = splitArray;
      }
    },
  };
