import { Ionicons } from '@expo/vector-icons';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';

function LogoutScreen({ navigation }) {
  function returnToMain() {
    navigation.navigate('Main');
  }

  function handleLogout() {
    Alert.alert(
      'Demo logout',
      'This assignment does not have an authenticated session to end.',
      [{ text: 'Return to Pokédex', onPress: returnToMain }],
    );
  }

  return (
    <View style={styles.container}>
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
        <Text style={styles.heading}>Logout</Text>
      </View>

      <View style={styles.mainContent}>
        <View style={styles.logoutIcon}>
          <Ionicons color="#D92D20" name="log-out-outline" size={68} />
        </View>

        <Text style={styles.title}>Log out of Pokémon Browser?</Text>
        <Text style={styles.description}>
          This is a demonstration screen because the assignment does not use authentication.
        </Text>

        <View style={styles.confirmationCard}>
          <Text style={styles.confirmationText}>Return to the Pokédex when you are ready.</Text>
          <Pressable
            accessibilityRole="button"
            onPress={handleLogout}
            style={({ pressed }) => [styles.logoutButton, pressed && styles.buttonPressed]}
          >
            <Text style={styles.logoutButtonText}>Logout</Text>
          </Pressable>
          <Pressable
            accessibilityRole="button"
            onPress={returnToMain}
            style={({ pressed }) => [styles.cancelButton, pressed && styles.buttonPressed]}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 32,
    backgroundColor: '#FFFFFF',
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
    opacity: 0.65,
  },
  heading: {
    color: '#111827',
    fontSize: 34,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  mainContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 40,
  },
  logoutIcon: {
    width: 150,
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 75,
    backgroundColor: '#FEF3F2',
  },
  title: {
    marginTop: 28,
    color: '#111827',
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
  },
  description: {
    maxWidth: 440,
    marginTop: 12,
    color: '#667085',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
  },
  confirmationCard: {
    width: '100%',
    maxWidth: 480,
    marginTop: 30,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E4E7EC',
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
  },
  confirmationText: {
    marginBottom: 18,
    color: '#344054',
    fontSize: 16,
    lineHeight: 23,
    textAlign: 'center',
  },
  logoutButton: {
    minHeight: 52,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    backgroundColor: '#D92D20',
  },
  logoutButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
  },
  cancelButton: {
    minHeight: 52,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#2352B8',
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
  },
  cancelButtonText: {
    color: '#2352B8',
    fontSize: 17,
    fontWeight: '700',
  },
});

export default LogoutScreen;
