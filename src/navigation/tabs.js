import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MapScreen from "../screens/MapScreen";
import FeedScreen from "../screens/FeedScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Tab = createBottomTabNavigator();

const Tabs = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="FeedScreen" component={FeedScreen}/> 
            <Tab.Screen name="MapScreen" component={MapScreen}/> 
            <Tab.Screen name="ProfileScreen" component={ProfileScreen}/> 
        </Tab.Navigator>
    );
}

export default Tabs;