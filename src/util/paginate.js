import _ from "lodash";

export function paginate(totalItems, pageNumber, itemsPerPage) {
	let startIndex = (pageNumber - 1) * itemsPerPage;
	return _(totalItems).slice(startIndex).take(itemsPerPage).value();
}
