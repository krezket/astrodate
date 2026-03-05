import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';
import React from 'react';
import { ImageBackground, ScrollView, StyleSheet, TouchableOpacity, useWindowDimensions } from 'react-native';
import Animated, {
    Extrapolation,
    FadeIn,
    FadeOut,
    SharedValue,
    interpolate,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    useSharedValue,
} from 'react-native-reanimated';

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);
const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);
const AnimatedImageBackground = Animated.createAnimatedComponent(ImageBackground);
const AnimatedThemedText = Animated.createAnimatedComponent(ThemedText);
const AnimatedThemedView = Animated.createAnimatedComponent(ThemedView);
const AnimatedLink = Animated.createAnimatedComponent(Link);

const DURATION = 1000;
const DELAY = 1000;

const SPACE_GRADIENTS_DARK: readonly [string, string][] = [
    ['#050816', '#12054a'],
    ['#020111', '#341d63'],
    ['#01010a', '#14315c'],
    ['#04000a', '#35007a'],
] as const;

const SPACE_GRADIENTS_LIGHT: readonly [string, string][] = [
    ['#e0f7ff', '#b3d9ff'],
    ['#fce4ff', '#ffd1ff'],
    ['#fff3e0', '#ffe0b2'],
    ['#e8f5e9', '#c8e6c9'],
] as const;

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

type BackgroundGradientProps = {
    index: number;
    scrollY: SharedValue<number>;
    windowHeight: number;
    colors: readonly [string, string];
};

const BackgroundGradient: React.FC<BackgroundGradientProps> = ({
    index,
    scrollY,
    windowHeight,
    colors,
}) => {
    const animatedStyle = useAnimatedStyle(() => {
        const page = scrollY.value / windowHeight;
        const distance = Math.abs(page - index);

        const opacity = interpolate(
            distance,
            [0, 0.5, 1],
            [0.7, 0.4, 0],
            Extrapolation.CLAMP
        );

        return { opacity };
    });

    return (
        <AnimatedLinearGradient
            colors={colors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[StyleSheet.absoluteFillObject, animatedStyle]}
        />
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
    const colorScheme = useColorScheme();
    const spaceGradients = colorScheme === 'dark' ? SPACE_GRADIENTS_DARK : SPACE_GRADIENTS_LIGHT;
    const windowDimensions = useWindowDimensions();
    const scrollY = useSharedValue(0);

    const onScroll = useAnimatedScrollHandler({
        onScroll: (event) => {
            scrollY.value = event.contentOffset.y;
        },
    });

    const backgroundAnimatedStyle = useAnimatedStyle(() => ({
        transform: [
            {
                translateY: -scrollY.value * 0.2,
            },
        ],
    }));

    return (
        <ThemedView style={styles.container}>
            <AnimatedImageBackground
                source={require('../assets/gifs/backstar1.gif')}
                style={[
                    styles.backgroundImage,
                    { height: windowDimensions.height * 2 },
                    backgroundAnimatedStyle,
                ]}
                resizeMode="cover"
            />

            {spaceGradients.map((colors, index) => (
                <BackgroundGradient
                    key={index}
                    index={index}
                    scrollY={scrollY}
                    windowHeight={windowDimensions.height}
                    colors={colors}
                />
            ))}

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
                                        style={styles.transparentText}
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
                                        style={styles.transparentText}
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
                                    style={styles.transparentText}
                                    entering={FadeIn.duration(DURATION).delay(DELAY)}
                                    exiting={FadeOut.duration(DURATION)}
                                >
                                    {item.title}
                                </AnimatedThemedText>
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
    backgroundImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
    },
    itemContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    titleContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
        backgroundColor: 'transparent',
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
    },
    transparentText: {
        // backgroundColor: 'transparent',
    },
});

