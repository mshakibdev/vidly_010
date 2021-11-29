import React from "react";
import Like from "../common/like";
import {Link} from "react-router-dom";

function MoviesTable(props) {
	
	return (
	
			<table className="table m-4">
				<thead className="thead-white">
					<tr>
						<th scope="col" onClick={() => props.onSortTable("title")}>
							Title
						</th>
						<th scope="col" onClick={() => props.onSortTable("genre.name")}>
							Genre
						</th>
						<th scope="col" onClick={() => props.onSortTable("numberInStock")}>
							Stock
						</th>
						<th scope="col" onClick={() => props.onSortTable("dailyRentalRate")}>
							Rate
						</th>
						<th scope="col" onClick={() => props.onSortTable("Like")}></th>
						<th />
						<th />
					</tr>
				</thead>
				{/* {this.state.movies.length === 0 && <p>There are no movies</p> } */}

				<tbody>
				{ props.movieList.map((movie) => (
						<tr key={movie._id}>
							<td>
								<Link to={`/movies/${movie._id}`}>{movie.title}</Link>
							</td>
							<td>{ movie.genre.name }</td>
							<td>{movie.numberInStock}</td>
							<td>{movie.dailyRentalRate}</td>
							<td>
								<Like />
							</td>
							<td>
								<button
									type="button"
									className="btn btn-danger"
									onClick={props.onDeleteMovie.bind(this, movie)}>
									Delete
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
	);
}
export default MoviesTable;
