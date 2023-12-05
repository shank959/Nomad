import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const CreatePostScreen = () => {

  // Configuring States
  const [imageUrl, setImageUrl] = useState(null);
  const [caption, setCaption] = useState(null);
  const [location, setLocation] = useState(null);


  const onPostSubmit = () => {

    // function to get image url from uplaoded image
    // setImageUrl(uploadImageToStorage());

    // function to get coordinated from location string
    // const coordinates = getCoord(location);

    // function to retrieve id of user
    // const author = getUserID();

    const postContent = {
      imageUrl,
      caption,
      location,
      coordinates,
      author
    };

    createPost(postContent)
  };


  const createPost = async (postContent) => {
    try {
        const response = await axios.post('http://172.20.10.10:3000/posts', postContent);
      
        Alert.alert('Success', 'Post created successfully');
        setCaption(''); // Reset caption input after successful post
        // Handle additional tasks after successful post creation
    } catch (error) {
        // Handle the error case
        console.error('Error creating post:', error.response ? error.response.data : error);
        Alert.alert('Error', 'Failed to create post: ' + (error.response ? error.response.data : error.message));
      }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        multiline
        placeholder="Enter your caption"
        value={caption}
        onChangeText={setCaption}
      />
      <Button title="Create Post" onPress={createPost} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    width: '100%',
    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
  },
  // Additional styles can be added here
});

export default CreatePostScreen;