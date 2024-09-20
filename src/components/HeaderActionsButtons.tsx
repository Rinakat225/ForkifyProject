import AddNewRecipeButton from "./AddNewRecipeButton";
import BookmarksList from "./BookmarksList";
import { Recipe } from "./utils/types";

interface Props {
  bookmarkList: Recipe[] | null;
  setBookmarkList: (recipe: Recipe[] | null) => void;
  setDisplayedRecipe: (recipe: Recipe | null) => void;
}
const HeaderActionsButtons = ({
  bookmarkList,
  setDisplayedRecipe,
  setBookmarkList,
}: Props) => {
  return (
    <nav className="nav">
      <ul className="nav__list">
        <li className="nav__item">
          <AddNewRecipeButton
            setDisplayedRecipe={setDisplayedRecipe}
            setBookmarkList={setBookmarkList}
          />
        </li>
        <li className="nav__item">
          <BookmarksList bookmarkList={bookmarkList} />
        </li>
      </ul>
    </nav>
  );
};

export default HeaderActionsButtons;
