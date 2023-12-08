import React, { useState, useEffect, useCallback } from "react";
import {StyleSheet, View, TouchableOpacity, Text, Image, Modal, TextInput, KeyboardAvoidingView, Platform, Alert} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import MapView, { Polygon, Marker, Callout } from "react-native-maps";
import * as Location from "expo-location";
import axios from 'axios';
import { storage } from '../../Firebase';
import * as turf from '@turf/turf';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useUser } from "../../UserContext";
import ProgressBar from "react-native-progress/Bar";
// import assets for markers
import CenturyCity from "../../assets/century-city2.png";
import GriffithObservatory from "../../assets/griffith-observatory2.jpeg";
import BruinBear from "../../assets/bruin-bear.jpg";
import CryptoArena from "../../assets/crypto-arena2.jpeg";
import DodgersStadium from "../../assets/dodgers-stadium.jpeg";
import GrandCentralMarket from "../../assets/grand-central-market.jpeg";
import HollywoodSign from "../../assets/hollywood-sign2.jpeg";
import RoccosTavern from "../../assets/roccos-tavern2.jpeg";
import SantaMonicaPier from "../../assets/santa-monica-pier2.jpeg";
import UniversalStudios from "../../assets/universal-studios.jpeg";
import WalkOfFame from "../../assets/walk-of-fame2.jpeg";

import { FontAwesome5 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

function MapScreen({ navigation }) {
  const [region, setRegion] = useState({
    latitude: 34.0522,
    longitude: -118.2437,
    latitudeDelta: 0.6,
    longitudeDelta: 0.6,
  });
  const [imageUrl, setImageUrl] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const { userId, backendURL } = useUser();
  const [achievements, setAchievements] = useState([]);

  const [progress, setProgress] = useState(0);

  //image upload external helper functions
  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    })();
  }, []);

  // Function to upload image to firebase
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
        toggleModal();
      } catch (error) {
        alert("Error uploading image: " + error.message);
      }
    }
  };

  // CREATE POST SCREEN LOGIC
  // state declarations for create post
  const [caption, setCaption] = useState(null);
  const [location, setLocation] = useState(null);
  const [userLocation, setUserLocation] = useState(null);

  const onPostSubmit = () => {
    const author = userId;
    const coordinates = { 
      latitude: region.latitude, 
      longitude: region.longitude,
    };
    
    const postContent = {
      imageUrl,
      caption,
      location,
      coordinates,
      author,
    };

    createPost(postContent);
  };

  const createPost = async (postContent) => {
    try {
      const response = await axios.post(
        `${backendURL}/posts`,    
        postContent
      );
      const point = turf.point([postContent.coordinates.longitude, postContent.coordinates.latitude]);
      const newGrid = grid.map((cell) => {
        const polygon = turf.polygon([[
          [cell.coordinates[0].longitude, cell.coordinates[0].latitude],
          [cell.coordinates[1].longitude, cell.coordinates[1].latitude],
          [cell.coordinates[2].longitude, cell.coordinates[2].latitude],
          [cell.coordinates[3].longitude, cell.coordinates[3].latitude],
          [cell.coordinates[0].longitude, cell.coordinates[0].latitude]
          // ... other coordinates
        ]]);
  
        if (turf.booleanPointInPolygon(point, polygon) && !cell.explored) {
          updateGridCell(cell.rowIndex, cell.columnIndex, {fillColor: "transparent", explored: true })
        }
      });
      Alert.alert("Success", "Post created successfully");
      setCaption(""); // Reset caption input after successful post
      navigation.navigate("MainTabScreen", { screen: "FeedScreen" });
      toggleModal();
    } catch (error) {
      // Handle the error case
      console.error(
        "Error creating post:",
        error.response ? error.response.data : error
      );
      Alert.alert(
        "Error",
        "Failed to create post: " +
          (error.response ? error.response.data : error.message)
      );
    }
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const [selectedMarker, setSelectedMarker] = useState(null);
  const [grid, setGrid] = useState([]);

  const fetchGridData = async () => {
    try {
      let exploredCells = 0;
      const response = await axios.post(`${backendURL}/user/grid`, {userId});
      correctedGrid = response.data.filter((cell) => {
        return !shouldExcludeCell(cell.rowIndex, cell.columnIndex);
      })
      correctedGrid.forEach((cell) => {
        if (cell.explored){
          exploredCells++;
        }
    });
      let exploredCellsPercent = exploredCells / 97;
      setProgress(exploredCellsPercent);
      setGrid(correctedGrid); // Assuming the backend sends the grid in this format
    } catch (error) {
      console.error("Error fetching grid data:", error);
      // Handle error (e.g., show an alert or a message)
    }
  };

  useEffect(() => {
    fetchGridData();
  }, []);

  useEffect(() => {
    let locationSubscription;

    const subscribeToLocationUpdates = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access location was denied");
        return;
      }

      locationSubscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 1500,
          distanceInterval: 100,
        },
        (newLocation) => {
          setUserLocation(newLocation); // Set the location state
        }
      );
    };

    subscribeToLocationUpdates();

    return () => {
      if (locationSubscription) {
        locationSubscription.remove();
      }
    };
  }, []);

  useEffect(() => {
    if (userLocation && grid.length > 0) {
      console.log(userLocation)
      const point = turf.point([userLocation.coords.longitude, userLocation.coords.latitude]);
      
      markers.forEach(marker => {
        if (isCloseToMarker(userLocation.coords.latitude, userLocation.coords.longitude, marker.coordinate.latitude, marker.coordinate.longitude, 0.1)) {
          // Check if the marker is already unlocked or in achievements
          if (!marker.unlocked && !achievements.includes(marker.title)) {
              // If not, add it to achievements and update its status
              addMarkerToAchievements(userId, marker.title);
              updateMarker(marker.id, { unlocked: true });
          }
      }
      });
      let gridUpdated = false;
      const newGrid = grid.map((cell) => {
        const polygon = turf.polygon([[
          [cell.coordinates[0].longitude, cell.coordinates[0].latitude],
          [cell.coordinates[1].longitude, cell.coordinates[1].latitude],
          [cell.coordinates[2].longitude, cell.coordinates[2].latitude],
          [cell.coordinates[3].longitude, cell.coordinates[3].latitude],
          [cell.coordinates[0].longitude, cell.coordinates[0].latitude]
          // ... other coordinates
        ]]);
  
        if (turf.booleanPointInPolygon(point, polygon) && !cell.explored) {
          gridUpdated = true; // Indicate that grid needs an update
          updateGridCell(cell.rowIndex, cell.columnIndex, {fillColor: "transparent", explored: true })
          return { ...cell, fillColor: "transparent", explored: true };
        }
        return cell;
      });
  
      if (gridUpdated) {
        setGrid(newGrid); // Update grid only if there are changes
      }
    }
  }, [userLocation, grid]);

  // Function to convert degrees to radians
