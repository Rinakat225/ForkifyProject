import { Link, useLocation } from "react-router-dom";
import { Recipe } from "./utils/types";

interface RecipesSearchResultsProps {
  recipeList: Recipe[];
  recipeListIsLoading: boolean;
}

const RecipesSearchResults = ({
  recipeList,
  recipeListIsLoading,
}: RecipesSearchResultsProps) => {
  const location = useLocation();
  console.log(location.pathname);
  const id = location.pathname.split("/")[2];

  return (
    <div className="search-results">
      {recipeListIsLoading ? (
        <div className="spinner">
          <svg>
            <use href="../src/img/icons.svg#icon-loader"></use>
          </svg>
        </div>
      ) : (
        <ul className="results">
          {recipeList.map((recipe) => (
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
                    <use href="src/img/icons.svg#icon-user"></use>
                  </svg>
                </div> */}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
      <div className="pagination">
        {recipeList.length > 10 && (
          <>
            <button className="btn--inline pagination__btn--prev">
              <svg className="search__icon">
                <use href="src/img/icons.svg#icon-arrow-left"></use>
              </svg>
              <span>Page 1</span>
            </button>
            <button className="btn--inline pagination__btn--next">
              <span>Page 3</span>
              <svg className="search__icon">
                <use href="src/img/icons.svg#icon-arrow-right"></use>
              </svg>
            </button>
          </>
        )}
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
