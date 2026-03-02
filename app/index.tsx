import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useNavigation } from '@react-navigation/native';
import { Link } from 'expo-router';
import React from 'react';
import { Image, ScrollView, StyleSheet, TouchableOpacity, useWindowDimensions } from 'react-native';
import Animated, {
    Extrapolation,
    FadeIn,
    FadeOut,
    interpolate,
    SharedValue,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    useSharedValue,
} from 'react-native-reanimated';

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);
const AnimatedThemedText = Animated.createAnimatedComponent(ThemedText);
const AnimatedThemedView = Animated.createAnimatedComponent(ThemedView);
const AnimatedLink = Animated.createAnimatedComponent(Link);

const DURATION = 1000;
const DELAY = 1000;

type FadeItemProps = {
    index: number;
    scrollY: SharedValue<number>;
    itemHeight: number;
    windowHeight: number;
    children: React.ReactNode;
};

const FadeItem: React.FC<FadeItemProps> = ({ index, scrollY, itemHeight, windowHeight, children }) => {
    const animatedStyle = useAnimatedStyle(() => {
        const centerY = scrollY.value + windowHeight / 2;
        const itemCenterY = index * itemHeight + itemHeight / 2;
        const distance = Math.abs(centerY - itemCenterY);

        const opacity = interpolate(
            distance,
            [0, itemHeight / 2, itemHeight],
            [1, 0.3, 0],
            Extrapolation.CLAMP
        );

        const scale = interpolate(
            distance,
            [0, itemHeight / 2, itemHeight],
            [1, 0.95, 0.9],
            Extrapolation.CLAMP
        );

        return {
            opacity,
            transform: [{ scale }],
        };
    });

    return (
        <AnimatedThemedView style={[styles.itemContainer, { height: windowHeight }, animatedStyle]}>
            {children}
        </AnimatedThemedView>
    );
};

const ITEMS = [
    {
        key: 'text1',
        title: 'Welcome to Astrodate!',
    },
    {
        key: 'text2',
        title: 'Find and meet other stars!',
    },
    {
        key: 'text3',
        title: 'Customize your ship!',
    },
    {
        key: 'cta',
        title: 'Start your adventure!',
        isFinal: true,
    },
];

export default function InitialScreen1() {
    const navigation = useNavigation<any>();
    const windowDimensions = useWindowDimensions();
    const scrollY = useSharedValue(0);

    const onScroll = useAnimatedScrollHandler({
        onScroll: (event) => {
            scrollY.value = event.contentOffset.y;
        },
    });

    return (
        <ThemedView style={styles.container}>
            <AnimatedScrollView
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={16}
                onScroll={onScroll}
                pagingEnabled
            >
                {ITEMS.map((item, index) => (
                    <FadeItem
                        key={item.key}
                        index={index}
                        scrollY={scrollY}
                        itemHeight={windowDimensions.height}
                        windowHeight={windowDimensions.height}
                    >
                        {item.isFinal ? (
                            <ThemedView style={styles.titleContainer}>
                                <AnimatedLink
                                    href={'./(app)/(tabs)/'}
                                    replace
                                    entering={FadeIn.duration(DURATION).delay(DELAY)}
                                    exiting={FadeOut.duration(DURATION)}
                                >
                                    <ThemedText style={styles.linkStyle}>
                                        {item.title}
                                    </ThemedText>
                                </AnimatedLink>

                                <TouchableOpacity
                                    onPress={() => navigation.navigate("login")}
                                    style={styles.linkStyle}
                                >
                                    <AnimatedThemedText
                                        entering={FadeIn.duration(DURATION).delay(2000)}
                                        exiting={FadeOut.duration(DURATION)}
                                    >
                                        Log In
                                    </AnimatedThemedText>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => navigation.navigate("signup")}
                                    style={styles.linkStyle}
                                >
                                    <AnimatedThemedText
                                        entering={FadeIn.duration(DURATION).delay(3000)}
                                        exiting={FadeOut.duration(DURATION)}
                                    >
                                        Sign Up
                                    </AnimatedThemedText>
                                </TouchableOpacity>
                            </ThemedView>
                        ) : (
                            <ThemedView style={styles.titleContainer}>
                                <AnimatedThemedText
                                    type="title"
                                    entering={FadeIn.duration(DURATION).delay(DELAY)}
                                    exiting={FadeOut.duration(DURATION)}
                                >
                                    {item.title}
                                </AnimatedThemedText>

                                <AnimatedThemedView
                                    entering={FadeIn.duration(DURATION).delay(2000)}
                                    exiting={FadeOut.duration(DURATION)}
                                >
                                    <Image source={require('@/assets/gifs/2.gif')} />
                                </AnimatedThemedView>
                            </ThemedView>
                        )}
                    </FadeItem>
                ))}
            </AnimatedScrollView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    itemContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
    },
    stepContainer: {
        gap: 8,
        marginBottom: 8,
    },
    reactLogo: {
        height: 178,
        width: 290,
        bottom: 0,
        left: 0,
        position: 'absolute',
    },
    linkStyle: {
        fontSize: 30,
        marginBottom: 40,
    }
});

