import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function translateStatus(status) {
  switch (status) {
    case "Alive":
      return "Vivo";
    case "Dead":
      return "Muerto";
    case "unknown":
      return "Desconocido";
    default:
      return status;
  }
}

function translateGender(gender) {
  switch (gender) {
    case "Female":
      return "Femenino";
    case "Male":
      return "Masculino";
    case "Genderless":
      return "Sin Género";
    case "unknown":
      return "Desconocido";
    default:
      return gender;
  }
}

function CharacterDetail() {
  const { id } = useParams();
  const [characterDetails, setCharacterDetails] = useState(null);

  useEffect(() => {
    const fetchCharacterDetails = async () => {
      try {
        const response = await axios.get(
          `https://rickandmortyapi.com/api/character/${id}`
        );
        setCharacterDetails(response.data);
      } catch (error) {
        console.error("Error al obtener detalles del personaje:", error);
      }
    };

    fetchCharacterDetails();
  }, [id]);

  return (
    <div>
      {characterDetails ? (
        <div className="character-detail">
          <img src={characterDetails.image} alt="" />
          <h2>{characterDetails.name}</h2>
          <h3>Estado: {translateStatus(characterDetails.status)}</h3>
          <p>Especie: {characterDetails.species}</p>
          <p>Género: {translateGender(characterDetails.gender)}</p>
          <p>Origen: {characterDetails.origin.name}</p>
          <p>Ubicación actual: {characterDetails.location.name}</p>
        </div>
      ) : (
        <p>Cargando detalles del personaje...</p>
      )}
    </div>
  );
}

export default CharacterDetail;
