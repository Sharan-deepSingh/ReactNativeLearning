import { useState } from 'react';
import { View, Button, SafeAreaView } from 'react-native';
import Login from './LoginScreens/Login';
import {NavigationContainer} from '@react-navigation/native'
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import Signup from './LoginScreens/Signup';

const App = () => {
  const TopTab = createMaterialTopTabNavigator();

  return (
    <NavigationContainer>
      <SafeAreaView style={{ flex: 1 }}>
        <TopTab.Navigator>
          <TopTab.Screen name="Login" component={Login} />
          <TopTab.Screen name="Signup" component={Signup} />
        </TopTab.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
};

export default App;
