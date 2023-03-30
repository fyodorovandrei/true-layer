import React from 'react';
import { useI18next, Link, Trans } from 'gatsby-plugin-react-i18next';
import * as classnames from "./Header.module.css"

type Props = {
	children?: React.ReactNode
}
const Header: React.FC<Props> = () => {
	const {languages, changeLanguage} = useI18next();
	return (
		<header className={classnames.header}>
			<div className={classnames.logo}>
				<Link to="/" >
					<Trans>Pokemon</Trans>
				</Link>
			</div>
			<div className={classnames.languages}>
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
			</div>
		</header>
	);
};

export default Header;
