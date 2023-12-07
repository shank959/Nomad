// Import React and any other necessary modules
import React, { useState, useEffect } from 'react';
import { FlatList, SafeAreaView, StyleSheet} from 'react-native';
import axios from 'axios';

import PostRowView from './PostRowView';
import { useUser } from '../../UserContext';

// Define your component
const PostsPage = () => {
    const [userPosts, setUserPosts] = useState([]);
    const { userId, backendURL } = useUser();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.post(`${backendURL}/get_user_data`, { userId });
                const userData = response.data.user;
                fetchUserPosts(userData.posts);
            } catch (error) {
                // Something happened in setting up the request that triggered an Error
                console.error('Error message:', error.message);
                }
            };
    
        if (userId) {   // initializes this effect when the user logs in
            fetchUserData();
        }
    }, [userId]);

    const fetchUserPosts = async (postIds) => {
        try {
            const postsResponses = await Promise.all(
                postIds.map(id => axios.post(`${backendURL}/get_user_posts`, { postId: id }))
            );
            const posts = postsResponses.map(response => response.data || []);
            setUserPosts(posts);
        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code that falls out of the range of 2xx
                console.error('Error response:', error.response.data);
                console.error('Error status:', error.response.status);
            } else if (error.request) {
                // The request was made but no response was received
                console.error('Error request:', error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error('Error message:', error.message);
            }
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            {userPosts && userPosts.map(post => (
                <PostRowView key={post._id.toString()} post={post} />
            ))}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    image: {
      width: '100%', // You can adjust the width as needed
      height: 200,    // Adjust the height as needed
      marginBottom: 10,
      resizeMode: 'cover' // Or 'contain', depending on your needs
    }
});


export default PostsPage;