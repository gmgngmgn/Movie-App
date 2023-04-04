function getMoviesHTML(movies) {
    let moviesHTML = '';
    for (let movie of movies) {
      moviesHTML += `
        <div class="movie-results">
          <img id="poster" src="${movie.Poster}">
          <div class="title-container">
            <h3 id="movie-title">${movie.Title}</h3>
            <img id="star-icon" src="photos/star-icon.png">
            <p id="rating">${movie.imdbRating}</p>
          </div>
          <div id="info-container">
            <p id="runtime">${movie.Runtime}</p>
            <p id="genre">${movie.Genre}</p>
              <button id="add-btn" class="add-btn" data-id="${movie.imdbID}">
              <img id="add-icon" src="photos/remove-icon.png">
              Watchlist
              </button>
          </div>
          <p id="plot">${movie.Plot}</p>
        </div>
      `;
    } 
    if (movies.length === 0) {
      moviesHTML = `<div class="start-exploring-placeholder">
                      <p class="empty-section-text">Your watchlist is looking a little empty...</p>
                          <button id="return-to-search-btn" onclick="toSearch()">
                              <img id="add-icon" src="photos/add-icon.png">
                              Let's add some movies!
                          </button>
                  </div>`
    }
    return moviesHTML;
  }
  
  let selectedMovies = JSON.parse(localStorage.getItem('selectedMovies'));
  if (!selectedMovies) {
      selectedMovies = [];
  }
  
  
  const watchlistContainer = document.getElementById('watchlist');


  document.body.addEventListener('click', function(event) {
    if (event.target.id === 'return-to-search-btn') {
      window.location.href = "index.html";
    }
  });

  
  if (selectedMovies.length > 0) {
    watchlistContainer.innerHTML = getMoviesHTML(selectedMovies);
  } else {
    watchlistContainer.innerHTML = getMoviesHTML([]);
  }
  
  watchlistContainer.addEventListener('click', async function(e){
      if (e.target.classList.contains('add-btn')) {
          const movieId = e.target.dataset.id
          let index = selectedMovies.findIndex(movie => movie.imdbID === movieId);
          if (index > -1) {
              selectedMovies.splice(index, 1);
          }
          watchlistContainer.innerHTML = getMoviesHTML(selectedMovies);
          localStorage.setItem('selectedMovies', JSON.stringify(selectedMovies));
      } 
  })

  