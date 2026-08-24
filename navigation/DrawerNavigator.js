import { Ionicons } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';

import HelpScreen from '../screens/HelpScreen';
import LogoutScreen from '../screens/LogoutScreen';
import SettingsScreen from '../screens/SettingsScreen';
import TabNavigator from './TabNavigator';

const Drawer = createDrawerNavigator();

const DRAWER_ICONS = {
  Main: 'home-outline',
  Settings: 'settings-outline',
  'Help and Support': 'help-circle-outline',
  Logout: 'log-out-outline',
};

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      id="RootDrawer"
      initialRouteName="Main"
      screenOptions={({ route }) => ({
        drawerActiveBackgroundColor: '#EFF6FF',
        drawerActiveTintColor: '#2352B8',
        drawerIcon: ({ color, size }) => (
          <Ionicons color={color} name={DRAWER_ICONS[route.name]} size={size} />
        ),
        drawerInactiveTintColor: '#475467',
        drawerLabelStyle: {
          fontSize: 15,
          fontWeight: '600',
        },
        headerShown: false,
      })}
    >
      <Drawer.Screen
        name="Main"
        component={TabNavigator}
        options={{ drawerLabel: 'Pokédex' }}
      />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
      <Drawer.Screen
        name="Help and Support"
        component={HelpScreen}
        options={{ drawerLabel: 'Help & Support' }}
      />
      <Drawer.Screen name="Logout" component={LogoutScreen} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;
