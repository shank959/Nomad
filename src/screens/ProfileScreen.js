import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { ProfileScreenNavigation } from '../Components/ProfileScreenNavigation';

function ProfileScreen({ navigation }) {
    return (
        <View style={styles.outerContainer}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <ProfileScreenNavigation navigation={navigation}/>
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
