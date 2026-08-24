import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';

function SettingRow({ description, icon, label, onValueChange, value }) {
  return (
    <View style={styles.settingRow}>
      <View style={styles.settingIcon}>
        <Ionicons color="#2352B8" name={icon} size={24} />
      </View>
      <View style={styles.settingCopy}>
        <Text style={styles.settingLabel}>{label}</Text>
        <Text style={styles.settingDescription}>{description}</Text>
      </View>
      <Switch
        accessibilityLabel={label}
        onValueChange={onValueChange}
        thumbColor="#FFFFFF"
        trackColor={{ false: '#D0D5DD', true: '#2352B8' }}
        value={value}
      />
    </View>
  );
}

function SettingsScreen({ navigation }) {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

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
        <Text style={styles.heading}>Settings</Text>
      </View>

      <Text style={styles.introduction}>
        Choose simple preferences for this demonstration. Settings are kept only while the app is
        open.
      </Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        <View style={styles.settingsCard}>
          <SettingRow
            description="Receive demonstration app notifications."
            icon="notifications-outline"
            label="Notifications"
            onValueChange={setNotificationsEnabled}
            value={notificationsEnabled}
          />
          <View style={styles.divider} />
          <SettingRow
            description="Allow sound effects within the app."
            icon="volume-high-outline"
            label="Sound effects"
            onValueChange={setSoundEnabled}
            value={soundEnabled}
          />
          <View style={styles.divider} />
          <SettingRow
            description="Save a local dark mode preference only."
            icon="moon-outline"
            label="Dark mode preference"
            onValueChange={setDarkModeEnabled}
            value={darkModeEnabled}
          />
        </View>
      </View>

      <View style={styles.noteCard}>
        <Ionicons color="#2352B8" name="information-circle-outline" size={24} />
        <Text style={styles.noteText}>
          These controls do not change the global theme or store data permanently.
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
    color: '#111827',
    fontSize: 34,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  introduction: {
    marginTop: 24,
    color: '#667085',
    fontSize: 15,
    lineHeight: 23,
  },
  section: {
    marginTop: 30,
  },
  sectionTitle: {
    marginBottom: 12,
    color: '#111827',
    fontSize: 20,
    fontWeight: '700',
  },
  settingsCard: {
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#E4E7EC',
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 104,
    paddingVertical: 16,
  },
  settingIcon: {
    width: 46,
    height: 46,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 23,
    backgroundColor: '#EFF6FF',
  },
  settingCopy: {
    flex: 1,
    marginHorizontal: 14,
  },
  settingLabel: {
    color: '#111827',
    fontSize: 17,
    fontWeight: '700',
  },
  settingDescription: {
    marginTop: 4,
    color: '#667085',
    fontSize: 13,
    lineHeight: 19,
  },
  divider: {
    height: 1,
    backgroundColor: '#E4E7EC',
  },
  noteCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#EFF6FF',
  },
  noteText: {
    flex: 1,
    marginLeft: 12,
    color: '#344054',
    fontSize: 14,
    lineHeight: 21,
  },
});

export default SettingsScreen;
