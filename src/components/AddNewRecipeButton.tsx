const AddNewRecipeButton = () => {
  return (
    <button className="nav__btn nav__btn--add-recipe">
      <svg className="nav__icon">
        <use href="../src/img/icons.svg#icon-edit"></use>
      </svg>
      <span>Add recipe</span>
    </button>
  );
};

export default AddNewRecipeButton;
