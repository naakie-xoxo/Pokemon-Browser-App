import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import DrawerNavigator from './navigation/DrawerNavigator';

function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <StatusBar style="dark" />
        <DrawerNavigator />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

export default App;
