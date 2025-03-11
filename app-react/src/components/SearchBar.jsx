function SearchBar() {
    return (
      <div className="search">
        <form>
          <input type="text" placeholder="Rechercher..." name="search" />
          <label htmlFor="start-date">Début :</label>
          <input type="date" id="start-date" name="start-date" />
          <label htmlFor="end-date">Fin :</label>
          <input type="date" id="end-date" name="end-date" />
          <button type="submit">Rechercher</button>
        </form>
      </div>
    );
  }

export default SearchBar;