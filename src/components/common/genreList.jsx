import React from "react";

function Genre(props) {
	return (
		<ul className="list-group ">
			{props.genreList.map((genre) => (
				<li
					key={genre._id}
					className={props.selectedGenre === genre ? "list-group-item active" : "list-group-item"}
					onClick={() => props.onSelectGenre(genre)}>
					{genre.name}
				</li>
			))}
		</ul>
	);
}
export default Genre;
