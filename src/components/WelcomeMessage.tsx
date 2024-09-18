const WelcomeMessage = () => {
  return (
    <div className="message">
      <div>
        <svg>
          <use href="../src/img/icons.svg#icon-smile"></use>
        </svg>
      </div>
      <p>Start by searching for a recipe or an ingredient. Have fun!</p>
    </div>
  );
};

export default WelcomeMessage;
