import { Recipe } from "./utils/types";
import { Link, useLocation } from "react-router-dom";

interface BookmarksListProps {
  bookmarkList: Recipe[] | null;
}

const BookmarksList = ({ bookmarkList }: BookmarksListProps) => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  return (
    <>
      <button className="nav__btn nav__btn--bookmarks">
        <svg className="nav__icon">
          <use href="../src/img/icons.svg#icon-bookmark"></use>
        </svg>
        <span>Bookmarks</span>
      </button>
      <div className="bookmarks">
        {bookmarkList && bookmarkList?.length > 0 ? (
          <ul className="bookmarks__list">
            {bookmarkList?.map((recipe) => (
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
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className="message">
            <div>
              <svg>
                <use href="../src/img/icons.svg#icon-smile"></use>
              </svg>
            </div>
            <p>No bookmarks yet. Find a nice recipe and bookmark it</p>
          </div>
        )}
      </div>
    </>
  );
};

export default BookmarksList;
