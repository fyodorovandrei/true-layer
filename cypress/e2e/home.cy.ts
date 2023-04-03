describe("Check home page", () => {
	it("Should have EN logo", () => {
		cy.visit("/");
		cy.get("a[href='/']").should("have.text", "Pokemon");
	});

	it("Should have IT logo", () => {
		cy.visit("/it/");
		cy.get("a[href='/it/']").should("have.text", "Pokèmon");
	});

	it("Should have JA logo", () => {
		cy.visit("/ja/");
		cy.get("a[href='/ja/']").should("have.text", "ポケモン");
	});
});

describe("Check change language", () => {
	beforeEach(() => {
		cy.visit("/");
	});

	it("Should change language to IT", () => {
		cy.get("a[href='#']").contains("it").click();
		cy.location("pathname").should("eq", "/it/")
	});

	it("Should change language to JA", () => {
		cy.get("a[href='#']").contains("ja").click();
		cy.location("pathname").should("eq", "/ja/")
	});
});

describe("Check works pagination", () => {
	it("Should navigate to second page", () => {
		cy.visit("/");
		cy.get("a").contains("Next").click();
		cy.location("pathname").should("eq", "/2/")
	});

	it("Should navigate to first page", () => {
		cy.visit("/2/");
		cy.get("a").contains("Previous").click();
		cy.location("pathname").should("eq", "/")
	});

	it("Should navigate to firs page on click to logo", () => {
		cy.visit("/2/");
		cy.get("a").contains("Pokemon").click();
		cy.location("pathname").should("eq", "/")
	});
});
