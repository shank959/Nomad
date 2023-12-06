import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, AntDesign, FontAwesome, FontAwesome5, Feather } from '@expo/vector-icons';

const PostRowView = ({post}) => {
  // Arrow Functions to handle button presses defined here
  const {
    imageUrl,
    caption,
    location,
    coordinates,
    author,
  } = post;
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../../assets/icon.png')}
          style={styles.profilePic}
        />
        <View style={styles.profileDetails}>
          <View style={styles.nameRow}>
            <Text style={styles.boldText}>@{post.author}</Text>
            <Text style={styles.grayText}>16h</Text>
          </View>
          <TouchableOpacity onPress={() => {/* view location button action */}}>
            <View style={styles.locationRow}>
              <Ionicons name="location-sharp" size={16} color="black" />
              <Text style={{marginLeft: 3}}>{post.location}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <Image
        source={{uri: post.imageUrl}}
        style={styles.postImage}
      />

      <View style={styles.actionsRow}>
        <TouchableOpacity style={styles.actionRowButton} onPress={() => {/* like button action */}}>
          <AntDesign name="hearto" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionRowButton} onPress={() => {/* comment button action */}}>
          <FontAwesome name="comment-o" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionRowButton} onPress={() => {/* share button action */}}>
          <Feather name="share" size={24} color="black" />
        </TouchableOpacity>
        <View style={{ flex: 1 }} />
        <TouchableOpacity style={styles.actionRowButton} onPress={() => {/* see location button action */}}>
          <Ionicons name="location-sharp" size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionRowButton} onPress={() => {/* toGo button action */}}>
          <FontAwesome5 name="clipboard-list" size={28} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.divider} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 12,
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  profileDetails: {
    flex: 1,
    marginLeft: 10,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  boldText: {
    fontWeight: 'bold',
  },
  grayText: {
    color: 'gray',
    marginLeft: 10,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  postImage: {
    width: '100%',
    aspectRatio: 1, // Adjust the aspect ratio according to needs
    marginBottom: 10,
    borderWidth: 2,
    borderColor: 'black',
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "center",
    padding: 8,
  },
  actionRowButton: {
    marginHorizontal: 10,
  },
  divider: {
    height: 1,
    backgroundColor: 'gray',
    marginVertical: 8,
  },
});

export default PostRowView;
