import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

function FeedScreen(props) {
    return (
        <View style={styles.view}>
            <Text>Feed Screen</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        justifyContent: "center",
        alignItems: "center",
    },
})

export default FeedScreen;
