export async function getRecipes() {
  console.log('getting recipes')
  console.log(process.env.NEXT_PUBLIC_RAPID_API_KEY)
  const q = ''
  const headers: HeadersInit = {
    'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPID_API_KEY || "",
    'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
  }

  const response = await fetch('https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch',
    {
      headers: headers
    }
  )

  const result = await response.json()

  return result
}

export async function getRecipeInfo(id) {
  console.log('getting recipes')
  console.log(process.env.NEXT_PUBLIC_RAPID_API_KEY)
  const q = ''
  const headers: HeadersInit = {
    'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPID_API_KEY || "",
    'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
  }

  const response = await fetch(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${id}/information`,
    {
      headers: headers
    }
  )

  const result = await response.json()

  return result
}