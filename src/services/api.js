export const fetchAllPokemon = async () => {
    try {
      const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150');
      const data = await res.json();
  
      const detailedData = await Promise.all(
        data.results.map(async (pokemon) => {
          const res = await fetch(pokemon.url);
          return await res.json();
        })
      );
  
      return detailedData;
    } catch (err) {
      console.error('Failed to fetch Pokémon:', err);
      return [];
    }
  };
  