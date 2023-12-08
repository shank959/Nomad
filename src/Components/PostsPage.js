// Import React and any other necessary modules
import React, { useState, useEffect} from 'react';
import { FlatList, View, Text, Image, SafeAreaView, StyleSheet, LogBox } from 'react-native';
import axios from 'axios';

import { useUser } from '../../UserContext';

const PostsPage = () => {
    const [userPosts, setUserPosts] = useState([]);
    const { userId, backendURL } = useUser();

    useEffect(() => {
        fetchUserPosts();
    }, []);

    const fetchUserPosts = async () => {
        try {
            const response = await axios.get(`${backendURL}/posts`);
            const posts = response.data.filter(post => post.author === userId); // Filter posts by the current user's ID
            setUserPosts(posts);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    const renderItem = ({ item }) => (
        <View style={styles.postContainer}>
            <Image source={{ uri: item.imageUrl }} style={styles.postImage} />
            <View style={styles.captionContainer}>
                <Text style={styles.boldText}>{item.authorUsername} </Text>
                <Text style={styles.caption}>{item.caption}</Text>
            </View>
            <View style={styles.divider} />
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={userPosts}
                renderItem={renderItem}
                keyExtractor={item => item._id.toString()}
            />
        </SafeAreaView>
    );
};



const styles = StyleSheet.create({
    image: {
      width: '100%', // You can adjust the width as needed
      height: 200,    // Adjust the height as needed
      marginBottom: 10,
      resizeMode: 'cover' // Or 'contain', depending on your needs
    },
    container: {
        flex: 1,
    },
    postContainer: {
        flexDirection: 'column',
        marginBottom: 10,
    },
    postImage: {
        width: '100%',
        aspectRatio: 1,
        marginBottom: 10,
    },
    captionContainer: {
        flexDirection: 'row',
        padding: 7,
        marginLeft: 8,
        alignItems: 'center',
    },
    caption: {
        fontSize: 16,
        color: 'white',
        flexShrink: 1,
    },
    boldText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: 'white',
    },
    divider: {
    height: 1,
    backgroundColor: 'gray',
    marginVertical: 8,
    },
});LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
export default PostsPage;