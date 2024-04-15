import { View, ScrollView, SafeAreaView } from 'react-native';
import { Stack } from 'expo-router';

import { Navigation } from '../navigation';

import { COLORS } from '../constants';

import { useEffect, useState } from 'react';

import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

import {
    createTables,
    dropTables,
    removePastNotifications
} from '../database';

import Notification from './notify';

const App = () => {

    Notification();

    /* useEffect(() => {
        dropTables().then(() => {
            console.log('Tables Delete Successfully');
        }).catch((error) => {
            console.log('Error creating tables: ' + error.message);
        })
    }, []); */

    useEffect(() => {
        createTables().then(() => {
            console.log('Tables created successfully');
        }).catch((error) => {
            console.log('Error creating tables: ' + error.message);
        });
    }, []);
    useEffect(() => {
        removePastNotifications();
    }, []);

    return (
        // Main Section *basically everything*
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.primary }}>
            <BottomSheetModalProvider>
                {/* Hides Index Header */}
                <Stack.Screen options={{ headerShown: false }} />

                <Navigation />

            </BottomSheetModalProvider>
        </SafeAreaView>
    )

}

export default App;