import { Stack } from 'expo-router';
import { useCallback } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

const Layout = () => {

    //defines usable fonts
    const [fontsLoaded] = useFonts({
        Thin: require('../assets/fonts/Inter-Thin.ttf'),
        ExtraLight: require('../assets/fonts/Inter-ExtraLight.ttf'),
        Light: require('../assets/fonts/Inter-Light.ttf'),
        Regular: require('../assets/fonts/Inter-Regular.ttf'),
        Medium: require('../assets/fonts/Inter-Medium.ttf'),
        SemiBold: require('../assets/fonts/Inter-SemiBold.ttf'),
        Bold: require('../assets/fonts/Inter-Bold.ttf'),
        ExtraBold: require('../assets/fonts/Inter-ExtraBold.ttf'),
        Black: require('../assets/fonts/Inter-Black.ttf'),
    })

    //Makes sure fonts are loaded before loading the homepage
    const onLayoutRootView = useCallback(async () => {
        if(fontsLoaded){
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded])

    //if no fonts loaded return null
    if(!fontsLoaded) return null;

    //
    return <Stack onLayout = {onLayoutRootView} />;
}

export default Layout;