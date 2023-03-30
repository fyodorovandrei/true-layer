import * as React from "react"

export const onRenderBody = ({ setHeadComponents }) => {
	setHeadComponents([
		<link key="googleapis" rel="preconnect" href="https://fonts.googleapis.com" />,
		<link key="gstatic" rel="preconnect" href="https://fonts.gstatic.com" crossOrigin=""/>,
		<link key="url" href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@500&display=swap" rel="stylesheet"/>,
	])
}
