import { StyleSheet, Text, View } from 'react-native';
import React, {useState, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import registerNNPushToken from 'native-notify';

import LoginScreen from './src/screens/LoginScreen';
import MainTabScreen from './src/navigation/MainTabScreen';
import CreateAccountScreen from './src/screens/CreateAccountScreen';
import CreatePostScreen from './src/screens/CreatePostScreen';

const Stack = createNativeStackNavigator();



export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* The Login screen should not have the bottom tabs, so it's outside the MainTabScreen */}
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="CreateAccountScreen" component={CreateAccountScreen} options={{ headerShown: false }} />
        {/* MainTabScreen is the screen component that renders the bottom tabs */}
        <Stack.Screen name="MainTabScreen" component={MainTabScreen} options={{ headerShown: false }} />
        <Stack.Screen name="CreatePostScreen" component={CreatePostScreen} options={{ headerShown: false }} />
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
