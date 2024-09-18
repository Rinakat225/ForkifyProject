import AddNewRecipeButton from "./AddNewRecipeButton";
import BookmarksList from "./BookmarksList";

const HeaderActionsButtons = () => {
  return (
    <nav className="nav">
      <ul className="nav__list">
        <AddNewRecipeButton />
        <BookmarksList />
      </ul>
    </nav>
  );
};

export default HeaderActionsButtons;
