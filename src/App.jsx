import React, { useState, useEffect } from 'react';
import './App.css';
import Cards from './componentes/Cards';

function App() {
  const [characters, setCharacters] = useState([]);

  const fetchAllCharacters = async () => {
    try {
      let allCharacters = [];
      let page = 1;
      let hasNextPage = true;

      while (hasNextPage) {
        const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`);
        const data = await response.json();
        allCharacters = [...allCharacters, ...data.results];
        hasNextPage = data.info.next !== null;
        page += 1;
      }
      setCharacters(allCharacters);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  useEffect(() => {
    fetchAllCharacters();
  }, []);

  return (
    <div className='app-container'>
      <h1 className='app-title'>The Rick and Morty API</h1>
      <div className="app-row">
        <div className='character-list d-flex flex-wrap'>
          {characters.map((character) => (
            <div className='character-card' key={character.id}>
              <Cards 
                Foto={character.image}
                Nombre={character.name} 
                Estado={character.status} 
                Especie={character.species} 
                Genero={character.gender} 
                Origen={character.origin.name}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;