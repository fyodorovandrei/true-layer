import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Header from "./Header";
describe("Header", () => {
	it("<Header /> renders without exploding", () => {
		const { container } = render(<Header />);
		const headerTag = container.getElementsByTagName("header")[0];
		expect(headerTag).toBeInTheDocument();
	});

	it("<Header /> renders 3 language links", () => {
		const { container } = render(<Header />);
		const langLinks = container.querySelectorAll("a[href='#']");
		expect(langLinks.length).toBe(3);
	});

	it("<Header /> renders en as default language", () => {
		const { container } = render(<Header />);
		const defaultLanguageLink = container.querySelector("a[default-language]");
		expect(defaultLanguageLink?.textContent).toBe("en");
	});
});
