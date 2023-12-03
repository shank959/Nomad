import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Image } from 'react-native';
import MapView from 'react-native-maps';
import * as ImagePicker from 'expo-image-picker';

function MapScreen({ navigation }) {
    const [region, setRegion] = useState({
        latitude: 34.0549,
        longitude: -118.2426,
        latitudeDelta: 0.6,
        longitudeDelta: 0.6,
    });
    const [imageUri, setImageUri] = useState(null);

    useEffect(() => {
        (async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
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
        }
    };

    const navigateToCreatePost = () => {
        // Navigate to the CreatePost screen
        navigation.navigate("CreatePostScreen", { screen: "CreatePostScreen" });
      };


    return (
        <View style={styles.container}>
            <MapView 
                style={styles.map} 
                initialRegion={region}
                provider="google"
            />
            <View style={styles.imageContainer}>
                {imageUri ? (
                    <Image source={{ uri: imageUri }} style={styles.image} />
                ) : (
                    <View style={styles.placeholderImage} />
                )}
            </View>
            <TouchableOpacity style={styles.button} onPress={navigateToCreatePost}>
                <Text style={styles.buttonText}>Create Post</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={uploadImage}>
                <Text style={styles.buttonText}>Select Photos</Text>
            </TouchableOpacity>
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
        backgroundColor: "black",
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    buttonText: {
        color: "white",
        textAlign: "center",
    },
    imageContainer: {
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 10,
    },
    placeholderImage: {
        width: 100,
        height: 100,
        backgroundColor: '#e1e1e1',
        borderRadius: 10,
    },
});

export default MapScreen;