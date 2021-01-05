import React, {useState, useEffect} from 'react'
import {StyleSheet, View, Text, TextInput, Button} from 'react-native'
import {connect} from "react-redux"
import { hdPathString, localStorageKey } from '../web3/constants'
import AsyncStorage from '@react-native-community/async-storage'
import lightwallet from 'eth-lightwallet'

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

    getWallet().then(data => {
      console.log(data)
      const walletObj = JSON.parse(data)
      //show the wallet version if it is available
      if (walletObj.hasOwnProperty("ver")) {
        console.log(walletObj.ver)
      }
      console.log(walletObj.ks)
      //have to deserialize the keystore because the saved
      //copy is serialized
      const ksObj = lightwallet.keystore.deserialize(walletObj.ks)
      console.log(ksObj)

      if (typeof(props.web3) !== 'undefined') {
        console.log("props.web3.web3Instance")
      }
      console.log(`${destination} ${destination.length}`)
      //txOptions
      let txOptions = {
        nonce: 0x1F,
        gasPrice: 0x3B9ACA00,
        gasLimit: 3000000,
        to: destination,
        value: props.web3.web3Instance.utils.toHex(amount),
      }
      //form raw Tx
      let rawTx = lightwallet.txutils.valueTx(txOptions)
      console.log(`rawTx ${rawTx}`)
      //get the derived key
      if (typeof(lightwallet.keystore.deriveKeyFromPassword) === 'undefined') {
        //if deriveKeyFromPassword is undefined
        //then we use deriveKeyFromPasswordAndSalt
        let salt = "salt"
        lightwallet.keystore.deriveKeyFromPasswordAndSalt(password, salt, function(err, pwDerivedKey) {
          console.log(pwDerivedKey)
          let signedFunctionTx = lightwallet.signing.signTx(
            ksObj,
            pwDerivedKey,
            rawTx,
            props.account);
          console.log("Signed function transaction:"+signedFunctionTx)
          props.web3.eth.sendRawTransaction('0x'+signedFunctionTx, function(err, hash) {
              console.log(err)
              console.log(hash)
              })
        })
      }
    })
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
