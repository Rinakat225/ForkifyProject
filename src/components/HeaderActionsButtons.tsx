import AddNewRecipeButton from "./AddNewRecipeButton";
import BookmarksList from "./BookmarksList";
import { Recipe } from "./utils/types";

interface Props {
  bookmarkList: Recipe[] | undefined;
}
const HeaderActionsButtons = ({ bookmarkList }: Props) => {
  return (
    <nav className="nav">
      <ul className="nav__list">
        <li className="nav__item">
          <AddNewRecipeButton />
        </li>
        <li className="nav__item">
          <BookmarksList bookmarkList={bookmarkList} />
        </li>
      </ul>
    </nav>
  );
};

export default HeaderActionsButtons;
