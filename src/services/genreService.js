import axios from "axios";

export function getGenres() {
	const genres = axios.get("http://localhost:3900/api/genres");
	
	return genres;
}
