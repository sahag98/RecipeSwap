import React from 'react'

type RecipeProps = {
  title: string;
  ingredients: string;
  servings: string;
  instructions: string;
}

const RecipeItems = ({ recipe }: { recipe: RecipeProps }) => {
  const { title, ingredients, servings, instructions } = recipe
  return (
    <div>
      <h2>{title}</h2>
      <p>{ingredients}</p>
      <p>{servings}</p>
      {/* <p>{instructions}</p> */}
    </div>
  )
}

export default RecipeItems