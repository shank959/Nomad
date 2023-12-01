// Import React and necessary modules
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons, MaterialCommunityIcons, SimpleLineIcons, Foundation} from '@expo/vector-icons';

// Define a function to get the appropriate icon for each badge
const getBadgeIcon = (badgeNumber) => {
    switch (badgeNumber) {
        case 1:
            return <Ionicons name="planet-outline" size={45} color="white" />;
        case 2:
            return <Ionicons name="sunny-outline" size={45} color="white" />;
        case 3:
            return <MaterialCommunityIcons name="teddy-bear" size={45} color="white" />;
        case 4:
            return <MaterialCommunityIcons name="ferris-wheel" size={45} color="white" />; 
        case 5:
            return <Ionicons name="star-outline" size = {45} color ="white" />;
        case 6:
            return <Foundation name="mountains" size={45} color="white" />
        case 7:
            return <Ionicons name="basketball-outline" size={45} color="white" />;
        case 8:
            return <Ionicons name="baseball-outline" size={45} color="white" />;
        case 9:
            return <Ionicons name="fast-food-outline" size={45} color="white" />;
        case 10:
            return <SimpleLineIcons name="bag" size={45} color="white" />;
        case 11:
            return <Ionicons name="beer-outline" size={45} color="white" />;
        default:
            return <Ionicons name="planet-outline" size={45} color="white" />;
    }
};

// Define your component
const BadgesPage = () => {
    const badgeDetails = [
        { title: "Visit the Griffith Observatory", icon: () => getBadgeIcon(1) },
        { title: "Visit Santa Monica Pier", icon: () => getBadgeIcon(2) },
        { title: "Visit the Bruin Bear", icon: () => getBadgeIcon(3) },
        { title: "Visit Universal Studios", icon: () => getBadgeIcon(4) }, 
        { title: "Visit the Walk of Fame", icon: () => getBadgeIcon(5) },
        { title: "Visit the Hollywood Sign", icon: () => getBadgeIcon(6) },
        { title: "Visit Crypto Arena", icon: () => getBadgeIcon(7) },
        { title: "Visit Dodgers Stadium", icon: () => getBadgeIcon(8) },
        { title: "Visit Grand Central Market", icon: () => getBadgeIcon(9) },
        { title: "Visit Century City", icon: () => getBadgeIcon(10) },
        { title: "Visit Rocco's Tavern", icon: () => getBadgeIcon(11) },
    ];

    return (
        <View style={styles.container}>
            {badgeDetails.map((badge, index) => (
                <View key={index} style={styles.badgeRow}>
                    {badge.icon()}
                    <View style={styles.textContainer}>
                        <Text style={styles.badgeText}>{badge.title}</Text>
                        <View style={styles.rectangleOutline} />
                    </View>
                </View>
            ))}
        </View>
    );
};

// Define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
    },
    badgeRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 25,
        width: '100%',
    },
    textContainer: {
        marginLeft: 20,
        flex: 1,
    },
    badgeText: {
        color: 'white',
        fontSize: 20,
        marginBottom: 5,
    },
    rectangleOutline: {
        height: 5,
        backgroundColor: 'transparent',
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 2,
    },
});

export default BadgesPage;
