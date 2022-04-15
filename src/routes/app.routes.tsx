import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Feather';

import Home from '../screens/Home';
import AddContact from '../screens/AddContact';
import DetailsContact from '../screens/DetailsContact';
import EditContact from '../screens/EditContact';

const App = createStackNavigator();

const AppRoutes: React.FC = () => (
  <App.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: {
        backgroundColor: '#fff',
      },
    }}
  >
    <App.Screen name="Home" component={Home} options={{headerShown: false}}/>

    <App.Screen
      name="AddContact"
      component={AddContact}
      options={({ navigation }) => ({
        headerLeft: () => (
          <Icon
            name="arrow-left"
            size={24}
            color="#436074"
            onPress={() => navigation.goBack()}
            style={{ paddingHorizontal: 24 }}
          />
        ),
        headerShown: true,
        title: 'Cadastrar contato',
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontFamily: 'Arial',
          fontSize: 16,
          color: '#436074'
        },
        headerStyle: {
          backgroundColor: '#fff',
          elevation: 0,
          borderWidth: 0,
          shadowColor: 'transparent',
        },
      })}
    />

    <App.Screen
      name="DetailsContact"
      component={DetailsContact}
      options={({ navigation }) => ({
        headerLeft: () => (
          <Icon
            name="arrow-left"
            size={24}
            color="#436074"
            onPress={() => navigation.goBack()}
            style={{ paddingHorizontal: 24 }}
          />
        ),
        headerShown: true,
        title: 'Detalhes do contato',
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontFamily: 'Arial',
          fontSize: 16,
          color: '#436074'
        },
        headerStyle: {
          backgroundColor: '#fff',
          elevation: 0,
          borderWidth: 0,
          shadowColor: 'transparent',
        },
      })}
    />

    <App.Screen
      name="EditContact"
      component={EditContact}
      options={({ navigation }) => ({
        headerLeft: () => (
          <Icon
            name="arrow-left"
            size={24}
            color="#436074"
            onPress={() => navigation.goBack()}
            style={{ paddingHorizontal: 24 }}
          />
        ),
        headerShown: true,
        title: 'Editar contato',
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontFamily: 'Arial',
          fontSize: 16,
          color: '#436074'
        },
        headerStyle: {
          backgroundColor: '#fff',
          elevation: 0,
          borderWidth: 0,
          shadowColor: 'transparent',
        },
      })}
    />

  </App.Navigator>
);

export default AppRoutes;
