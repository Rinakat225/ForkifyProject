import { useState, useRef } from "react";
import { Recipe } from "./utils/types";
import { sendJSON } from "./utils/helpers";
import { API_KEY, API_URL } from "./utils/config";

interface AddNewRecipeButtonProps {
  setDisplayedRecipe: (recipe: Recipe | null) => void;
  setBookmarkList: (recipe: Recipe[] | null) => void;
}

export default function AddNewRecipeButton({
  setDisplayedRecipe,
  setBookmarkList,
}: AddNewRecipeButtonProps) {
  const [newRecipeValue, setNewRecipeValue] = useState<Recipe | null>(null);
  const [openWindow, setOpenWindow] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleClickOutside = (
    ref: React.RefObject<HTMLElement>,
    closeWindow: () => void
  ) => {
    const handleClick = (event: React.MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        closeWindow();
      }
    };

    return handleClick;
  };

  const handleCloseWindowClickOutside = handleClickOutside(ref, () =>
    setOpenWindow(false)
  );

  const createRecipeObject = function (data) {
    const { recipe } = data.data;
    return {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image_url: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
      bookmarked: true,
      ...(recipe.key && { key: recipe.key }),
    };
  };

  async function uploadRecipe(newRecipe) {
    try {
      const ingredients = Object.entries(newRecipe)
        .filter((entry) => entry[0].startsWith("ingredient") && entry[1] !== "")
        .map((ing) => {
          const ingredientsArr = ing[1].replace(/ /g, "").split(",");
          if (ingredientsArr.length !== 3)
            throw new Error(
              "Wrong ingredient format! Please use the correct format"
            );

          const [quantity, unit, description] = ingredientsArr;

          return {
            quantity: quantity ? +quantity : null,
            unit,
            description,
          };
        });

      const recipe = {
        title: newRecipe.title,
        source_url: newRecipe.sourceUrl,
        image_url: newRecipe.image,
        publisher: newRecipe.publisher,
        cooking_time: +newRecipe.cookingTime,
        servings: +newRecipe.servings,
        ingredients,
      };
      console.log(recipe);
      const data = await sendJSON(`${API_URL}?key=${API_KEY}`, recipe);

      const newData = createRecipeObject(data);
      console.log(newData);

      window.history.pushState(null, "", `/recipe/${newData.id}`);

      setTimeout(function () {
        setNewRecipeValue(newData);
        setOpenWindow(false);
      }, 2500);
      setDisplayedRecipe(newData);
      setBookmarkList((bookmarks) => [newData, ...bookmarks]);
    } catch (err) {
      throw new Error(err as string);
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const dataArr = [...new FormData(event.target)];
    const data = Object.fromEntries(dataArr);

    uploadRecipe(data);
  };

  return (
    <>
      <button
        className="nav__btn nav__btn--add-recipe"
        onClick={() => setOpenWindow((isOpen) => !isOpen)}
      >
        <svg className="nav__icon">
          <use href="../src/img/icons.svg#icon-edit"></use>
        </svg>
        <span>Add recipe</span>
      </button>
      {openWindow && (
        <div className="overlay" onMouseDown={handleCloseWindowClickOutside}>
          <div className="add-recipe-window" ref={ref}>
            <button
              className="btn--close-modal"
              onClick={() => setOpenWindow((isOpen) => !isOpen)}
            >
              &times;
            </button>
            <form className="upload" onSubmit={handleSubmit}>
              <div className="upload__column">
                <h3 className="upload__heading">Recipe data</h3>
                <label>Title</label>
                <input value="TEST25" required name="title" type="text" />
                <label>URL</label>
                <input value="TEST23" required name="sourceUrl" type="text" />
                <label>Image URL</label>
                <input value="TEST23" required name="image" type="text" />
                <label>Publisher</label>
                <input value="TEST23" required name="publisher" type="text" />
                <label>Prep time</label>
                <input value="23" required name="cookingTime" type="number" />
                <label>Servings</label>
                <input value="23" required name="servings" type="number" />
              </div>

              <div className="upload__column">
                <h3 className="upload__heading">Ingredients</h3>
                <label>Ingredient 1</label>
                <input
                  value="0.5,kg,Rice"
                  type="text"
                  required
                  name="ingredient-1"
                  placeholder="Format: 'Quantity,Unit,Description'"
                />
                <label>Ingredient 2</label>
                <input
                  value="1,,Avocado"
                  type="text"
                  name="ingredient-2"
                  placeholder="Format: 'Quantity,Unit,Description'"
                />
                <label>Ingredient 3</label>
                <input
                  value=",,salt"
                  type="text"
                  name="ingredient-3"
                  placeholder="Format: 'Quantity,Unit,Description'"
                />
                <label>Ingredient 4</label>
                <input
                  name="ingredient-4"
                  placeholder="Format: 'Quantity,Unit,Description'"
                />
                <label>Ingredient 5</label>
                <input
                  name="ingredient-5"
                  placeholder="Format: 'Quantity,Unit,Description'"
                />
                <label>Ingredient 6</label>
                <input
                  name="ingredient-6"
                  placeholder="Format: 'Quantity,Unit,Description'"
                />
              </div>

              <button className="btn upload__btn">
                <svg>
                  <use href="../src/img/icons.svg#icon-upload-cloud"></use>
                </svg>
                <span>Upload</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
