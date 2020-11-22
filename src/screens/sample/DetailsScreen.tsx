import React from 'react';
import {
  Text,
  View,
  Button
} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { RootStackParamList } from "../../types/RootStackParamList";

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

export function DetailsScreen({ route, navigation }: DetailsProps) {
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
      <Button title="Go to Home" onPress={() => navigation.navigate('Home', { post: "re-initialPost" })} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Button
        title="Go back to first screen in stack"
        onPress={() => navigation.popToTop()}
      />
    </View>
  );
}