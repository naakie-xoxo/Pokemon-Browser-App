import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import AboutScreen from '../screens/AboutScreen';
import StackNavigator from './StackNavigator';

const Tab = createBottomTabNavigator();

function getTabIconName(routeName, focused) {
  if (routeName === 'Home') {
    return focused ? 'home' : 'home-outline';
  }

  return focused ? 'information-circle' : 'information-circle-outline';
}

function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#2352B8',
        tabBarInactiveTintColor: '#98A2B3',
        tabBarIcon: ({ color, focused, size }) => (
          <Ionicons color={color} name={getTabIconName(route.name, focused)} size={size} />
        ),
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
        tabBarStyle: {
          borderTopColor: '#E4E7EC',
          backgroundColor: '#FFFFFF',
        },
      })}
    >
      <Tab.Screen name="Home" component={StackNavigator} />
      <Tab.Screen name="About" component={AboutScreen} />
    </Tab.Navigator>
  );
}

export default TabNavigator;
