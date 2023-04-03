import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import PokemonCard from "./PokemonCard";
describe("PokemonCard", () => {
	it("<PokemonCard /> renders without exploding", () => {
		const { container } = render(<PokemonCard image="/path/to/image.png" name="Pokemon" />);
		const imageTag = container.querySelector("img");
		expect(imageTag).toBeInTheDocument();
		expect(imageTag).toHaveAttribute("src", "/path/to/image.png");
		expect(imageTag).toHaveAttribute("alt", "Pokemon");

		const title = container.querySelector("p");
		expect(title).toBeInTheDocument();
		expect(title).toHaveTextContent("Pokemon");
	});
});
