import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, TextInput } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/RootStackParamList';
import { StackNavigationProp } from '@react-navigation/stack';
import { MusicData } from '../types/MusicData';

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
    const musicData: MusicData = route.params?.musicData;

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>{musicData.title}</Text>
            <Text>{musicData.difficultType}</Text>
            <Text>{musicData.difficulty}</Text>
{/*
            <TextInput
              multiline
              placeholder="input DP csv"
              style={{ height: 200, padding: 10, backgroundColor: 'white' }}
              onChangeText={musicData.difficulty}
            />
*/}
            <StatusBar style="auto" />            
        </View>
    );
}