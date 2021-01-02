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

class MainPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isConnected: false,
      accountAddress: '',
      newdialogVisible: false,
      restoredialogVisible: false,
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
          console.log('check account')
          Utils.checkAccount(this.web3, this.props.STPupdateAccounts);
          //console.log(this.props.account)
        } catch (err) {
          console.error('error', err);
        }
      }
    },1000)
  }

  handleNewCancel = () => {
    this.setState({ newdialogVisible: false });
  }

  handleNewSubmit = () => {
    this.setState({ newdialogVisible: false });
    console.log("handle submit")
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

  onChangePasswordInput = (val) => {
    //console.log(val)
    this.password = val
  }

  handleNewAccount = () => {
    console.log("new account")
    this.setState({ newdialogVisible: true });
    Utils.createAccount(this.web3, this.props.STPupdateAccounts);
  }

  handleRestoreCancel = () => {
    this.setState({ restoredialogVisible: false });
  }

  handleRestoreSubmit = () => {
    this.setState({ restoredialogVisible: false })
    let seed = bip39.mnemonicToSeed(this.seedPhrase)
    console.log(seed)
    const spReturned = setInterval(() => {
      clearInterval(spReturned);
      try {
        console.log('spReturned in restore')
        let password = "dummy"
        let seedPhrase = this.seedPhrase
        let ks = {}
        const option = {
          password,
          seedPhrase,
          hdPathString,
        };

        lightwallet.keystore.createVault(option, function(err, data) {
          if (err)
            console.warn(err)
          console.log('createVault in restore')
          ks = data
          console.log(ks)
        })
      } catch (err) {
        console.error('error', err);
      }
    },1000)
  }

  onChangeSeedPhraseInput = (val) => {
    //console.log(val)
    this.seedPhrase = val
  }

  handleRestoreAccount = () => {
    //recover keystore from seed phrase
    console.log("restore account")
    this.setState({ restoredialogVisible: true });
  }

  onSendTx = () => {
    console.log("onSendTx")
    this.props.navigation.navigate('Send')

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
        {this.props.account !== 0x0
          ?(<View style={styles.button1}>
            <Button title="Send Transaction"
              onPress={this.onSendTx}/>
            </View>)
          :''}
        <Text>{this.props.seedPhrase?'Write down your seed phrase:':''}</Text>
        <Text>{this.props.seedPhrase}</Text>
        <Dialog.Container visible={this.state.newdialogVisible}>
          <Dialog.Title>Enter password</Dialog.Title>
          <Dialog.Description>
            for encrypting a new wallet account
          </Dialog.Description>
          <Dialog.Input
            wrapperStyle={styles.wrapperStyle}
            onChangeText={(text) => this.onChangePasswordInput(text)}
            secureTextEntry={true}
            textInputRef="password">
          </Dialog.Input>
          <Dialog.Button label="Submit" onPress={this.handleNewSubmit} />
          <Dialog.Button label="Cancel" onPress={this.handleNewCancel} />
        </Dialog.Container>
        <Dialog.Container visible={this.state.restoredialogVisible}>
          <Dialog.Title>Enter seed phrase</Dialog.Title>
          <Dialog.Description>
            for restoring a wallet account
          </Dialog.Description>
          <Dialog.Input
            wrapperStyle={styles.wrapperStyle}
            onChangeText={(text) => this.onChangeSeedPhraseInput(text)}
          />
          <Dialog.Button label="Submit" onPress={this.handleRestoreSubmit} />
          <Dialog.Button label="Cancel" onPress={this.handleRestoreCancel} />
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
) (MainPage)

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
