import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Image,
} from "react-native";
import { ProfileScreenNavigation } from "../Components/ProfileScreenNavigation";
import { Feather } from "@expo/vector-icons";
import PostsPage from "../Components/PostsPage";
import FriendsPage from "../Components/FriendsPage";
import BadgesPage from "../Components/BadgesPage";
import * as ImagePicker from "expo-image-picker";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useUser } from "../../UserContext";
import axios from "axios";
import { storage } from "../../Firebase";
import { useFocusEffect } from '@react-navigation/native';
function ProfileScreen({ navigation }) {
  const [selectedTab, setSelectedTab] = useState("Posts");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [imageUrl, setImageUrl] = useState("https://firebasestorage.googleapis.com/v0/b/nomad-bb690.appspot.com/o/images%2Fdefault_profile_picture.jpeg?alt=media&token=6c040cad-fb03-431e-9c32-31f28ddddc3f");
  const [username, setUsername] = useState("@");
  const [friendCount, setFriendCount] = useState(0);
  const [achCount, setAchCount] = useState(0);
  const { userId, backendURL } = useUser();

  useFocusEffect(
    React.useCallback(() => {
      const fetchUserData = async () => {
        try {
          const response = await axios.post(`${backendURL}/get_user_data`, { userId });
          const userData = response.data.user;
          setUsername(`@${userData.username}`);
          setImageUrl(userData.pfpURL);
          const friendList = userData.friends;
          if (friendList) { setFriendCount(friendList.length); }
          const achList = userData.achievements;
          if (achList) { setAchCount(achList.length); }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
  
      fetchUserData();
    }, [userId, backendURL])
  );
   
  const handleTabSelect = (tabName) => {
    setSelectedTab(tabName);
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };
  const Logout = () => {
    setIsModalVisible(!isModalVisible);
    navigation.navigate("LoginScreen");
  };

  const deleteAccount = () => {
    setIsModalVisible(!isModalVisible);
    navigation.navigate("LoginScreen");
  };

  const uploadImageToFirebase = async (uri) => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      const fileRef = ref(storage, `images/${Date.now()}`); // Create a reference to 'images/fileName'
      await uploadBytes(fileRef, blob);

      // Get the download URL
      const downloadUrl = await getDownloadURL(fileRef);
      return downloadUrl;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  };
  const uploadImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets) {
      try {
        const downloadUrl = await uploadImageToFirebase(result.assets[0].uri);
        setImageUrl(downloadUrl); // Save the URL of the uploaded image
        uploadProfile(downloadUrl);
        toggleModal();
      } catch (error) {
        alert("Error uploading image: " + error.message);
      }
    }
  };
  const uploadProfile = async (profileUrl) => {
    try {
      // Send a request to update the user's profile picture URL
      const identity = userId;
      const response = await axios.put(
        backendURL + "/update_profile", // Update the endpoint to match your server code
        {profileUrl, identity }
      );

      // Handle the response accordingly
      console.log("Profile picture updated successfully:", response.data);
      toggleModal(); // Close the modal or perform other actions as needed
    } catch (error) {
      // Handle the error case
      console.error(
        "Error updating profile picture:",
        error.response ? error.response.data : error.message
      );
      Alert.alert(
        "Error",
        "Failed to update profile picture: " +
          (error.response ? error.response.data : error.message)
      );
    }
  };
  return (
    <View style={styles.outerContainer}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Profile Picture Placeholder */}
        <View style={styles.profilePicPlaceholder}>
          <Image
            source={{ uri: imageUrl }}
            style={styles.image}
          />
        </View>
        {/* Settings Button */}
        <TouchableOpacity style={styles.settingsIcon} onPress={toggleModal}>
          <Feather name="settings" size={24} color="white" />
        </TouchableOpacity>

        {/* Username */}
        <Text style={styles.username}>{username}</Text>

        {/* Stats Container */}
        <View style={styles.statsContainer}>
          {/* Friends Count */}
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{friendCount}</Text>
            <Text style={styles.statLabel}>Friends</Text>
          </View>
          {/* Badges Count */}
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{achCount}</Text>
            <Text style={styles.statLabel}>Badges</Text>
          </View>
        </View>

        {/* Spacer */}
        <View style={{ height: 30 }} />

        {/* Profile Screen Navigation */}
        <ProfileScreenNavigation onTabSelect={handleTabSelect} />

        {/* Tab Content */}
        {selectedTab === "Posts" && <PostsPage />}
        {selectedTab === "Friends" && <FriendsPage />}
        {selectedTab === "Badges" && <BadgesPage />}
      </ScrollView>

      {/* Modal for Settings */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}
      >
        <TouchableOpacity
          style={styles.centeredView}
          activeOpacity={1}
          onPressOut={toggleModal}
        >
          <View style={styles.modalView}>
            <TouchableOpacity style={styles.modalButton} onPress={uploadImage}>
              <Text style={styles.modalButtonText}>Upload Profile Picture</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={Logout}>
              <Text style={styles.modalButtonText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: "black",
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  settingsIcon: {
    position: "absolute",
    top: 40,
    right: 16,
    zIndex: 10,
  },
  username: {
    position: "absolute",
    top: 60,
    left: 18,
    color: "white",
    marginLeft: 10,
    fontSize: 30,
  },
  statsContainer: {
    flexDirection: "row",
    marginTop: 125,
    left: -94,
  },
  statItem: {
    alignItems: "center",
    marginRight: 24,
  },
  statNumber: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  statLabel: {
    color: "white",
    fontSize: 16,
  },
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    width: "100%",
    backgroundColor: "#1f2021",
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: 20, // Rounded top left corner
    borderTopRightRadius: 20, // Rounded top right corner
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalButton: {
    backgroundColor: "transparent",
    borderColor: "red",
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: "80%",
    marginTop: 7,
    marginBottom: 7,
  },
  modalButtonText: {
    color: "red",
    fontWeight: "bold",
    textAlign: "center",
  },
  profilePicPlaceholder: {
    position: "absolute",
    top: 50,
    right: 30,
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "transparent",
    zIndex: 5,
    overflow: "hidden", // Ensure the border radius is applied to the image
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 75,
  },
});

export default ProfileScreen;
