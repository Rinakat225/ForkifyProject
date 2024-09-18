import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Recipe } from "./utils/types.tsx";
import { API_URL } from "./utils/config.tsx";
import { getJSON } from "./utils/helpers.tsx";
import Spinner from "./Spinner.tsx";

/* const KEY = "fa04e8e8-c884-4eef-ba66-8cf5f740c0ec"; */

export default function RecipeDetails() {
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(false);
  const [recipe, setRecipe] = useState<Recipe | null>(null);

  async function fetchRecipe(id: string): Promise<void> {
    setIsLoading(true);

    try {
      const data = await getJSON(`${API_URL}${id}`);

      const { recipe } = data.data;

      const fetchedRecipe: Recipe = {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        sourceUrl: recipe.source_url,
        image_url: recipe.image_url,
        servings: recipe.servings,
        cookingTime: recipe.cooking_time,
        ingredients: recipe.ingredients,
      };

      setRecipe(fetchedRecipe);
      setIsLoading(false);
    } catch (err: unknown) {
      setIsLoading(false);
      throw new Error(err as string);
    }
  }

  useEffect(() => {
    if (id) fetchRecipe(id);
  }, [id]);

  const handleUpdateServings = (serving: number) => {
    if (serving < 1) return;

    setRecipe((prevRecipe) => {
      const updatedRecipe = {
        ...prevRecipe,
        servings: serving,
        ingredients: prevRecipe?.ingredients.map((ingredient) => {
          if (ingredient.quantity !== null) {
            return {
              ...ingredient,
              quantity: ingredient.quantity * (serving / prevRecipe.servings),
            };
          }
          return ingredient;
        }),
      };
      return updatedRecipe;
    });
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      {recipe && (
        <>
          <figure className="recipe__fig">
            <img
              src={recipe.image_url}
              alt={recipe.title}
              className="recipe__img"
            />
            <h1 className="recipe__title">
              <span>{recipe.title}</span>
            </h1>
          </figure>
          <div className="recipe__details">
            <div className="recipe__info">
              <svg className="recipe__info-icon">
                <use href="../src/img/icons.svg#icon-clock"></use>
              </svg>
              <span className="recipe__info-data recipe__info-data--minutes">
                {recipe.cookingTime}
              </span>
              <span className="recipe__info-text">minutes</span>
            </div>
            <div className="recipe__info">
              <svg className="recipe__info-icon">
                <use href="../src/img/icons.svg#icon-users"></use>
              </svg>
              <span className="recipe__info-data recipe__info-data--people">
                {recipe.servings}
              </span>
              <span className="recipe__info-text">servings</span>

              <div className="recipe__info-buttons">
                <button
                  className="btn--tiny btn--update-servings"
                  onClick={() => handleUpdateServings(recipe.servings - 1)}
                >
                  <svg>
                    <use href="../src/img/icons.svg#icon-minus-circle"></use>
                  </svg>
                </button>
                <button
                  className="btn--tiny btn--update-servings"
                  onClick={() => handleUpdateServings(recipe.servings + 1)}
                >
                  <svg>
                    <use href="../src/img/icons.svg#icon-plus-circle"></use>
                  </svg>
                </button>
              </div>
            </div>

            <div className="recipe__user-generated">
              <svg>
                <use href="../src/img/icons.svg#icon-user"></use>
              </svg>
            </div>
            <button className="btn--round">
              <svg className="">
                <use href="../src/img/icons.svg#icon-bookmark-fill"></use>
              </svg>
            </button>
          </div>
          <div className="recipe__ingredients">
            <h2 className="heading--2">Recipe ingredients</h2>
            <ul className="recipe__ingredient-list">
              {recipe.ingredients.map((ingredient) => (
                <li className="recipe__ingredient">
                  <svg className="recipe__icon">
                    <use href="../src/img/icons.svg#icon-check"></use>
                  </svg>
                  <div className="recipe__quantity">{ingredient.quantity}</div>
                  <div className="recipe__description">
                    <span className="recipe__unit">
                      {ingredient.unit} {ingredient.description}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="recipe__directions">
            <h2 className="heading--2">How to cook it</h2>
            <p className="recipe__directions-text">
              This recipe was carefully designed and tested by
              <span className="recipe__publisher">{recipe.publisher}</span>.
              Please check out directions at their website.
            </p>
            <a
              className="btn--small recipe__btn"
              href={recipe.sourceUrl}
              target="_blank"
            >
              <span>Directions</span>
              <svg className="search__icon">
                <use href="../src/img/icons.svg#icon-arrow-right"></use>
              </svg>
            </a>
          </div>
        </>
      )}
    </>
  );
}
