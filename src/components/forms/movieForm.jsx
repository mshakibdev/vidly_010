import React, {Component} from "react";
import {getMovie} from "./../../services/fakeMovieService";

class MovieForm extends Component {
	state = {
		movie: "",
	};
	componentDidMount() {
		const movie = getMovie(this.props.match.params.id);
		console.log(movie);
		this.setState({movie});
	}

	handleSave() {
		this.props.history.replace("/movies");
	}
	render() {
		return (
			<div>
				<h1> Movie-{this.props.match.params.id}</h1>
				<button className="btn btn-primary" onClick={() => this.handleSave()}>
					Save
				</button>
			</div>
		);
	}
}

export default MovieForm;
