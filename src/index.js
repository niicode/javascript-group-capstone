import './style.css';
import Movies from './modules/Movies.js';
import { involvementApiBaseURL, uniqueID } from './modules/variables.js';

const shows = document.querySelector('.shows');
const movieCount = document.querySelector('.movies');
const movies = new Movies();

movieCount.innerHTML = `Movies(${movies.getMoviesLength()})`;

const renderMovies = () => {
  shows.innerHTML = '';
  movies.getAllMovies().forEach((movie, index) => {
    const show = document.createElement('div');
    show.classList.add('show');
    show.innerHTML = `
      <img src="${movie.image.medium}" alt="${movie.name}" />
      <h4>${movie.name}</h4>
      <div class="likes">
        <i class="bi bi-heart-fill" id="${index + 1}"></i>
      </div>
      <p class="likes-count" id="${index + 1}"></p>
      <button type="button" data-id="${movie.id}" class="comments-btn">Comments</button>
    `;
    shows.appendChild(show);
  });
};

renderMovies();

const likeCounts = document.querySelectorAll('.likes-count');
const fetchLikes = () => {
  fetch(`${involvementApiBaseURL}apps/${uniqueID}/likes`)
    .then((res) => res.json())
    .then((data) => {
      for (let i = 0; i < likeCounts.length; i += 1) {
        for (let j = 0; j < data.length; j += 1) {
          if (likeCounts[i].id === data[j].item_id) {
            document.getElementById((i + 1).toString()).innerHTML = `${data[j].likes} likes`;
          }
        }
      }
    });

  //  add event listener to all heart icons
  const heartIcons = document.querySelector('.shows');
  heartIcons.addEventListener('click', (e) => {
    if (!e.target.classList.contains('color-liked')) {
      if (e.target.classList.contains('bi-heart-fill')) {
        const { id } = e.target;
        const movie = {
          item_id: id,
        };
        e.target.classList.add('color-liked');
        fetch(`${involvementApiBaseURL}apps/${uniqueID}/likes`, {
          method: 'POST',
          body: JSON.stringify(movie),
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(() => fetchLikes());
      }
    }
  });
};

fetchLikes();

window.addEventListener('DOMContentLoaded', renderMovies);
