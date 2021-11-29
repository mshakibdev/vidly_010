import axios from "axios";
export const genres = axios.get("http://localhost:3900/api/genres");

export function getGenres() {
	return genres;
}
