import React, { useEffect, useState } from 'react';
import { fetchAllPokemon } from '../services/api';
import PokemonCard from '../components/PokemonCard';
import SearchBar from '../components/SearchBar';
import FilterDropdown from '../components/FilterDropdown';
import Loader from '../components/Loader';

const Home = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchAllPokemon();
      setPokemonList(data);
      setFilteredList(data);
      setLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filtered = pokemonList.filter((pokemon) => {
      const matchesSearch = pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType =
        selectedType === '' ||
        pokemon.types.some((t) => t.type.name === selectedType);
      return matchesSearch && matchesType;
    });

    setFilteredList(filtered);
  }, [searchTerm, selectedType, pokemonList]);

  return (
    <main className="container">
      <div className="controls">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <FilterDropdown selectedType={selectedType} setSelectedType={setSelectedType} />
      </div>

      {loading ? (
        <Loader />
      ) : filteredList.length === 0 ? (
        <p className="no-results">No Pokémon found.</p>
      ) : (
        <div className="card-grid">
          {filteredList.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>
      )}
    </main>
  );
};

export default Home;
