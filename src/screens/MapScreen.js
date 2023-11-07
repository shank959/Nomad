import React, { useState } from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, View, Text } from 'react-native';

function MapScreen({ navigation }) {
    const [region, setRegion] = useState({
        latitude: 34.0549,
        longitude: -118.2426,
        latitudeDelta: 0.6,
        longitudeDelta: 0.6,
    });

    return (
        <View style={styles.container} >

            <MapView 
                style={styles.map} 
                initialRegion={region}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        //...StyleSheet.absoluteFillObject,
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    map: {
        //...StyleSheet.absoluteFillObject,
        width: "100%",
        height: "100%",
    },
});

export default MapScreen;