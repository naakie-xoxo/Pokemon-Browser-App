import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import AboutScreen from '../screens/AboutScreen';
import StackNavigator from './StackNavigator';

const Tab = createBottomTabNavigator();

function renderTabIcon(routeName, focused, color, size) {
  if (routeName === 'Home') {
    return <MaterialCommunityIcons color={color} name="pokeball" size={size + 2} />;
  }

  return (
    <Ionicons
      color={color}
      name={focused ? 'information-circle' : 'information-circle-outline'}
      size={size}
    />
  );
}

function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#E3350D',
        tabBarHideOnKeyboard: true,
        tabBarInactiveTintColor: '#8D8D8D',
        tabBarIcon: ({ color, focused, size }) =>
          renderTabIcon(route.name, focused, color, size),
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '700',
        },
        tabBarStyle: {
          borderTopColor: '#E6E6E6',
          backgroundColor: '#FFFFFF',
          paddingTop: 5,
          paddingBottom: 5,
        },
      })}
    >
      <Tab.Screen name="Home" component={StackNavigator} options={{ tabBarLabel: 'Pokédex' }} />
      <Tab.Screen name="About" component={AboutScreen} />
    </Tab.Navigator>
  );
}

export default TabNavigator;
