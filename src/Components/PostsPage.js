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
                const response = await axios.post(backendURL + "/users", { userId });
                const postIds = response.data.posts;
                console.log(postIds)
                //fetchUserPosts(postIds);
            } catch (error) {
                // Something happened in setting up the request that triggered an Error
                console.error('Error message:', error.message);
                }
            };
    
        if (userId) {
            fetchUserData();
        }
    }, [userId]);

    const fetchUserPosts = async (postIds) => {
        try {
            const posts = await Promise.all(postIds.map(id => axios.get(`/posts/${id}`)));
            setUserPosts(posts.map(response => response.data));
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    const renderItem = ({ item }) => (
        <PostRowView post={item} />
    );

    return (
        <SafeAreaView>
            <FlatList
              data={userPosts}
              renderItem={renderItem}
              keyExtractor={(item) => item._id.toString()}
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
    }
});


export default PostsPage;