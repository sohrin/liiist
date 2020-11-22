import React, { useState, useEffect } from 'react';
import { Platform, StyleSheet, Text, View, FlatList, TouchableOpacity, Button, TextInput, Alert, Clipboard } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from "../types/RootStackParamList";
import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-community/async-storage';

const storage = new Storage({
  storageBackend: AsyncStorage
})

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

export function MusicListScreen({ route, navigation }: MusicListProps) {
  const param = route.params;
  const [refreshFlatList, setRefreshFlatList] = React.useState(true);

  useEffect(() => {
    storage.load({ key: 'musicDataList' })
      .then(storageMusicDataList => {
        param.musicDataList.splice(0);
        param.musicDataList.splice(param.musicDataList.length, 0, ...storageMusicDataList);
        setRefreshFlatList(!refreshFlatList);
      })
      .catch(err => {
        // TODO: 例外処理
      });
  }, []); // MEMO: 第2引数に

  // TODO: anyをなくす。
  const renderItem = ({ item }: any) => (
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
        style={{ flex: 1 }}
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

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
});