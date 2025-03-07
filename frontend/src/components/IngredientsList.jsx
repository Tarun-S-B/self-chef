function IngredientsList({list, genRecipe}) {
    const ingredientsElements = list.map((item) => (<li>{item}</li>))

    return (
        ingredientsElements.length > 0 ? (
            <section className="ingredients-list">
              <h2>Ingredients on Hand:</h2>
              <ul className="ingredients-list">{ingredientsElements}</ul>
    
              {ingredientsElements.length > 2 && (
                <div className="get-recipe-container">
                  <div>
                    <h3>Ready for a recipe?</h3>
                    <p>Generate a recipe from your list of ingredients</p>
                  </div>
                  <button onClick={genRecipe}>Get a recipe</button>  
                </div>
              )}
            </section>
          ) : null
    )
}

export default IngredientsList