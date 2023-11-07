import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function ProfileScreen(props) {
    return (
        <View style={styles.view}>
            <Text>Profile Screen</Text>
        </View>
    );
}


const styles = StyleSheet.create({
    view: {
        justifyContent: "center",
        alignItems: "center",
    },
})

export default ProfileScreen;
