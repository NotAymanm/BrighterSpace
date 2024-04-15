import { useState, useEffect, useRef } from 'react';
import { Platform } from 'react-native';
import * as Device from 'expo-device';

import * as Notifications from 'expo-notifications';
import { getNotificationID, deleteNotification } from '../database';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

export default function Notification() {
    const [expoPushToken, setExpoPushToken] = useState("");
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();

    useEffect(() => {
        registerForNotificationsAsync().then((token) =>
            setExpoPushToken(token)
        );

        notificationListener.current =
            Notifications.addNotificationReceivedListener((notification) => {
                setNotification(notification);
            });

        responseListener.current =
            Notifications.addNotificationResponseReceivedListener((response) => {
                console.log(response);
            });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);

    return (
        null
    );
}

async function registerForNotificationsAsync() {
    let token;

    if (Platform.OS === "android") {
        Notifications.setNotificationChannelAsync("default", {
            name: "default",
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: "#FF231F7C",
            lockscreenVisibility: Notifications.AndroidNotificationVisibility.PUBLIC,
            bypassDnd: true,
        });
    }

    if (Device.isDevice) {
        const { status: existingStatus } =
            await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== "granted") {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== "granted") {
            alert("Failed to get push token for push notification!");
            return;
        }
        token = (await Notifications.getExpoPushTokenAsync({ projectId: '55336044-565c-49e0-bcf2-480270967740' })).data;
        console.log(token);
    } else {
        alert("Must use physical device for Push Notifications");
    }

    return token;
}

export const scheduleNotification = async (
    title,
    chosenTask,
    date,
) => {

    const notificationIdentifier = await Notifications.scheduleNotificationAsync({
        content: {
            title: title,
            body: `Don't forget to complete your ${chosenTask}!`,
        },
        trigger: date,
    });

    return notificationIdentifier;
}



// Use the identifier to cancel the notification
export const cancelNotification = async (taskName, dueDate, courseCode, termType, studyYear) => {
    const notificationIdentifiers = await getNotificationID(taskName, dueDate, courseCode, termType, studyYear);
    for (let i = 0; i < notificationIdentifiers.length; i++) {
        await Notifications.cancelScheduledNotificationAsync(notificationIdentifiers[i]);
        await deleteNotification(notificationIdentifiers[i], taskName, dueDate, courseCode, termType, studyYear);
    }
}