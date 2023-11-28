import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from "react-native";

export default function CreateAccountScreen({ navigation }) {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleCreateAccount = () => {
    // Here you will handle the account creation logic
    // Send the username, email, and password to your backend server
        console.log(username, email, password);
    
    // Navigate to login screen or main app screen after account creation
    navigation.navigate("LoginScreen");
};

return (
    <View style={styles.container}>
    <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
        placeholderTextColor="white"
    />
    <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
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
    <TouchableOpacity style={styles.button} onPress={handleCreateAccount}>
        <Text style={styles.buttonText}>Create Account</Text>
    </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
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
    },
    button: {
      backgroundColor: "grey",
      width: 200,
      height: 40,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 15,
      marginVertical: 10,
    },
    buttonText: {
      color: "white",
      fontSize: 18,
      fontWeight: 400,
      
    },
  });
  