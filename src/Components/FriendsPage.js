// Import React and any other necessary modules
import React, { useState } from "react";
import { View, Text, Image, TextInput, StyleSheet } from "react-native";
import { useUser } from "../../UserContext";
import ProgressBar from "react-native-progress/Bar";
import { random } from "@turf/turf";

// Define your component

const FriendsPage = () => {
  const [progress, setProgress] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const { backendURL } = useUser();
  const defaultProfilePic = require("../../assets/icon.png");

  const handleSearch = async (text) => {
    setSearchQuery(text);
    if (text === "") {
      setSearchResults([]);
    } else {
      try {
        const response = await fetch(`${backendURL}/search`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query: text }),
        });
        const data = await response.json();
        setSearchResults(data.users);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search Users"
        placeholderTextColor="#D3D3D3"
        style={styles.searchBar}
        onChangeText={handleSearch}
        value={searchQuery}
      />
      {searchResults.map((user, index) => (
        <View key={index} style={styles.friendBox}>
          <Image
            source={user.pfpURL ? { uri: user.pfpURL } : defaultProfilePic}
            style={styles.profilePic}
          />
          <Text style={styles.friendItem}>{user.username}</Text>
          <View style={styles.progressBarContainer}>
            <ProgressBar
              progress={10}
              width={100}
              height={20}
              color="#229631" // Green color
              borderColor="#999999"
              borderRadius={5}
              borderWidth={2}
            />
          </View>
        </View>
      ))}
    </View>
  );
};

// Define the StyleSheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    width: "100%",
  },
  searchBar: {
    width: "90%",
    height: 40,
    backgroundColor: "black",
    borderRadius: 50,
    padding: 10,
    marginVertical: 10,
    marginLeft: -10,
    marginBottom: 20,
    color: "white",
    borderWidth: 2,
    borderColor: "white",
  },
  friendBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
    width: "90%",
    backgroundColor: "black",
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25, // make profile picture circular
    marginLeft: -20,
    marginRight: 20,
  },
  friendItem: {
    color: "white",
    fontSize: 20,
    lineHeight: 50,
  },
  progressBarContainer: {
    // Adjust the distance from the bottom as needed
    // Adjust the distance from the left as needed
    backgroundColor: "rgba(255, 255, 255, 0)", // Semi-transparent white background
    padding: 5,
    borderRadius: 10,
    alignItems: "center",
  },
});

// Export the component
export default FriendsPage;
