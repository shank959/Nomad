import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function ProfileScreen(props) {
    return (
        <View style={styles.view}>
            <Text style={{fontSize: 30, color: "black"}}>Profile Screen</Text>
        </View>
    );
}


const styles = StyleSheet.create({
    view: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "purple",

    },
})

export default ProfileScreen;
