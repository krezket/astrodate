import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from "react-native";
// import { useAuth } from "@/context/AuthContext";
import { Redirect } from "expo-router";
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useColorScheme } from 'react-native';

const LogIn= () => {
    // const { session, signin } = useAuth()
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const colorScheme = useColorScheme();
    const navigation = useNavigation();

    // const handleSignIn = async () => {
    //     try {
    //         await signin({
    //             username,
    //             password
    //         });
    //
    //         console.log("User successfully Signed In");
    //     } catch (err) {
    //         alert("Sign In failed: " + err.message);
    //     }
    // };

    // if(session) return <Redirect href="/"/>

    return (
        <ThemedView style={styles.container}>
            <ThemedText style={styles.title}>Log In</ThemedText>

            <TextInput
                style={[styles.input, {color: colorScheme === "dark" ? "#FFFFFF" : "#808080"}]}
                placeholderTextColor={colorScheme === "dark" ? "#FFFFFF" : "#808080"}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
            />

            <TextInput
                style={[styles.input, {color: colorScheme === "dark" ? "#FFFFFF" : "#808080"}]}
                placeholderTextColor={colorScheme === "dark" ? "#FFFFFF" : "#808080"}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <Button 
                title="Log In" 
                // onPress={handleSignIn} 
            />
            <TouchableOpacity onPress={() => navigation.navigate("signup")}>
                <ThemedText style={{ textAlign: "center", marginTop: 20 }}>
                    Don’t have an account? Sign Up
                </ThemedText>
            </TouchableOpacity>
        </ThemedView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: "center",
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 10,
        marginBottom: 12,
    },
});

export default LogIn;

