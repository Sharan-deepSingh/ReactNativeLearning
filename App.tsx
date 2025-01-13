import { useState } from 'react';
import { View, Button } from 'react-native';
import Login from './LoginScreens/Login';
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import Signup from './LoginScreens/Signup';

function App() {
  const Stack = createNativeStackNavigator()

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ 
        headerStyle: {
          backgroundColor: 'green'
       },
       headerTintColor: 'white',
       headerTitleStyle: {
        fontSize: 18
       } 
      }}>
        <Stack.Screen name="Login" component={Login} options={{
          headerLeft: () => <Button title='Left' color='white'/>,
          headerRight: () => <Button title='Right' color='white'/>
        }}/>
        <Stack.Screen name="  " component={Signup}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
