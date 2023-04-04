const movieInput = document.getElementById('movie-input')
const form = document.getElementById('form')
const results = document.getElementById('search-results-section')
let moviesHTML = ''
let selectedMovies = JSON.parse(localStorage.getItem('selectedMovies')) || [];

function toWatchlist() {
    window.location.href = "watchlist.html";
}

form.addEventListener('submit', async function(e){
    e.preventDefault()
    const response = await fetch(`https://www.omdbapi.com/?apikey=92662093&s=${movieInput.value}`)
    const data = await response.json()
    
    if (data.Search) {
        moviesHTML = ''; // initialize moviesHTML here
        for (let movies of data.Search) {
          const response = await fetch(`https://www.omdbapi.com/?apikey=92662093&i=${movies.imdbID}`);
          const data = await response.json();
          moviesHTML += `
            <div class="movie-results">
              <img id="poster" src="${data.Poster}">
              <div class="title-container">
                <h3 id="movie-title">${data.Title}</h3>
                <img id="star-icon" src="photos/star-icon.png">
                <p id="rating">${data.imdbRating}</p>
              </div>
              <div id="info-container">
                <p id="runtime">${data.Runtime}</p>
                <p id="genre">${data.Genre}</p>
                  <button id="add-btn-text" class="add-btn" data-id="${movies.imdbID}">
                  <img id="add-icon" src="photos/add-icon.png">
                  Watchlist
                  </button>
              </div>
              <p id="plot">${data.Plot}</p>
            </div>
          `;
        }
      } else {
        moviesHTML = `
          <div class="movies-list" id="search-results-section">
            <div class="start-exploring-placeholder">
              <p class="empty-section-text">Unable to find what you’re looking for. 
              <br>Please try another search.</p>
            </div>
          </div>
        `;
      }
      
      results.innerHTML = moviesHTML;
      

      results.addEventListener('click', async function(e){
        if (e.target.classList.contains('add-btn')) {
            const movieId = e.target.dataset.id
            const response = await fetch(`https://www.omdbapi.com/?apikey=92662093&i=${movieId}`)
            const movieData = await response.json()
            const movieExists = selectedMovies.some(movie => movie.imdbID === movieData.imdbID)
            if (!movieExists) {
                selectedMovies.push(movieData)
                localStorage.setItem('selectedMovies', JSON.stringify(selectedMovies));
                console.log(movieData)
                const clickedAddBtn = document.querySelector(`button[data-id="${movieId}"]`)
                clickedAddBtn.innerHTML = `Added to list!`
                clickedAddBtn.classList.add('italic')
            }
        }
    })
})

