import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, View } from 'react-native';

const TYPE_STYLES = {
  normal: { color: '#9DA0AA', icon: 'ellipse-outline' },
  fire: { color: '#FF9C54', icon: 'flame' },
  water: { color: '#4D90D5', icon: 'water' },
  electric: { color: '#F4D23C', icon: 'flash' },
  grass: { color: '#63BC5A', icon: 'leaf' },
  ice: { color: '#73CEC0', icon: 'snow' },
  fighting: { color: '#CE416B', icon: 'fitness' },
  poison: { color: '#AA6BC8', icon: 'flask' },
  ground: { color: '#D97845', icon: 'layers' },
  flying: { color: '#89AAE3', icon: 'airplane' },
  psychic: { color: '#FA7179', icon: 'eye' },
  bug: { color: '#91C12F', icon: 'bug' },
  rock: { color: '#C5B78C', icon: 'diamond' },
  ghost: { color: '#5269AD', icon: 'skull' },
  dragon: { color: '#0B6DC3', icon: 'flame' },
  dark: { color: '#5A5465', icon: 'moon' },
  steel: { color: '#5A8EA2', icon: 'hardware-chip' },
  fairy: { color: '#EC8FE6', icon: 'sparkles' },
};

const FALLBACK_TYPE_STYLE = { color: '#7A7A7A', icon: 'help-circle-outline' };
const POKEDEX_RED = '#E3350D';

function capitalizeName(name) {
  if (!name) {
    return 'Unknown Pokémon';
  }

  return `${name.charAt(0).toUpperCase()}${name.slice(1)}`;
}

function formatPokemonNumber(id) {
  if (!Number.isFinite(Number(id))) {
    return 'Nº---';
  }

  return `Nº${String(id).padStart(3, '0')}`;
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
        <ActivityIndicator color={POKEDEX_RED} size="large" />
        <Text style={styles.loadingText}>Loading Pokémon details...</Text>
      </View>
    );
  }

  if (error || !pokemon) {
    return (
      <View style={styles.centeredState}>
        <Ionicons color={POKEDEX_RED} name="alert-circle-outline" size={38} />
        <Text style={styles.errorText}>{error || 'Pokémon details are unavailable.'}</Text>
      </View>
    );
  }

  const types = pokemon.types?.map((entry) => entry.type?.name).filter(Boolean) || [];
  const primaryType = types?.[0] || 'normal';
  const primaryTypeStyle = TYPE_STYLES[primaryType] || FALLBACK_TYPE_STYLE;
  const image =
    pokemon.sprites?.versions?.['generation-v']?.['black-white']?.animated?.front_default ||
    pokemon.sprites?.front_default ||
    pokemon.sprites?.other?.['official-artwork']?.front_default ||
    null;

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
      style={styles.container}
    >
      <View style={[styles.hero, { backgroundColor: primaryTypeStyle.color }]}>
        <Ionicons
          color="rgba(255, 255, 255, 0.25)"
          name={primaryTypeStyle.icon}
          size={244}
          style={styles.heroTypeSymbol}
        />
        {image ? (
          <Image
            accessibilityLabel={`${capitalizeName(pokemon.name)} sprite`}
            resizeMode="contain"
            source={{ uri: image }}
            style={styles.artwork}
          />
        ) : (
          <View accessibilityLabel="Pokémon image unavailable" style={styles.imageFallback}>
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
            types.map((type) => {
              const typeStyle = TYPE_STYLES[type] || FALLBACK_TYPE_STYLE;

              return (
                <View key={type} style={[styles.typePill, { backgroundColor: typeStyle.color }]}>
                  <View style={styles.typeIconCircle}>
                    <Ionicons color={typeStyle.color} name={typeStyle.icon} size={14} />
                  </View>
                  <Text style={styles.typeText}>{capitalizeName(type)}</Text>
                </View>
              );
            })
          ) : (
            <View style={[styles.typePill, { backgroundColor: FALLBACK_TYPE_STYLE.color }]}>
              <Text style={styles.typeText}>Unknown type</Text>
            </View>
          )}
        </View>

        <Text style={styles.sectionTitle}>Pokémon information</Text>

        <View style={styles.measurementsRow}>
          <View style={styles.measurementCard}>
            <View style={[styles.measurementIcon, { backgroundColor: primaryTypeStyle.color }]}>
              <Ionicons color="#FFFFFF" name="resize-outline" size={22} />
            </View>
            <Text style={styles.measurementLabel}>HEIGHT</Text>
            <Text style={styles.measurementValue}>
              {formatMeasurement(pokemon.height, 10, 'm')}
            </Text>
          </View>

          <View style={styles.measurementCard}>
            <View style={[styles.measurementIcon, { backgroundColor: primaryTypeStyle.color }]}>
              <Ionicons color="#FFFFFF" name="scale-outline" size={22} />
            </View>
            <Text style={styles.measurementLabel}>WEIGHT</Text>
            <Text style={styles.measurementValue}>
              {formatMeasurement(pokemon.weight, 10, 'kg')}
            </Text>
          </View>
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
    paddingBottom: 28,
  },
  hero: {
    minHeight: 330,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  heroTypeSymbol: {
    position: 'absolute',
    top: 38,
  },
  artwork: {
    width: 238,
    height: 238,
    marginTop: 20,
  },
  imageFallback: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageFallbackText: {
    marginTop: 8,
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  detailsPanel: {
    flex: 1,
    marginTop: -36,
    paddingTop: 34,
    paddingHorizontal: 22,
    paddingBottom: 30,
    borderTopLeftRadius: 34,
    borderTopRightRadius: 34,
    backgroundColor: '#FFFFFF',
  },
  name: {
    color: '#111111',
    fontSize: 34,
    fontWeight: '800',
    letterSpacing: -0.7,
  },
  number: {
    marginTop: 2,
    color: '#666666',
    fontSize: 14,
    fontWeight: '700',
  },
  typeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 16,
  },
  typePill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 5,
    paddingRight: 12,
    paddingVertical: 5,
    borderRadius: 18,
  },
  typeIconCircle: {
    width: 23,
    height: 23,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
  },
  typeText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },
  sectionTitle: {
    marginTop: 28,
    marginBottom: 13,
    color: '#242424',
    fontSize: 17,
    fontWeight: '800',
  },
  measurementsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  measurementCard: {
    flex: 1,
    minHeight: 132,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
    borderWidth: 1,
    borderColor: '#E7E7E7',
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
  },
  measurementIcon: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    borderRadius: 20,
  },
  measurementLabel: {
    color: '#767676',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.9,
  },
  measurementValue: {
    marginTop: 5,
    color: '#111111',
    fontSize: 22,
    fontWeight: '800',
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
    color: '#535353',
    fontSize: 15,
  },
  errorText: {
    marginTop: 10,
    color: '#B42318',
    fontSize: 15,
    lineHeight: 23,
    textAlign: 'center',
  },
});

export default DetailsScreen;
