import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Home from './pages/Home';
import Tasks from './pages/Tasks';
import Profile from './pages/Profile';
import CourseNavigator from './pages/CourseNavigator';

import { AnimatedTabBar } from "../components/common/bottomTab";

const Tab = createBottomTabNavigator();


const Navigation = () => {

    return (

        <Tab.Navigator
            initialRouteName="Home"
            tabBar={(props) => <AnimatedTabBar {...props} />}
            screenOptions={{
                tabBarHideOnKeyboard: true
            }}
        >

            <Tab.Screen
                name="Home"
                component={Home}
                options={{ headerShown: false }}
            />
            <Tab.Screen
                name="Tasks"
                component={Tasks}
                options={{ headerShown: false }}
            />
            <Tab.Screen
                name="CourseNavigator"
                component={CourseNavigator}
                options={{
                    headerShown: false,
                    headerShadowVisible: false,
                }}
            />
            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{ headerShown: false }}
            />

        </Tab.Navigator>
    );
}

export default Navigation;