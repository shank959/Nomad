import { StyleSheet, Text, View } from 'react-native';
import react, {useState, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import registerNNPushToken from 'native-notify';

import Login from './src/screens/Login';
import ChosenTask from './src/screens/ChosenTask';
import MapScreen from './src/screens/MapScreen';
import Tabs from './src/navigation/tabs';

const Stack = createNativeStackNavigator();


export default function App() {
  return (
  <NavigationContainer>
    <Tabs/>
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
