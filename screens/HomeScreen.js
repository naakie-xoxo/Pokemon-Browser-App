import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';

import PokemonCard from '../components/PokemonCard';

const POKEMON_LIST_URL = 'https://pokeapi.co/api/v2/pokemon?limit=20';

function capitalizeName(name) {
  if (!name) {
    return 'Unknown Pokémon';
  }

  return `${name.charAt(0).toUpperCase()}${name.slice(1)}`;
}

function HomeScreen() {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    let isMounted = true;

    async function fetchPokemon() {
      try {
        setLoading(true);
        setError(null);

        const listResponse = await fetch(POKEMON_LIST_URL);

        if (!listResponse.ok) {
          throw new Error('The Pokémon list request failed.');
        }

        const listData = await listResponse.json();

        if (!Array.isArray(listData.results)) {
          throw new Error('The Pokémon list response was invalid.');
        }

        const detailedPokemon = await Promise.all(
          listData.results.map(async (pokemonItem) => {
            const detailResponse = await fetch(pokemonItem.url);

            if (!detailResponse.ok) {
              throw new Error(`The request for ${pokemonItem.name} failed.`);
            }

            const details = await detailResponse.json();

            return {
              id: details.id,
              name: details.name,
              image:
                details.sprites?.other?.['official-artwork']?.front_default ||
                details.sprites?.front_default ||
                null,
            };
          }),
        );

        if (isMounted) {
          setPokemon(detailedPokemon);
        }
      } catch {
        if (isMounted) {
          setError('Unable to load Pokémon. Please check your connection and try again.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchPokemon();

    return () => {
      isMounted = false;
    };
  }, []);

  function toggleFavorite(pokemonId) {
    setFavorites((currentFavorites) =>
      currentFavorites.includes(pokemonId)
        ? currentFavorites.filter((id) => id !== pokemonId)
        : [...currentFavorites, pokemonId],
    );
  }

  function renderPokemon({ item }) {
    return (
      <PokemonCard
        image={item.image}
        isFavorite={favorites.includes(item.id)}
        name={capitalizeName(item.name)}
        number={item.id}
        onFavoritePress={() => toggleFavorite(item.id)}
      />
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Pokédex</Text>
        <Text style={styles.subtitle}>Discover Pokémon and save your favourites.</Text>
      </View>

      {loading ? (
        <View style={styles.centeredMessage}>
          <ActivityIndicator color="#2352B8" size="large" />
          <Text style={styles.statusText}>Loading Pokémon...</Text>
        </View>
      ) : error ? (
        <View style={styles.centeredMessage}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : (
        <FlatList
          contentContainerStyle={styles.listContent}
          data={pokemon}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderPokemon}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingTop: 56,
    paddingHorizontal: 20,
    paddingBottom: 18,
  },
  title: {
    color: '#111827',
    fontSize: 34,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  subtitle: {
    marginTop: 6,
    color: '#667085',
    fontSize: 15,
    lineHeight: 22,
  },
  listContent: {
    paddingBottom: 24,
  },
  centeredMessage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    paddingBottom: 80,
  },
  statusText: {
    marginTop: 14,
    color: '#475467',
    fontSize: 16,
  },
  errorText: {
    color: '#B42318',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
  },
});

export default HomeScreen;
