import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput, Clipboard } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer, StackActions, CommonActions } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Screen, screensEnabled } from 'react-native-screens';
import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-community/async-storage';
// TODO: react-nativeでないと動かなかった
//import Clipboard from '@react-native-community/clipboard';

import { RootStackParamList } from "../../src/types/RootStackParamList";
import { MusicData }          from "../../src/types/MusicData";
import { MusicListItemData } from '../types/MusicListItemData';

const storage = new Storage({
storageBackend: AsyncStorage
})

type ImportCsvScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ImportCsv'
>;

type ImportCsvProps = {
  navigation: ImportCsvScreenNavigationProp
};

export function ImportCsvScreen({navigation}: ImportCsvProps) {
  const [csv, setCsv] = React.useState("");

  // Androidのコピペ動作不良対応
  const pasteAndParseCsvToMusicData = async() => {
    const text = await Clipboard.getString();
    setCsv(text);
    parseCsvToMusicData();
  }

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
          difficulty: 12,
        });
      }
    }

    let musicListItemDataList: MusicListItemData[] = [];
    for (let parsedMusicData of parsedMusicDataList) {
      let latestMusicListItemData: MusicListItemData = {
        key: parsedMusicData.key,
        musicData: parsedMusicData,
        musicResultData: {
          key: parsedMusicData.key,
          title: parsedMusicData.title,
          difficultType: parsedMusicData.difficultType,
          memo: "",
          tags: [],
        }
      };
      musicListItemDataList.push(latestMusicListItemData);
    }

    storage.save({
      key: 'musicListItemDataList',
      data: musicListItemDataList
    });

    // TODO: 後で消す
    alert(JSON.stringify(musicListItemDataList));

    navigation.navigate('MusicList', { musicListItemDataList: musicListItemDataList });
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
        title="Paste And Import CSV (for Android)"
        onPress={() => pasteAndParseCsvToMusicData()}
      />
      <Button
        title="Import CSV"
        onPress={() => parseCsvToMusicData()}
      />
      <StatusBar style="auto" />
    </>
  );
}