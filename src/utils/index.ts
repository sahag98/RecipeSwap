export async function getRecipes() {
  console.log('getting recipes')
  console.log(process.env.NEXT_PUBLIC_RAPID_API_KEY)
  const q = ''
  const headers: HeadersInit = {
    'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPID_API_KEY || "",
    'X-RapidAPI-Host': 'recipe-by-api-ninjas.p.rapidapi.com'
  }

  const response = await fetch('https://recipe-by-api-ninjas.p.rapidapi.com/v1/recipe?query=pizza',
    {
      headers: headers
    }
  )

  const result = await response.json()

  return result
}