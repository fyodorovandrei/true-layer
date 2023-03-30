import React from 'react';
import * as classnames from "./Page.module.css";

type Props = {
	children?: React.ReactNode;
}
const Page: React.FC<Props> = ({children}) => {
	return (
		<main className={classnames.main}>
			{children}
		</main>
	);
};

export default Page;
