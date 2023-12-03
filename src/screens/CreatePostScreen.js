import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const CreatePostScreen = () => {
  const [caption, setCaption] = useState('');

  const createPost = async () => {
    try {
      const postData = { caption };
      const response = await axios.post('http://localhost:3000/api/posts', postData);
      
      Alert.alert('Success', 'Post created successfully');
      setCaption(''); // Reset caption input after successful post
      // Handle additional tasks after successful post creation
    } catch (error) {
      console.error('Error creating post:', error);
      Alert.alert('Error', 'Failed to create post');
      // Handle the error case
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