function toRadians(degrees) {
  return degrees * Math.PI / 180;
}

// Haversine formula to calculate distance between two coordinates in km
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the Earth in km
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2); 
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  return R * c; // Distance in km
}

// Check if the current location is close to the marker
function isCloseToMarker(currentLat, currentLon, markerLat, markerLon, thresholdInKm) {
  const distance = calculateDistance(currentLat, currentLon, markerLat, markerLon);
  return distance <= thresholdInKm;
}

const addMarkerToAchievements = async (userId, markerTitle) => {
  try {
      const response = await axios.post(`${backendURL}/user/explore`, {
          userId,
          markerTitle
      });
      console.log(response.data.message); // Log success message
      // Optionally, handle any UI updates or alerts based on success
  } catch (error) {
      console.log('Error adding marker to achievements:', error.response.data);
      // Optionally, handle UI updates or alerts based on failure
  }
};

useEffect(() => {
  fetchAchievements();
  // ... (other useEffect content)
}, []);

const fetchAchievements = async () => {
  try {
      const response = await axios.post(`${backendURL}/user/achievementsformap`, { userId });
      setAchievements(response.data);
  } catch (error) {
      console.error('Error fetching achievements:', error.response.data);
      // Optionally, handle UI updates or alerts based on failure
  }
};

  const darkMode = [
    // Define your dark map style here (as mentioned in the previous example)
    { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
    {
      featureType: "administrative.locality",
      elementType: "labels.text.fill",
      stylers: [{ color: "#d59563" }],
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [{ color: "#d59563" }],
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [{ color: "#263c3f" }],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [{ color: "#6b9a76" }],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [{ color: "#38414e" }],
    },
    {
      featureType: "road",
      elementType: "geometry.stroke",
      stylers: [{ color: "#212a37" }],
    },
    {
      featureType: "road",
      elementType: "labels.text.fill",
      stylers: [{ color: "#9ca5b3" }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [{ color: "#746855" }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry.stroke",
      stylers: [{ color: "#1f2835" }],
    },
    {
      featureType: "road.highway",
      elementType: "labels.text.fill",
      stylers: [{ color: "#f3d19c" }],
    },
    {
      featureType: "transit",
      elementType: "geometry",
      stylers: [{ color: "#2f3948" }],
    },
    {
      featureType: "transit.station",
      elementType: "labels.text.fill",
      stylers: [{ color: "#d59563" }],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#17263c" }],
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [{ color: "#515c6d" }],
    },
    {
      featureType: "water",
      elementType: "labels.text.stroke",
      stylers: [{ color: "#17263c" }],
    },
    // ...
  ];
  const lightMode = [];

  const shouldLightenCell = (rowIndex, columnIndex) => {
    // Define the condition under which a specific grid cell should be lightened
    return (
      (columnIndex >= 0 && columnIndex >= 0) || // Example condition
      (columnIndex === 6 && rowIndex === 5) // Another example condition
      // Add more conditions as needed
    );
  };

  // const createGrid = () => {
  //   const gridPolygons = [];
  //   const gridRows = 12;
  //   const gridColumns = 15;

  //   const northwestCorner = { latitude: 34.215635, longitude: -118.873252 };
  //   const southeastCorner = { latitude: 33.701912, longitude: -118.11257 };

  //   const latStep =
  //     (northwestCorner.latitude - southeastCorner.latitude) / gridRows;
  //   const lngStep =
  //     (southeastCorner.longitude - northwestCorner.longitude) / gridColumns;

  //   // // Add the entire grid
  //   // gridPolygons.push({
  //   //   key: `all-grid`,
  //   //   coordinates: [
  //   //     {
  //   //       latitude: northwestCorner.latitude,
  //   //       longitude: northwestCorner.longitude,
  //   //     },
  //   //     {
  //   //       latitude: southeastCorner.latitude,
  //   //       longitude: northwestCorner.longitude,
  //   //     },
  //   //     {
  //   //       latitude: southeastCorner.latitude,
  //   //       longitude: southeastCorner.longitude,
  //   //     },
  //   //     {
  //   //       latitude: northwestCorner.latitude,
  //   //       longitude: southeastCorner.longitude,
  //   //     },
  //   //   ],
  //   //   fillColor: "transparent",
  //   //   strokeColor: "transparent",
  //   //   strokeWidth: 0,
  //   // });

  //   for (let i = 0; i < gridRows; i++) {
  //     for (let j = 0; j < gridColumns; j++) {
  //       if (shouldExcludeCell(i, j)) {
  //         continue;
  //       }

  //       const cellCoordinates = [
  //         {
  //           latitude: northwestCorner.latitude - latStep * i,
  //           longitude: northwestCorner.longitude + lngStep * j,
  //         },
  //         {
  //           latitude: northwestCorner.latitude - latStep * (i + 1),
  //           longitude: northwestCorner.longitude + lngStep * j,
  //         },
  //         {
  //           latitude: northwestCorner.latitude - latStep * (i + 1),
  //           longitude: northwestCorner.longitude + lngStep * (j + 1),
  //         },
  //         {
  //           latitude: northwestCorner.latitude - latStep * i,
  //           longitude: northwestCorner.longitude + lngStep * (j + 1),
  //         },
  //       ];

  //       gridPolygons.push({
  //         key: `row-${i}-col-${j}`,
  //         rowIndex: i,
  //         columnIndex: j,
  //         coordinates: cellCoordinates,
  //         fillColor:  "rgba(0, 0, 0, 0.9)",
  //         strokeColor: "black",
  //         strokeWidth: 1,
  //         explored: false
  //       });
  //     }
  //   }
  //   setGrid(gridPolygons);
  // }; 

  const [markers, setMarkers] = useState([
    {
      id: 1,
      coordinate: { latitude: 34.1184, longitude: -118.3004 }, // Griffith Observatory
      title: "Griffith Observatory",
      description: "Planetarium and Observatory with beautiful views of LA.",
      image: GriffithObservatory,
      unlocked: false
    },
    {
      id: 2,
      coordinate: { latitude: 34.0089, longitude: -118.4974 }, // Santa Monica Pier
      title: "Santa Monica Pier",
      description:
        "Santa Monica Beach's famous pier that includes an amusement park.",
      image: SantaMonicaPier,
      unlocked: false
    },
    {
      id: 3,
      coordinate: { latitude: 34.070897, longitude: -118.445003 }, // Bruin Bear
      title: "Bruin Bear",
      description: "Mascot of the best school in LA!",
      image: BruinBear,
      unlocked: false
    },
    {
      id: 4,
      coordinate: { latitude: 34.1381, longitude: -118.3534 }, // Universal Studios
      title: "Universal Studios",
      description: "The famous Universal Studios Hollywood theme park.",
      image: UniversalStudios,
      unlocked: false
    },
    {
      id: 5,
      coordinate: { latitude: 34.1017, longitude: -118.3314 }, // Walk of Fame
      title: "Walk of Fame",
      description: "The Hollywood Walk of Fame featuring celebrity stars.",
      image: WalkOfFame,
      unlocked: false
    },
    {
      id: 6,
      coordinate: { latitude: 34.1341, longitude: -118.3215 }, // Hollywood Sign
      title: "Hollywood Sign",
      description: "The iconic Hollywood Sign in the Hollywood Hills.",
      image: HollywoodSign,
      unlocked: false
    },
    {
      id: 7,
      coordinate: { latitude: 34.0522, longitude: -118.2571 }, // Crypto Arena
      title: "Crypto.com Arena",
      description: "Home to the Lakers, Clippers, Kings, and Sparks.",
      image: CryptoArena,
      unlocked: false
    },
    {
      id: 8,
      coordinate: { latitude: 34.0736, longitude: -118.24 }, // Dodgers Stadium
      title: "Dodgers Stadium",
      description: "The home stadium of the Los Angeles Dodgers.",
      image: DodgersStadium,
      unlocked: false
    },
    {
      id: 9,
      coordinate: { latitude: 34.0505, longitude: -118.2483 }, // Grand Central Market
      title: "Grand Central Market",
      description: "A historic public market with diverse food vendors.",
      image: GrandCentralMarket,
      unlocked: false
    },
    {
      id: 10,
      coordinate: { latitude: 34.0586, longitude: -118.4175 }, // Century City
      title: "Century City Mall",
      description:
        "120,000 square meter three-level shopping mall in Century City.",
      image: CenturyCity,
      unlocked: false
    },
    {
      id: 11,
      coordinate: { latitude: 34.061909, longitude: -118.447647 }, // Rocco's Tavern
      title: "Rocco's Tavern",
      description:
        "A popular sports bar and restaurant that UCLA students frequent.",
      image: RoccosTavern,
      unlocked: false
    },
  ]);

  function updateMarker(markerId, newDetails) {
    setMarkers(currentMarkers => {
      return currentMarkers.map(marker => {
        if (marker.id === markerId) {
          // Return a new object with the updated details
          return { ...marker, ...newDetails };
        }
        return marker;
      });
    });
  }

  function shouldExcludeCell(rowIndex, columnIndex) {
    // Define the logic to exclude cells (if any)
    if (columnIndex >= 0 && columnIndex <= 3 && rowIndex >= 0 && rowIndex <= 3)
      return true;
    if (columnIndex >= 0 && columnIndex <= 6 && rowIndex >= 5 && rowIndex <= 12)
      return true;
    if (columnIndex >= 0 && columnIndex <= 6 && rowIndex == 2) return true;
    if (columnIndex >= 0 && columnIndex <= 5 && rowIndex == 3) return true;
    if (columnIndex >= 0 && columnIndex <= 7 && rowIndex >= 6 && rowIndex <= 12)
      return true;
    if (columnIndex >= 0 && columnIndex <= 8 && rowIndex >= 8 && rowIndex <= 12)
      return true;
    if (
      columnIndex >= 12 &&
      columnIndex <= 15 &&
      rowIndex >= 11 &&
      rowIndex <= 12
    )
      return true;

    return false; // Include all cells by default
  }

  const updateGridCell = async (rowIndex, columnIndex, newProperties) => {
    // First, update the grid in the local state
    const updatedGrid = grid.map(cell => {
      if (cell.rowIndex === rowIndex && cell.columnIndex === columnIndex) {
        return { ...cell, ...newProperties };
      }
      return cell;
    });
    let exploredCells = 0;
    updatedGrid.forEach((cell) => {
      if (cell.explored){
        exploredCells++;
      }
  });
    exploredCellsPercent = exploredCells / 97;
    setProgress(exploredCellsPercent);
    setGrid(updatedGrid);
    
  
    // Then, send the update to the backend
    try {
      await updateGridCellInBackend(rowIndex, columnIndex, newProperties);
    } catch (error) {
      console.error("Error updating grid cell in backend:", error);
      // Handle error (e.g., rollback the state change or show an error message)
    }
  };

  const updateGridCellInBackend = async (rowIndex, columnIndex, newProperties) => {
    try {
        const payload = { 
            userId, // Assuming you have userId in the component's scope or context
            rowIndex, 
            columnIndex, 
            newProperties 
        };
        await axios.post(`${backendURL}/update_cell`, payload);
    } catch (error) {
        console.error("Error updating cell in backend:", error);
        // Handle error (e.g., show an alert or a message)
    }
};

  const handlePress = useCallback((rowIndex, columnIndex) => {
    updateGridCell(rowIndex, columnIndex, { fillColor: "red" });
    console.log(`clicked ${rowIndex} ${columnIndex}`)
  }, [updateGridCell]);


  const calloutStyles = StyleSheet.create({
    container: {
      flexDirection: "row",
      padding: 10,
      borderRadius: 10,
      backgroundColor: "rgba(255, 255, 255, 0.8)",
      borderColor: "black",
      borderWidth: 3,
      elevation: 4,
    },
    image: {
      width: 100,
      height: 100,
      borderRadius: 5,
      marginRight: 10,
    },
    textContainer: {
      flex: 1,
      justifyContent: "center",
    },
    title: {
      fontWeight: "bold",
      fontSize: 16,
    },
    description: {
      marginTop: 5,
      fontSize: 14,
    },
  });

  const customCalloutStyles = StyleSheet.create({
    container: {
      position: "absolute",
      bottom: "20%",
      left: "5%",
      right: "5%",
      backgroundColor: "rgba(255, 255, 255, 0.8)",
      borderRadius: 10,
      borderWidth: 4,
      borderColor: "black",
      flexDirection: "row",
      padding: 10,
    },
    image: {
      width: 100,
      height: 100,
      borderRadius: 5,
      marginRight: 10,
    },
    textContainer: {
      flex: 1,
      justifyContent: "center",
    },
    title: {
      fontWeight: "bold",
      fontSize: 16,
    },
    description: {
      marginTop: 5,
      fontSize: 14,
    },
  });

  const [responseMessage, setResponseMessage] = useState('');

  const sendDataToServer = async () => {
    try {
      const response = await axios.post(backendURL + "/test", {
        // Your data here
        key: 'value'
      });

      setResponseMessage(response.data.message);
    } catch (error) {
      console.error('Error sending data to server:', error);
      setResponseMessage('Failed to send data');
    }
  };

  // useEffect(() => {
  //   const progressInterval = setInterval(() => {
  //     setProgress((prevProgress) =>
  //       prevProgress < 1 ? prevProgress + 0.1 : 0
  //     );
  //   }, 1000);
  //   return () => clearInterval(progressInterval);
  // }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={region}
        provider="google"
        customMapStyle={darkMode}
        showsUserLocation={true}
      >
        {grid.map((cell) => (
          <Polygon
            key={cell.key}
            coordinates={cell.coordinates}
            fillColor={cell.fillColor}
            strokeWidth={cell.strokeWidth}
          />
        ))}
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            coordinate={marker.coordinate}
            pinColor={marker.unlocked || achievements.includes(marker.title) ? "green" : "red"}
            onPress={() => setSelectedMarker(marker)}
          />
        ))}
      </MapView>
      {selectedMarker && (
        <View style={customCalloutStyles.container}>
          <Image
            source={selectedMarker.image}
            style={customCalloutStyles.image}
          />
          <View style={customCalloutStyles.textContainer}>
            <Text style={customCalloutStyles.title}>
              {selectedMarker.title}
            </Text>
            <Text style={customCalloutStyles.description}>
              {selectedMarker.description}
            </Text>
          </View>
          <TouchableOpacity onPress={() => setSelectedMarker(null)}>
            <Text>Close</Text>
          </TouchableOpacity>
        </View>
      )}
      <View style = {styles.progressBarContainer}> 
        <Text style={styles.text}> Map Progress: {Math.round(progress * 100)}%</Text>
        <ProgressBar
          progress={progress}
          width={350}
          height={25}
          color="#229631" // Green color
          borderColor="#999999"
          borderRadius={20}
          borderWidth = {5}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={uploadImage}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
      {/* MODAL FOR CREATE A POST SCREEN */}
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
            <AntDesign
              name="close"
              size={24}
              color="white"
              style={styles.closeIcon}
            />
          </TouchableOpacity>
          <View style={styles.inputContainer}>
            <FontAwesome5
              name="search-location"
              size={24}
              color="black"
              style={styles.searchIcon}
            />
            <GooglePlacesAutocomplete
              placeholder="Location"
              textInputProps={{
                placeholderTextColor: "black",
                fontWeight: "bold",
              }}
              fetchDetails={true}
              GooglePlacesSearchQuery={{
                rankby: "distance",
              }}
              onPress={(data, details = null) => {
                // 'details' is provided when fetchDetails = true
                setLocation(data.description);
                setRegion({
                  latitude: details.geometry.location.lat,
                  longitude: details.geometry.location.lng,
                  latitudeDelta: 0.6,
                  longitudeDelta: 0.6,
                });
              }}
              query={{
                key: "AIzaSyD58-uL1gyPimM8hn1lu6pb_Sw_ZDgYVno",
                language: "en",
                components: "country:us",
                radius: 40000,
                location: { latitude: 34.0522, longitude: -118.2437 },
              }}
              styles={{
                container: {
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  zIndex: 1, // Ensure the Autocomplete is above the map
                  marginTop: 5,
                },
                textInput: {
                  color: "black",
                },
              }}
            />
          </View>

          <View style={styles.imageContainer}>
            {imageUrl ? (
              <Image source={{ uri: imageUrl }} style={styles.image} />
            ) : (
              <View style={styles.placeholderImage} />
            )}
          </View>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.captionContainer}
          >
            <TextInput
              style={[styles.input, styles.captionInput]}
              placeholder="Caption"
              value={caption}
              onChangeText={setCaption}
            />
          </KeyboardAvoidingView>
          <TouchableOpacity
            style={styles.instagramButton}
            onPress={onPostSubmit}
          >
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
    width: "80%",
    height: 300,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
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
    marginTop: 15,
    marginBottom: 40,
    zIndex: 1,
  },
  input: {
    height: 40,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 0,
    marginTop: 10,
    color: "white",
  },
  instagramButton: {
    backgroundColor: "#333666",
    paddingVertical: 15,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
    marginTop: -60,
  },
  instagramButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  captionInput: {
    width: "100%", // Make the input take the full width of the parent container
  },
  searchIcon: {
    position: "absolute",
    top: 15,
    left: 280,
    zIndex: 2,
    backgroundColor: "transparent", // Make the icon background transparent
  },
  captionContainer: {
    width: "80%",
    marginTop: -380,
    marginBottom: 440,
    zIndex: 1,
  },
  closeIcon: {
    position: "absolute",
    top: 15,
  },
  progressBarContainer: {
    position: "absolute",
    top: 50, // Adjust the distance from the bottom as needed
  // Adjust the distance from the left as needed
    backgroundColor: "rgba(255, 255, 255, 0)", // Semi-transparent white background
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  text: {
    marginBottom: 5,
    color: "#999999", // White color for text
    fontWeight: "bold",
    left: -5,
  },
});

export default MapScreen;