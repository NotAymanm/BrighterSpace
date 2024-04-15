import {Pressable} from "react-native"

import Animated, {
    useAnimatedStyle,
    withTiming,
} from "react-native-reanimated"

import { CourseIcon, HomepageIcon, ProfileIcon, TasksIcon } from '../../../icons';
import styles from '../../../constants/Themes/defaultTheme';

import { COLORS } from '../../../constants/theme';

const TabBarComponent = ({ active, route, onLayout, onPress }) => {

    const animatedComponentCircleStyles = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    scale: withTiming(active ? 1 : 0, { duration: 250 })
                }
            ]
        }
    })

    const animatedIconContainerStyles = useAnimatedStyle(() => {
        return {
            opacity: withTiming(active ? 1 : 0.5, { duration: 250 })
        }
    })

    return (
        <Pressable onPress={onPress} onLayout={(event) => onLayout(event)} style={styles.component}>
            <Animated.View
                style={[styles.componentCircle, animatedComponentCircleStyles]}
            />
            <Animated.View
                style={[styles.iconContainer, animatedIconContainerStyles]}
            >
                {route.name === 'Home' && <HomepageIcon color={active ? COLORS.purple : COLORS.white} hasStroke={true} size={27}/>}
                {route.name === 'Tasks' && <TasksIcon color={active ? COLORS.purple : COLORS.white} hasStroke={true} size={27}/>}
                {route.name === 'CourseNavigator' && <CourseIcon color={active ? COLORS.purple : COLORS.white} hasStroke={true} size={27}/>}
                {route.name === 'Profile' && <ProfileIcon color={active ? COLORS.purple : COLORS.white} hasStroke={true} size={27}/>}
            </Animated.View>
        </Pressable>
    )
}

export default TabBarComponent;