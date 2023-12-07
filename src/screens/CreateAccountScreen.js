import React, { useState } from "react";
import axios from 'axios';
import { useUser } from "../../UserContext"
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";

export default function CreateAccountScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); // Add a state for the message
  const { setUserId, backendURL } = useUser();

  const navigateToHome = () => {
    navigation.navigate("LoginScreen");
  };

  const handleCreateAccount = async () => { // Make this function async
    try {
      const response = await axios.post(backendURL + "/create_user", {
        email,
        username,
        password
      });
      setMessage(response.data.message);
      if (response.data.userId) {
        setUserId(response.data.userId);
      }
      navigation.navigate("MainTabScreen", { screen: "MapScreen" });
    } catch (error) {
      console.error('Error creating user:', error.response?.data?.error || error.message);
      setMessage(error.response?.data?.error || 'Error creating user');
    }



  };


  return (
    <View style={styles.container}>
      <Image source={require("../../assets/logo.png")} style={styles.image} />
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
        placeholderTextColor="gray"
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        placeholderTextColor="grey"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
        placeholderTextColor="gray"
      />
      <TouchableOpacity style={styles.button} onPress={handleCreateAccount}>
        <Text style={styles.buttonText}>Create Account</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.HomeButton} onPress={navigateToHome}>
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
    color: "white",
    fontWeight: "bold"
  },
  button: {
    backgroundColor: "black", // Adjusted button color to match the style of the "Create Account" button
    borderBottomWidth: 0.5,
    borderBottomColor: 'grey',
    width: 150,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    marginVertical: 20,
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
    borderBottomWidth: 0.5,
    borderBottomColor: 'grey',
    fontSize: 18,
    fontWeight: "bold"
  }
});