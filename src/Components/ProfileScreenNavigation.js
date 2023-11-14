import React from 'react';
import { View, StyleSheet, TouchableOpacity} from 'react-native';
import { FontAwesome5, SimpleLineIcons, FontAwesome } from '@expo/vector-icons';

function ProfileScreenNavigation({ navigation }){
    return (
        <>
            <View style={styles.horizontalLine} />
                <View style={styles.navContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate('Posts')}>
                        <FontAwesome name="picture-o" size={24} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Friends')}>
                        <FontAwesome5 name="user-friends" size={24} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Badges')}>
                        <SimpleLineIcons name="badge" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            <View style={styles.horizontalLine} />
        </>
    )
}

const styles = StyleSheet.create({
    navContainer: {
        flexDirection: 'row', // Aligns items horizontally
        justifyContent: 'space-around', // Distributes items evenly
        alignItems: 'center', // Centers items vertically
        width: '90%', // Sets the width of the navigation container
    },
    horizontalLine: {
        borderBottomColor: 'white', // Line color
        borderBottomWidth: 0.167, // Line thickness
        width: '100%', // Line width
        marginTop: 15, // Space above the line
        marginBottom: 15, // Space below the line
    },
});

export { ProfileScreenNavigation };