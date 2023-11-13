import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

function ProfileScreen({ navigation }) {
    return (
        <View style={styles.view}>
            <Text style={styles.titleText}>Profile Screen</Text>
            <View style={styles.buttonContainer}>
                <Button
                    title="Posts"
                    onPress={() => navigation.navigate('Posts')} // Replace 'Posts' with the actual route name
                />
                <Button
                    title="Friends"
                    onPress={() => navigation.navigate('Friends')} // Replace 'Friends' with the actual route name
                />
                <Button
                    title="badges"
                    onPress={() => navigation.navigate('Badges')} // Replace 'Achievements' with the actual route name
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#333366", 
    },
    titleText: {
        fontSize: 30,
        color: "white", // Changed to white for better visibility on black background
        marginBottom: 60, // Added some margin at the bottom
    },
    buttonContainer: {
        width: '80%', // Set width of the button container to 80% of the screen width
        justifyContent: 'space-around', // Distributes buttons evenly in the container
        height: 150, // Fixed height for the container
    },
})

export default ProfileScreen;
