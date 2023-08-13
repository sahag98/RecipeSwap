describe("Testing viewing a recipe", () => {
  it("Visits RecipeSwap, checks if there's a link called Recipes. Then it verifies that the url is correct.", () => {
    cy.visit("https://recipe-swap.vercel.app/");

    cy.contains("Recipes").click();

    cy.url().should("include", "/recipes");

    cy.contains("View Recipe").click();
  });
});
