import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import MapView, { Polygon, Marker, Callout } from "react-native-maps";
import * as Location from 'expo-location';
import CenturyCity from '../../assets/century-city2.png';
import GriffithObservatory from '../../assets/griffith-observatory2.jpeg';
import BruinBear from '../../assets/bruin-bear.jpg';
import CryptoArena from '../../assets/crypto-arena2.jpeg';
import DodgersStadium from '../../assets/dodgers-stadium.jpeg';
import GrandCentralMarket from '../../assets/grand-central-market.jpeg';
import HollywoodSign from '../../assets/hollywood-sign2.jpeg';
import RoccosTavern from '../../assets/roccos-tavern2.jpeg';
import SantaMonicaPier from '../../assets/santa-monica-pier2.jpeg';
import UniversalStudios from '../../assets/universal-studios.jpeg';
import WalkOfFame from '../../assets/walk-of-fame2.jpeg';

function MapScreen({ navigation }) {
  const [region, setRegion] = useState({
    latitude: 34.0522,
    longitude: -118.2437,
    latitudeDelta: 0.6,
    longitudeDelta: 0.6,
  });

  useEffect(() => {
    let locationSubscription;

    const subscribeToLocationUpdates = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            console.error('Permission to access location was denied');
            return;
        }

        locationSubscription = await Location.watchPositionAsync({
            accuracy: Location.Accuracy.High,
            timeInterval: 15000, // Update every 15000 milliseconds (15 seconds)
            distanceInterval: 50 , // Or specify distance in meters
        }, (location) => {
            console.log(location);
            // Do something with the updated location...
        });
    };

    subscribeToLocationUpdates();

    return () => {
        if (locationSubscription) {
            locationSubscription.remove();
        }
    };
}, []);

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
      (columnIndex === 3 && rowIndex === 7) || // Example condition
      (columnIndex === 6 && rowIndex === 5) // Another example condition
      // Add more conditions as needed
    );
  };

  const createGrid = () => {
    const gridPolygons = [];
    const gridRows = 10;
    const gridColumns = 10;

    const northwestCorner = { latitude: 34.215635, longitude: -118.639871 };
    const southeastCorner = { latitude: 33.750811, longitude: -118.11257 };

    const latStep =
      (northwestCorner.latitude - southeastCorner.latitude) / gridRows;
    const lngStep =
      (southeastCorner.longitude - northwestCorner.longitude) / gridColumns;

    // Add the entire grid
    gridPolygons.push(
      <Polygon
        key={`all-grid`}
        coordinates={[
          {
            latitude: northwestCorner.latitude,
            longitude: northwestCorner.longitude,
          },
          {
            latitude: southeastCorner.latitude,
            longitude: northwestCorner.longitude,
          },
          {
            latitude: southeastCorner.latitude,
            longitude: southeastCorner.longitude,
          },
          {
            latitude: northwestCorner.latitude,
            longitude: southeastCorner.longitude,
          },
        ]}
        strokeColor="transparent"
        fillColor="transparent"
      />
    );

    for (let i = 0; i < gridRows; i++) {
      for (let j = 0; j < gridColumns; j++) {
        if (shouldExcludeCell(i, j)) {
          continue;
        }

        const cellCoordinates = [
          {
            latitude: northwestCorner.latitude - latStep * i,
            longitude: northwestCorner.longitude + lngStep * j,
          },
          {
            latitude: northwestCorner.latitude - latStep * (i + 1),
            longitude: northwestCorner.longitude + lngStep * j,
          },
          {
            latitude: northwestCorner.latitude - latStep * (i + 1),
            longitude: northwestCorner.longitude + lngStep * (j + 1),
          },
          {
            latitude: northwestCorner.latitude - latStep * i,
            longitude: northwestCorner.longitude + lngStep * (j + 1),
          },
        ];

        if (shouldLightenCell(i, j)) {
          gridPolygons.push(
            <Polygon
              key={`row-${i}-col-${j}`}
              coordinates={cellCoordinates}
              strokeColor="black"
              fillColor="rgba(255, 255, 0, 1)"
            />
          );
        }
      }
    }
    return gridPolygons;
  };

  const markers = [
    {
      id: 1,
      coordinate: { latitude: 34.1184, longitude: -118.3004 }, // Griffith Observatory
      title: "Griffith Observatory",
      description: "Planetarium and Observatory with beautiful views of LA.",
      image: GriffithObservatory,
    },
    {
      id: 2,
      coordinate: { latitude: 34.0089, longitude: -118.4974 }, // Santa Monica Pier
      title: "Santa Monica Pier",
      description: "Santa Monica Beach's famous pier that includes an amusement park.",
      image: SantaMonicaPier,
    },
    {
      id: 3,
      coordinate: { latitude: 34.070897, longitude: -118.445003 }, // Bruin Bear
      title: "Bruin Bear",
      description: "Mascot of the best school in LA!",
      image: BruinBear,
    },
    {
      id: 4,
      coordinate: { latitude: 34.1381, longitude: -118.3534 }, // Universal Studios
      title: "Universal Studios",
      description: "The famous Universal Studios Hollywood theme park.",
      image: UniversalStudios,
    },
    {
      id: 5,
      coordinate: { latitude: 34.1017, longitude: -118.3314 }, // Walk of Fame
      title: "Walk of Fame",
      description: "The Hollywood Walk of Fame featuring celebrity stars.",
      image: WalkOfFame,
    },
    {
      id: 6,
      coordinate: { latitude: 34.1341, longitude: -118.3215 }, // Hollywood Sign
      title: "Hollywood Sign",
      description: "The iconic Hollywood Sign in the Hollywood Hills.",
      image: HollywoodSign,
    },
    {
      id: 7,
      coordinate: { latitude: 34.0522, longitude: -118.2571 }, // Crypto Arena
      title: "Crypto.com Arena",
      description: "Home to the Lakers, Clippers, Kings, and Sparks.",
      image: CryptoArena,
    },
    {
      id: 8,
      coordinate: { latitude: 34.0736, longitude: -118.24 }, // Dodgers Stadium
      title: "Dodgers Stadium",
      description: "The home stadium of the Los Angeles Dodgers.",
      image: DodgersStadium
    },
    {
      id: 9,
      coordinate: { latitude: 34.0505, longitude: -118.2483 }, // Grand Central Market
      title: "Grand Central Market",
      description: "A historic public market with diverse food vendors.",
      image: GrandCentralMarket,
    },
    {
      id: 10,
      coordinate: { latitude: 34.0586, longitude: -118.4175 }, // Century City
      title: "Century City Mall",
      description: "120,000 square meter three-level shopping mall in Century City.",
      image: CenturyCity,
    },
    {
      id: 11,
      coordinate: { latitude: 34.061909, longitude: -118.447647 }, // Rocco's Tavern
      title: "Rocco's Tavern",
      description: "A popular sports bar and restaurant that UCLA students frequent.",
      image: RoccosTavern,
    },
  ];


  function shouldExcludeCell(rowIndex, columnIndex) {
    // Define the logic to exclude cells (if any)
    return false; // Include all cells by default
  }
  const calloutStyles = StyleSheet.create({
    container: {
      padding: 10,
      borderRadius: 5,
      backgroundColor: "#fff",
      elevation: 4,
    },
    title: {
      fontWeight: "bold",
      fontSize: 16,
    },
    description: {
      marginTop: 5,
      fontSize: 14,
    },  image: {
        width: 100,
        height: 100,
        borderRadius: 5,
    },
  });
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={region}
        provider="google"
        customMapStyle={darkMode}
        showsUserLocation = {true}
      >
        {createGrid()}
        {/* Add markers with callouts */}
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            coordinate={marker.coordinate}
            title={marker.title}
            description={marker.description}
          >
            <Callout style ={{width: 316, backgroundColor: 'white'}}>
              <View> 
              <Image
                source={marker.image} // URL of the image
                style={calloutStyles.image}
               />
                <Text style={calloutStyles.title}> {marker.title}</Text>
                <Text style={calloutStyles.description}> {marker.description}</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
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
});

export default MapScreen;
