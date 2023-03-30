import React from 'react';
import {Link} from "gatsby-plugin-react-i18next";
import * as classnames from "./Pagination.module.css";

type Props = {
	first: boolean;
	last: boolean;
	index: number;
}
const Pagination: React.FC<Props> = ({ first, last, index }) => {
	const nextPage = `/${index + 1}`;
	const prevPage = index === 2 ? '/' : `/${index - 1}`;

	return (
		<div className={classnames.pagination}>
			<Link className={`${classnames.link} ${first ? classnames.disabled : ""}`} to={prevPage}>Prev</Link>
			<Link className={`${classnames.link} ${last ? classnames.disabled : ""}`} to={nextPage}>Next</Link>
		</div>
	);
};

export default Pagination;
