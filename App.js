import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

import TabNavigator from './navigation/TabNavigator';

function App() {
  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <TabNavigator />
    </NavigationContainer>
  );
}

export default App;
