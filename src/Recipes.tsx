import RecipeDetails from "./components/RecipeDetails";
import RecipesSearchResults from "./components/RecipesSearchResults";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import { Recipe } from "./components/utils/types";
import SearchRecipesForm from "./components/SearchRecipesForm";
import HeaderActionsButtons from "./components/HeaderActionsButtons";
import WelcomeMessage from "./components/WelcomeMessage";

const storedBookmarkList = localStorage.getItem("bookmarkList");
const parsedBookmarkList = storedBookmarkList
  ? JSON.parse(storedBookmarkList)
  : [];

const Recipes = () => {
  const [recipeList, setRecipeList] = useState<Recipe[]>([]);
  const [recipeListIsLoading, setRecipeListIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [bookmarkList, setBookmarkList] = useState<Recipe[] | null>(
    parsedBookmarkList
  );
  const [displayedRecipe, setDisplayedRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    localStorage.setItem("bookmarkList", JSON.stringify(bookmarkList));
  }, [bookmarkList]);

  return (
    <Router>
      <div className="container">
        <header className="header">
          <img src="../src/img/logo.png" alt="Logo" className="header__logo" />
          <SearchRecipesForm
            setRecipeList={setRecipeList}
            setRecipeListIsLoading={setRecipeListIsLoading}
            setErrorMessage={setErrorMessage}
            setCurrentPage={setCurrentPage}
          />
          <HeaderActionsButtons
            bookmarkList={bookmarkList}
            setBookmarkList={setBookmarkList}
            setDisplayedRecipe={setDisplayedRecipe}
          />
        </header>
        <RecipesSearchResults
          recipeList={recipeList}
          recipeListIsLoading={recipeListIsLoading}
          errorMessage={errorMessage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />

        <div className="recipe">
          <Routes>
            <Route path="/" element={<WelcomeMessage />} />
            <Route
              path="/recipe/:id"
              element={
                <RecipeDetails
                  bookmarkList={bookmarkList}
                  setBookmarkList={setBookmarkList}
                  displayedRecipe={displayedRecipe}
                  setDisplayedRecipe={setDisplayedRecipe}
                />
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default Recipes;
