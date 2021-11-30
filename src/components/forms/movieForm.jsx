import React, {Component} from "react";
import {getGenres} from "../../services/fakeGenreService";
import {getMovie, saveMovie} from "../../services/fakeMovieService";

class MovieForm extends Component {
	// state
	state = {
		movie: {
			title: "",
			genreId: "",
			numberInStock: "",
			dailyRentalRate: "",
		},

		genres: [],
		errors: {},
	};
	componentDidMount() {
		// ** fetch genre
		const genres = getGenres();
		this.setState({
			genres,
		});
		// ** get specific movie for edit
		const movieId = this.props.match.params.id;

		if (movieId === "new") return;

		try {
			const movie = getMovie(movieId);
			// let x = genres.filter((genre) => genre._id === movie.genreId);
			//** api data's are general purpose to use according to our requirement need map it and make a suitable model as our requirements
			// ** this mapping is done by mapToViewModel method
			this.setState({movie: this.mapToViewModel(movie)});
		} catch (ex) {
			if (ex.response && ex.response.status === 404) {
				// ** replace() will not return to the last page i.e it removes history
				this.props.history.replace("/not-found");
			}
		}
	}
	mapToViewModel(movie) {
		return {
			_id: movie._id,
			title: movie.title,
			genreId: movie.genre._id,
			numberInStock: movie.numberInStock,
			dailyRentalRate: movie.dailyRentalRate,
		};
	}
	handleOnChange(e) {
		// ** validate input
		//** update state */
		let movie = {...this.state.movie};

		movie[e.currentTarget.name] = e.currentTarget.value;
		this.setState({
			movie,
		});
	}

	// !!form validation
	handleSubmit(e) {
		e.preventDefault();
		const movie = this.state.movie;

		saveMovie(movie);
		this.props.history.push("/movies");
		// 
	}
	render() {
		return (
			<div className="container pt-20">
				<h1>Movie Form</h1>
				<form onSubmit={(e) => this.handleSubmit(e)}>
					<div className="form-group">
						<label htmlFor="title">Title</label>
						<input
							onChange={(e) => this.handleOnChange(e)}
							id="title"
							name="title"
							type="text"
							className="form-control"
							value={this.state.movie.title}
						/>
					</div>
					{this.state.errors.title && <div className="alert alert-danger">{this.state.errors.title}</div>}

					<div className="form-group">
						<label htmlFor="genreId">Genre</label>
						<select
							name="genreId"
							onChange={(event) => this.handleOnChange(event)}
							className="form-control form-select"
							aria-label="Default select example">
							console.log(this.state.genres);
							{this.state.genres.map((genre) => (
								<option selected key={genre._id} value={genre._id}>
									{genre.name}
								</option>
							))}
						</select>
					</div>
					{this.state.errors.genre && <div className="alert alert-danger">{this.state.errors.genre}</div>}
					<div className="form-group">
						<label htmlFor="numberInStock">Number In Stock</label>
						<input
							onChange={(e) => this.handleOnChange(e)}
							id="numberInStock"
							name="numberInStock"
							type="numberInStock"
							className="form-control"
							value={this.state.movie["numberInStock"]}
						/>
					</div>
					{this.state.errors.numberInStock && (
						<div className="alert alert-danger">{this.state.errors.numberInStock}</div>
					)}
					<div className="form-group">
						<label htmlFor="dailyRentalRate">Rate</label>
						<input
							onChange={(e) => this.handleOnChange(e)}
							id="dailyRentalRate"
							name="dailyRentalRate"
							type="dailyRentalRate"
							className="form-control"
							value={this.state.movie.dailyRentalRate}
						/>
					</div>
					{this.state.errors.dailyRentalRate && (
						<div className="alert alert-danger">{this.state.errors.dailyRentalRate}</div>
					)}
					<button disabled="" type="submit" className="btn btn-primary">
						Submit
					</button>
				</form>
			</div>
		);
	}
}

export default MovieForm;
