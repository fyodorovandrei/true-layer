import React from 'react';
import { useI18next } from 'gatsby-plugin-react-i18next';
import * as classnames from "./Header.module.css"

type Props = {
	children?: React.ReactNode
}
const Header: React.FC<Props> = () => {
	const {languages, changeLanguage} = useI18next();
	return (
		<header className={classnames.header}>
			{languages.map((lng) => (
				<a
					className={classnames.link}
					key={lng}
					href="#"
					onClick={(e) => {
						e.preventDefault();
						changeLanguage(lng);
					}}>
					{lng}
				</a>
			))}
		</header>
	);
};

export default Header;
