//import '../../shim.js'
import React, {Component} from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import {connect} from "react-redux"
import { STPupdateAccounts, STPupdateSeedPhrase } from '../actions/actions.js'
import * as Utils from '../web3/utils'
import Dialog from "react-native-dialog"
import lightwallet from 'eth-lightwallet'
import bip39 from 'react-native-bip39'
import { hdPathString, localStorageKey } from '../web3/constants'
import AsyncStorage from '@react-native-community/async-storage'

class Web3Info extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isConnected: false,
      account: '',
      dialogVisible: false,
    };
    this.web3 = null
    this.networktype = 'none'

    const web3Returned = setInterval(() => {
      if (this.props.web3 != null) {
        clearInterval(web3Returned);
        this.web3 = this.props.web3.web3Instance
            //console.log(this.web3)
        Utils.checkNetwork(this.web3).then((res) => {
            console.log(res)
            if (res == 'local' || res == 'rinkeby') {
              this.setState({
                isConnected: true,
             })
            }
        })
        try {
          console.log('vic')
          Utils.checkAccount(this.web3, this.props.STPupdateAccounts);

            //console.log(this.props.account)
        } catch (err) {
          console.error('error', err);
        }

      }
    },1000)
  }

  handleCancel = () => {
    this.setState({ dialogVisible: false });
  }

  handleSubmit = () => {
    this.setState({ dialogVisible: false });
    console.log("submit account")
    console.log(this.password)
    let seedPhrase = ""
    let password = this.password
    let ks = {}

    const saveWallet = async (walletdump) => {
      console.log('saveWallet')
      await AsyncStorage.setItem(localStorageKey, `${walletdump}`);
    };

    try {
      bip39.generateMnemonic(128).then((mnemonic) => {
        console.log(mnemonic)
        seedPhrase = mnemonic
        Utils.updateSeedPhrase(seedPhrase, this.props.STPupdateSeedPhrase)

        if (crypto) {
          console.log('crypto')
          if (crypto.getRandomValues) {
            console.log('randomBytes')
          } else {
            console.log('oldBrowser')
          }
        }

        const spReturned = setInterval(() => {
            clearInterval(spReturned);
            try {
              console.log('spReturned')
              //seedPhrase = lightwallet.keystore.generateRandomSeed(password);
              const opt = {
                password,
                seedPhrase,
                hdPathString,
              };

              lightwallet.keystore.createVault(opt, (err, data) => {
                if (err)
                  console.warn(err)
                console.log('createVault')
                ks = data
                console.log(ks)
                const walletdump = {
                   ver: '1',
                   ks: ks.serialize(),
                }
                console.log(walletdump)
                saveWallet(walletdump)
              })
            } catch (err) {
              console.error('error', err);
            }
        },10000)
      })
    } catch (err) {
      console.warn(err);
    }
  }

  onChangeTextInput = (val) => {
    //console.log(val)
    this.password = val
  }

  handleNewAccount = () => {
    console.log("new account")
    this.setState({ dialogVisible: true });
    Utils.createAccount(this.web3, this.props.STPupdateAccounts);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Ethereum Wallet demo</Text>
        <Text>{this.state.isConnected?'Connected to rinkeby node':'Not Connected'}</Text>
        <View style={styles.button1}>
        <Button
          onPress={this.handleNewAccount}
          title="Create New Wallet"
          color="#841584"
        /></View>
                  <View ><Text></Text></View>
        <View style={styles.button1}>
        <Button
          onPress={this.handleRestoreAccount}
          title="   Restore Wallet   "
          color="#E51594"
        /></View>
        <Text>Your address is:</Text>
        <Text>{this.props.account}</Text>
        <Text>{this.props.seedPhrase?'Write down your seed phrase':''}</Text>
        <Text>{this.props.seedPhrase}</Text>
        <Dialog.Container visible={this.state.dialogVisible}>
          <Dialog.Title>Enter password</Dialog.Title>
          <Dialog.Description>
            for encrypting a new wallet account
          </Dialog.Description>
          <Dialog.Input
          wrapperStyle={styles.wrapperStyle}
          onChangeText={(text) => this.onChangeTextInput(text)}
          secureTextEntry={true}
          textInputRef="password"></Dialog.Input>
          <Dialog.Button label="Submit" onPress={this.handleSubmit} />
          <Dialog.Button label="Cancel" onPress={this.handleCancel} />
        </Dialog.Container>
      </View>
    )
  }
}

const mapStateToProps = state => ({
        web3: state.web3,
        account: state.reducers.account,
        seedPhrase: state.reducers.seedPhrase,
})

const mapDispatchToProps = (dispatch) => {
  // Action
  return {
    STPupdateAccounts: (account0) => dispatch(STPupdateAccounts(account0)),
    STPupdateSeedPhrase: (seedPhrase) => dispatch(STPupdateSeedPhrase(seedPhrase)),
  };
};

export default connect (
  mapStateToProps,
  mapDispatchToProps,
) (Web3Info)

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: '#9999',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapperStyle :{
    backgroundColor: '#00000000',
    borderBottomColor: '#000000',
    borderBottomWidth: 1,
  },
  button1 :{
    width: '100%',
    backgroundColor: "#ffffff",
    borderRadius: 2,
    borderColor: "#ffffff",
    borderWidth: 1,
    shadowColor: "rgba(0,0,0,.12)",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    justifyContent: 'space-between'
  },
});
