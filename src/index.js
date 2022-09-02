import './style.css';
import Movies from './modules/Movies.js';
import { involvementApiBaseURL, uniqueID } from './modules/variables.js';
import CommentsApi, { commentsCount } from './modules/Comments.js';

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

  const displayComments = (id) => {
    const comments = CommentsApi.getComments(id);
    comments.then((data) => {
      document.getElementById('comment-count').innerHTML = (commentsCount(data) !== undefined) ? commentsCount(data) : 0;
      const commentsContainer = document.getElementById('comments-container');
      commentsContainer.innerHTML = '';
      data.forEach((comment) => {
        commentsContainer.innerHTML += `
      <div class="comment">
        <p>${comment.creation_date} <i>${comment.username}</i>: ${comment.comment.toUpperCase()} </p>
      </div>
      `;
      });
    });
  };

  // show modal when comments button is clicked
  const commentsBtn = document.querySelectorAll('.comments-btn');
  commentsBtn.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      movies.getAllMovies().forEach((movie) => {
        if (movie.id === Number(e.target.dataset.id)) {
          const modal = document.querySelector('#movie-modal');
          modal.style.display = 'flex';
          document.getElementById('modal-movie-img').src = movie.image.medium;
          document.getElementsByClassName('mod-img-wrapper')[0].style.backgroundImage = `url(${movie.image.medium})`;
          document.getElementById('modal-movie-title').innerHTML = movie.name;
          document.getElementById('modal-movie-release-date').innerHTML = movie.premiered;
          document.getElementById('modal-movie-description').innerHTML = movie.summary;
          document.getElementById('modal-movie-rating').innerHTML = movie.rating.average;
          document.getElementById('modal-movie-language').innerHTML = movie.language;
          document.getElementById('comment-form').setAttribute('data-id', movie.id);
        }
      });
      const form = document.querySelector('#comment-form');
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = e.target[0].value;
        const comment = e.target[1].value;
        CommentsApi.addComments(btn.dataset.id, username, comment);
        setTimeout(() => {
          form.reset();
        }, 1000);
      });
      displayComments(btn.dataset.id);
    });
  });

  const closeBtn = document.querySelector('.close-modal');
  closeBtn.addEventListener('click', () => {
    const modal = document.querySelector('#movie-modal');
    modal.style.display = 'none';
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
