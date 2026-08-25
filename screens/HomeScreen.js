import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import PokemonCard from '../components/PokemonCard';

const POKEMON_LIST_URL = 'https://pokeapi.co/api/v2/pokemon?limit=20';
const POKEDEX_RED = '#E3350D';

const TYPE_COLORS = {
  normal: '#9DA0AA',
  fire: '#FF9C54',
  water: '#4D90D5',
  electric: '#F4D23C',
  grass: '#63BC5A',
  ice: '#73CEC0',
  fighting: '#CE416B',
  poison: '#AA6BC8',
  ground: '#D97845',
  flying: '#89AAE3',
  psychic: '#FA7179',
  bug: '#91C12F',
  rock: '#C5B78C',
  ghost: '#5269AD',
  dragon: '#0B6DC3',
  dark: '#5A5465',
  steel: '#5A8EA2',
  fairy: '#EC8FE6',
};

const TYPE_ICONS = {
  normal: 'ellipse-outline',
  fire: 'flame',
  water: 'water',
  electric: 'flash',
  grass: 'leaf',
  ice: 'snow',
  fighting: 'fitness',
  poison: 'flask',
  ground: 'layers',
  flying: 'airplane',
  psychic: 'eye',
  bug: 'bug',
  rock: 'diamond',
  ghost: 'skull',
  dragon: 'flame',
  dark: 'moon',
  steel: 'hardware-chip',
  fairy: 'sparkles',
};

const TYPE_OPTIONS = [
  'all',
  'normal',
  'fire',
  'water',
  'electric',
  'grass',
  'ice',
  'fighting',
  'poison',
  'ground',
  'flying',
  'psychic',
  'bug',
  'rock',
  'ghost',
  'dragon',
  'dark',
  'steel',
  'fairy',
];

function capitalizeName(name) {
  if (!name) {
    return 'Unknown Pokémon';
  }

  return `${name.charAt(0).toUpperCase()}${name.slice(1)}`;
}

function SelectionModal({ children, onClose, title, visible }) {
  return (
    <Modal animationType="fade" onRequestClose={onClose} transparent visible={visible}>
      <Pressable accessibilityRole="button" onPress={onClose} style={styles.modalBackdrop}>
        <Pressable onPress={(event) => event.stopPropagation()} style={styles.modalPanel}>
          <View style={styles.modalHandle} />
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{title}</Text>
            <Pressable
              accessibilityLabel="Close selector"
              accessibilityRole="button"
              hitSlop={8}
              onPress={onClose}
              style={styles.modalCloseButton}
            >
              <Ionicons color="#111111" name="close" size={24} />
            </Pressable>
          </View>
          {children}
        </Pressable>
      </Pressable>
    </Modal>
  );
}

