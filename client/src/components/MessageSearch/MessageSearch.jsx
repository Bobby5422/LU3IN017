import React, { useState } from 'react';

function MessageSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [dateDebut, setDateDebut] = useState('');
  const [dateFin, setDateFin] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    // Appeler l'API REST getListMessage avec les filtres (ou filtrer localement)
    // Exemple : api.getListMessage({ keywords: searchTerm, dateDebut, dateFin }).then(...);
  };

  return (
    <form className="search-form" onSubmit={handleSearch}>
      <input 
        type="text" 
        placeholder="Rechercher..." 
        value={searchTerm} 
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <label htmlFor="dateDebut">Début :</label>
      <input 
        type="date" 
        id="dateDebut" 
        value={dateDebut} 
        onChange={(e) => setDateDebut(e.target.value)}
      />
      <label htmlFor="dateFin">Fin :</label>
      <input 
        type="date" 
        id="dateFin" 
        value={dateFin} 
        onChange={(e) => setDateFin(e.target.value)}
      />
      <button type="submit">Rechercher</button>
    </form>
  );
}

export default MessageSearch;
