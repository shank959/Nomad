import React from 'react';
import { FlatList, View, SafeAreaView } from 'react-native';
import PostRowView from '../Components/PostRowView';

const FeedScreen = () => {
  // Create an array of dummy data to represent the posts
  const postData = Array.from({ length: 20 }, (_, index) => index + 1);

  // Render each PostRowView in a FlatList
  const renderItem = ({ item }) => <PostRowView key={item} />;

  return (
    <SafeAreaView>
        <FlatList
      data={postData}
      renderItem={renderItem}
      keyExtractor={(item) => item.toString()}
      // Adding extra props for performance optimization
      // Remove comments below for better performance in large lists
      // initialNumToRender={10} // Adjust the number to render only a few items on initial mount
      // maxToRenderPerBatch={5} // Adjust the number for how many items to render in each batch
      // windowSize={5} // Adjust the size of the render window (the number of items to render above and below the viewport)
        />
    </SafeAreaView>
    
  );
};

export default FeedScreen;
