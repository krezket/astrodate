import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
// import { useAuth } from "@/context/AuthContext";
import { Redirect } from "expo-router";
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useColorScheme } from 'react-native';

const SignUp = () => {
    // const { session, signup } = useAuth()
    const [email, setEmail] = useState("");
    const [fullName, setFullName] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("");
    const colorScheme = useColorScheme();

    // const handleSignUp = async () => {
    //     try {
    //         await signup({
    //             email,
    //             fullName,
    //             username,
    //             password
    //         });
    //
    //         console.log("User successfully registered");
    //     } catch (err) {
    //         alert("Signup failed: " + err.message);
    //     }
    // };
    //
    // if(session) return <Redirect href="/"/>

    return (
        <ThemedView style={styles.container}>
            <ThemedText style={styles.title}>Sign Up</ThemedText>

            <TextInput
                style={[styles.input, {color: colorScheme === "dark" ? "#FFFFFF" : "#808080"}]}
                placeholderTextColor={colorScheme === "dark" ? "#FFFFFF" : "#808080"}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
            />

            <TextInput
                style={[styles.input, {color: colorScheme === "dark" ? "#FFFFFF" : "#808080"}]}
                placeholderTextColor={colorScheme === "dark" ? "#FFFFFF" : "#808080"}
                placeholder="Full Name"
                value={fullName}
                onChangeText={setFullName}
                autoCapitalize="none"
            />

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
                title="Sign Up" 
                // onPress={handleSignUp} 
            />
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

export default SignUp;

