import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, Clipboard } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Screen, screensEnabled } from 'react-native-screens';
import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-community/async-storage';
// TODO: react-nativeでないと動かなかった
//import Clipboard from '@react-native-community/clipboard';

import { RootStackParamList } from "../src/types/RootStackParamList";
// import { HomeScreen }         from "../src/screens/sample/HomeScreen";
// import { DetailsScreen }      from "../src/screens/sample/DetailsScreen";
// import { CreatePostScreen }   from "../src/screens/sample/CreatePostScreen";
import { MusicListScreen }    from "../src/screens/MusicListScreen";
import { SettingsScreen }     from "../src/screens/SettingsScreen";
import { ImportCsvScreen }    from "../src/screens/ImportCsvScreen";

const storage = new Storage({
  storageBackend: AsyncStorage
})

const RootStack = createStackNavigator<RootStackParamList>();

{/*
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
*/}

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        {/* <Tab.Screen name="Main" component={MainScreen} /> */}
        <Tab.Screen name="MusicList" component={MusicListScreen} initialParams={{musicDataList: []}} />
        <Tab.Screen name="ImportCsv" component={ImportCsvScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
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
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10
  },
});
