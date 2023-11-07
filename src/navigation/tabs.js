import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MapScreen from "../screens/MapScreen";
import FeedScreen from "../screens/FeedScreen";
import ProfileScreen from "../screens/ProfileScreen";

import { Entypo, Ionicons } from '@expo/vector-icons';
import { View } from "react-native";

const Tab = createBottomTabNavigator();

function Tabs() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarShowLabel: false,
                headerShown: false,
            }}>
            <Tab.Screen 
                name="FeedScreen" 
                component={FeedScreen}
                options={{ 
                    tabBarIcon: () => {
                        return (
                            <View>
                                <Entypo name="home" size={24} color="black" />
                            </View>
                        )
                    }
                }}
            /> 
            <Tab.Screen 
                name="MapScreen" 
                component={MapScreen}
                options={{ 
                    tabBarIcon: () => {
                        return (
                            <View>
                                <Entypo name="map" size={24} color="black" />
                            </View>
                        )
                    }
                }}/> 
            <Tab.Screen 
                name="ProfileScreen" 
                component={ProfileScreen}
                options={{ 
                    tabBarIcon: () => {
                        return (
                            <View>
                                <Ionicons name="person" size={24} color="black" />
                            </View>
                        )
                    }
                }}/> 
        </Tab.Navigator>
    );
}

export default Tabs;