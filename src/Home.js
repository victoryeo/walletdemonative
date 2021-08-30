import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import MainPage from "./components/MainPage"

export default class Home extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>We use web3!</Text>
        <MainPage navigation={this.props.navigation}/>
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
