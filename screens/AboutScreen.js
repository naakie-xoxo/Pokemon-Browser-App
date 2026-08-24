import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

const INFORMATION_CARDS = [
  {
    description: 'Explore up-to-date Pokémon information directly from PokéAPI.',
    icon: 'globe-outline',
    title: 'Live Pokémon Data',
  },
  {
    description: 'Move easily between the Pokémon list, details, and app information.',
    icon: 'navigate-outline',
    title: 'Simple Navigation',
  },
  {
    description: 'A cross-platform mobile experience created with React Native and Expo.',
    icon: 'logo-react',
    title: 'Built with React Native',
  },
];

function AboutScreen() {
  return (
    <ScrollView
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
      style={styles.container}
    >
      <Text style={styles.heading}>About Pokédex</Text>

      <View style={styles.heroIcon}>
        <MaterialCommunityIcons color="#2352B8" name="pokeball" size={82} />
      </View>

      <Text style={styles.title}>Pokémon Browser</Text>
      <Text style={styles.subtitle}>Explore Pokémon with live data.</Text>
      <Text style={styles.description}>
        Browse Pokémon, save favourites, and view details fetched from PokéAPI.
      </Text>

      <View style={styles.cards}>
        {INFORMATION_CARDS.map((card) => (
          <View key={card.title} style={styles.card}>
            <View style={styles.cardIcon}>
              <Ionicons color="#2352B8" name={card.icon} size={30} />
            </View>
            <View style={styles.cardCopy}>
              <Text style={styles.cardTitle}>{card.title}</Text>
              <Text style={styles.cardDescription}>{card.description}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.footer}>
        <Text style={styles.assignment}>DCIT 324 • Assignment 4</Text>
        <Text style={styles.credit}>Data provided by PokéAPI</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    paddingTop: 56,
    paddingHorizontal: 20,
    paddingBottom: 36,
  },
  heading: {
    color: '#111827',
    fontSize: 34,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  heroIcon: {
    width: 142,
    height: 142,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 34,
    borderRadius: 71,
    backgroundColor: '#EFF6FF',
  },
  title: {
    marginTop: 26,
    color: '#111827',
    fontSize: 32,
    fontWeight: '700',
    letterSpacing: -0.5,
    textAlign: 'center',
  },
  subtitle: {
    marginTop: 8,
    color: '#475467',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  description: {
    alignSelf: 'center',
    maxWidth: 430,
    marginTop: 22,
    color: '#667085',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
  },
  cards: {
    gap: 14,
    marginTop: 30,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
    borderWidth: 1,
    borderColor: '#E4E7EC',
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
  },
  cardIcon: {
    width: 58,
    height: 58,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 29,
    backgroundColor: '#EFF6FF',
  },
  cardCopy: {
    flex: 1,
    marginLeft: 16,
  },
  cardTitle: {
    color: '#111827',
    fontSize: 18,
    fontWeight: '700',
  },
  cardDescription: {
    marginTop: 5,
    color: '#667085',
    fontSize: 14,
    lineHeight: 21,
  },
  footer: {
    alignItems: 'center',
    marginTop: 32,
  },
  assignment: {
    color: '#2352B8',
    fontSize: 16,
    fontWeight: '700',
  },
  credit: {
    marginTop: 8,
    color: '#667085',
    fontSize: 14,
  },
});

export default AboutScreen;
