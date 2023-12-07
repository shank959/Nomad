import React, { useState, useEffect } from 'react';
import { FlatList, View, SafeAreaView, Image, StyleSheet} from 'react-native';
import PostRowView from '../Components/PostRowView';
import axios from 'axios';
import { useUser } from "../../UserContext"

const FeedScreen = () => {
  // State to store fetched posts after initialr edenrings
  const [postData, setPostData] = useState([]);
  const { backendURL } = useUser();


  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${backendURL}/posts`);
        const sortedPosts = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setPostData(sortedPosts); // updates state with fetched shit
      } catch (error) {
        console.error('Error fetching posts:', error); 
      }
    };

    fetchPosts();
  }, []); // ensures effect runs once, after initial render

  // Render each PostRowView in a FlatList
  const renderItem = ({ item }) => ( // rudimentary render for now
    <PostRowView post={item} />
  );

  return (
    <SafeAreaView>
        <FlatList
          data={postData}
          renderItem={renderItem}
          keyExtractor={(item) => item._id.toString()}
      // Adding extra props for performance optimization
      // Remove comments below for better performance in large lists
      // initialNumToRender={10} // Adjust the number to render only a few items on initial mount
      // maxToRenderPerBatch={5} // Adjust the number for how many items to render in each batch
      // windowSize={5} // Adjust the size of the render window (the number of items to render above and below the viewport)
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

export default FeedScreen;
