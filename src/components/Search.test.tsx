import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Search from "./Search";

jest.useFakeTimers();
describe("Search", () => {
	it("<Search /> renders without exploding", () => {
		const searchHandler = jest.fn();

		const { container } = render(<Search query="Test" onSearch={searchHandler} />);
		const inputElement = container.querySelector("input");

		expect(inputElement).toHaveValue("Test");
	});

	it("<Search /> should be updated value on input new value", () => {
		const searchHandler = jest.fn();

		render(<Search query="Test" onSearch={searchHandler} />);
		const inputElement = screen.getByTestId("search-input") as HTMLInputElement;

		expect(inputElement.value).toBe("Test");

		fireEvent.input(inputElement, {
			target: { value: "NewValue"}
		});

		// Waiting for the input debounce
		jest.advanceTimersByTime(300);

		expect(inputElement.value).toBe("NewValue");
		expect(searchHandler).toHaveBeenCalledTimes(1);
	});
});
