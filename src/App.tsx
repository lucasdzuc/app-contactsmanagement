import 'react-native-gesture-handler';
import React from 'react';
import { View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import AppProvider from './contexts/auth';

import Routes from './routes';

const newLocal = { flex: 1, backgroundColor: '#fff' };

const App: React.FC = () => (
  <NavigationContainer>
    <StatusBar 
      barStyle="light-content"
      backgroundColor="transparent" 
      translucent 
    />
    <AppProvider>
      <View style={newLocal}>
        <Routes />
      </View>
    </AppProvider>
  </NavigationContainer>
);

export default App;
