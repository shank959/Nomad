import React, { useState } from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, View, Text } from 'react-native';

// access Native module for importing photos
    // NativeModules is an object provided by React Native that 
    // serves as a bridge to access any native modules
import { NativeModules } from 'react-native';
const { PhotoKitModule } = NativeModules;

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
                provider="google"
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