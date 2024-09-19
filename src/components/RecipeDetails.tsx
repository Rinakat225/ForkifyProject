import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Recipe } from "./utils/types.tsx";
import { API_URL } from "./utils/config.tsx";
import { getJSON } from "./utils/helpers.tsx";
import Spinner from "./Spinner.tsx";

/* const KEY = "fa04e8e8-c884-4eef-ba66-8cf5f740c0ec"; */

interface RecipeDetailsProps {
  bookmarkList: Recipe[] | undefined;
  setBookmarkList: (recipe: Recipe[] | undefined) => void;
}

export default function RecipeDetails({
  bookmarkList,
  setBookmarkList,
}: RecipeDetailsProps) {
  const { id } = useParams<{
    id: string;
  }>();

  const [recipeIsLoading, setRecipeIsLoading] = useState(false);
  const [displayedRecipe, setDisplayedRecipe] = useState<Recipe | null>(null);

  async function fetchRecipe(id: string): Promise<void> {
    setRecipeIsLoading(true);

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
        bookmarked: recipe.bookmarked,
      };

      const bookmarkedRecipe = bookmarkList?.find(
        (recipe) => recipe.id === fetchedRecipe.id
      );

      setDisplayedRecipe({ ...fetchedRecipe, bookmarked: !!bookmarkedRecipe });

      setRecipeIsLoading(false);
    } catch (err: unknown) {
      setRecipeIsLoading(false);
      throw new Error(err as string);
    }
  }

  useEffect(() => {
    if (id) fetchRecipe(id);
  }, [id]);

  const handleUpdateServings = (serving: number) => {
    if (serving < 1) return;

    setDisplayedRecipe((prevRecipe) => {
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

  const handleAddBookmark = (recipe: Recipe) => {
    const isBookmarked = recipe?.bookmarked === true;
    const updatedRecipe = { ...recipe, bookmarked: !isBookmarked };

    setDisplayedRecipe(() => updatedRecipe);

    if (isBookmarked) {
      setBookmarkList(bookmarkList?.filter((r) => r.id !== recipe.id));
    } else {
      setBookmarkList([updatedRecipe, ...(bookmarkList ?? [])]);
    }
  };

  if (recipeIsLoading) {
    return <Spinner />;
  }

  return (
    <>
      {displayedRecipe && (
        <>
          <figure className="recipe__fig">
            <img
              src={displayedRecipe.image_url}
              alt={displayedRecipe.title}
              className="recipe__img"
            />
            <h1 className="recipe__title">
              <span>{displayedRecipe.title}</span>
            </h1>
          </figure>
          <div className="recipe__details">
            <div className="recipe__info">
              <svg className="recipe__info-icon">
                <use href="../src/img/icons.svg#icon-clock"></use>
              </svg>
              <span className="recipe__info-data recipe__info-data--minutes">
                {displayedRecipe.cookingTime}
              </span>
              <span className="recipe__info-text">minutes</span>
            </div>
            <div className="recipe__info">
              <svg className="recipe__info-icon">
                <use href="../src/img/icons.svg#icon-users"></use>
              </svg>
              <span className="recipe__info-data recipe__info-data--people">
                {displayedRecipe.servings}
              </span>
              <span className="recipe__info-text">servings</span>

              <div className="recipe__info-buttons">
                <button
                  className="btn--tiny btn--update-servings"
                  onClick={() =>
                    handleUpdateServings(displayedRecipe.servings - 1)
                  }
                >
                  <svg>
                    <use href="../src/img/icons.svg#icon-minus-circle"></use>
                  </svg>
                </button>
                <button
                  className="btn--tiny btn--update-servings"
                  onClick={() =>
                    handleUpdateServings(displayedRecipe.servings + 1)
                  }
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
            <button
              className="btn--round"
              onClick={() => handleAddBookmark(displayedRecipe)}
            >
              <svg className="">
                <use
                  href={`${
                    displayedRecipe.bookmarked
                      ? "../src/img/icons.svg#icon-bookmark-fill"
                      : "../src/img/icons.svg#icon-bookmark"
                  }`}
                ></use>
              </svg>
            </button>
          </div>
          <div className="recipe__ingredients">
            <h2 className="heading--2">Recipe ingredients</h2>
            <ul className="recipe__ingredient-list">
              {displayedRecipe.ingredients.map((ingredient) => (
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
              <span className="recipe__publisher">
                {displayedRecipe.publisher}
              </span>
              . Please check out directions at their website.
            </p>
            <a
              className="btn--small recipe__btn"
              href={displayedRecipe.sourceUrl}
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
