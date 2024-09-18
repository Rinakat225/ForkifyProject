import { useState } from "react";
import { Recipe } from "./utils/types";
import { API_URL } from "./utils/config";
import { getJSON } from "./utils/helpers";

interface SearchRecipesFormProps {
  setRecipeList: (recipes: Recipe[]) => void;
  setRecipeListIsLoading: (value: boolean) => void;
}

const SearchRecipesForm = ({
  setRecipeList,
  setRecipeListIsLoading,
}: SearchRecipesFormProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSubmitSearch = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!searchQuery.trim()) return;

    async function fetchRecipes(searchQuery: string): Promise<void> {
      setRecipeListIsLoading(true);

      try {
        const data = await getJSON(`${API_URL}?search=${searchQuery}`);

        const fetchedRecipes: Recipe[] = data.data.recipes.map(
          (recipe: Recipe) => ({
            id: recipe.id,
            title: recipe.title,
            publisher: recipe.publisher,
            image_url: recipe.image_url,
          })
        );
        console.log(fetchedRecipes);

        setRecipeList(fetchedRecipes);
        setRecipeListIsLoading(false);
      } catch (err: unknown) {
        setRecipeListIsLoading(false);
        throw new Error(err as string);
      }
    }

    fetchRecipes(searchQuery);
  };

  return (
    <form className="search" onSubmit={handleSubmitSearch}>
      <input
        type="text"
        className="search__field"
        placeholder="Search over 1,000,000 recipes..."
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
      />
      <button className="btn search__btn">
        <svg className="search__icon">
          <use href="../src/img/icons.svg#icon-search"></use>
        </svg>
        <span>Search</span>
      </button>
    </form>
  );
};

export default SearchRecipesForm;
