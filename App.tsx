import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Platform, StyleSheet, Text, View, FlatList, TouchableOpacity, Button, TextInput, Alert } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer, RouteProp } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Screen, screensEnabled } from 'react-native-screens';

type MusicData = {
  key: string,  // title + difficultType
  title: string,
  difficultType: string,
  difficulity: number,
};

type RootStackParamList = {
  Home: {
    post: string
  },
  Details: {
    itemId: number,
    msg: string | null,
  },
  CreatePost: undefined
  MusicList: {
    musicDataList: MusicData[]
  },
  ImportCsv: undefined,
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

type ImportCsvScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ImportCsv'
>;
type ImportCsvProps = {
  navigation: ImportCsvScreenNavigationProp
};
function ImportCsvScreen({navigation}: ImportCsvProps) {
  const [csv, setCsv] = React.useState("");

  const parseCsvToMusicData = () => {
    let parsedMusicDataList: MusicData[] = [];
    let csvRecordStrArr: string[] = csv.split("\n");
    for (let csvRecordStr of csvRecordStrArr) {
      // 最終行は空文字になるので処理しない
      if (csvRecordStr !== "" && !csvRecordStr.startsWith("バージョン")) {
        let csvArr: string[] = csvRecordStr.split(",");
        // TODO: 正式実装
        parsedMusicDataList.push({
          key: csvArr[1] + "ANOTHER",
          title: csvArr[1],
          difficultType: "ANOTHER",
          difficulity: 12,
        });
      }
    }
    navigation.navigate('MusicList', { musicDataList: parsedMusicDataList });
  };

  return (
    <>
      <TextInput
        multiline
        placeholder="input DP csv"
        style={{ height: 200, padding: 10, backgroundColor: 'white' }}
        onChangeText={setCsv}
      />
      <Button
        title="Done"
        onPress={() => parseCsvToMusicData()}
      />
    </>
  );
}

type MusicListScreenRouteProp = RouteProp<
  RootStackParamList,
  'MusicList'
>;
type MusicListScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'MusicList'
>;
type MusicListProps = {
  route: MusicListScreenRouteProp,
  navigation: MusicListScreenNavigationProp
};
function MusicListScreen({route, navigation}: MusicListProps) {
  const param = route.params;
  const [refreshFlatList, setRefreshFlatList] = React.useState(true);

  useEffect(() => {
    let firstMusicDataList: MusicData[] = [];
    firstMusicDataList.push({
      key: "testMusicTitle" + "ANOTHER",
      title: "testMusicTitle",
      difficultType: "ANOTHER",
      difficulity: 12,
    });
    param.musicDataList.splice(0);
    param.musicDataList.splice(param.musicDataList.length,　0,　...firstMusicDataList);
    setRefreshFlatList(!refreshFlatList);
  }, []); // MEMO: 第2引数に

  // TODO: anyをなくす。
  const renderItem = ({item}: any) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.title}</Text>
    </View>
  );

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>MusicList!</Text>
      <FlatList
        data={param.musicDataList}
        extraData={refreshFlatList}
        renderItem={renderItem}
        keyExtractor={item => item.key}
        style={{ flex: 1　}}
        // ListHeaderComponent={() => this._renderHeader.call(this)}
        // ListFooterComponent={() => this._renderFooter.call(this)}
        // onEndReachedThreshold={100}
        // onEndReached={this._onEndReached.bind(this)}
        // onViewableItemsChanged={this._onViewableItemsChanged.bind(this)}
        // refreshing={this.state.refreshing}
        // refreshControl={
        //   <RefreshControl
        //     refreshing={this.state.refreshing}
        //     onRefresh={this._reload.bind(this)}
        //   />
        // }
    />
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
  // buttonContainer: {
  //   height: 100,
  //   width: 200,
  //   padding: 10,
  //   backgroundColor: '#FFFFFF',
  //   margin: 3
  // },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
