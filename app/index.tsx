import React, { useEffect, useState } from 'react';
import { StyleSheet, Button, Image, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Link } from 'expo-router';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

const AninatedGradient = Animated.createAnimatedComponent(LinearGradient);
const AnimatedThemedText = Animated.createAnimatedComponent(ThemedText);
const AnimatedThemedView = Animated.createAnimatedComponent(ThemedView);
const AnimatedLink = Animated.createAnimatedComponent(Link);

const DURATION = 1000;
const DELAY = 1000;

export default function InitialScreen1() {
    const navigation = useNavigation();

    const [step, setStep] = useState(1);
    const handlePress = () => {
        setStep((prev) => (prev % 4) + 1);
    };

    return (
        <ThemedView style={styles.titleContainer}>
            {step === 1 ? (
                <ThemedView style={styles.titleContainer}>
                    <AnimatedThemedText 
                        key="text1" type="title" 
                        entering={FadeIn.duration(DURATION).delay(DELAY)}
                        exiting={FadeOut.duration(DURATION)}
                    >
                        Welcome to Astrodate!
                    </AnimatedThemedText>

                    <TouchableOpacity onPress={handlePress}>
                        <AnimatedThemedView
                            key="text1"
                            entering={FadeIn.duration(DURATION).delay(2000)}
                            exiting={FadeOut.duration(DURATION)}
                        >
                            <Image source={require('@/assets/gifs/2.gif')}></Image> 
                        </AnimatedThemedView>
                    </TouchableOpacity>
                </ThemedView>

            ) : step === 2 ? (
                    <ThemedView style={styles.titleContainer}>
                        <AnimatedThemedText 
                            key="text2"
                            type="title" 
                            entering={FadeIn.duration(DURATION).delay(DELAY)}
                            exiting={FadeOut.duration(DURATION)}
                        >
                            Find and meet other stars!
                        </AnimatedThemedText>

                        <TouchableOpacity onPress={handlePress}>
                            <AnimatedThemedView
                                key="text2"
                                entering={FadeIn.duration(DURATION).delay(2000)}
                                exiting={FadeOut.duration(DURATION)}
                            >
                                <Image source={require('@/assets/gifs/2.gif')}></Image> 
                            </AnimatedThemedView>
                        </TouchableOpacity>
                    </ThemedView>

                ) : step === 3 ? (
                        <ThemedView style={styles.titleContainer}>
                            <AnimatedThemedText 
                                key="text3"
                                type="title" 
                                entering={FadeIn.duration(DURATION).delay(DELAY)}
                                exiting={FadeOut.duration(DURATION)}
                            >
                                Customize your ship!
                            </AnimatedThemedText>

                            <TouchableOpacity onPress={handlePress}>
                                <AnimatedThemedView
                                    key="text3"
                                    entering={FadeIn.duration(DURATION).delay(2000)}
                                    exiting={FadeOut.duration(DURATION)}
                                >
                                    <Image source={require('@/assets/gifs/2.gif')}></Image> 
                                </AnimatedThemedView>
                            </TouchableOpacity>
                        </ThemedView>

                    ) : (
                            <ThemedView style={styles.titleContainer}>
                                <AnimatedLink 
                                    style={styles.linkStyle}
                                    key="text4"
                                    href={'./(app)/(tabs)/'}
                                    replace
                                    entering={FadeIn.duration(DURATION).delay(DELAY)}
                                    exiting={FadeOut.duration(DURATION)}
                                >
                                    Start your adventure!
                                </AnimatedLink>

                                <TouchableOpacity
                                    onPress={() => navigation.navigate("login")}
                                    style={styles.linkStyle}
                                    // href={'./login.tsx'}
                                >
                                    <AnimatedThemedText key="text5" entering={FadeIn.duration(DURATION).delay(2000)} exiting={FadeOut.duration(DURATION)}>
                                        Log In
                                    </AnimatedThemedText>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => navigation.navigate("signup")}
                                    style={styles.linkStyle}
                                    // href={'./login.tsx'}
                                >
                                    <AnimatedThemedText key="text6" entering={FadeIn.duration(DURATION).delay(3000)} exiting={FadeOut.duration(DURATION)}>
                                        Sign Up
                                    </AnimatedThemedText>
                                </TouchableOpacity>

                            </ThemedView>
                        )}

        </ThemedView>
    );
}

const styles = StyleSheet.create({
    titleContainer: {
        flex: 1,
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

