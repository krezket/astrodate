import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, Redirect } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
// import { useAuth } from '@/context/AuthContext';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
    anchor: '(tabs)',
};

export default function AppLayout() {
    const colorScheme = useColorScheme();
    // const {session} = useAuth();

    return (
        // !session ?
        //     <Redirect href="/signin"/> 
        //     :
            <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <Stack>
                <Stack.Screen name="(tabs)" options={{ 
                    // removes (tabs) header
                    headerShown: false, 
                }} />
                </Stack>
                <StatusBar style="auto" />
            </ThemeProvider>

    );
};

