
import React, { useState } from 'react';
import { View } from "react-native"
import Svg, { Path } from "react-native-svg";

// reanimated
import Animated, {
    useAnimatedStyle,
    withTiming,
    useDerivedValue
} from "react-native-reanimated"

import TabBarComponent from "./TabBarComponent"
import styles from '../../../constants/Themes/defaultTheme';
import { COLORS } from '../../../constants';


const AnimatedSvg = Animated.createAnimatedComponent(Svg);

//MAKE NEW FILE FOR ANIMATED TAB BAR AND TAB BAR COMPONENT
const AnimatedTabBar = ({
    state: { index: activeIndex, routes },
    navigation,
    descriptors
}) => {

    //layout: gets index and x position of every Tab Bar Component
    const [layout, setLayout] = useState([]);
    const handleLayout = (event, index) => {
        const { x } = event.nativeEvent.layout;
        setLayout((prevLayout) => {
            const updatedLayout = [...prevLayout];
            updatedLayout[index] = { index, x };
            return updatedLayout;
        });
    };

    const xOffset = useDerivedValue(() => {
        // Our code hasn't finished rendering yet, so we can't use the layout values
        if (layout.length !== routes.length) return 0
        // We can use the layout values
        // Copy layout to avoid errors between different threads
        // We subtract 25 so the active background is centered behind our TabBar Components
        // 20 pixels is the width of the left part of the svg (the quarter circle outwards)
        // 5 pixels come from the little gap between the active background and the circle of the TabBar Components

        //Half the size of the svg (2000) - 30
        return [...layout].find(({ index }) => index === activeIndex).x - 970
        // Calculate the offset new if the activeIndex changes (e.g. when a new tab is selected)
        // or the layout changes (e.g. when the components haven't finished rendering yet)
    }, [activeIndex, layout])

    const animatedStyles = useAnimatedStyle(() => {
        return {
            // translateX to the calculated offset with a smooth transition
            transform: [{
                translateX: withTiming(xOffset.value, { duration: 250 })
            }]
        }
    })

    /* const barOffset = useAnimatedStyle(() => {
        return {
            // translateX to the calculated offset with a smooth transition
            transform: [{ translateX: withTiming(xOffset.value, { duration: 250 }) }]
        }
    }) */

    return (

        <View>
            <AnimatedSvg
                width={2000}
                height={70}
                style={[styles.activeBackground, animatedStyles]}
            >
                <Path
                    fill={COLORS.black}
                    d="M968.965 0H943.51c12.076.004 21.864 9.795 21.864 21.872v15.65c0 12.079 9.792 21.871 21.872 21.871h25.508c12.08 0 21.872-9.792 21.872-21.872v-15.67C1034.638 9.784 1044.421.004 1056.49 0h-25.455H2000v70H0V0h968.965z"
                />

            </AnimatedSvg>

            <View style={styles.tabBarContainer}>
                    {routes.map((route, index) => {
                        const active = index === activeIndex

                        return (
                            <TabBarComponent
                                key={route.key}
                                active={active}
                                route={route}
                                onLayout={(event) => handleLayout(event, index)}
                                onPress={() => navigation.navigate(route.name)}
                            />
                        )
                    })}
                </View>
    
        </View>

    )
}

export default AnimatedTabBar;