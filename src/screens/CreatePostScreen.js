import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const CreatePostScreen = () => {
  const [caption, setCaption] = useState('');

  const testData = {
    caption: 'test test'
  }

  const createPost = async () => {
    try {
        const postData = { caption };
        const response = await axios.post('http://172.20.10.2:3000/posts', testData);
      
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