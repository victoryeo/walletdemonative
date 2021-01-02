/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import './global'
import './shim'
import React, {Component} from 'react'
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { Provider } from 'react-redux'
import { persistStore } from "redux-persist"
import { PersistGate } from 'redux-persist/integration/react';
import Home from './src/Home'
import Send from './src/components/Send'
import { store } from './src/store/store.js'
import getWeb3 from './src/web3/getWeb3'

const Stack = createStackNavigator()
const persistor = persistStore(store);

getWeb3.catch(
  err => console.warn('Error in web3 initialization.', err)
)

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} options={{ title: 'Wallet' }} />
            <Stack.Screen name="Send" component={Send}
             navigation={this.props.navigation} />
          </Stack.Navigator>
          </NavigationContainer>
        </PersistGate>
      </Provider>
    )
  }
}
