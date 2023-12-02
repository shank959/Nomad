import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image } from "react-native";

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Add your login logic here
    if (true) {
      // Successful login, navigate to the next screen
      navigation.navigate("MainTabScreen", { screen: "MapScreen" });
    } else {
      // Display an error message or handle unsuccessful login
      alert("Invalid credentials. Please try again.");
    }
  };

  const createAccount = () => {
    navigation.navigate("CreateAccountScreen");
  };

  const handleForgotPassword = () => {
    // Placeholder for forgot password functionality
    alert("Forgot Password functionality not implemented yet.");
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/logo.png')} style={styles.image} />
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
        placeholderTextColor="white"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
        placeholderTextColor="white"
      />
      <TouchableOpacity style={[styles.button, styles.loginButton]} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={createAccount}>
        <Text style={styles.buttonText}>Create Account</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.forgotPasswordButton]} onPress={handleForgotPassword}>
        <Text style={styles.forgotPasswordButtonText}>Forgot Password?</Text>
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
    borderColor: "#ffffff",
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 10,
    padding: 10,  
    fontSize: 18,
    color: 'white',
  },
  button: {
    backgroundColor: "black",
    borderColor: "white",
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
  },
  forgotPasswordButtonText: {
    color: "white",
    fontSize: 12, // Smaller font size for the forgot password button text
    fontWeight: 400,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: 400,
  },
});
