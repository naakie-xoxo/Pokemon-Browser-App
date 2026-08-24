import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, View } from 'react-native';

const TYPE_COLORS = {
  bug: '#8CB230',
  dark: '#58575F',
  dragon: '#0F6AC0',
  electric: '#EED535',
  fairy: '#ED6EC7',
  fighting: '#D04164',
  fire: '#FD7D24',
  flying: '#748FC9',
  ghost: '#556AAE',
  grass: '#62B957',
  ground: '#DD7748',
  ice: '#61CEC0',
  normal: '#9DA0AA',
  poison: '#A552CC',
  psychic: '#EA5D60',
  rock: '#BAAB82',
  steel: '#417D9A',
  water: '#4A90DA',
};

const FALLBACK_TYPE_COLOR = '#6B7280';

function capitalizeName(name) {
  if (!name) {
    return 'Unknown Pokémon';
  }

  return `${name.charAt(0).toUpperCase()}${name.slice(1)}`;
}

function formatPokemonNumber(id) {
  if (!Number.isFinite(Number(id))) {
    return '#---';
  }

  return `#${String(id).padStart(3, '0')}`;
}

function formatMeasurement(value, divisor, unit) {
  const numericValue = Number(value);

  if (!Number.isFinite(numericValue)) {
    return 'Unavailable';
  }

  return `${(numericValue / divisor).toFixed(1)} ${unit}`;
}

function DetailsScreen({ route }) {
  const selectedPokemon = route?.params?.pokemonName || route?.params?.pokemonId || null;
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isActive = true;

    async function fetchPokemonDetails() {
      if (!selectedPokemon) {
        setPokemon(null);
        setError('No Pokémon was selected.');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        setPokemon(null);

        const pokemonKey = encodeURIComponent(String(selectedPokemon).toLowerCase());
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonKey}`);

        if (!response.ok) {
          throw new Error('The Pokémon details request failed.');
        }

        const details = await response.json();

        if (isActive) {
          setPokemon(details);
        }
      } catch {
        if (isActive) {
          setError('Unable to load Pokémon details. Please check your connection and try again.');
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    }

    fetchPokemonDetails();

    return () => {
      isActive = false;
    };
  }, [selectedPokemon]);

  if (loading) {
    return (
      <View style={styles.centeredState}>
        <ActivityIndicator color="#2352B8" size="large" />
        <Text style={styles.loadingText}>Loading Pokémon details...</Text>
      </View>
    );
  }

  if (error || !pokemon) {
    return (
      <View style={styles.centeredState}>
        <Text style={styles.errorText}>{error || 'Pokémon details are unavailable.'}</Text>
      </View>
    );
  }

  const types =
    pokemon.types?.map((typeEntry) => typeEntry.type?.name).filter(Boolean) || [];
  const primaryType = types[0];
  const heroColor = TYPE_COLORS[primaryType] || FALLBACK_TYPE_COLOR;
  const image =
    pokemon.sprites?.other?.['official-artwork']?.front_default ||
    pokemon.sprites?.front_default ||
    null;

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
      style={styles.container}
    >
      <View style={[styles.hero, { backgroundColor: heroColor }]}>
        <View style={styles.heroCircle} />
        {image ? (
          <Image
            accessibilityLabel={`${capitalizeName(pokemon.name)} artwork`}
            resizeMode="contain"
            source={{ uri: image }}
            style={styles.artwork}
          />
        ) : (
          <View accessibilityLabel="Pokémon artwork unavailable" style={styles.imageFallback}>
            <Ionicons color="#FFFFFF" name="image-outline" size={54} />
            <Text style={styles.imageFallbackText}>Image unavailable</Text>
          </View>
        )}
      </View>

      <View style={styles.detailsPanel}>
        <Text style={styles.name}>{capitalizeName(pokemon.name)}</Text>
        <Text style={styles.number}>{formatPokemonNumber(pokemon.id)}</Text>

        <View style={styles.typeRow}>
          {types.length > 0 ? (
            types.map((type) => (
              <View
                key={type}
                style={[styles.typePill, { backgroundColor: TYPE_COLORS[type] || FALLBACK_TYPE_COLOR }]}
              >
                <Text style={styles.typeText}>{capitalizeName(type)}</Text>
              </View>
            ))
          ) : (
            <View style={[styles.typePill, { backgroundColor: FALLBACK_TYPE_COLOR }]}>
              <Text style={styles.typeText}>Unknown type</Text>
            </View>
          )}
        </View>

        <Text style={styles.sectionTitle}>Pokémon information</Text>

        <View style={styles.measurementsRow}>
          <View style={styles.measurementCard}>
            <Text style={styles.measurementLabel}>HEIGHT</Text>
            <Text style={styles.measurementValue}>
              {formatMeasurement(pokemon.height, 10, 'm')}
            </Text>
          </View>

          <View style={styles.measurementCard}>
            <Text style={styles.measurementLabel}>WEIGHT</Text>
            <Text style={styles.measurementValue}>
              {formatMeasurement(pokemon.weight, 10, 'kg')}
            </Text>
          </View>
        </View>

        <View style={styles.typeCard}>
          <Text style={styles.measurementLabel}>TYPE</Text>
          <Text style={styles.typeSummary}>
            {types.length > 0 ? types.map(capitalizeName).join(', ') : 'Unavailable'}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 32,
  },
  hero: {
    minHeight: 360,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  heroCircle: {
    position: 'absolute',
    width: 270,
    height: 270,
    borderRadius: 135,
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
  },
  artwork: {
    width: 280,
    height: 280,
  },
  imageFallback: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageFallbackText: {
    marginTop: 8,
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
  detailsPanel: {
    flex: 1,
    marginTop: -30,
    paddingTop: 36,
    paddingHorizontal: 22,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    backgroundColor: '#FFFFFF',
  },
  name: {
    color: '#111827',
    fontSize: 36,
    fontWeight: '700',
    letterSpacing: -0.6,
  },
  number: {
    marginTop: 2,
    color: '#667085',
    fontSize: 17,
    fontWeight: '600',
  },
  typeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 18,
  },
  typePill: {
    paddingHorizontal: 18,
    paddingVertical: 9,
    borderRadius: 20,
  },
  typeText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  sectionTitle: {
    marginTop: 30,
    marginBottom: 14,
    color: '#344054',
    fontSize: 18,
    fontWeight: '700',
  },
  measurementsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  measurementCard: {
    flex: 1,
    minHeight: 112,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderWidth: 1,
    borderColor: '#E4E7EC',
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
  },
  measurementLabel: {
    color: '#667085',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
  },
  measurementValue: {
    marginTop: 9,
    color: '#111827',
    fontSize: 25,
    fontWeight: '700',
  },
  typeCard: {
    minHeight: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E4E7EC',
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
  },
  typeSummary: {
    marginTop: 9,
    color: '#111827',
    fontSize: 21,
    fontWeight: '700',
    textAlign: 'center',
  },
  centeredState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    backgroundColor: '#FFFFFF',
  },
  loadingText: {
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

export default DetailsScreen;
