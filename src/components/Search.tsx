import React, { FormEvent, useEffect, useState } from 'react';
import { useTranslation, Trans } from "gatsby-plugin-react-i18next";
import * as classnames from "./Search.module.css";

type Props = {
	query: string | null;
	onSearch: (value: string) => void;
}

let delay: NodeJS.Timeout;
const Search: React.FC<Props> = ({ query, onSearch }) =>  {
	const [value, setValue] = useState(query);
	const i18n = useTranslation();

	const placeholder = i18n.t("Search a Pokemon") || "";

	useEffect(() => {
		clearTimeout(delay);
		if (value !== null) {
			delay = setTimeout(() => onSearch(value), 300);
		}

		return () => clearTimeout(delay)

	}, [value]);

	const handleChange = (event: FormEvent<HTMLInputElement>) => {
		setValue((event.target as HTMLInputElement).value)
	}
	const handleSubmit = () => value !== null && onSearch(value);

	return (
		<div className={classnames.search}>
			<input
				data-testid="search-input"
				value={value || ""}
				onInput={handleChange}
				placeholder={placeholder}
			/>
			<button onClick={handleSubmit}><Trans>Search</Trans></button>
		</div>
	);
}

export default Search;
