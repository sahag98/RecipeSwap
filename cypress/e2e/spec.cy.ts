describe("Testing viewing a recipe", () => {
  it("Visits RecipeSwap, checks if there's a link called Recipes. Then it verifies that the url is correct.", () => {
    cy.visit("http://localhost:3000/");
    cy.contains("Recipes");
    cy.get('[data-cy="started"]').click();
    cy.url().should("include", "/recipes");
    cy.contains("View Recipe").click();
  });
});