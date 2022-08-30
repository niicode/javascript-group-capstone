import {baseUrl, involvementApiBaseURL, uniqueID} from "./variables.js";

class Movies {
  movies = JSON.parse(localStorage.getItem('movies')) || [];
  fetchMovies() {
    console.log('fetching movies');
    fetch(baseUrl)
      .then(response => response.json())
      .then(data => {
        localStorage.setItem('movies', JSON.stringify(data.splice(90, 90)));
      })
  }

  getAllMovies() {
    if (this.movies.length === 0) {
      this.fetchMovies();
      return this.movies;
    } else {
      return this.movies;
    }
  }

  getMoviesLength() {
    return this.movies.length;
  }
}

export default Movies;