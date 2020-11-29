import React, { useState, useEffect, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, TextInput, Button } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/RootStackParamList';
import { StackNavigationProp } from '@react-navigation/stack';
import { MusicData } from '../types/MusicData';
import { MusicListItemData } from '../types/MusicListItemData';
import _ from 'lodash';

import * as firebase from 'firebase';
import 'firebase/firestore';

// Optionally import the services that you want to use
//import "firebase/auth";
//import "firebase/database";
//import "firebase/firestore";
//import "firebase/functions";
//import "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
};
firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();

type MusicDetailsScreenRouteProp = RouteProp<
  RootStackParamList,
  'MusicDetails'
>;

type MusicDetailsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'MusicDetails'
>;

type MusicListProps = {
  route: MusicDetailsScreenRouteProp,
  navigation: MusicDetailsScreenNavigationProp
};

export function MusicDetailsScreen({ route, navigation }: MusicListProps) {
    const [musicListItemData, setStateMusicListItemData] = useState(route.params.musicListItemData);
    const musicListItemDataOld: MusicListItemData = JSON.parse(JSON.stringify(route.params.musicListItemData));

    const [stateTags, setStateTags] = useState<string[]>([]);

    const setMemo = (inputValue: string) => {
      musicListItemData.musicResultData.memo = inputValue;
    }

    const [newTag, setNewTag] = useState("");

    useEffect(() => {
      if (musicListItemData.musicResultData === null) {
        musicListItemData.musicResultData = {
          key: musicListItemData.musicData.key,
          title: musicListItemData.musicData.title,
          difficultType: musicListItemData.musicData.difficultType,
          memo: "",
          tags: [],
        }
      }
      
      // ここで渡してあげないと画面描画されなかった
      setStateTags([...musicListItemData.musicResultData.tags]);

      // MEMO: returnで関数を返すと、コンポーネントunmount時処理の指定になる。
      return () => {
        if ( _.isEqual(musicListItemData, musicListItemDataOld) ) {
          // do nothing
        } else {
          // TODO: 変更しているけど保存しなくてよいか確認するダイアログを表示
          // TODO: ダイアログの共通処理化（webかweb以外かの判断を毎回やるのはめんどい。ライブラリない？？？）
        }
      };
    }, []); // MEMO: 第2引数に空リストを与えると1回だけ動く





    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>{musicListItemData.musicData.title}</Text>
            <Text>{musicListItemData.musicData.difficultType}</Text>
            <Text>{musicListItemData.musicData.difficulty}</Text>
            {
              stateTags.map( (tag, i) => {
                return (
                  <TextInput
                  　defaultValue={tag}
                    placeholder="tag was deleted... OK?"
                    style={{ marginTop: 5, marginBottom: 5, padding: 5, backgroundColor: 'white' }}
                    onChangeText={(input) => {
                      stateTags[i] = input;
                      setStateTags([...stateTags]);
                    }}
                  />
                )
              })
            }
            <TextInput
              value={newTag}
              placeholder="input new tag"
              style={{ marginTop: 5, marginBottom: 5, padding: 5, backgroundColor: 'white' }}
              onChangeText={setNewTag}
            />
            <Button
              title="Done"
              onPress={() => {
                setStateTags([...stateTags, newTag]);
                setNewTag("");
              }}
            />
            <TextInput
              multiline
              placeholder="input memo"
              style={{ height: 100, padding: 5, backgroundColor: 'white' }}
              onChangeText={setMemo}
            />
            <Button
              title="Update"
              onPress={async() => {
                // TODO: firebaseの設定を環境変数から読み取る＆一箇所でオブジェクト作成し、あちこちで使えるようにする。
                // TODO: userIdSampleを正式な値にする（このデータ構造で、ユーザごとのdocをまとめて取得するとき、無料範囲内の読み込みコストはどうなる？）
                // TODO: anyなくす
                // TODO: musicResultMapを持ち回り、内容を置き換えてsetするように変更
                // TODO: MusicList初期表示時にmusicResultMapを取得する。
                // TODO: paramとpropsをやめる。Redux？MobX？Context API？
                const musicResultMap: any = {};
                // musicListItemData外のstateで操作したものを設定し直す
                musicListItemData.musicResultData.tags = stateTags;
                musicResultMap[route.params.musicListItemData.key] = musicListItemData;
                const res = await firestore.collection('MusicResultMap').doc('userIdSample').set(musicResultMap);
                navigation.pop()
              }}
            />



            <StatusBar style="auto" />            
        </View>
    );
}