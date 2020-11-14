import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, Button } from 'react-native';

export default function App() {

  const [label, setLabel] = useState("");

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
  buttonContainer: {
    height: 100,
    width: 200,
    padding: 10,
    backgroundColor: '#FFFFFF',
    margin: 3
  },
});
