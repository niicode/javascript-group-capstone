import './style.css';
import Movies from './modules/Movies.js';

const shows = document.querySelector('.shows');
const movieCount = document.querySelector('.movies');
const movies = new Movies();

movieCount.innerHTML = `Movies(${movies.getMoviesLength()})`;

const renderMovies = () => {
  shows.innerHTML = '';
  movies.getAllMovies().forEach((movie) => {
    const show = document.createElement('div');
    show.classList.add('show');
    show.innerHTML = `
      <img src="${movie.image.medium}" alt="${movie.name}" />
      <h4>${movie.name}</h4>
      <div class="likes">
        <i class="fas fa-heart"></i>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
        </svg>
        <p>no. likes</p>
      </div>
      <button type="button" class="comments">Comments</button>
    `;
    shows.appendChild(show);
  });
};

window.addEventListener('DOMContentLoaded', renderMovies);
