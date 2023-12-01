import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Polygon } from 'react-native-maps';

function MapScreen({ navigation }) {
    const [region, setRegion] = useState({
        latitude: 34.0522,  // Center latitude for Los Angeles
        longitude: -118.2437,  // Center longitude for Los Angeles
        latitudeDelta: 0.6,  // Latitude delta for map
        longitudeDelta: 0.6,  // Longitude delta for map
    });

    const createGrid = () => {
        const gridPolygons = [];
        const gridRows = 10;  // Number of rows in the grid
        const gridColumns = 10;  // Number of columns in the grid

        const northwestCorner = { latitude: 34.215635, longitude: -118.639871 }; // Adjusted for larger grid
        const southeastCorner = { latitude: 33.750811, longitude: -118.112570}; // Adjusted for larger grid

        // Steps in latitude and longitude for each grid cell
        const latStep = (northwestCorner.latitude - southeastCorner.latitude) / gridRows;
        const lngStep = (southeastCorner.longitude - northwestCorner.longitude) / gridColumns;

        for (let i = 0; i < gridRows; i++) {
            for (let j = 0; j < gridColumns; j++) {

                if (shouldExcludeCell(i, j)) {
                    continue; // Skip the rest of the current loop iteration
                }

                const cellCoordinates = [
                    { latitude: northwestCorner.latitude - latStep * i, longitude: northwestCorner.longitude + lngStep * j },
                    { latitude: northwestCorner.latitude - latStep * (i + 1), longitude: northwestCorner.longitude + lngStep * j },
                    { latitude: northwestCorner.latitude - latStep * (i + 1), longitude: northwestCorner.longitude + lngStep * (j + 1) },
                    { latitude: northwestCorner.latitude - latStep * i, longitude: northwestCorner.longitude + lngStep * (j + 1) }
                ];

                gridPolygons.push(
                    <Polygon 
                        key={`row-${i}-col-${j}`} 
                        coordinates={cellCoordinates} 
                        strokeColor="black" 
                        fillColor="rgba(255,0,0,0.3)" 
                    />
                );
            }
        }
        return gridPolygons;
    };

    function shouldExcludeCell(rowIndex, columnIndex) {
        // Define your logic here to exclude cells
        // For example, exclude the first row:
      if (columnIndex >= 0 && columnIndex <= 2 && rowIndex >= 5 && rowIndex <= 9) return true;
      if (columnIndex >= 0 && columnIndex <= 1 && rowIndex >= 4 && rowIndex <= 6) return true;
      if (columnIndex >= 0 && columnIndex <= 3 && rowIndex >= 6 && rowIndex <= 9) return true;
    
        // Add more conditions as needed
        // ...
    
        return false; // Include the cell by default
    }

    return (
        <View style={styles.container}>
            <MapView 
                style={styles.map} 
                initialRegion={region}
                provider="google"
            >
                {createGrid()}
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
