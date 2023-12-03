// Import React and any other necessary modules
import React from 'react';
import { View, Text, Image, TextInput, StyleSheet } from 'react-native';

// placeholder data for friends (haven't implemented backend to
// fetch actual friend data yet)
const friendsPlaceholders = Array.from({ length: 20 }, (_, index) => `Friend`);


// Define your component
const FriendsPage = () => {
    return (
        <View style={styles.container}>
            <TextInput 
                placeholder="Add Friends"
                placeholderTextColor='#D3D3D3'
                style={styles.searchBar}
            />
            {friendsPlaceholders.map((friendName, index) => (
                <View key={index} style={styles.friendBox}>
                    <Image 
                        source={{ uri: 'https://i.redd.it/zuqwgy86xsa41.jpg' }} // Placeholder image URL
                        style={styles.profilePic}
                    />
                    <Text style={styles.friendItem}>
                        {friendName} {index + 1}
                    </Text>
                </View>
            ))}
        </View>
    );
};

// Define the StyleSheet
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
        width: '100%',
    },
    searchBar: {
        width: '90%',
        height: 40,
        backgroundColor: 'black',
        borderRadius: 50,
        padding: 10,
        marginVertical: 10,
        marginLeft: -10,
        marginBottom: 20,
        color: 'white',
        borderWidth: 2,
        borderColor: 'white',
    },
    friendBox: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        padding: 15,
        marginVertical: 5,
        width: '90%', 
        alignItems: 'left',
        backgroundColor: 'black', 
    },
    profilePic: {
        width: 50, // Set width of the image
        height: 50, // Set height of the image
        borderRadius: 25, // Make it circular
        marginLeft: -20,
        marginRight: 20, // Add some margin to the right
    },
    friendItem: {
        color: 'white',
        fontSize: 20,
        lineHeight: 50,
    },
});

// Export the component
export default FriendsPage;