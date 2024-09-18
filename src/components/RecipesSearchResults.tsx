import { Link, useLocation } from "react-router-dom";
import { Recipe } from "./utils/types";
import Spinner from "./Spinner";

interface RecipesSearchResultsProps {
  recipeList: Recipe[];
  recipeListIsLoading: boolean;
  errorMessage: string;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

const RecipesSearchResults = ({
  recipeList,
  recipeListIsLoading,
  errorMessage,
  currentPage,
  setCurrentPage,
}: RecipesSearchResultsProps) => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  if (recipeListIsLoading) {
    return <Spinner />;
  }

  if (errorMessage && recipeList.length === 0) {
    return (
      <div className="error">
        <div>
          <svg>
            <use href="../src/img/icons.svg#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>{errorMessage}</p>
      </div>
    );
  }

  const searchResultsWithPagination = (page: number) => {
    const start = (page - 1) * 10;
    const end = page * 10;

    return recipeList.slice(start, end);
  };

  return (
    <div className="search-results">
      <ul className="results">
        {searchResultsWithPagination(currentPage).map((recipe) => (
          <li className="preview" key={recipe.id}>
            <Link
              className={`preview__link ${
                id === recipe.id && "preview__link--active"
              }`}
              to={`/recipe/${recipe.id}`}
            >
              <figure className="preview__fig">
                <img src={recipe.image_url} alt={recipe.title} />
              </figure>
              <div className="preview__data">
                <h4 className="preview__title">{recipe.title}</h4>
                <p className="preview__publisher">{recipe.publisher}</p>
                {/*  <div className="preview__user-generated">
                  <svg>
                    <use href="../src/img/icons.svg#icon-user"></use>
                  </svg>
                </div> */}
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <div className="pagination">
        <>
          {currentPage > 1 && (
            <button
              className="btn--inline pagination__btn--prev"
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              <svg className="search__icon">
                <use href="../src/img/icons.svg#icon-arrow-left"></use>
              </svg>
              <span>Page {currentPage - 1}</span>
            </button>
          )}

          {recipeList.length > currentPage * 10 && (
            <button
              className="btn--inline pagination__btn--next"
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              <span>Page {currentPage + 1}</span>
              <svg className="search__icon">
                <use href="../src/img/icons.svg#icon-arrow-right"></use>
              </svg>
            </button>
          )}
        </>
      </div>
      <p className="copyright">
        &copy; Copyright by
        <a
          className="twitter-link"
          target="_blank"
          href="https://twitter.com/jonasschmedtman"
        >
          Jonas Schmedtmann{" "}
        </a>
        . Use for learning or your portfolio. Don't use to teach. Don't claim as
        your own.
      </p>
    </div>
  );
};

export default RecipesSearchResults;
