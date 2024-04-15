import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Terms from './Terms'

const Stack = createNativeStackNavigator();

const TermNavigator = ({ route }) => {

    const { Year } = route.params;

    return (
        //TODO:
        //Make initial route the current date closest start or end of term
        //On back do not go back to initial route but straight to Year.

        <Stack.Navigator
            initialRouteName="Fall"
            screenOptions={{ animation: 'none' }}
        >
            <Stack.Screen
                name="Fall"
                component={Terms}
                initialParams={{Year: Year, Term: "Fall"}}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Winter"
                component={Terms}
                initialParams={{Year: Year, Term: "Winter"}}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Summer"
                component={Terms}
                initialParams={{Year: Year, Term: "Summer"}}
                options={{ headerShown: false }}
            />

        </Stack.Navigator>
    )
}

export default TermNavigator;