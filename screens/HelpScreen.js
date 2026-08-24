import { Ionicons } from '@expo/vector-icons';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

const FAQS = [
  {
    answer: 'The Home screen requests the first 20 Pokémon and their details from PokéAPI.',
    question: 'How is Pokémon data loaded?',
  },
  {
    answer: 'Check your internet connection and try opening the app again if a request fails.',
    question: 'Why might Pokémon fail to load?',
  },
  {
    answer: 'Tap a heart to save or remove a favourite during the current app session.',
    question: 'How do favourites work?',
  },
  {
    answer: 'Tap the body of any Pokémon card to open its live details screen.',
    question: 'How do I view Pokémon details?',
  },
];

function HelpScreen({ navigation }) {
  return (
    <ScrollView
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
      style={styles.container}
    >
      <View style={styles.header}>
        <Pressable
          accessibilityLabel="Open navigation menu"
          accessibilityRole="button"
          hitSlop={10}
          onPress={() => navigation.openDrawer()}
          style={({ pressed }) => [styles.menuButton, pressed && styles.buttonPressed]}
        >
          <Ionicons color="#111827" name="menu" size={30} />
        </Pressable>
        <Text style={styles.heading}>Help & Support</Text>
      </View>

      <View style={styles.hero}>
        <View style={styles.heroIcon}>
          <Ionicons color="#2352B8" name="help-circle-outline" size={66} />
        </View>
        <Text style={styles.heroTitle}>How can we help?</Text>
        <Text style={styles.heroText}>Find quick answers about the Pokémon Browser.</Text>
      </View>

      <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
      <View style={styles.faqList}>
        {FAQS.map((faq) => (
          <View key={faq.question} style={styles.faqCard}>
            <View style={styles.questionRow}>
              <Ionicons color="#2352B8" name="help-circle-outline" size={23} />
              <Text style={styles.question}>{faq.question}</Text>
            </View>
            <Text style={styles.answer}>{faq.answer}</Text>
          </View>
        ))}
      </View>

      <View style={styles.supportNote}>
        <Ionicons color="#2352B8" name="information-circle-outline" size={25} />
        <Text style={styles.supportText}>
          This assignment demonstration does not connect to email, chat, or a support service.
        </Text>
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
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 36,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    borderRadius: 22,
    backgroundColor: '#F2F4F7',
  },
  buttonPressed: {
    opacity: 0.6,
  },
  heading: {
    flex: 1,
    color: '#111827',
    fontSize: 31,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  hero: {
    alignItems: 'center',
    marginTop: 30,
    paddingHorizontal: 18,
    paddingVertical: 32,
    borderWidth: 1,
    borderColor: '#D6E4FF',
    borderRadius: 22,
    backgroundColor: '#EFF6FF',
  },
  heroIcon: {
    width: 102,
    height: 102,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 51,
    backgroundColor: '#DBEAFE',
  },
  heroTitle: {
    marginTop: 20,
    color: '#111827',
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
  },
  heroText: {
    marginTop: 8,
    color: '#667085',
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
  },
  sectionTitle: {
    marginTop: 32,
    marginBottom: 14,
    color: '#111827',
    fontSize: 22,
    fontWeight: '700',
  },
  faqList: {
    gap: 12,
  },
  faqCard: {
    padding: 18,
    borderWidth: 1,
    borderColor: '#E4E7EC',
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
  },
  questionRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  question: {
    flex: 1,
    marginLeft: 10,
    color: '#111827',
    fontSize: 16,
    fontWeight: '700',
  },
  answer: {
    marginTop: 10,
    color: '#667085',
    fontSize: 14,
    lineHeight: 21,
  },
  supportNote: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 22,
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#F2F4F7',
  },
  supportText: {
    flex: 1,
    marginLeft: 12,
    color: '#475467',
    fontSize: 14,
    lineHeight: 21,
  },
});

export default HelpScreen;
