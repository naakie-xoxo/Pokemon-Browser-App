import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

import StackNavigator from './navigation/StackNavigator';

function App() {
  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <StackNavigator />
    </NavigationContainer>
  );
}

export default App;
