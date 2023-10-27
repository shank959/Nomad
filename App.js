import { StyleSheet, Text, View } from 'react-native';
import react, {useState, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import registerNNPushToken from 'native-notify';

import Login from './src/screens/Login';
import ChosenTask from './src/screens/ChosenTask';

const Stack = createNativeStackNavigator();


export default function App() {
  return (
  //Navigation
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name ="Login" options ={{ headerShown: false}} component={Login}/>
    </Stack.Navigator>
  </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
