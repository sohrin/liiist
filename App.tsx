import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Platform, StyleSheet, Text, View, FlatList, Button, TextInput, Alert } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer, RouteProp } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Screen, screensEnabled } from 'react-native-screens';

type RootStackParamList = {
  Home: {
    post: string
  };
  Details: {
    itemId: number,
    msg: string | null,
  };
  CreatePost: undefined
};
const RootStack = createStackNavigator<RootStackParamList>();

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
function HomeScreen({route, navigation}: HomeProps) {
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
    <View style={styles.buttonContainer}>
      <Button
        onPress={() => setLabel(label + "文字追加！")}
        title="ボタン！"
        accessibilityLabel="Learn more about this purple button"
      />
      <Button
        onPress={() => setLabel("")}
        title="初期化！"
        accessibilityLabel="Learn more about this purple button"
      />
      <Button
        title="Create post"
        onPress={() => confirmNavigateCreatePost()}
      />
      <Button
        title="Go to Details"
        onPress={() => {
          navigation.navigate('Details', {
            itemId: 86,
            msg: "anything you want here"
          })
        }}
      />

      <Text style={{ margin: 10 }}>Post: {route.params?.post}</Text>
    </View>
    <StatusBar style="auto" />
  </View>
  );
}

type DetailsScreenRouteProp = RouteProp<
  RootStackParamList,
  'Details'
>;
type DetailsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Details'
>;
type DetailsProps = {
  route: DetailsScreenRouteProp,
  navigation: DetailsScreenNavigationProp,

};
function DetailsScreen({route, navigation}: DetailsProps) {
  const param = route.params;

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Text>itemId:[{param.itemId}]</Text>
      <Text>msg:[{param.msg}]</Text>
      <Button
        title="Go to Details... again"
        onPress={() => navigation.push('Details', {
          itemId: 87,
          msg: null,
        })}
      />
      <Button title="Go to Home" onPress={() => navigation.navigate('Home', {post: "re-initialPost"})} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Button
        title="Go back to first screen in stack"
        onPress={() => navigation.popToTop()}
      />
    </View>
  );
}

type CreatePostScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'CreatePost'
>;
type CreatePostProps = {
  navigation: CreatePostScreenNavigationProp,

};
function CreatePostScreen({navigation}: CreatePostProps) {
  const [postText, setPostText] = React.useState('');

  return (
    <>
      <TextInput
        multiline
        placeholder="What's on your mind?"
        style={{ height: 200, padding: 10, backgroundColor: 'white' }}
        value={postText}
        onChangeText={setPostText}
      />
      <Button
        title="Done"
        onPress={() => {
          navigation.navigate('Home', { post: postText });
        }}
      />
    </>
  );
}

function MainScreen() {
  return (
    <RootStack.Navigator initialRouteName="Home">
      <RootStack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'Overview' }}
        initialParams={{post: "initialPost"}}
      />
      <RootStack.Screen
        name="Details"
        component={DetailsScreen}
      />
      <RootStack.Screen
        name="CreatePost"
        component={CreatePostScreen}
      />
    </RootStack.Navigator>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

function SampleScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Sample!</Text>
    </View>
  );
}

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Main" component={MainScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
        <Tab.Screen name="Sample" component={SampleScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    height: 100,
    width: 200,
    padding: 10,
    backgroundColor: '#FFFFFF',
    margin: 3
  },
});