function HomeScreen({ navigation }) {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [sortOrder, setSortOrder] = useState('ascending');
  const [typeModalVisible, setTypeModalVisible] = useState(false);
  const [sortModalVisible, setSortModalVisible] = useState(false);

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
            const types =
              details.types?.map((entry) => entry.type?.name).filter(Boolean) || [];

            return {
              id: details.id,
              name: details.name,
              image:
                details.sprites?.front_default ||
                details.sprites?.other?.['official-artwork']?.front_default ||
                null,
              types,
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

  function openDrawer() {
    navigation.getParent('RootDrawer')?.openDrawer();
  }

  function selectType(type) {
    setSelectedType(type);
    setTypeModalVisible(false);
  }

  function selectSortOrder(order) {
    setSortOrder(order);
    setSortModalVisible(false);
  }

  function renderPokemon({ item }) {
    return (
      <PokemonCard
        image={item.image}
        isFavorite={favorites.includes(item.id)}
        name={capitalizeName(item.name)}
        number={item.id}
        onFavoritePress={() => toggleFavorite(item.id)}
        onPress={() => navigation.navigate('Details', { pokemonName: item.name })}
        types={item.types}
      />
    );
  }

  const normalizedSearch = searchQuery.trim().toLowerCase();
  const visiblePokemon = pokemon
    .filter((item) => item.name.toLowerCase().includes(normalizedSearch))
    .filter((item) => selectedType === 'all' || item.types.includes(selectedType))
    .sort((firstPokemon, secondPokemon) =>
      sortOrder === 'ascending'
        ? firstPokemon.id - secondPokemon.id
        : secondPokemon.id - firstPokemon.id,
    );

  const selectedTypeLabel = selectedType === 'all' ? 'All types' : capitalizeName(selectedType);
  const selectedSortLabel = sortOrder === 'ascending' ? 'Lowest number' : 'Highest number';

  return (
    <View style={styles.container}>
      <View style={styles.topArea}>
        <View style={styles.searchRow}>
          <Pressable
            accessibilityLabel="Open navigation menu"
            accessibilityRole="button"
            hitSlop={8}
            onPress={openDrawer}
            style={({ pressed }) => [styles.menuButton, pressed && styles.buttonPressed]}
          >
            <Ionicons color="#111111" name="menu" size={27} />
          </Pressable>

          <View style={styles.searchBar}>
            <Ionicons color="#7A7A7A" name="search" size={21} />
            <TextInput
              accessibilityLabel="Search Pokémon"
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={setSearchQuery}
              placeholder="Search Pokémon..."
              placeholderTextColor="#9A9A9A"
              returnKeyType="search"
              style={styles.searchInput}
              value={searchQuery}
            />
            {searchQuery ? (
              <Pressable
                accessibilityLabel="Clear Pokémon search"
                accessibilityRole="button"
                hitSlop={8}
                onPress={() => setSearchQuery('')}
              >
                <Ionicons color="#7A7A7A" name="close-circle" size={20} />
              </Pressable>
            ) : null}
          </View>
        </View>

        <View style={styles.controlsRow}>
          <Pressable
            accessibilityLabel={`Filter by type. Current selection: ${selectedTypeLabel}`}
            accessibilityRole="button"
            onPress={() => setTypeModalVisible(true)}
            style={({ pressed }) => [styles.controlPill, pressed && styles.buttonPressed]}
          >
            <Text numberOfLines={1} style={styles.controlText}>
              {selectedTypeLabel}
            </Text>
            <Ionicons color="#FFFFFF" name="chevron-down" size={17} />
          </Pressable>

          <Pressable
            accessibilityLabel={`Sort Pokémon. Current selection: ${selectedSortLabel}`}
            accessibilityRole="button"
            onPress={() => setSortModalVisible(true)}
            style={({ pressed }) => [styles.controlPill, pressed && styles.buttonPressed]}
          >
            <Text numberOfLines={1} style={styles.controlText}>
              {selectedSortLabel}
            </Text>
            <Ionicons color="#FFFFFF" name="chevron-down" size={17} />
          </Pressable>
        </View>
      </View>

      {loading ? (
        <View style={styles.centeredMessage}>
          <ActivityIndicator color={POKEDEX_RED} size="large" />
          <Text style={styles.statusText}>Loading Pokémon...</Text>
        </View>
      ) : error ? (
        <View style={styles.centeredMessage}>
          <Ionicons color={POKEDEX_RED} name="alert-circle-outline" size={34} />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : (
        <FlatList
          contentContainerStyle={styles.listContent}
          data={visiblePokemon}
          keyboardShouldPersistTaps="handled"
          keyExtractor={(item) => String(item.id)}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Ionicons color="#A0A0A0" name="search-outline" size={34} />
              <Text style={styles.emptyTitle}>No Pokémon found</Text>
              <Text style={styles.emptyText}>Try another name or type.</Text>
            </View>
          }
          renderItem={renderPokemon}
          showsVerticalScrollIndicator={false}
        />
      )}

      <SelectionModal
        onClose={() => setTypeModalVisible(false)}
        title="Select a type"
        visible={typeModalVisible}
      >
        <ScrollView contentContainerStyle={styles.typeOptions} showsVerticalScrollIndicator={false}>
          {TYPE_OPTIONS.map((type) => {
            const isSelected = type === selectedType;
            const optionColor = type === 'all' ? '#252525' : TYPE_COLORS[type];

            return (
              <Pressable
                accessibilityRole="button"
                key={type}
                onPress={() => selectType(type)}
                style={({ pressed }) => [
                  styles.typeOption,
                  { backgroundColor: optionColor },
                  isSelected && styles.selectedOption,
                  pressed && styles.buttonPressed,
                ]}
              >
                {type === 'all' ? (
                  <Ionicons color="#FFFFFF" name="apps" size={17} />
                ) : (
                  <Ionicons color="#FFFFFF" name={TYPE_ICONS[type]} size={17} />
                )}
                <Text style={styles.typeOptionText}>
                  {type === 'all' ? 'All types' : capitalizeName(type)}
                </Text>
                {isSelected ? <Ionicons color="#FFFFFF" name="checkmark" size={17} /> : null}
              </Pressable>
            );
          })}
        </ScrollView>
      </SelectionModal>

      <SelectionModal
        onClose={() => setSortModalVisible(false)}
        title="Sort Pokémon"
        visible={sortModalVisible}
      >
        <View style={styles.sortOptions}>
          {[
            { label: 'Lowest number', value: 'ascending' },
            { label: 'Highest number', value: 'descending' },
          ].map((option) => {
            const isSelected = option.value === sortOrder;

            return (
              <Pressable
                accessibilityRole="button"
                key={option.value}
                onPress={() => selectSortOrder(option.value)}
                style={({ pressed }) => [
                  styles.sortOption,
                  isSelected && styles.sortOptionSelected,
                  pressed && styles.buttonPressed,
                ]}
              >
                <Ionicons
                  color={isSelected ? '#FFFFFF' : '#222222'}
                  name={option.value === 'ascending' ? 'arrow-up' : 'arrow-down'}
                  size={20}
                />
                <Text style={[styles.sortOptionText, isSelected && styles.sortOptionTextSelected]}>
                  {option.label}
                </Text>
                {isSelected ? <Ionicons color="#FFFFFF" name="checkmark-circle" size={21} /> : null}
              </Pressable>
            );
          })}
        </View>
      </SelectionModal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  topArea: {
    paddingTop: 54,
    paddingHorizontal: 16,
    paddingBottom: 12,
    backgroundColor: '#FFFFFF',
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
  },
  searchBar: {
    flex: 1,
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#D8D8D8',
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
  },
  searchInput: {
    flex: 1,
    height: '100%',
    marginLeft: 9,
    paddingVertical: 0,
    color: '#161616',
    fontSize: 15,
  },
  controlsRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 14,
  },
  controlPill: {
    flex: 1,
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderRadius: 22,
    backgroundColor: '#252525',
  },
  controlText: {
    flexShrink: 1,
    marginRight: 6,
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  buttonPressed: {
    opacity: 0.68,
  },
  listContent: {
    paddingTop: 2,
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
  emptyState: {
    alignItems: 'center',
    paddingTop: 72,
    paddingHorizontal: 30,
  },
  emptyTitle: {
    marginTop: 10,
    color: '#222222',
    fontSize: 18,
    fontWeight: '700',
  },
  emptyText: {
    marginTop: 4,
    color: '#777777',
    fontSize: 14,
  },
  modalBackdrop: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.46)',
  },
  modalPanel: {
    maxHeight: '78%',
    paddingTop: 10,
    paddingHorizontal: 20,
    paddingBottom: 30,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    backgroundColor: '#FFFFFF',
  },
  modalHandle: {
    width: 42,
    height: 5,
    alignSelf: 'center',
    borderRadius: 3,
    backgroundColor: '#D5D5D5',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
    marginBottom: 18,
  },
  modalTitle: {
    color: '#111111',
    fontSize: 22,
    fontWeight: '800',
  },
  modalCloseButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
    backgroundColor: '#F2F2F2',
  },
  typeOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    paddingBottom: 8,
  },
  typeOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    paddingHorizontal: 13,
    paddingVertical: 10,
    borderWidth: 2,
    borderColor: 'transparent',
    borderRadius: 22,
  },
  selectedOption: {
    borderColor: '#111111',
  },
  typeOptionText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  sortOptions: {
    gap: 12,
  },
  sortOption: {
    minHeight: 58,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: '#E1E1E1',
    borderRadius: 18,
    backgroundColor: '#F7F7F7',
  },
  sortOptionSelected: {
    borderColor: POKEDEX_RED,
    backgroundColor: POKEDEX_RED,
  },
  sortOptionText: {
    flex: 1,
    marginLeft: 12,
    color: '#222222',
    fontSize: 15,
    fontWeight: '700',
  },
  sortOptionTextSelected: {
    color: '#FFFFFF',
  },
});

export default HomeScreen;
