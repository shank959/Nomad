import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { useUser } from "../../UserContext";
import axios from 'axios';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState('');
  const { setUserId, backendURL } = useUser();

  const handleLogin = async () => {
    try {
      const response = await axios.post(backendURL + "/login", {
        username,
        password
      });
      // Handle response, e.g., navigate to another screen, store the token, etc.
      console.log(response.data)
      if (response.data.userId) {
        setUserId(response.data.userId);
      }
      navigation.navigate("MainTabScreen", { screen: "MapScreen" });
    } catch (err) {
      setError(err.response?.data?.error || 'Error logging in');
      alert(`Error logging in`)
    }
  };


  const createAccount = () => {
    navigation.navigate("CreateAccountScreen");
  };

  const handleForgotPassword = () => {
    navigation.navigate("ForgotPasswordScreen");
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/logo.png')} style={styles.image} />
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
        placeholderTextColor="grey"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
        placeholderTextColor="grey"
      />
      <TouchableOpacity style={[styles.button, styles.loginButton]} onPress={handleLogin}>
        <Text style={styles.buttonText}> Login </Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.CreateAccountButton]} onPress={createAccount}>
        <Text style={styles.CreateAccountButtonText}> Create Account </Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.forgotPasswordButton]} onPress={handleForgotPassword}>
        <Text style={styles.forgotPasswordButtonText}> Forgot Password? </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  image: {
    width: 230,
    height: 230,
    marginBottom: 10,
  },
  input: {
    width: 300,
    height: 50,
    borderColor: "#000000",
    borderWidth: 1,
    borderRadius: 10,
    borderBottomWidth: 0.4,
    borderBottomColor: 'grey',
    marginVertical: 10,
    padding: 10,  
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold'
  },
  button: {
    backgroundColor: "black",
    borderColor: "black",
    borderBottomWidth: 2,
    borderWidth: 1,
    width: 200,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    marginVertical: 10,
  },
  loginButton: {
    marginTop: 35, 
  },
  forgotPasswordButton: {
    width: 130, // Smaller width for the forgot password button
    height: 25,
    borderColor: "black",
  },
  forgotPasswordButtonText: {
    color: "grey",
    fontSize: 12, // Smaller font size for the forgot password button text
    fontWeight: "bold",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  CreateAccountButton:{
    width: 130,
    height: 25,
    borderColor: "black",
  },
  CreateAccountButtonText:{
    color: "grey",
    fontSize: 12,
    fontWeight: "bold",
  }

});