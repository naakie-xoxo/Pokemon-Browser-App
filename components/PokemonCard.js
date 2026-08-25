import { Ionicons } from '@expo/vector-icons';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

const TYPE_STYLES = {
  normal: { background: '#F1F1F1', color: '#9DA0AA', icon: 'ellipse-outline' },
  fire: { background: '#FFF0E5', color: '#FF9C54', icon: 'flame' },
  water: { background: '#EAF3FC', color: '#4D90D5', icon: 'water' },
  electric: { background: '#FFF8D7', color: '#F4D23C', icon: 'flash' },
  grass: { background: '#EDF8EB', color: '#63BC5A', icon: 'leaf' },
  ice: { background: '#EAF9F7', color: '#73CEC0', icon: 'snow' },
  fighting: { background: '#FBEAF0', color: '#CE416B', icon: 'fitness' },
  poison: { background: '#F5ECF8', color: '#AA6BC8', icon: 'flask' },
  ground: { background: '#F9EDE7', color: '#D97845', icon: 'layers' },
  flying: { background: '#EEF3FB', color: '#89AAE3', icon: 'airplane' },
  psychic: { background: '#FEEBED', color: '#FA7179', icon: 'eye' },
  bug: { background: '#F1F8E5', color: '#91C12F', icon: 'bug' },
  rock: { background: '#F7F3E8', color: '#C5B78C', icon: 'diamond' },
  ghost: { background: '#ECEEF7', color: '#5269AD', icon: 'skull' },
  dragon: { background: '#E7F1FA', color: '#0B6DC3', icon: 'flame' },
  dark: { background: '#EFEDF1', color: '#5A5465', icon: 'moon' },
  steel: { background: '#EAF1F3', color: '#5A8EA2', icon: 'hardware-chip' },
  fairy: { background: '#FCEFFA', color: '#EC8FE6', icon: 'sparkles' },
};

const FALLBACK_TYPE_STYLE = TYPE_STYLES.normal;

function formatPokemonNumber(number) {
  const parsedNumber = Number.parseInt(String(number).replace(/[^0-9]/g, ''), 10);

  if (Number.isNaN(parsedNumber)) {
    return 'Nº---';
  }

  return `Nº${String(parsedNumber).padStart(3, '0')}`;
}

function capitalizeName(name) {
  if (!name) {
    return 'Unknown';
  }

  return `${name.charAt(0).toUpperCase()}${name.slice(1)}`;
}

function PokemonCard({
  name,
  image,
  number,
  types,
  onPress,
  isFavorite = false,
  onFavoritePress,
}) {
  const imageSource =
    typeof image === 'string' ? (image.trim() ? { uri: image } : null) : image || null;
  const primaryType = types?.[0] || 'normal';
  const primaryTypeStyle = TYPE_STYLES[primaryType] || FALLBACK_TYPE_STYLE;
  const displayedTypes = Array.isArray(types) && types.length > 0 ? types : ['normal'];

  function handleFavoritePress(event) {
    event.stopPropagation();
    onFavoritePress?.();
  }

  return (
    <Pressable
      accessibilityLabel={`View details for ${name || 'this Pokémon'}`}
      accessibilityRole={onPress ? 'button' : undefined}
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        { backgroundColor: primaryTypeStyle.background },
        pressed && onPress ? styles.cardPressed : null,
      ]}
    >
      <View style={styles.content}>
        <Text style={styles.number}>{formatPokemonNumber(number)}</Text>
        <Text numberOfLines={1} style={styles.name}>
          {name || 'Unknown Pokémon'}
        </Text>

        <View style={styles.typesRow}>
          {displayedTypes.map((type) => {
            const typeStyle = TYPE_STYLES[type] || FALLBACK_TYPE_STYLE;

            return (
              <View key={type} style={[styles.typePill, { backgroundColor: typeStyle.color }]}>
                <View style={styles.typeIconCircle}>
                  <Ionicons color={typeStyle.color} name={typeStyle.icon} size={12} />
                </View>
                <Text style={styles.typeText}>{capitalizeName(type)}</Text>
              </View>
            );
          })}
        </View>
      </View>

      <View style={[styles.imagePanel, { backgroundColor: primaryTypeStyle.color }]}>
        <Ionicons
          color="rgba(255, 255, 255, 0.24)"
          name={primaryTypeStyle.icon}
          size={94}
          style={styles.typeWatermark}
        />

        {imageSource ? (
          <Image
            accessibilityLabel={`${name || 'Pokémon'} image`}
            resizeMode="contain"
            source={imageSource}
            style={styles.image}
          />
        ) : (
          <View accessibilityLabel="Pokémon image unavailable" style={styles.imageFallback}>
            <Ionicons color="#FFFFFF" name="image-outline" size={34} />
          </View>
        )}

        <Pressable
          accessibilityLabel={`${isFavorite ? 'Remove' : 'Add'} ${name || 'Pokémon'} ${
            isFavorite ? 'from' : 'to'
          } favourites`}
          accessibilityRole="button"
          disabled={!onFavoritePress}
          hitSlop={8}
          onPress={handleFavoritePress}
          style={({ pressed }) => [styles.favoriteButton, pressed && styles.favoritePressed]}
        >
          <Ionicons
            color="#FFFFFF"
            name={isFavorite ? 'heart' : 'heart-outline'}
            size={22}
          />
        </Pressable>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: 126,
    flexDirection: 'row',
    marginHorizontal: 16,
    marginVertical: 6,
    borderRadius: 20,
    overflow: 'hidden',
  },
  cardPressed: {
    opacity: 0.82,
    transform: [{ scale: 0.99 }],
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 17,
    paddingRight: 10,
    paddingVertical: 15,
  },
  number: {
    marginBottom: 3,
    color: '#3E3E3E',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  name: {
    color: '#111111',
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: -0.3,
  },
  typesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 10,
  },
  typePill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 4,
    paddingRight: 9,
    paddingVertical: 4,
    borderRadius: 14,
  },
  typeIconCircle: {
    width: 19,
    height: 19,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 4,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
  },
  typeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
  },
  imagePanel: {
    width: 126,
    minHeight: 126,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    overflow: 'hidden',
  },
  typeWatermark: {
    position: 'absolute',
    left: 17,
    bottom: 12,
  },
  image: {
    width: 92,
    height: 92,
    marginTop: 10,
  },
  imageFallback: {
    width: 92,
    height: 92,
    alignItems: 'center',
    justifyContent: 'center',
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 35,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    borderRadius: 18,
    backgroundColor: 'rgba(0, 0, 0, 0.06)',
  },
  favoritePressed: {
    opacity: 0.62,
  },
});

export default PokemonCard;
