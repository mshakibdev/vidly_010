import React from "react";
import _ from "lodash";
function Pagination(props) {
	let {totalMovies, movie_PerPage, onPageChange, currentPage} = props;
	let number_of_pages = Math.ceil(totalMovies / movie_PerPage);
	if (number_of_pages === 1) return null;
	let pages = _.range(1, number_of_pages + 1);
	return (
		<nav aria-label="Page navigation example">
			<ul className="pagination">
				{pages.map((page) => (
					<li key={page} className={page === currentPage ? "page-item active" : "page-item"}>
						<a className="page-link" onClick={() => onPageChange(page)}>
							{page}
						</a>
					</li>
				))}
			</ul>
		</nav>
	);
}
export default Pagination;
