import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import axios from 'axios';


export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const handleResetPassword = async () => {
    alert("Sent Email!")
  }
  const navigateToHome = () => {
    navigation.navigate("LoginScreen");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password?</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        placeholderTextColor="grey"
      />
      <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
        <Text style={styles.buttonText}>Send Email</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={navigateToHome}>
        <Text style={styles.HomeButton}> Homepage </Text>
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
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: "#ffffff",
  },
  input: {
    width: 300,
    height: 40,
    borderColor: "#ffffff",
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 10,
    padding: 10,
    fontSize: 18,
    color: "white",
    fontWeight: "bold"
  },
  button: {
    backgroundColor: "black", // Adjusted button color to match the style of the "Create Account" button
    borderBottomWidth: 0.5,
    borderBottomColor: 'grey',
    width: 130,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    marginVertical: 10,
    FontWeight: "bold"
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  HomeButton: {
    color: "white",
    borderColor: "black",
    fontSize: 18,
    fontWeight: "bold"
  }
});
