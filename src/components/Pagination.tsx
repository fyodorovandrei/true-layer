import React from 'react';
import { Link, Trans } from "gatsby-plugin-react-i18next";
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
			<Link className={`${classnames.link} ${first ? classnames.disabled : ""}`} to={prevPage}>
				<Trans>Previous</Trans>
			</Link>
			<Link className={`${classnames.link} ${last ? classnames.disabled : ""}`} to={nextPage}>
				<Trans>Next</Trans>
			</Link>
		</div>
	);
};

export default Pagination;
