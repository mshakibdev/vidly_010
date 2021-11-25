import React, {Component} from "react";
import {getMovies} from "../../services/fakeMovieService";
import Pagination from "../common/pagination";
import {paginate} from "../../util/paginate";
import Genre from "../common/genreList";
import {getGenres} from "../../services/fakeGenreService";
import MoviesTable from "./moviesTable";
import _ from "lodash";
import {Link} from "react-router-dom";

class MoviesChart extends Component {
	constructor() {
		super();
		this.handlePageChange = this.handlePageChange.bind(this);
		this.handleSelectedGenre = this.handleSelectedGenre.bind(this);
		this.handleSorting = this.handleSorting.bind(this);
		this.state = {
			movies: [],
			genres: [],
			movie_PerPage: 3,
			currentPage: 1,
			sortedTable: {
				tableHeader: "title",
				order: "asc",
			},
		};
	}
	componentDidMount() {
		//used for async vibe we can use state directly
		const genres = [{name: "All Genres", _id: ""}, ...getGenres()];
		this.setState({
			movies: getMovies(),
			genres: genres,
		});
	}
	handleDeleteMovie(movie) {
		let all_movies = this.state.movies;
		let updated_movie_list = all_movies.filter((eachMovie) => eachMovie._id !== movie._id);
		this.setState({movies: updated_movie_list});
	}
	handlePageChange(pageNumber) {
		this.setState({
			currentPage: pageNumber,
		});
	}

	handleSelectedGenre(genre) {
		this.setState({selectedGenre: genre, currentPage: 1});
	}
	handleSorting(tableHeader) {
		this.setState({
			sortedTable: {
				tableHeader: tableHeader,
				order: "asc",
			},
		});
	}
	render() {
		//*? / const {length: number_of_movies} = this.state.movies;
		// * "number_of_movies" not more necessary because below  "updated_movie_list" is use instead of it !

		// ! obj destructuring for state object

		const {movies, currentPage, movie_PerPage, selectedGenre, sortedTable} = this.state;
		// * filtering
		const filtered_movies =
			selectedGenre && selectedGenre._id ? movies.filter((eachMovie) => eachMovie.genre._id === selectedGenre._id) : movies;

		//* total movies
		const total_number_of_movies = filtered_movies.length;

		// * sorting

		const ordered_movies = _.orderBy(filtered_movies, [sortedTable.tableHeader], [sortedTable.order]);

		// * paginating
		const paginated_movies = paginate(ordered_movies, currentPage, movie_PerPage);

		if (total_number_of_movies === 0) {
			return <p className="m-4">There are no movies in the database</p>;
		}
		return (
			<main className="container pt-20">
				<div className="row">
					<div className="col-3">
						<Genre
							selectedGenre={this.state.selectedGenre}
							genreList={this.state.genres}
							onSelectGenre={this.handleSelectedGenre}
						/>
					</div>
					<div className="col">
						<p className="m-4">Showing {total_number_of_movies} movies from the database</p>
						<Link to="/movies/new" className="btn btn-primary">
							New Movie
						</Link>
						<MoviesTable
							onSortTable={this.handleSorting}
							movieList={paginated_movies}
							onDeleteMovie={this.handleDeleteMovie.bind(this)}
						/>

						<Pagination
							totalMovies={total_number_of_movies}
							movie_PerPage={this.state.movie_PerPage}
							onPageChange={this.handlePageChange}
							currentPage={this.state.currentPage}
						/>
					</div>
				</div>
			</main>
		);
	}
}
export default MoviesChart;
