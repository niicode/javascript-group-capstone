import './style.css';
import Movies from './modules/Movies.js';
import { involvementApiBaseURL, uniqueID } from "./modules/variables";

const shows = document.querySelector('.shows');
const movies = new Movies();

const renderMovies = () => {
  shows.innerHTML = '';
  movies.getAllMovies().forEach((movie, index) => {
    const show = document.createElement('div');
    show.classList.add('show');
    show.innerHTML = `
      <img src="${movie.image.medium}" alt="${movie.name}" />
      <h4>${movie.name}</h4>
      <div class="likes">
        <i class="bi bi-heart-fill" id="${index}"></i>
        <p class="likes-count" id="${index + 1}"></p>
      </div>
      <button type="button" data-id="${movie.id}" class="comments">Comments</button>
    `;
    shows.appendChild(show);
  });
};

renderMovies();

const likeCounts = document.querySelectorAll('.likes-count');
likeCounts.forEach((likeCount) => {
  likeCount.outerText = '0 likes';
  console.log(likeCount);
})
const fetchLikes = () => {
  fetch(`${involvementApiBaseURL}apps/${uniqueID}/likes`)
    .then((res) => res.json())
    .then((data) => {
      for (let i = 0; i < likeCounts.length; i += 1) {
        for (let j = 0; j < data.length; j += 1) {
          if (likeCounts[i].id === data[j].item_id) {
            console.log(data[j].item_id);
          }
        }
      }
    });
}

//add event listener to all heart icons
const heartIcons = document.querySelector('.shows');
heartIcons.addEventListener('click', (e) => {
  if (!e.target.classList.contains('color-liked')) {
    if (e.target.classList.contains('bi-heart-fill')) {
      const { id } = e.target
      const movie = {
        item_id: id,
      }
      e.target.classList.add('color-liked');
      fetch(`${involvementApiBaseURL}apps/${uniqueID}/likes`, {
        method: 'POST',
        body: JSON.stringify(movie),
        headers: {
          'Content-Type': 'application/json',
        }
      })
        .then(() => fetchLikes())
    }
  }
});

fetchLikes();


window.addEventListener('DOMContentLoaded', renderMovies);
