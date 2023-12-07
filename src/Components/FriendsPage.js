// Import React and any other necessary modules
import React, { useState } from 'react';
import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useUser } from '../../UserContext'
import { Octicons } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons'; 



const friendsPlaceholders = Array.from({ length: 20 }, (_, index) => `Friend`);

// Define your component
const FriendsPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const { backendURL } = useUser();
    const [emojiStatus, setEmojiStatus] = useState(new Array(friendsPlaceholders.length).fill(false));
    const handleSearch = async (text) => {
        setSearchQuery(text);
        if (text === '') {
            setSearchResults([]);
        } else {
            try {
                const response = await fetch(backendURL + "/search", {
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

    //toggle emoji status
    const toggleEmoji = index => {
        setEmojiStatus(currentStatus => currentStatus.map((status, idx ) => (idx === index ? !status : status)));
    };


    return (
        <View style={styles.container}>
            <TextInput 
                placeholder="Add Friends"
                placeholderTextColor='#D3D3D3'
                style={styles.searchBar}
                onChangeText={handleSearch}
                value={searchQuery}
            />
            {searchQuery.length === 0 
                ? friendsPlaceholders.map((friendName, index) => (
                    <View key={index} style={styles.friendBox}>
                        <Image 
                            source={{ uri: 'https://i.redd.it/zuqwgy86xsa41.jpg' }} 
                            style={styles.profilePic}
                        />
                        <Text style={styles.friendItem}>
                            {friendName} {index + 1}
                        </Text>
                        <TouchableOpacity onPress={() => toggleEmoji(index)}>
                            {emojiStatus[index] 
                                ? <Octicons name="smiley" size={24} color="white" />
                                : <Entypo name="emoji-neutral" size={24} color="white" />
                            }
                        </TouchableOpacity>
                    </View>
                ))
                : searchResults.map((user, index) => (
                    <View key={index} style={styles.friendBox}>
                        {/* Display search results */}
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