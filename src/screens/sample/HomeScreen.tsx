import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Platform,
    Text,
    View,
    TouchableOpacity,
    Alert,
} from 'react-native';
import 'react-native-gesture-handler';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { RootStackParamList } from "../../../src/types/RootStackParamList";

type HomeScreenRouteProp = RouteProp<
    RootStackParamList,
    'Home'
>;

type HomeScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'Home'
>;

type HomeProps = {
    route: HomeScreenRouteProp,
    navigation: HomeScreenNavigationProp
};

export function HomeScreen({ route, navigation }: HomeProps) {
    const [label, setLabel] = useState("");
    useEffect(() => {
        if (route.params?.post) {
            // Post updated, do something with `route.params.post`
            // For example, send the post to the server
        }
    }, [route.params?.post]);
    const confirmNavigateCreatePost = () => {
        if (Platform.OS === "web") {
            if (confirm("My Alert Msg")) {
                navigation.navigate('CreatePost');
            }
        } else {
            Alert.alert(
                "Alert Title",
                "My Alert Msg",
                [
                    {
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                    },
                    {
                        text: "OK",
                        onPress: () => navigation.navigate('CreatePost')
                    }
                ],
                { cancelable: false }
            );
        }
    }

    return (
        <View style={styles.container}>
            <Text>Open up App.tsx to start working on your app! {label}</Text>
            <View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => setLabel(label + "文字追加！")}
                    accessibilityLabel="Learn more about this purple button"
                >
                    <Text>ボタン！</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => setLabel("")}
                    accessibilityLabel="Learn more about this purple button"
                >
                    <Text>初期化！</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => confirmNavigateCreatePost()}
                >
                    <Text>Create post</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        navigation.navigate('Details', {
                            itemId: 86,
                            msg: "anything you want here"
                        })
                    }}
                >
                    <Text>Go to Details</Text>
                </TouchableOpacity>

                <Text style={{ margin: 10 }}>Post: {route.params?.post}</Text>
            </View>
            <StatusBar style="auto" />
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10
    },
});