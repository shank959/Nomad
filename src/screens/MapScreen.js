import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Image,
  Modal,
  TextInput,
} from "react-native";
import MapView from "react-native-maps";
import * as ImagePicker from "expo-image-picker";

function MapScreen({ navigation }) {
  const [region, setRegion] = useState({
    latitude: 34.0549,
    longitude: -118.2426,
    latitudeDelta: 0.6,
    longitudeDelta: 0.6,
  });
  const [imageUri, setImageUri] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    })();
  }, []);

  const uploadImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets) {
      setImageUri(result.assets[0].uri);
      toggleModal();
    }
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={region} provider="google" />
      <TouchableOpacity style={styles.button} onPress={uploadImage}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        visible={isModalVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.headerText}>New Post</Text>
          </View>
          <TouchableOpacity onPress={toggleModal} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
          <View style={styles.imageContainer}>
            {imageUri ? (
              <Image source={{ uri: imageUri }} style={styles.image} />
            ) : (
              <View style={styles.placeholderImage} />
            )}
          </View>
          <View style={styles.inputContainer}>
            <TextInput style={styles.input} placeholder="Caption" />
            <TextInput style={styles.input} placeholder="Location" />
          </View>
          <TouchableOpacity style={styles.instagramButton}>
            <Text style={styles.instagramButtonText}>Share</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  button: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "black",
    padding: 10,
    borderRadius: 50,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 24,
    lineHeight: 25,
    width: "100%",
  },
  imageContainer: {
    width: "100%",
    height: 400,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  placeholderImage: {
    width: "100%",
    height: "100%",
    backgroundColor: "#e1e1e1",
    borderRadius: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "black",
  },
  closeButton: {
    position: "absolute",
    top: 35,
    left: 10,
    padding: 15,
    backgroundColor: "transparent",
    borderRadius: 10,
  },
  closeButtonText: {
    fontSize: 30,
    color: "#333666",
    fontWeight: "bold",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "black",
    padding: 10,
    width: "100%",
    marginTop: 0,
    height: 80,
  },
  headerText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
    top: 29,
  },
  inputContainer: {
    width: "80%",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 0,
    marginTop: 30,
    color: "white",
  },
  instagramButton: {
    backgroundColor: "#333666",
    paddingVertical: 15,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
    marginTop: 180,
  },
  instagramButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default MapScreen;