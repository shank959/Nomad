// Import React and any other necessary modules
import React, { useState } from 'react';
import { View, Text, Image, TextInput, StyleSheet } from 'react-native';
import { useUser } from '../../UserContext';

// Define your component
const FriendsPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const { backendURL } = useUser();

    const handleSearch = async (text) => {
        setSearchQuery(text);
        if (text === '') {
            setSearchResults([]);
        } else {
            try {
                const response = await fetch(`${backendURL}/search`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ query: text }),
                });
                const data = await response.json();
                setSearchResults(data.users);
            } catch (error) {
                console.error(error);
            }
        }
    };


    return (
        <View style={styles.container}>
            <TextInput 
                placeholder="Search Users"
                placeholderTextColor='#D3D3D3'
                style={styles.searchBar}
                onChangeText={handleSearch}
                value={searchQuery}
            />
            {searchResults.map((user, index) => (
                    <View key={index} style={styles.friendBox}>
                        <Image
                            source={user.authorPFPURL ? { uri: user.authorPFPURL } : require('../../assets/icon.png')}
                            style={styles.profilePic}
                          />
                        <Text style={styles.friendItem}>
                            {user.username}
                        </Text>
                    </View>
                ))
            }
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
        width: 50, 
        height: 50, 
        borderRadius: 25, // make profile picture circular
        marginLeft: -20,
        marginRight: 20, 
    },
    friendItem: {
        color: 'white',
        fontSize: 20,
        lineHeight: 50,
    },
});

// Export the component
export default FriendsPage;