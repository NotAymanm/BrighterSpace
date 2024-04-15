import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Year from './CourseTabs/Year';
import TermNavigator from './CourseTabs/TermNavigator';
import Course from './CourseTabs/Course'
import CourseTask from './CourseTabs/CourseTask'


const Stack = createNativeStackNavigator();

const CourseNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="Year"
            screenOptions={{ animation: 'none' }}
        >
            <Stack.Screen
                name="Year"
                component={Year}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="TermNavigator"
                component={TermNavigator}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="Course"
                component={Course}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="CourseTask"
                component={CourseTask}
                options={{headerShown: false}}
            />

        </Stack.Navigator>

    )
}

export default CourseNavigator;