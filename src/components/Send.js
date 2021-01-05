import React, {useState, useEffect} from 'react'
import {StyleSheet, View, Text, TextInput, Button} from 'react-native'
import {connect} from "react-redux"
import { hdPathString, localStorageKey } from '../web3/constants'
import AsyncStorage from '@react-native-community/async-storage'
import lightwallet from 'eth-lightwallet'
import Tx from 'ethereumjs-tx'

function Send(props) {
  const [destination, setDestination] = useState("")
  const [password, setPassword] = useState("")
  const [amount, setAmount] = useState(0)

  const onSend = () => {
    console.log("onSend")
    console.log(destination)
    console.log(amount)

    const getWallet = async () => {
      console.log('getWallet')
      const result = await AsyncStorage.getItem(localStorageKey)
      return result
    }

    //get the wallet from the AsyncStorage
    (async () => {
      const wallet = await getWallet()
      console.log(wallet)
      const walletObj = JSON.parse(wallet)
      //show the wallet version if it is available
      if (walletObj.hasOwnProperty("ver")) {
        console.log(walletObj.ver)
      }
      console.log(walletObj.ks)

      //raw tx
      let rawTx = new Tx({
        nonce: '0x1F',
        gasPrice: '0x3B9ACA00',
        gasLimit: '3141592',
        to: destination,
        value: amount,
      })
      console.log(rawTx)
      lightwallet.keystore.deriveKeyFromPassword(password, function(err, pwDerivedKey) {
        let signedFunctionTx = lightwallet.signing.signTx(
          walletObj.ks,
          pwDerivedKey,
          rawTx,
          props.account);
        console.log("Signed function transaction:"+signedFunctionTx)
        props.web3.eth.sendRawTransaction('0x'+signedFunctionTx, function(err, hash) {
            console.log(err)
            console.log(hash)
            })
        })
    })()
  }

  return(
    <View>
      <Text style={styles.bigTextView}>Send a Transaction</Text>
      <Text>Your address is : {props.account}</Text>

      <Text>Enter destination:</Text>
      <TextInput
        placeholder="destination address"
        onChangeText={(address) => (setDestination(address))}/>
      <Text>Amount to send:</Text>
      <TextInput
        placeholder="amount"
        onChangeText={(amount) => (setAmount(amount))}/>
      <Text>Password:</Text>
      <TextInput
        placeholder="password"
        secureTextEntry={true}
        onChangeText={(password) => (setPassword(password))}/>
      <Button
        title="Send"
        onPress={()=>onSend()}/>
    </View>
  )
}

const styles = StyleSheet.create({
  bigTextView: {
    fontFamily: "Cochin",
    fontSize: 20,
    fontWeight: "bold",
  },
})

const mapStateToProps = state => ({
  web3: state.web3,
  account: state.reducers.account,
})

export default connect (
  mapStateToProps,
  null,
) (Send)
