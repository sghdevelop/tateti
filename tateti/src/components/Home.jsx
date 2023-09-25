import React, { useState } from "react";
import homeImg from "../assets/home.png";
import CharacterSearch from "./CharacterSearch";
import CharacterDetail from "./CharacterDetail";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2'
import './Home.css';

function Home() {
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (searchTerm) => {
    try {
      const response = await axios.get(
        `https://rickandmortyapi.com/api/character/?name=${searchTerm}`
      );

      if (response.data.results.length === 0) {
        console.log("No se encontraron personajes");
        setSearchResults([]); 
      } else {
        setSearchResults(response.data.results);
        setSelectedCharacter(null);
      }
    } catch (error) {
      console.error("Error al buscar personaje:", error);
      setSearchResults([]); 
      Swal.fire({
        title: 'Error',
        text: 'No se encontraron resultados',
      });
    }
  };

  return (
    <div className="home-container">
      <img src={homeImg} alt="Rick and Morty" className="responsive-image"/>
      <h1>Bienvenido a la Enciclopedia de Personajes de Rick and Morty</h1>
      <CharacterSearch onSearch={handleSearch} />
      {searchResults.length > 0 && (
        <div className="search-results">
          <h2>Resultados de la búsqueda:</h2>
          <ul>
            {searchResults.map((character) => (
              <li key={character.id}>
                <Link to={`/character/${character.id}`}>{character.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}
      {selectedCharacter && <CharacterDetail character={selectedCharacter} />}
    </div>
  );
}

export default Home;