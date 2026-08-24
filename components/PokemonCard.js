import { Ionicons } from '@expo/vector-icons';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

function formatPokemonNumber(number) {
  const parsedNumber = Number.parseInt(String(number).replace('#', ''), 10);

  if (Number.isNaN(parsedNumber)) {
    return '#---';
  }

  return `#${String(parsedNumber).padStart(3, '0')}`;
}

function PokemonCard({
  name,
  image,
  number,
  onPress,
  isFavorite = false,
  onFavoritePress,
}) {
  const imageSource =
    typeof image === 'string' ? (image.trim() ? { uri: image } : null) : image || null;

  function handleFavoritePress(event) {
    event.stopPropagation();
    onFavoritePress?.();
  }

  return (
    <Pressable
      accessibilityLabel={`View details for ${name || 'this Pokémon'}`}
      accessibilityRole={onPress ? 'button' : undefined}
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && onPress ? styles.cardPressed : null]}
    >
      <View style={styles.content}>
        <Text style={styles.number}>{formatPokemonNumber(number)}</Text>
        <Text numberOfLines={1} style={styles.name}>
          {name || 'Unknown Pokémon'}
        </Text>
      </View>

      <View style={styles.imagePanel}>
        {imageSource ? (
          <Image
            accessibilityLabel={`${name || 'Pokémon'} image`}
            resizeMode="contain"
            source={imageSource}
            style={styles.image}
          />
        ) : (
          <View accessibilityLabel="Pokémon image unavailable" style={styles.imageFallback}>
            <Ionicons color="#FFFFFF" name="image-outline" size={36} />
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
            color={isFavorite ? '#E53935' : '#FFFFFF'}
            name={isFavorite ? 'heart' : 'heart-outline'}
            size={25}
          />
        </Pressable>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: 132,
    marginHorizontal: 16,
    marginVertical: 7,
    borderRadius: 22,
    backgroundColor: '#F0F7F0',
    flexDirection: 'row',
    overflow: 'hidden',
  },
  cardPressed: {
    opacity: 0.82,
    transform: [{ scale: 0.99 }],
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 18,
    paddingVertical: 20,
  },
  number: {
    marginBottom: 7,
    color: '#404640',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  name: {
    color: '#101510',
    fontSize: 24,
    fontWeight: '700',
  },
  imagePanel: {
    width: 128,
    minHeight: 132,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 22,
    backgroundColor: '#5DBB59',
  },
  image: {
    width: 104,
    height: 104,
  },
  imageFallback: {
    width: 104,
    height: 104,
    alignItems: 'center',
    justifyContent: 'center',
  },
  favoriteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 38,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    borderRadius: 19,
    backgroundColor: 'rgba(0, 0, 0, 0.08)',
  },
  favoritePressed: {
    opacity: 0.65,
  },
});

export default PokemonCard;
