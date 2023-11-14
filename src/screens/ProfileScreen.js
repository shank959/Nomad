import React, {useState} from 'react';
import {View, StyleSheet, ScrollView } from 'react-native';
import { ProfileScreenNavigation } from '../Components/ProfileScreenNavigation';
import PostsPage from '../Components/PostsPage';
import FriendsPage from '../Components/FriendsPage';
import BadgesPage from '../Components/BadgesPage';

function ProfileScreen() {
    const [selectedTab, setSelectedTab] = useState('Posts');

    const handleTabSelect = (tabName) => {
        setSelectedTab(tabName);
      };
    
    return (
        <View style={styles.outerContainer}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <ProfileScreenNavigation onTabSelect = {handleTabSelect}/>
                {selectedTab === 'Posts' && <PostsPage />}
                {selectedTab === 'Friends' && <FriendsPage />}
                {selectedTab === 'Badges' && <BadgesPage />}
            </ScrollView>
        </View>
    );

}

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
        backgroundColor: 'black', // The background color of the screen
    },
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'center', // Center the children vertically
        alignItems: 'center', // Center the children horizontally
    },

});

export default ProfileScreen;
