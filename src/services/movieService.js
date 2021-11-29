import axios from "axios";

import * as genresAPI from "./genreService";

const movies = axios.get("http://localhost:3900/api/movies");

export function getMovies() {
	return movies;
}

export function getMovie(id) {
	return axios.get("http://localhost:3900/api/movies" + "/" + id);

	// return movies.find((m) => m._id === id);
}

export function saveMovie(movie) {
	let movieInDb = movies.find((m) => m._id === movie._id) || {};
	movieInDb.title = movie.title;
	movieInDb.genre = genresAPI.genres.find((g) => g._id === movie.genreId);
	movieInDb.numberInStock = movie.numberInStock;
	movieInDb.dailyRentalRate = movie.dailyRentalRate;

	if (!movieInDb._id) {
		movieInDb._id = Date.now().toString();
		movies.push(movieInDb);
		console.log(movieInDb._id);
	}

	return movieInDb;
}

export function deleteMovie(id) {
	let movieInDb = movies.find((m) => m._id === id);
	movies.splice(movies.indexOf(movieInDb), 1);
	return movieInDb;
}
