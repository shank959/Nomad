
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { ProfileScreenNavigation } from '../Components/ProfileScreenNavigation';
import { Feather } from '@expo/vector-icons';

function ProfileScreen({ navigation }) {
    return (
        <View style={styles.outerContainer}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                 {/*Prof Pic:*/}
                <View style={styles.profilePicPlaceholder} />

                {/*Settings Button:*/}
                <TouchableOpacity style={styles.settingsIcon} onPress={() => navigation.navigate('Settings')} >
                    <Feather name="settings" size={24} color="white" />
                </TouchableOpacity>

                <Text style={styles.username}>@username</Text>

                <View style={styles.statsContainer}>
                    {/* Friends count */}
                    <View style={styles.statItem}>
                        <Text style={styles.statNumber}>0</Text>
                        <Text style={styles.statLabel}>Friends</Text>
                    </View>
                    {/* Badges count */}
                    <View style={styles.statItem}>
                        <Text style={styles.statNumber}>0</Text>
                        <Text style={styles.statLabel}>Badges</Text>
                    </View>
                </View>

                {/*Space to push down navigator:*/}
                <View style={{ height: 30 }} />
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
        justifyContent: 'flex-start', // Align content to the top
        alignItems: 'center', // Center the children horizontally
    },
    settingsIcon: {
        position: 'absolute', // Position the icon absolutely
        top: 40, // Distance from the top of the screen
        right: 16, // Distance from the right of the screen
        zIndex: 10, // Ensure the icon is above other elements
    },
    profilePicPlaceholder: {
        position: 'absolute', // Position the circle absolutely
        top: 50, // Distance from the top of the screen
        right: 30, // Distance from the left of the screen
        width: 150, // Width of the circle
        height: 150, // Height of the circle
        borderRadius: 75, // Half the width/height to make it a circle
        backgroundColor: 'white', // Circle color
        zIndex: 5, // Ensure the circle is above other elements but below the icon
    },
    username: {
        position: 'absolute', // Position the username absolutely
        top: 60, // Distance from the top of the screen
        left: 18, // Distance from the left of the screen
        color: 'white', // Text color
        marginLeft: 10, // Left margin
        fontSize: 30,
        fontFamily: "Feather",
    },
    statsContainer: {
        flexDirection: 'row', // Align children horizontally
        marginTop: 125, // Margin at the top
        left: -94,
    },
    statItem: {
        alignItems: 'center', // Center items horizontally
        marginRight: 24, // Margin to the right of each stat
    },
    statNumber: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
    },
    statLabel: {
        color: 'white',
        fontSize: 16,
    },
});

export default ProfileScreen;
