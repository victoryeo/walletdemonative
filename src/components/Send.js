import React, {useState, useEffect} from 'react'
import {StyleSheet, View, Text, TextInput, Button} from 'react-native'
import {connect} from "react-redux"

function Send(props) {
  const [destination, setDestination] = useState("")
  const [amount, setAmount] = useState(0)

  const onSend = () => {
    console.log("onSend")
    console.log(destination)
    console.log(amount)
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
