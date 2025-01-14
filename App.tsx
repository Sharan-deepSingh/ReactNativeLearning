import { useState } from 'react';
import { View, Button, SafeAreaView } from 'react-native';
import Login from './LoginScreens/Login';
import {NavigationContainer} from '@react-navigation/native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Signup from './LoginScreens/Signup';

const App = () => {
  const bottomTab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <SafeAreaView style={{ flex: 1 }}>
        <bottomTab.Navigator>
          <bottomTab.Screen name="Login" component={Login} />
          <bottomTab.Screen name="Signup" component={Signup} />
        </bottomTab.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
};

export default App;
