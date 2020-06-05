import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class Home extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>We use web3!</Text>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
