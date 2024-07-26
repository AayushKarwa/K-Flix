const searchForm = document.body.querySelector('#searchForm');
const container = document.body.querySelector('#container');
const latestMoviesContainer = document.body.querySelector('#latestMoviesContainer');

const apiKey = '1707f0e340b9647e273bbf6a63a39757'; // Replace with your actual TMDb API key

document.addEventListener('DOMContentLoaded', async function() {
    const latestMovies = await fetchLatestMovies();
    displayMovies(latestMovies, latestMoviesContainer);
});

searchForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    const searchText = searchForm.elements.query.value;
    const config = {
        params: {
            api_key: apiKey,
            query: searchText
        }
    };
    const res = await axios.get(`https://api.themoviedb.org/3/search/movie`, config);
    displayMovies(res.data.results, container);
    searchForm.elements.query.value = '';
});

const fetchLatestMovies = async () => {
    const config = {
        params: {
            api_key: apiKey,
            sort_by: 'release_date.desc',
            language: 'en-US'
        }
    };
    const res = await axios.get('https://api.themoviedb.org/3/movie/now_playing?api_key=1707f0e340b9647e273bbf6a63a39757', config);
    console.log(  res.results.poster_path);
};

const displayMovies = (movies, targetContainer) => {
    targetContainer.innerHTML = '';
    for (let movie of movies) {
        if (movie.poster_path) {
            const movieCard = document.createElement('div');
            movieCard.classList.add('movie-card');
            const img = document.createElement('img');
            img.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
            img.alt = movie.title;

            const movieInfo = document.createElement('div');
            movieInfo.classList.add('movie-info');
            const title = document.createElement('h3');
            title.innerText = movie.title;
            const rating = document.createElement('p');
            rating.innerText = `Rating: ${Math.floor(movie.vote_average)}⭐`;

            movieInfo.append(title, rating);
            movieCard.append(img, movieInfo);
            targetContainer.append(movieCard);
        }
    }
};
