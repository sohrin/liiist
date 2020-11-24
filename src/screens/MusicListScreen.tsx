import React, { useState, useEffect } from 'react';
import { Platform, StyleSheet, Text, View, FlatList, TouchableOpacity, ImageBackground, Alert, Clipboard, Dimensions } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from "../types/RootStackParamList";
import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-community/async-storage';
import { MusicData } from '../types/MusicData';

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

  const navigateToDetails = (item: any) => {
    navigation.navigate("MusicDetails", {musicData: item});
  }

  // MEMO: 縦スクロールエリア対応
  const getListItemStyle = () => {
    if (Platform.OS === "web") {
      // TODO: Windows環境だとどうなる？
      return styles.itemWeb;
    } else {
      return styles.item;
    }
  }

  // TODO: anyをなくす。
  const renderItem = ({ item }: any) => (
    <TouchableOpacity onPress={() =>navigateToDetails(item)}>
      <View style={getListItemStyle()}>
        <View style={styles.clearLampArea}>
          <View style={styles.clearLampMain} />
          <View style={styles.clearLampSub}>
            <View style={styles.clearLampSubTop} />
            <View style={styles.clearLampSubMiddle} />
            <View style={styles.clearLampSubBottom} />
          </View>
        </View>
        <View style={styles.difficultyArea}>
{/*
          <ImageBackground
            source={require('../../assets/difficulty_star_nc139839.png')}
            style={{
              width: "100%",
              height: "100%",

              top: 0,
              left: 0,
              zIndex: 1,
              elevation: 1,
            }}
          >
*/}
            <Text style={styles.difficulty}>{item.difficulty}</Text>
{/*
          </ImageBackground>
*/}
        </View>
        <View style={styles.nameArea}>
          <View style={styles.titleArea}>
            <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
          </View>
          <Text style={styles.tags}>tags: #sampleTag1 #sampleTag2 #sampleTag3</Text>
          <Text style={styles.memo}>memo: memomemomemomemomemomemomemomemo</Text>
        </View>
        <View style={styles.rankArea}>
          <Text>rank : AAA (MAX-100)</Text>{/*  style={styles.title} */}
          <Text>score: 2345 (95.24%)</Text>{/*  style={styles.title} */}
          <Text>bp   : 34 (2.01%)</Text>{/*  style={styles.title} */}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
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
  item: {
    backgroundColor: '#e0e0e0',
    marginVertical: 1,
    width: Dimensions.get('window').width,
    display: "flex",
    flexDirection: "row",
    shadowColor: 'black',
    shadowRadius: 30,
    shadowOpacity: 1,
    borderColor: 'white',
  },
  itemWeb: {
    backgroundColor: "#fff",
    marginVertical: 1,
    width: Dimensions.get('window').width - Dimensions.get('window').width * 0.01,
    display: "flex",
    flexDirection: "row",
    shadowColor: 'black',
    shadowRadius: 15,
    shadowOpacity: 1,
    borderColor: 'white',
  },
  clearLampArea: {
    flex: 1,
    flexDirection: "row",
  },
  clearLampMain: {
    width: 12,
    backgroundColor: "#f00",
  },
  clearLampSub: {
    width: 8,
    flexDirection: "column",
  },
  clearLampSubTop: {
    flex: 1,
    backgroundColor: "#f00",
  },
  clearLampSubMiddle: {
    flex: 6,
  },
  clearLampSubBottom: {
    flex: 1,
    backgroundColor: "#f00",
  },
  difficultyArea: {
    flex: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  difficulty: {
    fontSize: 30,
    // alignItems: "center",
    // justifyContent: "center",
    // position: 'absolute', 
    // top: "25%", 
    // left: "25%",
  },
  nameArea: {
    flex: 35,
    flexDirection: "column",
    justifyContent: "center",
    paddingRight: 5,
  },
  titleArea: {
    flex: 1,
    flexDirection: "row",
  },
  title: {
    fontSize: 25,
    flex: 7,
  },
  tags: {
    flex: 4,
    fontSize: 15,
  },
  memo: {
    flex: 3,
    fontSize: 12,
  },
  rankArea: {
    flex: 15,
    flexDirection: "column",
  },
});