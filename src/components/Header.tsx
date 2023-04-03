import React from 'react';
import { useI18next, Link, Trans } from 'gatsby-plugin-react-i18next';
import * as classnames from "./Header.module.css"

type Props = {
	children?: React.ReactNode
}
const Header: React.FC<Props> = () => {
	const { languages, changeLanguage, language } = useI18next();

	const handleChangeLanguage = async (e: React.MouseEvent<HTMLAnchorElement>, lng: string) => {
		e.preventDefault();
		await changeLanguage(lng);
	}

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
						className={`${classnames.link} ${language === lng ? classnames.activeLink : ""}`}
						data-default-language={language === lng ? "true" : ""}
						key={lng}
						href="#"
						onClick={(e) => handleChangeLanguage(e, lng)}
					>
						{lng}
					</a>
				))}
			</div>
		</header>
	);
};

export default Header;
